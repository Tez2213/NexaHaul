'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './NexaHaulLandingPage.css';

interface NexaHaulLandingPageProps {}

const NexaHaulLandingPage: React.FC<NexaHaulLandingPageProps> = () => {
  const router = useRouter();

  // Handle navigation using Next.js router
  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="nexa-container">
      {/* Background waves */}
      <div className="wave-background">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
      </div>
      
      {/* Header / Navigation */}
      <header className="nexa-header">
        <div className="nexa-logo">
          <h1>NEXA<br />HAUL</h1>
        </div>
        <nav className="nexa-nav">
          <button onClick={handleSignUp} className="nav-btn">Sign Up</button>
          <button onClick={handleLogin} className="nav-btn">Login</button>
        </nav>
      </header>
      
      {/* Main content */}
      <main className="nexa-main">
        <div className="nexa-content">
          <div className="nexa-headline">
            <h2>
              Connecting <span className="highlight">Shippers</span> and
              <br /><span className="highlight">Contractors</span> for efficient logistics
              <br />solutions
            </h2>
          </div>
          
          <div className="nexa-subheading">
            <p>
              Optimize your shipping
              <br /><span className="highlight">and logistics operations</span>
              <br />with our platform
            </p>
          </div>
          
            <button onClick={handleLogin} className="get-started-btn">
            GET STARTED
            </button>
        </div>
        
        <div className="nexa-illustration">
          <div className="illustration-container">
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default NexaHaulLandingPage;