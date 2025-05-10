'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch shipment history
  useEffect(() => {
    // Simulating API call with timeout
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from an API
        setTimeout(() => {
          setShipments(mockShipments);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching shipment history:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter shipments based on status and search query
  const filteredShipments = shipments.filter(shipment => {
    const matchesFilter = activeFilter === 'all' || shipment.status.toLowerCase() === activeFilter;
    const matchesSearch = 
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.contractor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Function to open modal with shipment details
  const openShipmentDetails = (shipment) => {
    setSelectedShipment(shipment);
    setShowModal(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedShipment(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  // Get status color and icon based on shipment status
  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return {
          color: 'blue',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3zm11 5.5V7.9l1.1 1.1H14z" />
            </svg>
          )
        };
      case 'delivered':
        return {
          color: 'green',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'pickup scheduled':
        return {
          color: 'yellow',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'delayed':
        return {
          color: 'red',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'completed':
        return {
          color: 'green',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'cancelled':
        return {
          color: 'gray',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )
        };
      default:
        return {
          color: 'gray',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back navigation */}
      <div className="mb-6">
        <Link href="/contractor" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </Link>
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Shipment History</h1>
          <p className="text-gray-600">View and track all your past and current shipments</p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by ID, title, location, or contractor..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto space-x-2 pb-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-green-100 text-green-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Shipments
          </button>
          <button
            onClick={() => setActiveFilter('in transit')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeFilter === 'in transit'
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Transit
          </button>
          <button
            onClick={() => setActiveFilter('delivered')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeFilter === 'delivered'
                ? 'bg-green-100 text-green-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setActiveFilter('pickup scheduled')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeFilter === 'pickup scheduled'
                ? 'bg-yellow-100 text-yellow-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setActiveFilter('delayed')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeFilter === 'delayed'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Delayed
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeFilter === 'completed'
                ? 'bg-green-100 text-green-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredShipments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No shipments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery 
              ? "No shipments match your search criteria. Try adjusting your filters."
              : "You haven't created any shipments yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShipments.map((shipment) => {
            const { color, icon } = getStatusInfo(shipment.status);
            return (
              <div 
                key={shipment.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openShipmentDetails(shipment)}
              >
                <div className={`border-l-4 border-${color}-500 h-full flex flex-col`}>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{shipment.title}</h3>
                        <p className="text-sm text-gray-500">ID: {shipment.id}</p>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
                        <span className="mr-1">{icon}</span>
                        {shipment.status}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">From</p>
                        <p className="text-sm font-medium text-gray-800">{shipment.from}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">To</p>
                        <p className="text-sm font-medium text-gray-800">{shipment.to}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date Created</p>
                        <p className="text-sm font-medium text-gray-800">{shipment.dateCreated}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Expected Delivery</p>
                        <p className="text-sm font-medium text-gray-800">{shipment.expectedDelivery}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center border-t border-gray-100 pt-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-2 overflow-hidden">
                        {shipment.contractor.avatar ? (
                          <Image 
                            src={shipment.contractor.avatar}
                            width={32}
                            height={32}
                            alt={shipment.contractor.name}
                          />
                        ) : (
                          shipment.contractor.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{shipment.contractor.name}</p>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(shipment.contractor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">{shipment.contractor.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">${shipment.cost}</p>
                        <p className="text-xs text-gray-500">{shipment.distance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Detailed Shipment Modal */}
      {showModal && selectedShipment && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Shipment Details
                </h3>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={closeModal}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="px-4 sm:px-6 py-4 overflow-y-auto max-h-[80vh]">
                {/* Shipment Header */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedShipment.title}</h2>
                      <p className="text-sm text-gray-500">Shipment ID: {selectedShipment.id}</p>
                    </div>
                    
                    <div className="mt-2 sm:mt-0">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${getStatusInfo(selectedShipment.status).color}-100 text-${getStatusInfo(selectedShipment.status).color}-800`}>
                        <span className="mr-1.5">{getStatusInfo(selectedShipment.status).icon}</span>
                        {selectedShipment.status}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Shipment Tracking */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Tracking Information</h3>
                  <div className="relative">
                    {/* Tracking Timeline */}
                    <div className="absolute left-5 top-0 ml-px border-l-2 border-gray-200 h-full"></div>
                    
                    <div className="space-y-6 relative">
                      {selectedShipment.trackingHistory.map((event, index) => (
                        <div key={index} className="flex items-start">
                          <div className={`relative flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ${
                            index === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                          } z-10`}>
                            {event.icon}
                          </div>
                          <div className="ml-4">
                            <h4 className="text-base font-medium text-gray-900">{event.status}</h4>
                            <div className="mt-1">
                              <p className="text-sm text-gray-600">{event.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{event.location} • {event.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipment Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Shipment Details</h3>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Item Type</p>
                          <p className="font-medium">{selectedShipment.itemDetails.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Weight</p>
                          <p className="font-medium">{selectedShipment.itemDetails.weight}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Dimensions</p>
                          <p className="font-medium">{selectedShipment.itemDetails.dimensions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="font-medium">{selectedShipment.itemDetails.quantity}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Special Requirements</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedShipment.itemDetails.specialRequirements.map((req, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {selectedShipment.itemDetails.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">Notes</p>
                          <p className="text-sm mt-1">{selectedShipment.itemDetails.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Bid & Contractor Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Contractor & Bid Details</h3>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {selectedShipment.contractor.avatar ? (
                            <Image 
                              src={selectedShipment.contractor.avatar}
                              width={48}
                              height={48}
                              alt={selectedShipment.contractor.name}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              {selectedShipment.contractor.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-800">{selectedShipment.contractor.name}</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`w-3 h-3 ${i < Math.floor(selectedShipment.contractor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 ml-1">{selectedShipment.contractor.rating}</span>
                            <span className="text-xs text-gray-400 ml-1">({selectedShipment.contractor.reviews} reviews)</span>
                          </div>
                          <p className="text-xs text-gray-500">{selectedShipment.contractor.contactInfo}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-500">Winning Bid</p>
                          <p className="font-medium text-green-700">${selectedShipment.cost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Your Budget</p>
                          <p className="font-medium">${selectedShipment.bidDetails.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Bid Date</p>
                          <p className="font-medium">{selectedShipment.bidDetails.bidDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Bids</p>
                          <p className="font-medium">{selectedShipment.bidDetails.totalBids}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                        <button className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 transition-colors rounded-md text-sm">
                          Contact Contractor
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Route & Locations */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Route Information</h3>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex flex-col md:flex-row mb-4 gap-4">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium mb-2">Pickup Location</h4>
                          <div className="bg-gray-50 rounded-md p-3">
                            <p className="font-medium text-gray-800 text-sm">{selectedShipment.locationDetails.pickup.address}</p>
                            <p className="text-xs text-gray-500 mt-1">{selectedShipment.locationDetails.pickup.contact}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center py-2 px-4">
                          <div className="text-gray-400 text-xs text-center mb-1">{selectedShipment.distance}</div>
                          <div className="w-20 h-[2px] bg-gray-300 relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1">
                              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-sm font-medium mb-2">Delivery Location</h4>
                          <div className="bg-gray-50 rounded-md p-3">
                            <p className="font-medium text-gray-800 text-sm">{selectedShipment.locationDetails.delivery.address}</p>
                            <p className="text-xs text-gray-500 mt-1">{selectedShipment.locationDetails.delivery.contact}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="text-sm font-medium mb-2">Route Map</h4>
                        <div className="aspect-[16/9] relative bg-gray-200 rounded-md">
                          {/* In a real app, embed a map here */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Map view would be displayed here</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Details */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Information</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Payment Method</p>
                        <p className="font-medium">{selectedShipment.payment.method}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment Status</p>
                        <p className={`font-medium ${
                          selectedShipment.payment.status === 'Paid' 
                            ? 'text-green-600' 
                            : selectedShipment.payment.status === 'Pending' 
                              ? 'text-yellow-600' 
                              : 'text-red-600'
                        }`}>
                          {selectedShipment.payment.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transaction ID</p>
                        <p className="font-medium">{selectedShipment.payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment Date</p>
                        <p className="font-medium">{selectedShipment.payment.date}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Base Rate</span>
                        <span className="text-sm">${selectedShipment.payment.breakdown.baseRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">Service Fee</span>
                        <span className="text-sm">${selectedShipment.payment.breakdown.serviceFee.toFixed(2)}</span>
                      </div>
                      {selectedShipment.payment.breakdown.insurance > 0 && (
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm">Insurance</span>
                          <span className="text-sm">${selectedShipment.payment.breakdown.insurance.toFixed(2)}</span>
                        </div>
                      )}
                      {selectedShipment.payment.breakdown.tax > 0 && (
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm">Tax</span>
                          <span className="text-sm">${selectedShipment.payment.breakdown.tax.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${selectedShipment.payment.breakdown.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  
                  <div>
                    <button className="px-4 py-2 bg-white border border-green-500 text-green-600 rounded-md hover:bg-green-50 mr-2">
                      Download Invoice
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock shipment data
const mockShipments = [
  {
    id: 'SHIP-1234567',
    title: 'Electronics Shipment to New York',
    description: 'Shipment of 5 pallets of electronics products',
    from: 'Los Angeles, CA',
    to: 'New York, NY',
    status: 'In Transit',
    dateCreated: 'May 5, 2025',
    expectedDelivery: 'May 12, 2025',
    distance: '2,789 miles',
    cost: 3450.00,
    contractor: {
      name: 'Elite Transport Co.',
      rating: 4.8,
      reviews: 156,
      avatar: null, // In a real app, you would have an image URL
      contactInfo: 'support@elitetransport.com • (555) 123-4567'
    },
    itemDetails: {
      type: 'Electronics',
      weight: '1,200 kg',
      dimensions: '240 x 120 x 90 cm',
      quantity: '5 pallets',
      specialRequirements: ['Fragile', 'Keep Dry', 'No Stacking'],
      notes: 'Contains sensitive electronic equipment that requires careful handling'
    },
    bidDetails: {
      budget: 3800.00,
      bidDate: 'May 1, 2025',
      totalBids: 8
    },
    locationDetails: {
      pickup: {
        address: '1234 Industrial Blvd, Los Angeles, CA 90023',
        contact: 'John Smith • (555) 111-2222'
      },
      delivery: {
        address: '567 Warehouse Ave, Brooklyn, NY 11201',
        contact: 'Sarah Johnson • (555) 333-4444'
      }
    },
    trackingHistory: [
      {
        status: 'In Transit',
        description: 'Shipment is in transit to the destination',
        location: 'Chicago, IL',
        timestamp: 'May 8, 2025, 14:33',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3z" />
          </svg>
        )
      },
      {
        status: 'Departed Hub',
        description: 'Shipment has left the sorting facility',
        location: 'St. Louis, MO',
        timestamp: 'May 7, 2025, 09:15',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        status: 'Arrived at Hub',
        description: 'Shipment arrived at sorting facility',
        location: 'St. Louis, MO',
        timestamp: 'May 7, 2025, 03:22',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        status: 'Picked Up',
        description: 'Shipment has been picked up by carrier',
        location: 'Los Angeles, CA',
        timestamp: 'May 5, 2025, 14:45',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3z" />
          </svg>
        )
      }
    ],
    payment: {
      method: 'Credit Card',
      status: 'Paid',
      transactionId: 'TXN-9876543',
      date: 'May 1, 2025',
      breakdown: {
        baseRate: 3200.00,
        serviceFee: 160.00,
        insurance: 50.00,
        tax: 40.00,
        total: 3450.00
      }
    }
  },
  {
    id: 'SHIP-7654321',
    title: 'Furniture Delivery to Miami',
    description: 'Office furniture relocation',
    from: 'Atlanta, GA',
    to: 'Miami, FL',
    status: 'Delivered',
    dateCreated: 'Apr 20, 2025',
    expectedDelivery: 'Apr 25, 2025',
    distance: '662 miles',
    cost: 1850.00,
    contractor: {
      name: 'Southern Express Freight',
      rating: 4.9,
      reviews: 89,
      avatar: null,
      contactInfo: 'dispatch@southernexpress.com • (555) 987-6543'
    },
    itemDetails: {
      type: 'Furniture',
      weight: '850 kg',
      dimensions: 'Various',
      quantity: '12 pieces',
      specialRequirements: ['Fragile', 'Covered Transport'],
      notes: 'Office furniture including desks, chairs, and cabinets'
    },
    bidDetails: {
      budget: 2000.00,
      bidDate: 'Apr 15, 2025',
      totalBids: 5
    },
    locationDetails: {
      pickup: {
        address: '789 Business Park, Atlanta, GA 30339',
        contact: 'Michael Chen • (555) 222-3333'
      },
      delivery: {
        address: '456 Office Tower, 8th Floor, Miami, FL 33131',
        contact: 'Lisa Rodriguez • (555) 444-5555'
      }
    },
    trackingHistory: [
      {
        status: 'Delivered',
        description: 'Shipment has been delivered',
        location: 'Miami, FL',
        timestamp: 'Apr 24, 2025, 15:12',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        status: 'Out for Delivery',
        description: 'Shipment is out for delivery',
        location: 'Miami, FL',
        timestamp: 'Apr 24, 2025, 08:30',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        status: 'In Transit',
        description: 'Shipment is in transit to the destination',
        location: 'Jacksonville, FL',
        timestamp: 'Apr 22, 2025, 17:45',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3z" />
          </svg>
        )
      },
      {
        status: 'Picked Up',
        description: 'Shipment has been picked up by carrier',
        location: 'Atlanta, GA',
        timestamp: 'Apr 21, 2025, 10:20',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3z" />
          </svg>
        )
      }
    ],
    payment: {
      method: 'Bank Transfer',
      status: 'Paid',
      transactionId: 'TXN-8765432',
      date: 'Apr 15, 2025',
      breakdown: {
        baseRate: 1700.00,
        serviceFee: 85.00,
        insurance: 35.00,
        tax: 30.00,
        total: 1850.00
      }
    }
  },
  {
    id: 'SHIP-2345678',
    title: 'Medical Supplies to Boston',
    description: 'Temperature-controlled shipment of medical supplies',
    from: 'Chicago, IL',
    to: 'Boston, MA',
    status: 'Pickup Scheduled',
    dateCreated: 'May 8, 2025',
    expectedDelivery: 'May 11, 2025',
    distance: '982 miles',
    cost: 2300.00,
    contractor: {
      name: 'MediExpress Logistics',
      rating: 4.7,
      reviews: 72,
      avatar: null,
      contactInfo: 'care@mediexpress.com • (555) 789-0123'
    },
    itemDetails: {
      type: 'Medical Supplies',
      weight: '350 kg',
      dimensions: '120 x 80 x 100 cm',
      quantity: '3 containers',
      specialRequirements: ['Temperature Controlled', 'Priority Shipping', 'Medical Grade'],
      notes: 'Contains critical medical supplies that must remain between 2-8°C'
    },
    bidDetails: {
      budget: 2500.00,
      bidDate: 'May 7, 2025',
      totalBids: 4
    },
    locationDetails: {
      pickup: {
        address: '567 Medical Plaza, Chicago, IL 60610',
        contact: 'Dr. Robert Williams • (555) 666-7777'
      },
      delivery: {
        address: 'Boston General Hospital, 123 Healthcare Dr, Boston, MA 02114',
        contact: 'Dr. Emily Thompson • (555) 888-9999'
      }
    },
    trackingHistory: [
      {
        status: 'Pickup Scheduled',
        description: 'Pickup has been scheduled',
        location: 'Chicago, IL',
        timestamp: 'May 9, 2025, 08:00',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        )
      }
    ],
    payment: {
      method: 'Credit Card',
      status: 'Pending',
      transactionId: 'TXN-6543210',
      date: 'May 7, 2025',
      breakdown: {
        baseRate: 2100.00,
        serviceFee: 105.00,
        insurance: 65.00,
        tax: 30.00,
        total: 2300.00
      }
    }
  },
  {
    id: 'SHIP-3456789',
    title: 'Automotive Parts to Detroit',
    description: 'Urgent delivery of replacement parts',
    from: 'Cleveland, OH',
    to: 'Detroit, MI',
    status: 'Delayed',
    dateCreated: 'May 3, 2025',
    expectedDelivery: 'May 6, 2025',
    distance: '169 miles',
    cost: 750.00,
    contractor: {
      name: 'FastHaul Logistics',
      rating: 4.5,
      reviews: 128,
      avatar: null,
      contactInfo: 'dispatch@fasthaul.com • (555) 234-5678'
    },
    itemDetails: {
      type: 'Automotive Parts',
      weight: '450 kg',
      dimensions: '180 x 90 x 75 cm',
      quantity: '2 crates',
      specialRequirements: ['Urgent', 'Insured'],
      notes: 'Critical replacement parts for automotive assembly line'
    },
    bidDetails: {
      budget: 800.00,
      bidDate: 'May 2, 2025',
      totalBids: 7
    },
    locationDetails: {
      pickup: {
        address: '123 Parts Blvd, Cleveland, OH 44114',
        contact: 'Tom Richards • (555) 111-3333'
      },
      delivery: {
        address: 'Motor City Assembly, 456 Factory Rd, Detroit, MI 48227',
        contact: 'James Cooper • (555) 444-6666'
      }
    },
    trackingHistory: [
      {
        status: 'Delayed',
        description: 'Shipment delayed due to road closure',
        location: 'Toledo, OH',
        timestamp: 'May 5, 2025, 16:45',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        status: 'In Transit',
        description: 'Shipment is in transit to the destination',
        location: 'Toledo, OH',
        timestamp: 'May 5, 2025, 13:20',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3z" />
          </svg>
        )
      },
    {
      status: 'Picked Up',
      description: 'Shipment has been picked up by carrier',
      location: 'Cleveland, OH',
      timestamp: 'May 4, 2025, 09:30',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.5V13a1 1 0 001-1V8.35a1 1 0 00-.293-.707l-2-2A1 1 0 0013 5h-1a1 1 0 00-1-1H3z" />
        </svg>
      )
    }
    ]
  }
];