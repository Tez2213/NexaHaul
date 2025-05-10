'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ShipperDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="flex items-center justify-center h-16 px-6 bg-blue-600">
          <h1 className="text-xl font-bold text-white">NexaHaul</h1>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Shipper Account</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>

          <div className="space-y-1">
            <Link href="/shipper" className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Dashboard
            </Link>
            
            <Link href="/shipper/createdbids/form" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create New Bid
            </Link>
            
            <Link href="/shipper/createdbids" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              My Active Bids
            </Link>
            
            <Link href="/shipper/history" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              Shipment History
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account
            </div>
            <div className="mt-3 space-y-1">
              <Link href="/shipper/profile" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              
              <Link href="/shipper/billing" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                Billing & Payments
              </Link>
              
              <Link href="/shipper/help" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex justify-between h-16 px-4">
            <div className="flex items-center md:hidden">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-800 md:hidden">NexaHaul</h1>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                
                <Link href="/shipper/profile" className="ml-3 relative">
                  <div>
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">
          {/* Welcome Banner */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-blue-500 to-blue-600 md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white md:text-2xl">Welcome to your Shipper Dashboard</h2>
                <p className="mt-1 text-blue-100 max-w-2xl">
                  Create shipping bids, track your deliveries, and manage your logistics all in one place.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/shipper/createbid">
                  <button className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                    Create New Bid
                    <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            <div className="px-6 py-5 sm:p-6 bg-white border-b border-gray-200">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="flex flex-col justify-between bg-blue-50 p-5 rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Bids</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-1">5</p>
                  </div>
                  <Link href="/shipper/createdbids" className="text-sm text-blue-600 hover:text-blue-800 mt-4 inline-flex items-center">
                    View all bids
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                
                <div className="flex flex-col justify-between bg-blue-50 p-5 rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Transit</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-1">3</p>
                  </div>
                  <Link href="/shipper/tracking" className="text-sm text-blue-600 hover:text-blue-800 mt-4 inline-flex items-center">
                    Track shipments
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                
                <div className="flex flex-col justify-between bg-blue-50 p-5 rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Spend</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-1">$12,450</p>
                  </div>
                  <Link href="/shipper/analytics" className="text-sm text-blue-600 hover:text-blue-800 mt-4 inline-flex items-center">
                    View analytics
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Industry News & Updates</h3>
            </div>
            <div className="px-6 divide-y divide-gray-200">
              <div className="py-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-blue-600">New Shipping Regulations</p>
                  <span className="text-xs text-gray-500">May 10, 2025</span>
                </div>
                <h4 className="text-base font-medium text-gray-900">DOT Announces Updated Safety Requirements for Interstate Shipping</h4>
                <p className="mt-2 text-sm text-gray-600">
                  The Department of Transportation has announced new safety requirements for all interstate shipping that will go into effect starting July 1. These changes will impact documentation requirements and inspection protocols.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Read more &rarr;
                  </a>
                </div>
              </div>
              
              <div className="py-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-blue-600">NexaHaul Platform</p>
                  <span className="text-xs text-gray-500">May 8, 2025</span>
                </div>
                <h4 className="text-base font-medium text-gray-900">Introducing New Bid Analytics Dashboard</h4>
                <p className="mt-2 text-sm text-gray-600">
                  We've launched an enhanced analytics dashboard that gives you deeper insights into your shipping costs, contractor performance, and market trends to help you make more informed decisions.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Explore new features &rarr;
                  </a>
                </div>
              </div>
              
              <div className="py-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-blue-600">Market Trends</p>
                  <span className="text-xs text-gray-500">May 5, 2025</span>
                </div>
                <h4 className="text-base font-medium text-gray-900">Fuel Prices Expected to Drop in Q3, Potentially Lowering Shipping Costs</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Industry analysts predict a 10-15% drop in fuel prices during the third quarter, which could result in more competitive bids from contractors and lower overall shipping costs for businesses.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Read market analysis &rarr;
                  </a>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all articles and updates &rarr;
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">
                      You created a new bid <a href="#" className="font-medium text-blue-600">Electronics Transport to Seattle</a>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">FastHaul Logistics</span> accepted your bid for <a href="#" className="font-medium text-blue-600">Office Furniture Delivery</a>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Medical Supplies Transport</span> has been delivered successfully
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">
                      Bid for <a href="#" className="font-medium text-blue-600">Retail Goods to Chicago</a> is expiring soon
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all activity &rarr;
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500">
                &copy; 2025 NexaHaul. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link href="/shipper/t&c" className="text-sm text-gray-500 hover:text-gray-900">
                  Terms & Conditions
                </Link>
                <Link href="/shipper/contact" className="text-sm text-gray-500 hover:text-gray-900">
                  Contact Us
                </Link>
                <Link href="/help" className="text-sm text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}