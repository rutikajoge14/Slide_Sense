import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplets, Wind, Thermometer, Activity, Radio, MapPin, Phone, BookOpen, Bell, LogOut, Menu, X } from 'lucide-react';

const SlideSense = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [riskLevel, setRiskLevel] = useState('low');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user && currentPage === 'dashboard') {
      const interval = setInterval(() => {
        const newData = {
          timestamp: new Date().toLocaleTimeString(),
          soilMoisture: Math.random() * 100,
          temperature: 20 + Math.random() * 15,
          humidity: 40 + Math.random() * 40,
          acceleration: Math.random() * 10,
          gasLevel: Math.random() * 500,
          distance: 50 + Math.random() * 150,
          vibration: Math.random() * 100,
          rainfall: Math.random() * 50
        };
        
        setSensorData(prev => [...prev.slice(-19), newData]);
        
        if (newData.soilMoisture > 80 || newData.acceleration > 7 || newData.rainfall > 35) {
          setRiskLevel('high');
          if (Math.random() > 0.7) {
            addAlert('HIGH RISK: Potential landslide detected!', 'high');
          }
        } else if (newData.soilMoisture > 60 || newData.acceleration > 5 || newData.rainfall > 20) {
          setRiskLevel('medium');
        } else {
          setRiskLevel('low');
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [user, currentPage]);

  const addAlert = (message, severity) => {
    const newAlert = {
      id: Date.now(),
      message,
      severity,
      timestamp: new Date().toLocaleString()
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSensorData([]);
    setAlerts([]);
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Slide Sense</h1>
          <p className="text-gray-600 mt-2">Landslide Detection & Alert System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-2xl font-bold">Slide Sense</span>
          </div>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className={`${menuOpen ? 'block' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 bg-blue-900 md:bg-transparent md:space-x-6 p-4 md:p-0`}>
            <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} className="block w-full md:w-auto text-left py-2 hover:text-blue-300">Home</button>
            <button onClick={() => { setCurrentPage('dashboard'); setMenuOpen(false); }} className="block w-full md:w-auto text-left py-2 hover:text-blue-300">Dashboard</button>
            <button onClick={() => { setCurrentPage('emergency'); setMenuOpen(false); }} className="block w-full md:w-auto text-left py-2 hover:text-blue-300">Emergency</button>
            <button onClick={() => { setCurrentPage('preparedness'); setMenuOpen(false); }} className="block w-full md:w-auto text-left py-2 hover:text-blue-300">Preparedness</button>
            <button onClick={() => { setCurrentPage('location'); setMenuOpen(false); }} className="block w-full md:w-auto text-left py-2 hover:text-blue-300">Location</button>
            <button onClick={handleLogout} className="flex items-center space-x-2 w-full md:w-auto py-2 hover:text-red-300">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Slide Sense</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered landslide detection system that monitors environmental conditions 24/7 
            to keep communities safe from natural disasters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <Activity className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Real-Time Monitoring</h3>
            <p className="text-gray-600">Continuous monitoring of soil moisture, vibrations, and environmental factors.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <Bell className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Instant Alerts</h3>
            <p className="text-gray-600">Immediate notifications via email and SMS when risk levels increase.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <MapPin className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Location Tracking</h3>
            <p className="text-gray-600">GPS-based monitoring of high-risk zones and evacuation routes.</p>
          </div>
        </div>

        <div className={`p-6 rounded-xl mb-8 ${
          riskLevel === 'high' ? 'bg-red-100 border-2 border-red-500' :
          riskLevel === 'medium' ? 'bg-yellow-100 border-2 border-yellow-500' :
          'bg-green-100 border-2 border-green-500'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AlertTriangle className={`w-8 h-8 ${
                riskLevel === 'high' ? 'text-red-600' :
                riskLevel === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`} />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Current Risk Level</h3>
                <p className="text-gray-600">Based on real-time sensor data</p>
              </div>
            </div>
            <div className={`px-6 py-3 rounded-lg font-bold text-xl ${
              riskLevel === 'high' ? 'bg-red-600 text-white' :
              riskLevel === 'medium' ? 'bg-yellow-600 text-white' :
              'bg-green-600 text-white'
            }`}>
              {riskLevel.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Sensor Dashboard</h1>
      
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <Droplets className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Soil Moisture</p>
          <p className="text-3xl font-bold">{sensorData[sensorData.length - 1]?.soilMoisture.toFixed(1) || '0'}%</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <Thermometer className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Temperature</p>
          <p className="text-3xl font-bold">{sensorData[sensorData.length - 1]?.temperature.toFixed(1) || '0'}°C</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <Activity className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Acceleration</p>
          <p className="text-3xl font-bold">{sensorData[sensorData.length - 1]?.acceleration.toFixed(2) || '0'} m/s²</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <Wind className="w-8 h-8 mb-2" />
          <p className="text-sm opacity-90">Gas Level</p>
          <p className="text-3xl font-bold">{sensorData[sensorData.length - 1]?.gasLevel.toFixed(0) || '0'} ppm</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Soil Moisture & Rainfall</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="soilMoisture" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Soil Moisture %" />
              <Area type="monotone" dataKey="rainfall" stackId="2" stroke="#10b981" fill="#10b981" name="Rainfall (mm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Temperature & Humidity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature °C" />
              <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Vibration & Acceleration</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="vibration" stroke="#8b5cf6" strokeWidth={2} name="Vibration" />
              <Line type="monotone" dataKey="acceleration" stroke="#f59e0b" strokeWidth={2} name="Acceleration m/s²" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Alerts</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No alerts yet</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <p className="font-semibold text-gray-800">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.timestamp}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const EmergencyPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Emergency Contacts</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'National Disaster Response Force', number: '1078', type: 'NDRF' },
          { name: 'Emergency Services', number: '112', type: 'General' },
          { name: 'Fire Department', number: '101', type: 'Fire' },
          { name: 'Police Emergency', number: '100', type: 'Police' },
          { name: 'Ambulance Service', number: '102', type: 'Medical' },
          { name: 'Disaster Management', number: '1070', type: 'DM Office' },
          { name: 'Local District Collector', number: '+91-XXXXXXXXXX', type: 'Government' },
          { name: 'State Emergency Operations', number: '+91-XXXXXXXXXX', type: 'State' },
          { name: 'Geological Survey Office', number: '+91-XXXXXXXXXX', type: 'Geological' }
        ].map((contact, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {contact.type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{contact.name}</h3>
            <a href={`tel:${contact.number}`} className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              {contact.number}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-red-100 border-2 border-red-500 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ Emergency Action Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Stay calm and alert others immediately</li>
          <li>Move to higher ground away from the slide path</li>
          <li>Call emergency services (112 or 1078)</li>
          <li>Do not return to the area until authorities declare it safe</li>
          <li>Listen to local news and emergency broadcasts</li>
        </ol>
      </div>
    </div>
  );

  const PreparednessPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Disaster Preparedness</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Before a Landslide</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Learn about landslide warning signs in your area</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Prepare an emergency kit with essentials (water, food, first aid, flashlight)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Create a family evacuation plan with meeting points</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Install flexible pipe fittings to avoid gas and water leaks</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Plant ground cover on slopes and build retaining walls</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">During a Landslide</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">•</span>
              <span>Move away from the path of the landslide immediately</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">•</span>
              <span>If escape is not possible, curl into a tight ball and protect your head</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">•</span>
              <span>Alert others who may be in the path of the landslide</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">•</span>
              <span>Listen for unusual sounds that might indicate moving debris</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-3">•</span>
              <span>Stay alert while driving - watch for collapsed pavement and debris</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <Activity className="w-12 h-12 text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">After a Landslide</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span>Stay away from the slide area - additional slides may occur</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span>Check for injured and trapped persons near the slide</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span>Watch for flooding, which may occur after a landslide</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span>Report broken utility lines to authorities</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span>Replant damaged ground as soon as possible</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <Radio className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Warning Signs</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Changes in landscape patterns (tilting trees, cracks in ground)</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Sudden increase or decrease in water levels in streams</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Doors or windows sticking for the first time</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>New cracks in plaster, tile, brick, or foundations</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Broken water lines or underground utilities</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-blue-100 border-2 border-blue-500 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📦 Emergency Kit Checklist</h2>
        <div className="grid md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <h3 className="font-bold mb-2">Basic Supplies</h3>
            <ul className="space-y-1 text-sm">
              <li>• Water (1 gallon per person per day)</li>
              <li>• Non-perishable food (3-day supply)</li>
              <li>• Battery-powered radio</li>
              <li>• Flashlight & extra batteries</li>
              <li>• First aid kit</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Documents & Money</h3>
            <ul className="space-y-1 text-sm">
              <li>• Important documents (copies)</li>
              <li>• Cash & credit cards</li>
              <li>• Insurance policies</li>
              <li>• Medical records</li>
              <li>• Emergency contacts list</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Personal Items</h3>
            <ul className="space-y-1 text-sm">
              <li>• Prescription medications</li>
              <li>• Clothing & sturdy shoes</li>
              <li>• Blankets or sleeping bags</li>
              <li>• Personal hygiene items</li>
              <li>• Phone chargers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationPage = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Real-Time Location Monitoring</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <MapPin className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Current Location</h3>
          <p className="text-gray-600">Lat: 21.1458° N</p>
          <p className="text-gray-600">Long: 79.0882° E</p>
          <p className="text-sm text-gray-500 mt-2">Nagpur, Maharashtra</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Activity className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Sensors Status</h3>
          <p className="text-gray-600">Active: 7/7</p>
          <p className="text-gray-600">Last Update: {new Date().toLocaleTimeString()}</p>
          <p className="text-sm text-green-600 mt-2">All systems operational</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Bell className="w-8 h-8 text-red-600 mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Alert Zone</h3>
          <p className="text-gray-600">Risk Level: {riskLevel.toUpperCase()}</p>
          <p className="text-gray-600">Monitored Area: 5 km radius</p>
          <p className={`text-sm mt-2 ${riskLevel === 'high' ? 'text-red-600' : 'text-green-600'}`}>
            {riskLevel === 'high' ? 'Evacuation may be required' : 'No action needed'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Location Map</h3>
        <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">Interactive Map View</p>
            <p className="text-sm text-gray-500 mt-2">Integrate with Google Maps or Leaflet</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Evacuation Routes</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800">Primary Route</h4>
            <p className="text-gray-600 text-sm mt-1">Head north towards NH44 - Safe zone: 8 km</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-gray-800">Alternative Route 1</h4>
            <p className="text-gray-600 text-sm mt-1">Move east via local roads - Safe zone: 6 km</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-bold text-gray-800">Alternative Route 2</h4>
            <p className="text-gray-600 text-sm mt-1">West towards relief camp - Safe zone: 7 km</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'emergency' && <EmergencyPage />}
      {currentPage === 'preparedness' && <PreparednessPage />}
      {currentPage === 'location' && <LocationPage />}
    </div>
  );
};

export default SlideSense;