'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisteredBids() {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch registered bids
  useEffect(() => {
    // In a real app, you would fetch from API
    setTimeout(() => {
      setBids(sampleRegisteredBids);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter bids based on search and active tab
  const filteredBids = bids.filter(bid => {
    const matchesSearch = searchQuery === '' || 
      bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'active' && ['pending', 'accepted', 'in progress'].includes(bid.status.toLowerCase())) ||
      (activeTab === 'completed' && ['completed', 'delivered'].includes(bid.status.toLowerCase())) ||
      (activeTab === 'cancelled' && ['rejected', 'cancelled', 'expired'].includes(bid.status.toLowerCase()));
    
    return matchesSearch && matchesTab;
  });

  // Function to get style based on status
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
      case 'cancelled':
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/contractor" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Registered Bids</h1>
        <p className="text-gray-600">
          Manage and track all the shipping contracts you've bid on
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by title or bid ID" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md ${activeTab === 'active' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md ${activeTab === 'completed' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Completed
          </button>
          <button 
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-md ${activeTab === 'cancelled' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Cancelled
          </button>
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md ${activeTab === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            All
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredBids.length === 0 ? (
        // Empty state
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bids found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery 
              ? 'No bids match your search criteria.' 
              : 'You have no registered bids in this category.'}
          </p>
          <div className="mt-6">
            <Link href="/contractor/findbids">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Find New Bids
              </button>
            </Link>
          </div>
        </div>
      ) : (
        // Bid cards
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBids.map(bid => (
            <div 
              key={bid.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{bid.title}</h2>
                    <p className="text-sm text-gray-500">{bid.id}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(bid.status)}`}>
                    {bid.status}
                  </span>
                </div>
                
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
                
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-500 text-sm">Your Bid</p>
                    <p className="font-semibold text-gray-800">{formatCurrency(bid.yourBid)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-500 text-sm">Shipper's Budget</p>
                    <p className="font-semibold text-gray-800">{formatCurrency(bid.maxBudget)}</p>
                  </div>
                </div>
                
                <div className="mb-5">
                  <div className="flex items-center mb-2">
                    <svg className="text-gray-400 w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-sm text-gray-600">
                      {bid.status.toLowerCase() === 'completed' || bid.status.toLowerCase() === 'delivered' 
                        ? `Completed on ${bid.completionDate}` 
                        : bid.status.toLowerCase() === 'rejected' || bid.status.toLowerCase() === 'cancelled'
                          ? `${bid.status} on ${bid.updatedDate}`
                          : `Expected delivery by ${bid.expectedDelivery}`
                      }
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="text-gray-400 w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-gray-600">Bid submitted on {bid.bidDate}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-100">
                  {['pending', 'accepted', 'in progress'].includes(bid.status.toLowerCase()) ? (
                    <Link href={`/contractor/bidroom/${bid.id}`} className="w-full">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Enter Bid Room
                      </button>
                    </Link>
                  ) : bid.status.toLowerCase() === 'completed' || bid.status.toLowerCase() === 'delivered' ? (
                    <div className="flex w-full gap-2">
                      <Link href={`/contractor/shipment/${bid.id}`} className="flex-1">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </Link>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Download Receipt
                      </button>
                    </div>
                  ) : (
                    <div className="w-full text-center">
                      <p className="text-sm text-gray-500">This bid is no longer active</p>
                      <Link href={`/contractor/findbids`} className="text-blue-600 text-sm hover:underline">
                        Find similar opportunities
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sample data for registered bids
const sampleRegisteredBids = [
  {
    id: 'BID-12345',
    title: 'Electronics Shipment to Seattle',
    fromLocation: 'San Francisco, CA',
    toLocation: 'Seattle, WA',
    status: 'In Progress',
    maxBudget: 3500,
    yourBid: 3200,
    bidDate: 'May 8, 2025',
    expectedDelivery: 'May 15, 2025',
    distance: '807 miles',
    description: 'Need to transport 20 pallets of electronics safely to Seattle warehouse',
    updatedDate: 'May 9, 2025'
  },
  {
    id: 'BID-23456',
    title: 'Medical Supplies Transport',
    fromLocation: 'Denver, CO',
    toLocation: 'Phoenix, AZ',
    status: 'Accepted',
    maxBudget: 2200,
    yourBid: 2050,
    bidDate: 'May 7, 2025',
    expectedDelivery: 'May 12, 2025',
    distance: '586 miles',
    description: 'Urgent medical supplies requiring temperature-controlled transport',
    updatedDate: 'May 8, 2025'
  },
  {
    id: 'BID-34567',
    title: 'Office Furniture Delivery',
    fromLocation: 'Chicago, IL',
    toLocation: 'Indianapolis, IN',
    status: 'Pending',
    maxBudget: 1800,
    yourBid: 1650,
    bidDate: 'May 9, 2025',
    expectedDelivery: 'May 14, 2025',
    distance: '184 miles',
    description: 'Office furniture delivery including desks, chairs, and filing cabinets',
    updatedDate: 'May 9, 2025'
  },
  {
    id: 'BID-45678',
    title: 'Automotive Parts Shipment',
    fromLocation: 'Detroit, MI',
    toLocation: 'Cleveland, OH',
    status: 'Completed',
    maxBudget: 1500,
    yourBid: 1400,
    bidDate: 'Apr 28, 2025',
    expectedDelivery: 'May 5, 2025',
    completionDate: 'May 4, 2025',
    distance: '169 miles',
    description: 'Shipment of car parts to manufacturing facility',
    updatedDate: 'May 4, 2025'
  },
  {
    id: 'BID-56789',
    title: 'Restaurant Equipment Transport',
    fromLocation: 'Austin, TX',
    toLocation: 'Houston, TX',
    status: 'Delivered',
    maxBudget: 2000,
    yourBid: 1850,
    bidDate: 'Apr 25, 2025',
    expectedDelivery: 'May 2, 2025',
    completionDate: 'May 1, 2025',
    distance: '162 miles',
    description: 'Commercial kitchen equipment for new restaurant opening',
    updatedDate: 'May 1, 2025'
  },
  {
    id: 'BID-67890',
    title: 'Construction Materials Delivery',
    fromLocation: 'Portland, OR',
    toLocation: 'Spokane, WA',
    status: 'Rejected',
    maxBudget: 2800,
    yourBid: 2600,
    bidDate: 'May 3, 2025',
    expectedDelivery: 'May 10, 2025',
    distance: '352 miles',
    description: 'Building materials for construction site',
    updatedDate: 'May 4, 2025'
  },
  {
    id: 'BID-78901',
    title: 'Art Gallery Exhibition Transport',
    fromLocation: 'New York, NY',
    toLocation: 'Boston, MA',
    status: 'Cancelled',
    maxBudget: 3200,
    yourBid: 2900,
    bidDate: 'Apr 30, 2025',
    expectedDelivery: 'May 7, 2025',
    distance: '215 miles',
    description: 'Fine art pieces requiring special handling and climate control',
    updatedDate: 'May 2, 2025'
  },
  {
    id: 'BID-89012',
    title: 'Refrigerated Food Transport',
    fromLocation: 'Miami, FL',
    toLocation: 'Orlando, FL',
    status: 'In Progress',
    maxBudget: 1900,
    yourBid: 1750,
    bidDate: 'May 6, 2025',
    expectedDelivery: 'May 11, 2025',
    distance: '236 miles',
    description: 'Refrigerated transport of perishable food items',
    updatedDate: 'May 8, 2025'
  }
];