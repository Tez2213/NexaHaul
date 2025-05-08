'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Store user data and token in localStorage
      localStorage.setItem('nexahaul_user', JSON.stringify(data.user));
      localStorage.setItem('nexahaul_token', data.token);
      
      // Redirect based on role
      router.push(`/${data.user.role}`);
    } catch (err) {
      setError(err.message);
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
      }}>Login</h1>
      
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
          {loading ? 'Processing...' : 'Login'}
        </button>
      </form>
      
      <p style={{
        color: '#6b7280',
        fontSize: '14px'
      }}>
        Don&apos;t have an account?
        <Link href="/signup" style={{
          color: '#2563eb',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}