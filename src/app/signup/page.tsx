'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store user ID in localStorage to use in role selection
      localStorage.setItem('nexahaul_user_id', data.user.id);
      
      // Redirect to role selection
      router.push('/choice');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '28px',
        color: '#2563eb',
        marginBottom: '30px',
        textAlign: 'center'
      }}>Sign Up</h1>
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left'
        }}>
          <label style={{
            fontSize: '14px',
            marginBottom: '6px',
            color: '#4b5563'
          }}>Full Name</label>
          <input 
            name="name"
            type="text" 
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }} 
          />
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left'
        }}>
          <label style={{
            fontSize: '14px',
            marginBottom: '6px',
            color: '#4b5563'
          }}>Email Address</label>
          <input 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }} 
          />
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left'
        }}>
          <label style={{
            fontSize: '14px',
            marginBottom: '6px',
            color: '#4b5563'
          }}>Password</label>
          <input 
            name="password"
            type="password" 
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }} 
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#93c5fd' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            marginBottom: '24px'
          }}
        >
          {loading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
      
      <p style={{
        color: '#6b7280',
        fontSize: '14px'
      }}>
        Already have an account?{' '}
        <Link href="/login" style={{
          color: '#2563eb',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Log in
        </Link>
      </p>
    </div>
  );
}