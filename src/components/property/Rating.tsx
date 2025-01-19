import React from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { supabase, checkConnection } from '../../lib/supabase';
import type { Rating } from '../../lib/supabase';

interface RatingProps {
  propertyId: string;
}

export function PropertyRating({ propertyId }: RatingProps) {
  const [averageRating, setAverageRating] = React.useState(0);
  const [userRating, setUserRating] = React.useState(0);
  const [totalRatings, setTotalRatings] = React.useState(0);
  const [user, setUser] = React.useState<any>(null);
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    const initializeComponent = async () => {
      const connected = await checkConnection();
      setIsConnected(connected);
      
      if (!connected) {
        setError('Unable to connect to the database. Please try again later.');
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      await loadRatings();
    };

    initializeComponent();

    const ratings = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ratings' },
        () => {
          if (isConnected) loadRatings();
        }
      )
      .subscribe();

    return () => {
      ratings.unsubscribe();
    };
  }, [propertyId, isConnected]);

  const loadRatings = async () => {
    if (!isConnected) return;

    try {
      setLoading(true);
      setError(null);
      
      // Get average rating
      const { data: avgData, error: avgError } = await supabase
        .from('ratings')
        .select('rating')
        .eq('property_id', propertyId);

      if (avgError) throw avgError;

      if (avgData.length > 0) {
        const avg = avgData.reduce((acc, curr) => acc + curr.rating, 0) / avgData.length;
        setAverageRating(avg);
        setTotalRatings(avgData.length);
      }

      // Get user's rating if logged in
      if (user) {
        const { data: userRatingData, error: userRatingError } = await supabase
          .from('ratings')
          .select('rating')
          .eq('property_id', propertyId)
          .eq('user_id', user.id)
          .single();

        if (!userRatingError && userRatingData) {
          setUserRating(userRatingData.rating);
        }
      }
    } catch (err) {
      console.error('Error loading ratings:', err);
      setError('Failed to load ratings');
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    if (!user || !isConnected) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('ratings')
        .upsert({
          property_id: propertyId,
          user_id: user.id,
          rating,
        });

      if (error) throw error;
      setUserRating(rating);
      await loadRatings();
    } catch (err) {
      console.error('Error setting rating:', err);
      setError('Failed to save rating');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center text-red-600">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>Connection error</span>
      </div>
    );
  }

  if (loading) {
    return <div className="text-gray-600">Loading ratings...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {error && (
        <div className="text-red-600 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className={`p-1 ${!user && 'cursor-default'}`}
            disabled={!user || !isConnected}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoveredRating || userRating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        {averageRating.toFixed(1)} ({totalRatings} ratings)
      </div>
    </div>
  );
}