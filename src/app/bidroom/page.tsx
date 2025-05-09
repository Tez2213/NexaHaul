'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import Link from 'next/link';

interface Bid {
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
}

interface BidRoomProps {
  initialBidAmount: number;
  timeLimit: number; // in seconds
  bidId: string;
  shipmentDetails: {
    origin: string;
    destination: string;
    cargoType: string;
    weight: string;
    dimensions: string;
    pickupDate: string;
  };
}

export default function BidRoom() {
  // Mock data - in production, this would come from API or URL params
  const mockData: BidRoomProps = {
    bidId: 'BID12345',
    initialBidAmount: 1000000, // $1M starting bid
    timeLimit: 1800, // 30 minutes (1800 seconds)
    shipmentDetails: {
      origin: 'Los Angeles, CA',
      destination: 'Seattle, WA',
      cargoType: 'Electronics',
      weight: '5,000 lbs',
      dimensions: '20 x 10 x 8 ft',
      pickupDate: 'June 15, 2025'
    }
  };

  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [currentLowestBid, setCurrentLowestBid] = useState<number>(mockData.initialBidAmount);
  const [timeRemaining, setTimeRemaining] = useState<number>(mockData.timeLimit);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(60); // 60 second cooldown
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [contractorCount, setContractorCount] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [winReason, setWinReason] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [biddingStarted, setBiddingStarted] = useState(false);
  const [mainTimerActive, setMainTimerActive] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('nexahaul_user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing user data', error);
        router.push('/login');
      }
    } else {
      // Redirect if no user is found
      router.push('/login');
    }
  }, [router]);

  // Clear success message after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [successMessage]);

  // Clear error message after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError('');
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [error]);

  // Initialize socket connection
  useEffect(() => {
    if (!user || isLoading) return;

    // Use the actual server URL from environment or default to localhost
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

    // Make sure the URL uses wss:// for HTTPS sites
    const secureSocketUrl = socketUrl.replace('http://', 'https://');

    const socketInstance = io(secureSocketUrl, {
      transports: ['websocket'], // Prioritize WebSockets
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      query: {
        userId: user.id,
        userName: user.name,
        role: user.role,
        bidId: mockData.bidId // For joining specific bid room
      }
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
      
      // Join specific bid room
      socketInstance.emit('joinBidRoom', { 
        bidId: mockData.bidId,
        userId: user.id,
        userName: user.name,
        userRole: user.role
      });
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError(`Connection error: ${err.message}`);
      setConnected(false);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    });

    // Initial room state
    socketInstance.on('roomState', (data) => {
      console.log('Room state received:', data);
      setCurrentLowestBid(data.currentLowestBid);
      setBidHistory(data.bidHistory);
      setTimeRemaining(data.timeRemaining);
      setCooldownRemaining(data.cooldownRemaining);
      setBiddingStarted(data.biddingStarted);
      setMainTimerActive(data.mainTimerActive);
      setCooldownActive(data.cooldownActive);
      setContractorCount(data.contractorCount);
      
      if (data.participants) {
        setParticipants(data.participants.map((p: any) => p.name));
      }
      
      if (data.winner) {
        setWinner(data.winner);
      }
    });

    // Bidding started event
    socketInstance.on('biddingStarted', (data) => {
      console.log('Bidding started:', data);
      setBiddingStarted(true);
      setContractorCount(data.contractorCount);
      setSuccessMessage(data.message || 'Bidding has started!');
    });

    socketInstance.on('bidUpdate', (data: { newBid: number; bidder: string; bids: Bid[] }) => {
      console.log('Bid update received:', data);
      setCurrentLowestBid(data.newBid);
      setBidHistory(data.bids);
      
      // Show notification for new bids
      if (data.bidder !== user.name) {
        // Browser notification if allowed
        if (Notification.permission === "granted") {
          new Notification("New Bid Alert", {
            body: `${data.bidder} placed a new bid of ${formatCurrency(data.newBid)}`
          });
        }
      }
    });

    socketInstance.on('participantUpdate', (data: { participants: string[]; contractorCount: number }) => {
      console.log('Participant update received:', data);
      setParticipants(data.participants);
      setContractorCount(data.contractorCount);
    });

    socketInstance.on('timerUpdate', (data: { timeRemaining: number; cooldownRemaining: number; mainTimerActive: boolean }) => {
      console.log('Timer update received:', data);
      setTimeRemaining(data.timeRemaining);
      setCooldownRemaining(data.cooldownRemaining);
      setMainTimerActive(data.mainTimerActive);
      setCooldownActive(data.cooldownRemaining > 0 && data.cooldownRemaining <= 60);
    });

    socketInstance.on('biddingCompleted', (data: { winner: string; finalAmount: number; reason: string }) => {
      console.log('Bidding completed:', data);
      setWinner(data.winner);
      setWinReason(data.reason);
      setCurrentLowestBid(data.finalAmount);
      setBiddingStarted(false);
      
      // Show winner notification
      if (data.winner === user.name) {
        setSuccessMessage('Congratulations! You won the bid!');
        
        // Browser notification
        if (Notification.permission === "granted") {
          new Notification("You Won the Bid!", {
            body: `Congratulations! You secured the contract at ${formatCurrency(data.finalAmount)}`
          });
        }
      } else if (data.winner) {
        // Browser notification for non-winners
        if (Notification.permission === "granted") {
          new Notification("Bidding Completed", {
            body: `${data.winner} won with a bid of ${formatCurrency(data.finalAmount)}`
          });
        }
      }
    });

    socketInstance.on('error', (data: { message: string }) => {
      setError(data.message);
    });

    setSocket(socketInstance);

    // Request browser notification permission
    if (Notification.permission !== "denied" && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    return () => {
      socketInstance.disconnect();
    };
  }, [user, isLoading, router, mockData.bidId]);

  // Format currency
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);

  // Format time
  const formatTime = useCallback((seconds: number) => {
    if (seconds < 0) seconds = 0;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Submit bid - with better error handling
  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!socket || !connected) {
      setError('Not connected to the bidding server');
      return;
    }

    if (bidAmount >= currentLowestBid) {
      setError('Your bid must be lower than the current bid');
      return;
    }

    if (bidAmount <= 0) {
      setError('Bid amount must be greater than zero');
      return;
    }
    
    if (!biddingStarted) {
      setError('Bidding has not started yet. Waiting for at least 2 contractors.');
      return;
    }
    
    // Show a pending state
    setSuccessMessage('Submitting your bid...');

    try {
      // Emit the bid without expecting a callback response
      socket.emit('placeBid', { 
        bidId: mockData.bidId,
        userId: user?.id,
        userName: user?.name,
        amount: bidAmount 
      });
      
      // Success will be determined by receiving a bidUpdate event
      setBidAmount(0);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit bid');
      }
      setSuccessMessage('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading bidding room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-2xl font-bold mb-2 md:mb-0">Live Bidding Room</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`inline-block w-3 h-3 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                <span className="text-sm">{connected ? 'Connected' : 'Reconnecting...'}</span>
              </div>
              <div className={`text-sm ${contractorCount < 2 ? 'bg-yellow-500' : 'bg-green-500'} px-3 py-1 rounded-full`}>
                {contractorCount} Contractor{contractorCount !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-lg font-semibold">
                Bid ID: {mockData.bidId}
              </p>
              <p className="text-sm opacity-90">
                Initial Amount: {formatCurrency(mockData.initialBidAmount)}
              </p>
              {!biddingStarted && contractorCount < 2 && (
                <div className="mt-2 bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-md inline-block">
                  Waiting for at least 2 contractors to start bidding
                </div>
              )}
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <p className="text-sm opacity-90">
                You joined as: {user?.name} ({user?.role})
              </p>
              <Link href={user?.role === 'shipper' ? '/shipper' : '/contractor'} className="text-white underline text-sm">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Left: Shipment Details */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Shipment Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Origin:</span>
                  <span className="font-medium">{mockData.shipmentDetails.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-medium">{mockData.shipmentDetails.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cargo Type:</span>
                  <span className="font-medium">{mockData.shipmentDetails.cargoType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight:</span>
                  <span className="font-medium">{mockData.shipmentDetails.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dimensions:</span>
                  <span className="font-medium">{mockData.shipmentDetails.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Date:</span>
                  <span className="font-medium">{mockData.shipmentDetails.pickupDate}</span>
                </div>
              </div>
            </div>
            
            {/* Middle: Current Bid */}
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Current Lowest Bid</h2>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {formatCurrency(currentLowestBid)}
              </p>
              {bidHistory.length > 0 ? (
                <p className="text-sm text-gray-600">
                  Last bid by {bidHistory[0]?.userName || 'Unknown'}
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  No bids placed yet
                </p>
              )}
            </div>
            
            {/* Right: Timers */}
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col shadow-sm">
              <div className="flex flex-col items-center justify-center mb-4">
                <h2 className="text-lg font-semibold mb-2">Main Timer</h2>
                <p className={`text-2xl md:text-3xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-800'} ${mainTimerActive ? 'animate-pulse' : ''}`}>
                  {formatTime(timeRemaining)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {biddingStarted ? 'Bidding in progress' : 'Waiting to start'}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold mb-2">Cooldown Timer</h2>
                <p className={`text-2xl md:text-3xl font-bold ${cooldownRemaining < 15 ? 'text-red-600' : cooldownRemaining < 30 ? 'text-amber-600' : 'text-gray-800'} ${cooldownActive ? 'animate-pulse' : ''}`}>
                  {formatTime(cooldownRemaining)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {biddingStarted ? 'Time until bid locks' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>

          {/* Status Banner */}
          {!biddingStarted && !winner && (
            <div className={`mb-6 p-4 rounded-lg text-center ${contractorCount < 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
              {contractorCount < 2 ? (
                <div>
                  <p className="font-bold">Waiting for more contractors</p>
                  <p className="text-sm">Bidding will start when at least 2 contractors join the room.</p>
                  <p className="text-sm mt-2">Current contractors: {contractorCount}/2</p>
                </div>
              ) : (
                <div>
                  <p className="font-bold">Preparing to start bidding</p>
                  <p className="text-sm">The bidding will begin momentarily.</p>
                </div>
              )}
            </div>
          )}

          {/* Notifications */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 animate-fade-in shadow-md" role="alert">
              <div className="flex">
                <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 animate-fade-in shadow-md" role="alert">
              <div className="flex">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p>{successMessage}</p>
              </div>
            </div>
          )}

          {/* Winner Announcement */}
          {winner && (
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6 text-center shadow-md">
              <div className="flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bidding Completed!</h2>
              <p className="text-lg mb-1">Winner: <span className="font-bold">{winner}</span></p>
              <p className="text-lg">Final Bid: <span className="font-bold text-blue-600">{formatCurrency(currentLowestBid)}</span></p>
              
              {winReason && (
                <p className="text-sm text-gray-600 mt-2">Reason: {winReason}</p>
              )}
              
              {winner === user?.name && (
                <div className="mt-6 bg-blue-50 p-4 rounded-lg inline-block">
                  <p className="font-bold text-blue-700 mb-2">Congratulations! You won the bid!</p>
                  <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md"
                    onClick={() => router.push('/contractor/registeredbids')}
                  >
                    View My Contracted Bids
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bid Form for Contractors */}
          {user?.role === 'contractor' && !winner && biddingStarted && (
            <form onSubmit={handleBidSubmit} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="relative flex-grow mb-3 sm:mb-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    value={bidAmount || ''}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    placeholder="Enter bid amount"
                    className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                    min="1"
                    max={currentLowestBid - 1}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!connected || !biddingStarted || bidAmount >= currentLowestBid}
                  className="w-full sm:w-auto sm:ml-4 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Submit Bid
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your bid must be lower than the current bid of {formatCurrency(currentLowestBid)}
                </p>
                {cooldownRemaining <= 30 && cooldownRemaining > 0 && biddingStarted && (
                  <p className="text-sm text-red-500 mt-1 animate-pulse">
                    Hurry! Less than {cooldownRemaining} seconds until the current bid locks!
                  </p>
                )}
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bid History */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Bid History</h2>
              {bidHistory.length > 0 ? (
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bidHistory.map((bid, index) => (
                        <tr key={index} className={`${index === 0 ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-500 font-medium">
                                {bid.userName.substring(0, 1).toUpperCase()}
                              </div>
                              <span className={`font-medium ${bid.userId === user?.id ? 'text-blue-700' : 'text-gray-900'}`}>
                                {bid.userId === user?.id ? 'You' : bid.userName}
                              </span>
                              {index === 0 && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">Latest</span>}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap font-medium text-gray-900">{formatCurrency(bid.amount)}</td>
                          <td className="py-3 px-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {new Date(bid.timestamp).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-sm">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500 font-medium">No bids placed yet</p>
                  <p className="text-sm text-gray-400 mt-1">Be the first to place a bid!</p>
                </div>
              )}
            </div>

            {/* Participants */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Active Participants ({participants.length})
                </h2>
                <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm">
                  {contractorCount} Contractors
                </div>
              </div>
              {participants.length > 0 ? (
                <div className="border border-gray-200 rounded-lg p-4 max-h-80 overflow-y-auto shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {participants.map((participant, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-500 font-medium">
                          {participant.substring(0, 1).toUpperCase()}
                        </div>
                        <span className={`font-medium ${participant === user?.name ? 'text-blue-700' : 'text-gray-900'}`}>
                          {participant === user?.name ? 'You' : participant}
                        </span>
                        {participant === user?.name && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">You</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-sm">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500 font-medium">No participants yet</p>
                  <p className="text-sm text-gray-400 mt-1">Waiting for bidders to join...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            <span className="font-medium">Bidding Rules:</span> Auction starts with 2+ contractors • 30 minute total time limit • 
            60 second cooldown after each bid • Winner determined by last bid before cooldown expires
          </p>
        </div>
      </div>
    </div>
  );
}