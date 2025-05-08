'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children, requiredRole }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('nexahaul_token');
    const user = JSON.parse(localStorage.getItem('nexahaul_user') || '{}');
    
    if (!token || !user?.id) {
      router.push('/login');
      return;
    }
    
    // If role is required, check if user has correct role
    if (requiredRole && user.role !== requiredRole) {
      router.push(`/${user.role}`);
      return;
    }
    
    setLoading(false);
  }, [router, requiredRole]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}