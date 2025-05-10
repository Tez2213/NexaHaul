'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FindBids() {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch available bids
  useEffect(() => {
    // In a real app, fetch from API
    setTimeout(() => {
      setBids(sampleBids);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/contractor" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Available Shipping Bids</h1>
        <p className="text-gray-600">
          Browse open bids and submit your proposals to win shipping contracts
        </p>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {bids.map(bid => (
            <div 
              key={bid.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">{bid.title}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {bid.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {bid.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {bid.fromLocation}
                  </div>
                  <div className="text-sm text-gray-500">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {bid.toLocation}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-500">Maximum Budget</p>
                    <p className="font-semibold text-gray-800">${bid.maxBudget.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-500">Distance</p>
                    <p className="font-semibold text-gray-800">{bid.distance}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Bidding ends in {bid.timeRemaining}
                  </div>
                  
                  <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sample bid data
const sampleBids = [
  {
    id: 'bid-1234',
    title: 'Electronics Transport to Seattle',
    description: 'Need to transport 20 pallets of electronics safely to Seattle warehouse',
    fromLocation: 'San Francisco, CA',
    toLocation: 'Seattle, WA',
    status: 'Open for Bids',
    maxBudget: 3500,
    distance: '807 miles',
    timeRemaining: '2 days, 4 hours',
    proposalCount: 3,
    createdAt: '2025-05-07T14:23:00Z',
    deadline: '2025-05-12T14:23:00Z'
  },
  {
    id: 'bid-2345',
    title: 'Furniture Delivery to Portland',
    description: 'Office furniture delivery requiring careful handling and assembly',
    fromLocation: 'Los Angeles, CA',
    toLocation: 'Portland, OR',
    status: 'Open for Bids',
    maxBudget: 2800,
    distance: '965 miles',
    timeRemaining: '3 days, 12 hours',
    proposalCount: 2,
    createdAt: '2025-05-06T11:45:00Z',
    deadline: '2025-05-13T11:45:00Z'
  },
  {
    id: 'bid-3456',
    title: 'Medical Supplies Transport',
    description: 'Urgent medical supplies requiring temperature-controlled transport',
    fromLocation: 'Denver, CO',
    toLocation: 'Phoenix, AZ',
    status: 'Open for Bids',
    maxBudget: 2200,
    distance: '586 miles',
    timeRemaining: '1 day, 8 hours',
    proposalCount: 6,
    createdAt: '2025-05-05T09:20:00Z',
    deadline: '2025-05-09T09:20:00Z'
  },
  {
    id: 'bid-4567',
    title: 'Heavy Equipment Transport',
    description: 'Construction equipment that needs to be moved to a new work site',
    fromLocation: 'Houston, TX',
    toLocation: 'Dallas, TX',
    status: 'Open for Bids',
    maxBudget: 1800,
    distance: '239 miles',
    timeRemaining: '4 days, 3 hours',
    proposalCount: 1,
    createdAt: '2025-05-08T16:10:00Z',
    deadline: '2025-05-15T16:10:00Z'
  }
];