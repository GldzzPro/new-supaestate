import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AuthButton() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleSignIn('google')}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => handleSignIn('github')}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {user.user_metadata.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.full_name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="w-8 h-8 p-1 bg-gray-100 rounded-full" />
        )}
        <span className="text-gray-700">{user.user_metadata.full_name}</span>
      </div>
      <button
        onClick={handleSignOut}
        className="text-gray-600 hover:text-gray-800"
      >
        Sign out
      </button>
    </div>
  );
}