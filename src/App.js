import React, { useState } from 'react';

const RegistrationForm = () => {
  const initialFormData = {
    firstName: '', lastName: '', username: '', email: '', password: '',
    phoneNumber: '', countryCode: '+1', country: '', city: '', panNumber: '', aadharNumber: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countries = ['United States', 'Canada', 'United Kingdom', 'India', 'Australia'];
  const cities = {
    'United States': ['New York', 'Los Angeles', 'Chicago'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham'],
    'India': ['Mumbai', 'Delhi', 'Bangalore'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane']
  };

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' }
  ];

  const handleChange = ({ target: { name, value } }) => {
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value, ...(name === 'country' && { city: '' }) }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, username, email, password, phoneNumber, country, city, panNumber, aadharNumber } = formData;

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!country) newErrors.country = 'Country is required';
    if (!city) newErrors.city = 'City is required';
    if (!panNumber.trim()) newErrors.panNumber = 'PAN number is required';
    if (!aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required';
    else if (!/^\d{12}$/.test(aadharNumber)) newErrors.aadharNumber = 'Aadhar must be 12 digits';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
    setShowPassword(false);
  };

  const renderInput = (label, name, type = 'text', placeholder = '', maxLength) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Your account has been created successfully.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
              <div><strong>Username:</strong> {formData.username}</div>
              <div><strong>Email:</strong> {formData.email}</div>
              <div><strong>Phone:</strong> {formData.countryCode} {formData.phoneNumber}</div>
              <div><strong>Location:</strong> {formData.city}, {formData.country}</div>
              <div><strong>PAN:</strong> {formData.panNumber}</div>
              <div><strong>Aadhar:</strong> {formData.aadharNumber}</div>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
          >
            Register Another Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="bg-blue-600 px-6 py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-blue-100">Please fill in all required fields</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('First Name', 'firstName', 'text', 'Enter first name')}
            {renderInput('Last Name', 'lastName', 'text', 'Enter last name')}
            {renderInput('Username', 'username', 'text', 'Choose username')}
            {renderInput('Email Address', 'email', 'email', 'Enter email address')}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password (min 6 characters)"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Dont show' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-3 py-2 border border-r-0 rounded-l-lg bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {countryCodes.map(cc => (
                    <option key={cc.code} value={cc.code}>
                      {cc.code} ({cc.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.country}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } ${!formData.country ? 'bg-gray-100' : ''}`}
              >
                <option value="">Select city</option>
                {formData.country && cities[formData.country]?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>
            {renderInput('PAN Number', 'panNumber', 'text', 'ABCDE1234F')}
            {renderInput('Aadhar Number', 'aadharNumber', 'text', '12 digit number', 12)}
          </div>
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
