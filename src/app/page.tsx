import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9fafb'
    }}>
      <h1 style={{
        fontSize: '36px',
        color: '#2563eb',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        Welcome to NexaHaul
      </h1>
      
      <p style={{
        fontSize: '18px',
        color: '#4b5563',
        maxWidth: '600px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        Connecting shippers and contractors for efficient logistics solutions
      </p>
      
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <Link href="/login" style={{
          textDecoration: 'none'
        }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            minWidth: '120px'
          }}>
            Login
          </button>
        </Link>
        
        <Link href="/signup" style={{
          textDecoration: 'none'
        }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#2563eb',
            border: '2px solid #2563eb',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            minWidth: '120px'
          }}>
            Sign Up
          </button>
        </Link>
      </div>
      
      <p style={{
        fontSize: '14px',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        Optimize your shipping and logistics operations with our platform
      </p>
    </div>
  );
}