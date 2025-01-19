import React from 'react';
import { User, Send, Trash2, AlertCircle } from 'lucide-react';
import { supabase, checkConnection } from '../../lib/supabase';
import type { Comment, Profile } from '../../lib/supabase';

interface CommentsProps {
  propertyId: string;
}

export function Comments({ propertyId }: CommentsProps) {
  const [comments, setComments] = React.useState<(Comment & { profile: Profile })[]>([]);
  const [newComment, setNewComment] = React.useState('');
  const [user, setUser] = React.useState<any>(null);
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
      await loadComments();
    };

    initializeComponent();

    const comments = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        () => {
          if (isConnected) loadComments();
        }
      )
      .subscribe();

    return () => {
      comments.unsubscribe();
    };
  }, [propertyId, isConnected]);

  const loadComments = async () => {
    if (!isConnected) return;

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile:profiles(*)')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error loading comments:', err);
      setError('Failed to load comments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || !isConnected) return;

    try {
      setError(null);
      const { error } = await supabase.from('comments').insert({
        property_id: propertyId,
        content: newComment.trim(),
        user_id: user.id,
      });

      if (error) throw error;
      setNewComment('');
      await loadComments();
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment. Please try again.');
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!isConnected) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      await loadComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment. Please try again.');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-lg">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>Unable to connect to the database. Please try again later.</span>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-4">Loading comments...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            disabled={!isConnected}
          >
            <Send className="w-4 h-4" />
            Post Comment
          </button>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {comment.profile.avatar_url ? (
                  <img
                    src={comment.profile.avatar_url}
                    alt={comment.profile.full_name || ''}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 p-1 bg-gray-100 rounded-full" />
                )}
                <div>
                  <div className="font-medium">{comment.profile.full_name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {user?.id === comment.user_id && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-600 hover:text-red-700"
                  disabled={!isConnected}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}