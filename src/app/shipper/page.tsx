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
            }}>Welcome to Shipper Interface</h1>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <Link href="/shipper/profile" style={{
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
                        <p style={{color: '#64748b'}}>Manage your account details</p>
                    </div>
                </Link>
                
                <Link href="/shipper/createdbids" style={{
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
                        <h2 style={{color: '#1e40af'}}>Created Bids</h2>
                        <p style={{color: '#64748b'}}>View your active bids</p>
                    </div>
                </Link>
                
                <Link href="/shipper/history" style={{
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
                        <p style={{color: '#64748b'}}>Past shipments and bids</p>
                    </div>
                </Link>
            </div>
            
            <div style={{
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <Link href="/shipper/t&c" style={{
                    color: '#4b5563',
                    textDecoration: 'none'
                }}>
                    <span style={{textDecoration: 'underline'}}>Terms & Conditions</span>
                </Link>
                
                <Link href="/shipper/contact" style={{
                    color: '#4b5563',
                    textDecoration: 'none'
                }}>
                    <span style={{textDecoration: 'underline'}}>Contact Us</span>
                </Link>
            </div>
        </div>
    );
}