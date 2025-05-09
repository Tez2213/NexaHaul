'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// MetaMask detection and connection
const detectEthereum = () => {
  if (typeof window !== 'undefined') {
    return window.ethereum;
  }
  return null;
};

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // MetaMask connection states
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState(null);
  
  // Form fields for personal info
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    profileImage: null,
    
    // Company info
    companyName: '',
    companyRegistrationNo: '',
    companyAddress: '',
    taxId: '',
    website: '',
    yearsInBusiness: '',
    employeeCount: '',
    companyLogo: null,
    
    // Identity verification
    idType: 'passport',
    idNumber: '',
    idExpiryDate: '',
    idFrontImage: null,
    idBackImage: null,
    
    // Transportation details
    vehicleTypes: [],
    serviceAreas: [],
    specializations: [],
    insuranceProvider: '',
    insurancePolicy: '',
    insuranceExpiryDate: ''
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
    
    // Check if MetaMask is installed
    checkMetaMaskConnection();
    
    setIsLoading(false);
  }, [router]);

  // Function to fetch profile data from API
  const fetchProfileData = async (userId) => {
    try {
      // In a real application, this would be a fetch call to your API
      // For now, we'll mock the data
      
      // Mock profile data
      const mockProfileData = {
        fullName: 'John Contractor',
        email: 'john@nexahaul-contractor.com',
        phone: '(555) 123-4567',
        address: '123 Logistics Ave',
        city: 'Truckville',
        state: 'CA',
        zipCode: '90210',
        country: 'United States',
        
        companyName: 'Express Logistics Ltd.',
        companyRegistrationNo: 'EL12345678',
        companyAddress: '789 Freightliner Rd, Suite 101, Truckville, CA 90210',
        taxId: '98-7654321',
        website: 'www.expresslogistics.com',
        yearsInBusiness: '7',
        employeeCount: '25',
        
        idType: 'driver_license',
        idNumber: 'DL12345678',
        idExpiryDate: '2028-06-15',
        
        vehicleTypes: ['Box Truck', 'Semi-Trailer', 'Flatbed'],
        serviceAreas: ['West Coast', 'Southwest', 'Mountain West'],
        specializations: ['Temperature-Controlled', 'Hazardous Materials', 'High-Value Cargo'],
        insuranceProvider: 'Trucking Insurance Co.',
        insurancePolicy: 'TIC-987654321',
        insuranceExpiryDate: '2025-12-31'
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

  // Function to check MetaMask connection
  const checkMetaMaskConnection = async () => {
    const ethereum = detectEthereum();
    
    if (ethereum) {
      try {
        // Get chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        
        // Check if already connected
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
        
        // Set up event listeners
        ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            setWalletAddress('');
          }
        });
        
        ethereum.on('chainChanged', (chainId) => {
          setChainId(chainId);
        });
        
      } catch (error) {
        console.error('Error checking MetaMask connection', error);
      }
    }
  };

  // Function to connect to MetaMask
  const connectMetaMask = async () => {
    const ethereum = detectEthereum();
    
    if (!ethereum) {
      setErrorMessage('MetaMask is not installed. Please install MetaMask to connect your wallet.');
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setSuccessMessage('Wallet connected successfully!');
      
      // Save wallet address to user profile
      updateProfileField('walletAddress', accounts[0]);
      
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
      setErrorMessage('Failed to connect to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
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

  // Helper function to format wallet address
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
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
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg mb-6 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mr-4 text-blue-700 font-bold text-xl">
              {formData.fullName ? formData.fullName.charAt(0) : user?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formData.fullName || user?.name || 'Contractor Profile'}</h1>
              <p className="opacity-80">{formData.email || user?.email || 'contractor@nexahaul.com'}</p>
              
              {/* Verification Badge */}
              <div className="mt-2 flex items-center">
                <span className={`inline-block h-3 w-3 rounded-full ${formData.idNumber ? 'bg-green-400' : 'bg-yellow-400'} mr-2`}></span>
                <span className="text-sm font-medium">
                  {formData.idNumber ? 'Verified Contractor' : 'Verification Pending'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end">
            <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${walletAddress ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {walletAddress ? 'Wallet Connected' : 'Wallet Not Connected'}
            </div>
            
            {/* MetaMask Wallet Connection */}
            <div className="mt-2">
              {walletAddress ? (
                <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                    alt="MetaMask" 
                    className="w-5 h-5 mr-2"
                  />
                  <span className="font-mono text-sm">{formatWalletAddress(walletAddress)}</span>
                </div>
              ) : (
                <button
                  onClick={connectMetaMask}
                  disabled={isConnecting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center text-sm"
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                        alt="MetaMask" 
                        className="w-5 h-5 mr-2"
                      />
                      Connect Wallet
                    </>
                  )}
                </button>
              )}
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
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'company' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('company')}
            >
              Company Details
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'verification' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('verification')}
            >
              Identity Verification
            </button>
            <button 
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'transport' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('transport')}
            >
              Transportation Details
            </button>
          </nav>
        </div>
        
        {/* Form content based on active tab */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'personal' && 'Personal Information'}
              {activeTab === 'company' && 'Company Details'}
              {activeTab === 'verification' && 'Identity Verification'}
              {activeTab === 'transport' && 'Transportation Details'}
            </h2>
            
            <div>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="State/Province"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="ZIP/Postal Code"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Country"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mr-4 flex items-center justify-center overflow-hidden">
                      {formData.profileImage ? (
                        <img 
                          src={formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-4xl">{formData.fullName ? formData.fullName.charAt(0) : 'C'}</span>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div>
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                          <span>Upload Photo</span>
                          <input 
                            type="file"
                            name="profileImage"
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <input
                      type="text"
                      name="companyRegistrationNo"
                      value={formData.companyRegistrationNo}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Company registration number"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                  <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 h-24"
                    placeholder="Enter your company's full address"
                    required
                  ></textarea>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / VAT Number</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Tax ID or VAT number"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                    <input
                      type="number"
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Number of years"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                    <input
                      type="number"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Employee count"
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
            
            {/* Identity Verification Tab */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
                  <p className="font-medium">Why We Need This Information</p>
                  <p className="text-sm mt-1">Identity verification helps ensure the security and trust of all users on our platform. This information is kept confidential and is only used for verification purposes.</p>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      required
                    >
                      <option value="passport">Passport</option>
                      <option value="driver_license">Driver's License</option>
                      <option value="national_id">National ID</option>
                      <option value="residence_permit">Residence Permit</option>
                    </select>
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Enter your ID number"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      name="idExpiryDate"
                      value={formData.idExpiryDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Front Image</label>
                    <div className="border border-gray-300 rounded-md p-4">
                      {formData.idFrontImage ? (
                        <div className="relative">
                          <img 
                            src={formData.idFrontImage instanceof File ? URL.createObjectURL(formData.idFrontImage) : formData.idFrontImage} 
                            alt="ID Front" 
                            className="w-full h-40 object-contain mb-2"
                          />
                          <p className="text-xs text-gray-500">Uploaded document (front)</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 bg-gray-50">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <p className="text-sm text-gray-500 mt-2">No front image uploaded</p>
                        </div>
                      )}
                      
                      {isEditing && (
                        <div className="mt-4">
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md block text-center">
                            <span>Upload Front Image</span>
                            <input 
                              type="file"
                              name="idFrontImage"
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
                  
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Back Image</label>
                    <div className="border border-gray-300 rounded-md p-4">
                      {formData.idBackImage ? (
                        <div className="relative">
                          <img 
                            src={formData.idBackImage instanceof File ? URL.createObjectURL(formData.idBackImage) : formData.idBackImage} 
                            alt="ID Back" 
                            className="w-full h-40 object-contain mb-2"
                          />
                          <p className="text-xs text-gray-500">Uploaded document (back)</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 bg-gray-50">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <p className="text-sm text-gray-500 mt-2">No back image uploaded</p>
                        </div>
                      )}
                      
                      {isEditing && (
                        <div className="mt-4">
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md block text-center">
                            <span>Upload Back Image</span>
                            <input 
                              type="file"
                              name="idBackImage"
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
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-700">
                  <p>Verification Status: <span className="font-medium">{formData.idNumber && formData.idFrontImage ? 'Submitted - Under Review' : 'Not Submitted'}</span></p>
                  <p className="mt-1">Please allow 1-2 business days for verification to be processed once all documents are submitted.</p>
                </div>
              </div>
            )}
            
            {/* Transportation Details Tab */}
            {activeTab === 'transport' && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Vehicle Types</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {['Box Truck', 'Semi-Trailer', 'Flatbed', 'Refrigerated', 'Tanker', 'Auto Carrier', 'Dump Truck', 'Container'].map((vehicle) => (
                      <div key={vehicle} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`vehicle-${vehicle}`}
                          checked={formData.vehicleTypes?.includes(vehicle) || false}
                          onChange={() => handleMultiSelect('vehicleTypes', vehicle)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`vehicle-${vehicle}`} className="ml-2 block text-sm text-gray-700">{vehicle}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Service Areas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {['West Coast', 'East Coast', 'Midwest', 'Southwest', 'Southeast', 'Northwest', 'Northeast', 'Mountain West', 'National', 'International'].map((area) => (
                      <div key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`area-${area}`}
                          checked={formData.serviceAreas?.includes(area) || false}
                          onChange={() => handleMultiSelect('serviceAreas', area)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`area-${area}`} className="ml-2 block text-sm text-gray-700">{area}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Specializations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['Temperature-Controlled', 'Hazardous Materials', 'Oversize Loads', 'High-Value Cargo', 'Livestock', 'Automotive', 'Construction Equipment', 'Industrial Machinery', 'Food Grade', 'Fragile Items'].map((specialization) => (
                      <div key={specialization} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`spec-${specialization}`}
                          checked={formData.specializations?.includes(specialization) || false}
                          onChange={() => handleMultiSelect('specializations', specialization)}
                          disabled={!isEditing}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`spec-${specialization}`} className="ml-2 block text-sm text-gray-700">{specialization}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Insurance Information</h3>
                  
                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                      <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="Insurance company name"
                      />
                    </div>
                    
                    <div className="w-full md:w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                      <input
                        type="text"
                        name="insurancePolicy"
                        value={formData.insurancePolicy}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="Policy number"
                      />
                    </div>
                    
                    <div className="w-full md:w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="date"
                        name="insuranceExpiryDate"
                        value={formData.insuranceExpiryDate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <Link href="/contractor" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Dashboard
        </Link>
        
        <div>
          {walletAddress ? (
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 hover:bg-green-100"
              disabled
            >
              <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Wallet Connected
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-yellow-300 shadow-sm text-sm font-medium rounded-md text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
              onClick={connectMetaMask}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="MetaMask" 
                className="w-4 h-4 mr-2"
              />
              Connect MetaMask
            </button>
          )}
        </div>
      </div>
    </div>
  );
}