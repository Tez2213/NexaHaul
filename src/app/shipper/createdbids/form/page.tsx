'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bidId = searchParams.get('id'); // For editing existing drafts
  
  const [isLoading, setIsLoading] = useState(bidId ? true : false);
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isPaying, setIsPaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Shipment Details
    title: '',
    description: '',
    itemType: '',
    weight: '',
    weightUnit: 'kg',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    dimensionUnit: 'cm',
    quantity: '1',
    requiresRefrigeration: false,
    isFragile: false,
    isHazardous: false,
    specialInstructions: '',
    
    // Step 2: Pickup Details
    pickupLocation: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    pickupContactName: '',
    pickupContactPhone: '',
    pickupContactEmail: '',
    pickupDate: '',
    pickupTimeWindow: 'anytime',
    pickupNotes: '',
    
    // Step 3: Delivery Details
    deliveryLocation: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    deliveryContactName: '',
    deliveryContactPhone: '',
    deliveryContactEmail: '',
    estimatedDeliveryDate: '',
    deliveryTimeWindow: 'anytime',
    deliveryNotes: '',
    
    // Step 4: Bid Settings
    initialAmount: '',
    timeLimit: '3', // days
    bidExpiryDate: '',
    maxBudget: '',
    insuranceRequired: true,
    paymentMethod: 'credit_card'
  });
  
  // If editing existing draft, load the data
  useEffect(() => {
    if (bidId) {
      // In a real app, fetch bid data from API
      // For now, we'll use mock data
      setTimeout(() => {
        // Mock data for a draft bid
        setFormData({
          // Step 1: Shipment Details
          title: 'Heavy Machinery Transport',
          description: 'Draft for transporting construction equipment',
          itemType: 'Heavy Equipment',
          weight: '1200',
          weightUnit: 'kg',
          dimensions: {
            length: '300',
            width: '150',
            height: '180'
          },
          dimensionUnit: 'cm',
          quantity: '3',
          requiresRefrigeration: false,
          isFragile: false,
          isHazardous: true,
          specialInstructions: 'Requires a crane for loading and unloading',
          
          // Step 2: Pickup Details
          pickupLocation: {
            address: '123 Industrial Park',
            city: 'Houston',
            state: 'TX',
            zipCode: '77002',
            country: 'United States'
          },
          pickupContactName: 'John Supervisor',
          pickupContactPhone: '(555) 123-4567',
          pickupContactEmail: 'john@construction.com',
          pickupDate: '2025-05-20',
          pickupTimeWindow: 'morning',
          pickupNotes: 'Access from rear gate only. Security clearance needed.',
          
          // Step 3: Delivery Details
          deliveryLocation: {
            address: '456 Construction Site',
            city: 'Dallas',
            state: 'TX',
            zipCode: '75201',
            country: 'United States'
          },
          deliveryContactName: 'Mark Manager',
          deliveryContactPhone: '(555) 987-6543',
          deliveryContactEmail: 'mark@construction.com',
          estimatedDeliveryDate: '2025-05-22',
          deliveryTimeWindow: 'afternoon',
          deliveryNotes: 'Call 2 hours before arrival for site preparation',
          
          // Step 4: Bid Settings
          initialAmount: '1800',
          timeLimit: '5',
          bidExpiryDate: '2025-05-15',
          maxBudget: '2500',
          insuranceRequired: true,
          paymentMethod: 'credit_card'
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [bidId]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (like pickupLocation.address)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    window.scrollTo(0, 0);
    setActiveStep(activeStep + 1);
  };
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    window.scrollTo(0, 0);
    setActiveStep(activeStep - 1);
  };
  
  // Calculate estimated distance and time
  const calculateDistance = () => {
    const { pickupLocation, deliveryLocation } = formData;
    
    // In a real app, you would use a mapping API
    // For now, we'll return mock data
    if (pickupLocation.city && deliveryLocation.city) {
      return {
        distance: '239 miles',
        duration: '3 hours 45 minutes'
      };
    }
    
    return {
      distance: '-- miles',
      duration: '-- hours'
    };
  };
  
  // Calculate bid expiry date based on days from now
  useEffect(() => {
    if (!formData.bidExpiryDate && formData.timeLimit) {
      const today = new Date();
      const expiryDate = new Date(today.setDate(today.getDate() + parseInt(formData.timeLimit)));
      const formattedDate = expiryDate.toISOString().split('T')[0];
      
      setFormData({
        ...formData,
        bidExpiryDate: formattedDate
      });
    }
  }, [formData.timeLimit]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (saveAsDraft) {
      // Save as draft
      setIsSubmitting(true);
      
      // In a real app, send API request to save draft
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessModal(true);
      }, 1500);
    } else {
      // Proceed to payment
      setIsPaying(true);
      
      // In a real app, process payment then submit
      setTimeout(() => {
        setIsPaying(false);
        setIsSubmitting(true);
        
        // Submit form
        setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccessModal(true);
        }, 1500);
      }, 2000);
    }
  };
  
  // Estimate calculation
  const estimatedPrice = formData.initialAmount ? parseFloat(formData.initialAmount) : 0;
  const platformFee = estimatedPrice * 0.05; // 5% platform fee
  const totalCost = estimatedPrice + platformFee;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back navigation */}
      <div className="mb-6">
        <Link href="/shipper/createdbids" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to My Bids
        </Link>
      </div>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {bidId ? 'Edit Bid' : 'Create New Bid'}
        </h1>
        <p className="text-gray-600">
          Complete the form below to create a shipping bid for contractors
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="text-sm font-medium">1</span>
            </div>
            <span className="text-xs mt-1">Shipment</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="text-sm font-medium">2</span>
            </div>
            <span className="text-xs mt-1">Pickup</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="text-sm font-medium">3</span>
            </div>
            <span className="text-xs mt-1">Delivery</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${activeStep >= 4 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 4 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="text-sm font-medium">4</span>
            </div>
            <span className="text-xs mt-1">Bid</span>
          </div>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Shipment Details */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipment Details</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Bid Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="E.g., Furniture Transport to Portland"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Provide details about your shipment..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
                  <select
                    id="itemType"
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Item Type</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Construction Materials">Construction Materials</option>
                    <option value="Heavy Equipment">Heavy Equipment</option>
                    <option value="Retail Goods">Retail Goods</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <div className="flex">
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Enter weight"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <select
                        name="weightUnit"
                        value={formData.weightUnit}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-r-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                        <option value="tons">tons</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                    <input
                      type="number"
                      id="length"
                      name="dimensions.length"
                      value={formData.dimensions.length}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="Length"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                    <input
                      type="number"
                      id="width"
                      name="dimensions.width"
                      value={formData.dimensions.width}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="Width"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <input
                      type="number"
                      id="height"
                      name="dimensions.height"
                      value={formData.dimensions.height}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="Height"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dimensionUnit" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      id="dimensionUnit"
                      name="dimensionUnit"
                      value={formData.dimensionUnit}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                      <option value="feet">feet</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFragile"
                      name="isFragile"
                      checked={formData.isFragile}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFragile" className="ml-2 block text-sm text-gray-700">
                      Fragile Items
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requiresRefrigeration"
                      name="requiresRefrigeration"
                      checked={formData.requiresRefrigeration}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requiresRefrigeration" className="ml-2 block text-sm text-gray-700">
                      Requires Refrigeration
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isHazardous"
                      name="isHazardous"
                      checked={formData.isHazardous}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isHazardous" className="ml-2 block text-sm text-gray-700">
                      Hazardous Materials
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Any special handling instructions or requirements..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Pickup Details */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pickup Details</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupLocation.address"
                    value={formData.pickupLocation.address}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupCity" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="pickupCity"
                      name="pickupLocation.city"
                      value={formData.pickupLocation.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pickupState" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      id="pickupState"
                      name="pickupLocation.state"
                      value={formData.pickupLocation.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickupZipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="pickupZipCode"
                      name="pickupLocation.zipCode"
                      value={formData.pickupLocation.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pickupCountry" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      id="pickupCountry"
                      name="pickupLocation.country"
                      value={formData.pickupLocation.country}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="pickupContactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                      <input
                        type="text"
                        id="pickupContactName"
                        name="pickupContactName"
                        value={formData.pickupContactName}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pickupContactPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="pickupContactPhone"
                        name="pickupContactPhone"
                        value={formData.pickupContactPhone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pickupContactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="pickupContactEmail"
                        name="pickupContactEmail"
                        value={formData.pickupContactEmail}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Pickup Schedule</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                      <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pickupTimeWindow" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Window</label>
                      <select
                        id="pickupTimeWindow"
                        name="pickupTimeWindow"
                        value={formData.pickupTimeWindow}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="anytime">Anytime</option>
                        <option value="morning">Morning (8am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pickupNotes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    id="pickupNotes"
                    name="pickupNotes"
                    value={formData.pickupNotes}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Parking instructions, gate codes, or other relevant information..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Delivery Details */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Details</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryLocation.address"
                    value={formData.deliveryLocation.address}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="deliveryCity"
                      name="deliveryLocation.city"
                      value={formData.deliveryLocation.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryState" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                      type="text"
                      id="deliveryState"
                      name="deliveryLocation.state"
                      value={formData.deliveryLocation.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="deliveryZipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="deliveryZipCode"
                      name="deliveryLocation.zipCode"
                      value={formData.deliveryLocation.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryCountry" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      id="deliveryCountry"
                      name="deliveryLocation.country"
                      value={formData.deliveryLocation.country}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>

                {/* Route Estimation */}
                {formData.pickupLocation.city && formData.deliveryLocation.city && (
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Estimated Route</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{formData.pickupLocation.city}, {formData.pickupLocation.state}</span>
                      </div>
                      <div className="text-gray-500 text-sm">≈ {calculateDistance().distance}</div>
                      <div className="flex items-center">
                        <span>{formData.deliveryLocation.city}, {formData.deliveryLocation.state}</span>
                        <svg className="w-5 h-5 text-red-600 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Estimated travel time: {calculateDistance().duration}
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="deliveryContactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                      <input
                        type="text"
                        id="deliveryContactName"
                        name="deliveryContactName"
                        value={formData.deliveryContactName}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="deliveryContactPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="deliveryContactPhone"
                        name="deliveryContactPhone"
                        value={formData.deliveryContactPhone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="deliveryContactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="deliveryContactEmail"
                        name="deliveryContactEmail"
                        value={formData.deliveryContactEmail}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Delivery Schedule</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="estimatedDeliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Date</label>
                      <input
                        type="date"
                        id="estimatedDeliveryDate"
                        name="estimatedDeliveryDate"
                        value={formData.estimatedDeliveryDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="deliveryTimeWindow" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Window</label>
                      <select
                        id="deliveryTimeWindow"
                        name="deliveryTimeWindow"
                        value={formData.deliveryTimeWindow}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="anytime">Anytime</option>
                        <option value="morning">Morning (8am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Delivery instructions, access codes, or other relevant information..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Bid Settings */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Bid Settings</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="initialAmount" className="block text-sm font-medium text-gray-700 mb-1">Starting Bid Amount ($)</label>
                    <input
                      type="number"
                      id="initialAmount"
                      name="initialAmount"
                      value={formData.initialAmount}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="Enter starting amount"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is the starting amount that contractors will bid on
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700 mb-1">Maximum Budget ($)</label>
                    <input
                      type="number"
                      id="maxBudget"
                      name="maxBudget"
                      value={formData.maxBudget}
                      onChange={handleInputChange}
                      min={formData.initialAmount || 0}
                      step="0.01"
                      placeholder="Enter maximum budget (optional)"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Your absolute maximum budget for this shipment
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">Bidding Time Limit (Days)</label>
                    <select
                      id="timeLimit"
                      name="timeLimit"
                      value={formData.timeLimit}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="1">1 day</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="14">14 days</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      How long contractors have to submit their bids
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="bidExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">Bid Expiry Date</label>
                    <input
                      type="date"
                      id="bidExpiryDate"
                      name="bidExpiryDate"
                      value={formData.bidExpiryDate}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Automatically calculated based on the bidding time limit
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="insuranceRequired"
                    name="insuranceRequired"
                    checked={formData.insuranceRequired}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="insuranceRequired" className="ml-2 block text-sm text-gray-700">
                    Require contractors to have insurance coverage
                  </label>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label htmlFor="creditCard" className="ml-3 block text-sm text-gray-700">
                        Credit Card
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bankTransfer"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === 'bank_transfer'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label htmlFor="bankTransfer" className="ml-3 block text-sm text-gray-700">
                        Bank Transfer
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="crypto"
                        name="paymentMethod"
                        value="crypto"
                        checked={formData.paymentMethod === 'crypto'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label htmlFor="crypto" className="ml-3 block text-sm text-gray-700">
                        Cryptocurrency (ETH)
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Cost Summary */}
                <div className="bg-gray-50 p-5 rounded-md border border-gray-200 mt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Cost Summary</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Initial Bid Amount</span>
                      <span className="font-medium">${formData.initialAmount || '0.00'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee (5%)</span>
                      <span className="font-medium">${platformFee.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                      <span className="font-medium text-gray-800">Total</span>
                      <span className="font-bold">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    A small 5% platform fee is charged to create your bid. This fee helps cover payment processing, security, and operational costs.
                  </p>
                </div>
                
                {/* Save as Draft Option */}
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="saveAsDraft"
                    checked={saveAsDraft}
                    onChange={(e) => setSaveAsDraft(e.target.checked)}
                    className="h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveAsDraft" className="ml-2 block text-sm text-gray-700">
                    Save as Draft (You can publish later)
                  </label>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  <p>By submitting this bid, you agree to NexaHaul's <a href="#" className="text-green-600 hover:text-green-800">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-800">Privacy Policy</a>.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Form Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}
            
            {activeStep < 4 ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className={`px-8 py-3 ${
                  saveAsDraft
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white rounded-md transition-colors flex items-center`}
                disabled={isPaying || isSubmitting}
              >
                {isPaying && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                
                {isSubmitting && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                
                {!isPaying && !isSubmitting && (
                  <>
                    {saveAsDraft ? 'Save Draft' : 'Submit & Pay'}
                    {!saveAsDraft && <span className="ml-1">(${totalCost.toFixed(2)})</span>}
                  </>
                )}
                
                {isPaying && 'Processing Payment...'}
                {isSubmitting && 'Submitting Bid...'}
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {saveAsDraft ? 'Draft Saved Successfully' : 'Bid Created Successfully'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {saveAsDraft 
                  ? 'Your bid has been saved as a draft. You can edit and publish it later.'
                  : 'Your bid has been created and is now active. Contractors can now submit proposals.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => router.push('/shipper/createdbids')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  View My Bids
                </button>
                
                {saveAsDraft && (
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      router.push('/shipper/createdbids/form');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Create Another Bid
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}