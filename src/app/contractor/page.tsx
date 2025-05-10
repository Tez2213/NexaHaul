'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContractorDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">NexaHaul</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/contractor" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/contractor/findbids" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Find Bids
                </Link>
                <Link href="/contractor/registeredbids" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  My Bids
                </Link>
                <Link href="/contractor/history" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  History
                </Link>
                <Link href="/contractor/plans" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Plans
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <Link href="/contractor/profile" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <span className="font-medium">My Profile</span>
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button 
                type="button" 
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/contractor" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Dashboard
              </Link>
              <Link href="/contractor/findbids" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Find Bids
              </Link>
              <Link href="/contractor/registeredbids" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                My Bids
              </Link>
              <Link href="/contractor/history" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                History
              </Link>
              <Link href="/contractor/plans" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Plans
              </Link>
              <Link href="/contractor/profile" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                My Profile
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow px-5 py-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to NexaHaul</h2>
            <p className="text-gray-600">
              Find shipping opportunities, manage your bids, and grow your transportation business all in one place.
            </p>
            
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Available Bids
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          42
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="sr-only">Increased by</span>
                          12%
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link href="/contractor/findbids" className="font-medium text-blue-600 hover:text-blue-500">
                      View all bids
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Contracts
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          7
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link href="/contractor/registeredbids" className="font-medium text-blue-600 hover:text-blue-500">
                      Manage active bids
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Monthly Earnings
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          $8,540
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="sr-only">Increased by</span>
                          8.3%
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link href="/contractor/history" className="font-medium text-blue-600 hover:text-blue-500">
                      View financial history
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="px-4 sm:px-0 mb-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Industry News & Updates</h3>
            </div>
            <div className="px-5 py-5">
              <div className="space-y-6 divide-y divide-gray-200">
                <div className="pt-5 first:pt-0">
                  <p className="text-sm text-gray-500">May 10, 2025</p>
                  <h4 className="text-base font-medium text-gray-900 mt-1">New Fuel Efficiency Standards Affecting Transport Industry</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    EPA announces stricter fuel efficiency standards that will impact all commercial transportation vehicles starting next quarter. Contractors should prepare for potential compliance requirements.
                  </p>
                  <div className="mt-3">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Read more &rarr;</a>
                  </div>
                </div>

                <div className="pt-5">
                  <p className="text-sm text-gray-500">May 8, 2025</p>
                  <h4 className="text-base font-medium text-gray-900 mt-1">NexaHaul Platform Update: Enhanced Bid Matching</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    We've implemented a new AI-powered matching system that will help contractors find bids that better match their capabilities and preferred routes, increasing your chances of winning.
                  </p>
                  <div className="mt-3">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Read more &rarr;</a>
                  </div>
                </div>

                <div className="pt-5">
                  <p className="text-sm text-gray-500">May 5, 2025</p>
                  <h4 className="text-base font-medium text-gray-900 mt-1">Transport Volume Expected to Increase by 23% this Summer</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Industry analysts project a significant increase in shipping volume over the summer months, creating more opportunities for contractors across all regions.
                  </p>
                  <div className="mt-3">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Read more &rarr;</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="px-4 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Quick Access</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <Link href="/contractor/findbids">
                  <div className="group hover:bg-blue-50 rounded-lg p-4 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-900">Find Bids</span>
                    </div>
                  </div>
                </Link>
                
                <Link href="/contractor/registeredbids">
                  <div className="group hover:bg-blue-50 rounded-lg p-4 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-900">My Bids</span>
                    </div>
                  </div>
                </Link>

                <Link href="/contractor/profile">
                  <div className="group hover:bg-blue-50 rounded-lg p-4 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-900">Profile</span>
                    </div>
                  </div>
                </Link>

                <Link href="/contractor/history">
                  <div className="group hover:bg-blue-50 rounded-lg p-4 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-900">History</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              &copy; 2025 NexaHaul. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/contractor/t&c" className="text-sm text-gray-500 hover:text-gray-900">
                Terms & Conditions
              </Link>
              <Link href="/contractor/contact" className="text-sm text-gray-500 hover:text-gray-900">
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
  );
}