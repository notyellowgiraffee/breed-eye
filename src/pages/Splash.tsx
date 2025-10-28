import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-cattle.jpg';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary to-primary/80 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground animate-in fade-in duration-700">
        <div className="mb-6 text-8xl animate-bounce">🐄</div>
        <h1 className="text-5xl font-bold mb-4">MooNet</h1>
        <p className="text-xl opacity-90">AI for Bharat Pashudhan</p>
        <div className="mt-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        </div>
      </div>
    </div>
  );
}
