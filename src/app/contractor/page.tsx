import Link from 'next/link';

export default function Home() {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#2563eb',
                fontSize: '28px',
                marginBottom: '30px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '15px'
            }}>Welcome to Contractor Interface</h1>
            <p style={{
                textAlign: 'center',
                color: '#4b5563',
                marginBottom: '25px'
            }}>
                Find market data and manage your bids all in one place
            </p>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <Link href="/contractor/profile" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: 'pointer'
                    }}>
                        <h2 style={{color: '#1e40af'}}>Profile</h2>
                        <p style={{color: '#64748b'}}>View and edit your profile</p>
                    </div>
                </Link>
                
                <Link href="/contractor/findbids" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: 'pointer'
                    }}>
                        <h2 style={{color: '#1e40af'}}>Find Bids</h2>
                        <p style={{color: '#64748b'}}>Discover new opportunities</p>
                    </div>
                </Link>
                
                <Link href="/contractor/registeredbids" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: 'pointer'
                    }}>
                        <h2 style={{color: '#1e40af'}}>Registered Bids</h2>
                        <p style={{color: '#64748b'}}>Manage your active bids</p>
                    </div>
                </Link>
                
                <Link href="/contractor/plans" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: 'pointer'
                    }}>
                        <h2 style={{color: '#1e40af'}}>Plans</h2>
                        <p style={{color: '#64748b'}}>View subscription options</p>
                    </div>
                </Link>
                
                <Link href="/contractor/history" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        cursor: 'pointer'
                    }}>
                        <h2 style={{color: '#1e40af'}}>History</h2>
                        <p style={{color: '#64748b'}}>Past activity and bids</p>
                    </div>
                </Link>
            </div>
            
            <div style={{
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <Link href="/contractor/t&c" style={{
                    color: '#4b5563',
                    textDecoration: 'none'
                }}>
                    <span style={{textDecoration: 'underline'}}>Terms & Conditions</span>
                </Link>
                
                <Link href="/contractor/contact" style={{
                    color: '#4b5563',
                    textDecoration: 'none'
                }}>
                    <span style={{textDecoration: 'underline'}}>Contact Us</span>
                </Link>
            </div>
        </div>
    );
}