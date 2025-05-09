'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatedBids() {
  const [activeTab, setActiveTab] = useState('active');
  const [bids, setBids] = useState({
    active: [],
    draft: [],
    completed: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Mock data for bids
  useEffect(() => {
    // In a real app, fetch this from your API
    setTimeout(() => {
      setBids({
        active: [
          {
            id: 'bid-123',
            title: 'Transport Electronics to Seattle',
            description: 'Need to transport 20 pallets of electronics safely to Seattle warehouse',
            fromLocation: 'San Francisco, CA',
            toLocation: 'Seattle, WA',
            initialAmount: 1200,
            timeLimit: 3, // days
            createdAt: '2025-05-02T10:30:00Z',
            deadline: '2025-05-12T10:30:00Z',
            status: 'active',
            proposalCount: 6,
            distance: '807 mi'
          },
          {
            id: 'bid-124',
            title: 'Furniture Delivery to Portland',
            description: 'Office furniture delivery requiring careful handling',
            fromLocation: 'Los Angeles, CA',
            toLocation: 'Portland, OR',
            initialAmount: 950,
            timeLimit: 4,
            createdAt: '2025-05-03T14:15:00Z',
            deadline: '2025-05-13T14:15:00Z',
            status: 'active',
            proposalCount: 3,
            distance: '965 mi'
          },
          {
            id: 'bid-125',
            title: 'Medical Supplies Transport',
            description: 'Urgent medical supplies requiring temperature-controlled transport',
            fromLocation: 'Denver, CO',
            toLocation: 'Phoenix, AZ',
            initialAmount: 1500,
            timeLimit: 2,
            createdAt: '2025-05-05T09:20:00Z',
            deadline: '2025-05-09T09:20:00Z',
            status: 'active',
            proposalCount: 8,
            distance: '586 mi'
          }
        ],
        draft: [
          {
            id: 'bid-126',
            title: 'Heavy Machinery Transport',
            description: 'Draft for transporting construction equipment',
            fromLocation: 'Houston, TX',
            toLocation: 'Dallas, TX',
            initialAmount: 1800,
            timeLimit: 5,
            createdAt: '2025-05-01T16:45:00Z',
            status: 'draft',
            distance: '239 mi'
          },
          {
            id: 'bid-127',
            title: 'Food Products Delivery',
            description: 'Draft for refrigerated food transport',
            fromLocation: 'Chicago, IL',
            toLocation: 'Minneapolis, MN',
            initialAmount: 1100,
            timeLimit: 3,
            createdAt: '2025-05-04T11:30:00Z',
            status: 'draft',
            distance: '400 mi'
          }
        ],
        completed: [
          {
            id: 'bid-128',
            title: 'Auto Parts Shipment',
            description: 'Emergency delivery of automotive replacement parts',
            fromLocation: 'Detroit, MI',
            toLocation: 'Cleveland, OH',
            initialAmount: 800,
            finalAmount: 750,
            timeLimit: 2,
            createdAt: '2025-04-15T08:00:00Z',
            completedAt: '2025-04-17T10:45:00Z',
            status: 'completed',
            contractorName: 'FastHaul Logistics',
            rating: 4.8,
            distance: '169 mi'
          },
          {
            id: 'bid-129',
            title: 'Textile Materials Transport',
            description: 'Bulk fabric materials for manufacturing',
            fromLocation: 'New York, NY',
            toLocation: 'Boston, MA',
            initialAmount: 1050,
            finalAmount: 1000,
            timeLimit: 3,
            createdAt: '2025-04-10T14:20:00Z',
            completedAt: '2025-04-13T13:10:00Z',
            status: 'completed',
            contractorName: 'Northeast Carriers Inc.',
            rating: 4.5,
            distance: '215 mi'
          },
          {
            id: 'bid-130',
            title: 'Retail Store Inventory',
            description: 'Seasonal inventory shipment to retail locations',
            fromLocation: 'Atlanta, GA',
            toLocation: 'Miami, FL',
            initialAmount: 1300,
            finalAmount: 1350,
            timeLimit: 4,
            createdAt: '2025-04-05T10:00:00Z',
            completedAt: '2025-04-08T15:30:00Z',
            status: 'completed',
            contractorName: 'Southern Express Freight',
            rating: 4.9,
            distance: '662 mi'
          }
        ]
      });
      setIsLoading(false);
    }, 1000); // Simulate API call with 1 second delay
  }, []);

  // Calculate time remaining for bidding
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;
    
    if (timeDiff <= 0) return 'Expired';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };
  
  // Format dates
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/shipper" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </Link>
      </div>
      
      {/* Header with create bid button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Created Bids</h1>
          <p className="text-gray-600">
            View and manage all your shipping bids in one place
          </p>
        </div>
        
        <Link href="/shipper/createdbids/form">
          <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create New Bid
          </button>
        </Link>
      </div>
      
      {/* Directory navigation breadcrumbs */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <Link href="/shipper" className="hover:text-green-600">Dashboard</Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span className="font-medium text-gray-800">Created Bids</span>
      </div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'active' 
              ? 'border-green-500 text-green-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Bids
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {bids.active.length}
            </span>
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'draft' 
              ? 'border-yellow-500 text-yellow-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('draft')}
          >
            Draft Bids
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {bids.draft.length}
            </span>
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'completed' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Bids
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {bids.completed.length}
            </span>
          </button>
        </nav>
      </div>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        // Bid cards based on active tab
        <div className="space-y-6">
          {/* No bids message */}
          {activeTab === 'active' && bids.active.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No active bids</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new bid for your shipment.</p>
              <div className="mt-6">
                <Link href="/shipper/createdbids/form">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create New Bid
                  </button>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 'draft' && bids.draft.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No draft bids</h3>
              <p className="mt-1 text-sm text-gray-500">Create a bid and save it as draft to continue later.</p>
              <div className="mt-6">
                <Link href="/shipper/createdbids/form">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create New Bid
                  </button>
                </Link>
              </div>
            </div>
          )}
          {activeTab === 'completed' && bids.completed.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No completed bids</h3>
              <p className="mt-1 text-sm text-gray-500">Your completed bids will appear here.</p>
              <div className="mt-6">
                <Link href="/shipper/createdbids/form">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create New Bid
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Active bids */}
          {activeTab === 'active' && bids.active.map((bid) => (
            <div key={bid.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="border-l-4 border-green-500">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{bid.title}</h2>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <span className="ml-2 text-sm text-gray-500">Created {formatDate(bid.createdAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{bid.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="font-medium text-gray-800">{bid.fromLocation}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">To</span>
                      <span className="font-medium text-gray-800">{bid.toLocation}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Distance</span>
                      <span className="font-medium text-gray-800">{bid.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center mb-2 md:mb-0">
                      <svg className="w-5 h-5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700 font-medium">{getTimeRemaining(bid.deadline)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700 font-medium">{bid.proposalCount} Proposals</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700 font-medium">${bid.initialAmount}</span>
                      </div>
                      
                      <button 
                        onClick={() => router.push(`/shipper/createdbids/${bid.id}`)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Draft bids */}
          {activeTab === 'draft' && bids.draft.map((bid) => (
            <div key={bid.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="border-l-4 border-yellow-500">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{bid.title}</h2>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Draft
                      </span>
                      <span className="ml-2 text-sm text-gray-500">Last edited {formatDate(bid.createdAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{bid.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="font-medium text-gray-800">{bid.fromLocation}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">To</span>
                      <span className="font-medium text-gray-800">{bid.toLocation}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Distance</span>
                      <span className="font-medium text-gray-800">{bid.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center mb-2 md:mb-0">
                      <svg className="w-5 h-5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">Incomplete Draft</span>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700 font-medium">${bid.initialAmount}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => router.push(`/shipper/createdbids/form?id=${bid.id}`)}
                          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm font-medium"
                        >
                          Continue Editing
                        </button>
                        <button 
                          onClick={() => {
                            // In a real app, send API request to publish
                            alert('Draft published successfully!');
                          }}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Completed bids */}
          {activeTab === 'completed' && bids.completed.map((bid) => (
            <div key={bid.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="border-l-4 border-blue-500">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{bid.title}</h2>
                    
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Completed
                      </span>
                      <span className="ml-2 text-sm text-gray-500">Completed {formatDate(bid.completedAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{bid.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="font-medium text-gray-800">{bid.fromLocation}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">To</span>
                      <span className="font-medium text-gray-800">{bid.toLocation}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Distance</span>
                      <span className="font-medium text-gray-800">{bid.distance}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{bid.contractorName}</p>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(bid.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{bid.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center mb-2 md:mb-0">
                      <svg className="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-700">Completed on {formatDate(bid.completedAt)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700 font-medium">${bid.finalAmount}</span>
                      </div>
                      
                      <button 
                        onClick={() => router.push(`/shipper/createdbids/${bid.id}`)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create new bid floating button (mobile) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Link href="/shipper/createdbids/form">
          <button className="w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </Link>
      </div>

      {/* Back to top button */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          Back to Top
        </button>
      </div>
    </div>
  );
}