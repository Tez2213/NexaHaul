'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Choice() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Get user ID from localStorage
        const id = localStorage.getItem('nexahaul_user_id');
        if (!id) {
            router.push('/signup');
            return;
        }
        setUserId(id);
    }, [router]);

    // Add type annotation for the role parameter
    const handleRoleSelection = async (role: string) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/set-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Store user data in localStorage
            localStorage.setItem('nexahaul_user', JSON.stringify(data.user));
            
            // Redirect based on role
            router.push(`/${role}`);
        } catch (err: unknown) {
            // Handle the error with type checking
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
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px 20px',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '28px',
                color: '#2563eb',
                marginBottom: '40px',
                textAlign: 'center'
            }}>Continue as:</h1>
            
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
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '300px',
                margin: '0 auto'
            }}>
                <button
                    onClick={() => handleRoleSelection('contractor')}
                    disabled={loading}
                    style={{
                        padding: '20px 30px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1e40af',
                        border: 'none'
                    }}
                >
                    Contractor
                </button>
                
                <button
                    onClick={() => handleRoleSelection('shipper')}
                    disabled={loading}
                    style={{
                        padding: '20px 30px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1e40af',
                        border: 'none'
                    }}
                >
                    Shipper
                </button>
            </div>
            
            <p style={{
                marginTop: '40px',
                fontSize: '14px',
                color: '#6b7280'
            }}>
                Select your account type to continue to NexaHaul
            </p>
        </div>
    );
}