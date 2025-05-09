'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ShipperProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form fields for shipper profile
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    phone: '',
    
    // Company info
    companyName: '',
    companyLogo: null,
    officeLocation: '',
    yearsInBusiness: '',
    businessRegistrationNumber: '',
    taxId: '',
    
    // Shipping preferences
    primaryCargoTypes: [],
    averageMonthlyShipments: '',
    preferredContractorTypes: [],
    operatingRegions: [],
    insuranceRequirements: '',
    licensingRequirements: '',
    
    // Account stats (read-only)
    totalJobsPosted: 0,
    totalCompletedJobs: 0,
    activeJobs: 0,
    subscriptionPlan: 'Free',
    planExpiryDate: ''
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('nexahaul_user');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Fetch additional profile data from API
        fetchProfileData(parsedUser.id);
      } catch (error) {
        console.error('Error parsing user data', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    
    setIsLoading(false);
  }, [router]);

  // Function to fetch profile data from API
  const fetchProfileData = async (userId) => {
    try {
      // In a real application, this would be a fetch call to your API
      // For now, we'll mock the data
      
      // Mock profile data
      const mockProfileData = {
        fullName: 'Sarah Johnson',
        email: 'sarah@globalimports.com',
        phone: '(555) 987-6543',
        
        companyName: 'Global Imports Inc.',
        officeLocation: '456 Commerce Blvd, Suite 200, Seattle, WA 98101',
        yearsInBusiness: '12',
        businessRegistrationNumber: 'GI-12345678',
        taxId: '87-6543210',
        
        primaryCargoTypes: ['Electronics', 'Furniture', 'Apparel'],
        averageMonthlyShipments: '75-100',
        preferredContractorTypes: ['FTL', 'LTL', 'Expedited'],
        operatingRegions: ['West Coast', 'Midwest', 'Northeast'],
        insuranceRequirements: 'Minimum $1M liability coverage required for all contractors.',
        licensingRequirements: 'Must have valid DOT number and MC authority.',
        
        totalJobsPosted: 342,
        totalCompletedJobs: 298,
        activeJobs: 8,
        subscriptionPlan: 'Premium',
        planExpiryDate: '2025-12-31'
      };
      
      setFormData({
        ...formData,
        ...mockProfileData
      });
      
    } catch (error) {
      console.error('Error fetching profile data', error);
      setErrorMessage('Failed to load profile data. Please try again later.');
    }
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Function to handle file uploads
  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      // For a real app, you would use FormData and upload to your server
      // For now, we'll just store the file object
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };
  
  // Function to handle multi-select changes (checkboxes)
  const handleMultiSelect = (category, value) => {
    const currentValues = formData[category] || [];
    
    if (currentValues.includes(value)) {
      // Remove value if already selected
      setFormData({
        ...formData,
        [category]: currentValues.filter(item => item !== value)
      });
    } else {
      // Add value if not selected
      setFormData({
        ...formData,
        [category]: [...currentValues, value]
      });
    }
  };
  
  // Function to update a single field in the profile
  const updateProfileField = async (field, value) => {
    // In a real app, this would be an API call
    console.log(`Updating field ${field} with value:`, value);
    
    // Mock API success
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500);
    });
  };
  
  // Function to save profile changes
  const saveProfileChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // In a real app, this would be a fetch call to your API
      // Mock API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
    } catch (error) {
      console.error('Error saving profile changes', error);
      setErrorMessage('Failed to save profile changes. Please try again.');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with profile summary */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white rounded-lg mb-6 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mr-4 text-indigo-700 font-bold text-xl">
              {formData.fullName ? formData.fullName.charAt(0) : user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formData.fullName || user?.name || 'Shipper Profile'}</h1>
              <p className="opacity-80">{formData.email || user?.email || 'shipper@nexahaul.com'}</p>
              
              {/* Company Name */}
              <div className="mt-1 text-indigo-100">
                {formData.companyName && (
                  <span className="text-sm font-medium">
                    {formData.companyName}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end">
            <div className="px-3 py-1 rounded-full text-sm font-medium mb-2 bg-indigo-100 text-indigo-800">
              {formData.subscriptionPlan} Plan
            </div>
            
            {/* Job Stats */}
            <div className="flex space-x-4 mt-2">
              <div className="text-center">
                <div className="text-xl font-bold">{formData.totalJobsPosted}</div>
                <div className="text-xs text-indigo-100">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formData.activeJobs}</div>
                <div className="text-xs text-indigo-100">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formData.totalCompletedJobs}</div>
                <div className="text-xs text-indigo-100">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow" role="alert">
          <div className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <div className="flex">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'company' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('company')}
            >
              Company Details
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'preferences' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('preferences')}
            >
              Shipping Preferences
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'subscription' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('subscription')}
            >
              Subscription
            </button>
          </nav>
        </div>
        
        {/* Form content based on active tab */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'personal' && 'Personal Information'}
              {activeTab === 'company' && 'Company Details'}
              {activeTab === 'preferences' && 'Shipping Preferences'}
              {activeTab === 'subscription' && 'Subscription Details'}
            </h2>
            
            <div>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Edit Information
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveProfileChanges}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <form onSubmit={saveProfileChanges}>
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={true} // Email usually cannot be changed
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Company Details Tab */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                    <input
                      type="number"
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Number of years"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
                  <textarea
                    name="officeLocation"
                    value={formData.officeLocation}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 h-24"
                    placeholder="Enter your office address"
                    required
                  ></textarea>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Registration Number</label>
                    <input
                      type="text"
                      name="businessRegistrationNumber"
                      value={formData.businessRegistrationNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter registration number"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                      placeholder="Enter tax ID"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                  <div className="flex items-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-md mr-4 flex items-center justify-center overflow-hidden">
                      {formData.companyLogo ? (
                        <img 
                          src={formData.companyLogo instanceof File ? URL.createObjectURL(formData.companyLogo) : formData.companyLogo} 
                          alt="Company Logo" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No logo uploaded</span>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div>
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                          <span>Upload Logo</span>
                          <input 
                            type="file"
                            name="companyLogo"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={!isEditing}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Shipping Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Primary Cargo Types</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {['Electronics', 'Furniture', 'Apparel', 'Food & Beverage', 'Automotive', 'Chemicals', 'Construction Materials', 'Medical Supplies', 'Machinery', 'Raw Materials'].map((cargo) => (
                      <div key={cargo} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`cargo-${cargo}`}
                          checked={formData.primaryCargoTypes?.includes(cargo) || false}
                          onChange={() => handleMultiSelect('primaryCargoTypes', cargo)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`cargo-${cargo}`} className="ml-2 block text-sm text-gray-700">{cargo}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Average Monthly Shipments</label>
                    <select
                      name="averageMonthlyShipments"
                      value={formData.averageMonthlyShipments}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                    >
                      <option value="">Select range</option>
                      <option value="1-10">0-10 shipments</option>
                      <option value="11-25">11-25 shipments</option>
                      <option value="26-50">26-50 shipments</option>
                      <option value="51-75">51-75 shipments</option>
                      <option value="75-100">75-100 shipments</option>
                      <option value="100+">100+ shipments</option>
                    </select>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Preferred Contractor Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {['FTL', 'LTL', 'Expedited', 'Refrigerated', 'Flatbed', 'Intermodal', 'Drayage', 'Specialized'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`contractor-${type}`}
                          checked={formData.preferredContractorTypes?.includes(type) || false}
                          onChange={() => handleMultiSelect('preferredContractorTypes', type)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`contractor-${type}`} className="ml-2 block text-sm text-gray-700">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Operating Regions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {['West Coast', 'East Coast', 'Midwest', 'South', 'Northeast', 'Southwest', 'Northwest', 'Southeast', 'Alaska/Hawaii', 'International'].map((region) => (
                      <div key={region} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`region-${region}`}
                          checked={formData.operatingRegions?.includes(region) || false}
                          onChange={() => handleMultiSelect('operatingRegions', region)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`region-${region}`} className="ml-2 block text-sm text-gray-700">{region}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Requirements for Contractors</label>
                  <textarea
                    name="insuranceRequirements"
                    value={formData.insuranceRequirements}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 h-24"
                    placeholder="Describe your insurance requirements for contractors"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Licensing Requirements for Contractors</label>
                  <textarea
                    name="licensingRequirements"
                    value={formData.licensingRequirements}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 h-24"
                    placeholder="Describe your licensing requirements for contractors"
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-indigo-800">{formData.subscriptionPlan} Plan</h3>
                      <p className="text-indigo-600 mt-1">
                        {formData.planExpiryDate ? (
                          <>Expires on: {new Date(formData.planExpiryDate).toLocaleDateString()}</>
                        ) : (
                          <>No expiration date</>
                        )}
                      </p>
                      
                      {/* Plan features would go here */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">
                            {formData.subscriptionPlan === 'Free' ? 'Up to 5 active jobs' : 'Unlimited active jobs'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">
                            {formData.subscriptionPlan === 'Free' ? 'Basic analytics' : 'Advanced analytics and reporting'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">
                            {formData.subscriptionPlan === 'Free' ? 'Email support' : 'Priority support'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <Link href="/shipper/plans" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
                        {formData.subscriptionPlan === 'Free' ? 'Upgrade Plan' : 'Manage Subscription'}
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Account Statistics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-3xl font-bold text-gray-800">{formData.totalJobsPosted}</div>
                      <div className="text-sm text-gray-500 mt-1">Total Jobs Posted</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-3xl font-bold text-green-600">{formData.totalCompletedJobs}</div>
                      <div className="text-sm text-gray-500 mt-1">Completed Jobs</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-3xl font-bold text-indigo-600">{formData.activeJobs}</div>
                      <div className="text-sm text-gray-500 mt-1">Active Jobs</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/shipper/history" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      View Complete Job History →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <Link href="/shipper" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
