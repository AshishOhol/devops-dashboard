/*
 * Main Dashboard Component - App.js
 * 
 * This is the core component of the DevOps Dashboard application.
 * It provides real-time monitoring of system metrics, alerts, and service status.
 * 
 * Features:
 * - Real-time data fetching every 5 seconds
 * - Interactive line charts for CPU, Memory, and Disk usage
 * - Live connection status indicator with pulse animation
 * - Alert management system with severity levels
 * - Service health monitoring
 * - Responsive grid layout
 * - Error handling for backend connectivity
 * 
 * Data Flow:
 * 1. Component mounts and starts fetching data from backend API
 * 2. Data is updated every 5 seconds using setInterval
 * 3. Charts and UI elements re-render with new data
 * 4. Connection status is monitored and displayed
 */

// Import React and essential hooks
import React, { useState, useEffect } from 'react';
// useState: Manages component state (data, loading, connection status)
// useEffect: Handles side effects (API calls, intervals, cleanup)

// Import charting components from Recharts library for data visualization
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// LineChart: Main chart container
// Line: Individual data lines (CPU, Memory, Disk)
// XAxis/YAxis: Chart axes with labels
// ResponsiveContainer: Makes charts responsive to screen size

// Import axios for making HTTP requests to the backend API
import axios from 'axios';

// Main functional component using React hooks
const App = () => {
  // STATE MANAGEMENT - All component state variables using React hooks
  
  // Array to store system performance metrics (CPU, Memory, Disk usage over time)
  const [metrics, setMetrics] = useState([]);
  
  // Array to store active system alerts (high usage warnings, critical errors)
  const [alerts, setAlerts] = useState([]);
  
  // Array to store service health status (system processes, network, API status)
  const [services, setServices] = useState([]);
  
  // Object to store general system information (CPU type, memory, OS)
  const [systemInfo, setSystemInfo] = useState({});
  
  // Boolean to track if data is currently being loaded (shows loading spinner)
  const [loading, setLoading] = useState(true);
  
  // Timestamp of the last successful data update (for display purposes)
  const [lastUpdate, setLastUpdate] = useState(null);
  
  // Boolean to track if backend connection is active (affects UI colors and status)
  const [isLive, setIsLive] = useState(false);
  const [latestReport, setLatestReport] = useState(null);

  // Generate report function
  const generateReport = async () => {
    try {
      const reportRes = await axios.post('/api/reports/generate');
      setLatestReport(reportRes.data);
      alert('Report generated successfully!');
    } catch (error) {
      alert('Failed to generate report');
    }
  };

  // EFFECT HOOK - Handles data fetching and real-time updates
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    let systemInfoLastFetch = 0;
    
    // Async function to fetch all data from backend API endpoints
    const fetchData = async () => {
      if (!isMounted) return;
      
      try {
        const timeout = 8000; // Increased timeout
        
        // Fetch core data with individual error handling
        const promises = [
          axios.get('/api/metrics', { timeout }).catch(e => ({ data: [] })),
          axios.get('/api/alerts', { timeout }).catch(e => ({ data: [] })),
          axios.get('/api/services', { timeout }).catch(e => ({ data: [] }))
        ];
        
        const [metricsRes, alertsRes, servicesRes] = await Promise.all(promises);
        
        if (!isMounted) return;
        
        // UPDATE STATE with received data
        setMetrics(metricsRes.data || []);
        setAlerts(alertsRes.data || []);
        setServices(servicesRes.data || []);
        
        // Get system info only every 60 seconds
        const now = Date.now();
        if (!systemInfo.cpu || (now - systemInfoLastFetch) > 60000) {
          try {
            const systemRes = await axios.get('/api/system-info', { timeout: 10000 });
            if (isMounted) {
              setSystemInfo(systemRes.data);
              systemInfoLastFetch = now;
            }
          } catch (sysError) {
            console.warn('System info unavailable');
            if (isMounted && !systemInfo.cpu) {
              setSystemInfo({cpu: 'System CPU', memory: 'Unknown', os: 'Unknown'});
            }
          }
        }
        
        // Record successful update
        if (isMounted) {
          setLastUpdate(new Date());
          setIsLive(true);
          setLoading(false);
          retryCount = 0;
        }
        
      } catch (error) {
        if (!isMounted) return;
        
        console.error('Connection failed:', error.message);
        retryCount++;
        
        setIsLive(false);
        setLoading(false);
      }
    };

    // INITIALIZATION AND REAL-TIME UPDATES
    fetchData();
    
    // Use 5 second interval for better stability
    const interval = setInterval(() => {
      if (retryCount < 5) {
        fetchData();
      } else {
        // Exponential backoff after failures
        const backoffDelay = Math.min(30000, 1000 * Math.pow(2, retryCount - 5));
        if (Date.now() % backoffDelay < 5000) fetchData();
      }
    }, 5000);
    
    // CLEANUP FUNCTION
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
    
  }, []);

  if (loading) {
    return <div style={{padding: '20px'}}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{color: '#333'}}>DevOps Dashboard - Real-Time System Monitoring</h1>

      <div style={{marginBottom: '20px', padding: '15px', backgroundColor: isLive ? '#e8f5e8' : '#ffebee', borderRadius: '5px', border: `2px solid ${isLive ? '#4caf50' : '#f44336'}`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: isLive ? '#4caf50' : '#f44336', animation: isLive ? 'pulse 2s infinite' : 'none'}}></div>
          <strong>Status:</strong> {loading ? 'Connecting...' : isLive ? '🟢 LIVE DATA' : '🔴 DISCONNECTED'}
        </div>
        <div style={{marginTop: '8px'}}>
          <strong>System:</strong> {systemInfo.cpu} | {systemInfo.memory} | {systemInfo.os}
        </div>
        <div style={{fontSize: '12px', color: '#666'}}>
          Last Update: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'} | Data Points: {metrics.length}
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2>📊 Live System Metrics ({metrics.length} data points - 5s updates)</h2>
          <div style={{marginBottom: '10px', fontSize: '14px'}}>
            <span style={{color: '#ff4444'}}>🔴 Red = CPU Usage</span> | 
            <span style={{color: '#44ff44'}}>🟢 Green = Memory Usage</span> | 
            <span style={{color: '#4444ff'}}>🔵 Blue = Disk Usage</span>
          </div>
          {metrics.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metrics}>
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} label={{ value: 'Usage %', angle: -90, position: 'insideLeft' }} />
                <Line type="monotone" dataKey="cpu" stroke="#ff4444" strokeWidth={3} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#44ff44" strokeWidth={3} name="Memory %" />
                <Line type="monotone" dataKey="disk" stroke="#4444ff" strokeWidth={3} name="Disk %" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ddd', backgroundColor: '#f9f9f9'}}>
              ⏳ Waiting for backend connection...
            </div>
          )}
          <div style={{marginTop: '10px', padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px', border: '1px solid #ddd'}}>
            <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>📈 LIVE SYSTEM VALUES:</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '12px', fontFamily: 'monospace'}}>
              <div style={{color: '#ff4444'}}>🔴 CPU: {metrics[metrics.length-1]?.cpu?.toFixed(1) || '0'}%</div>
              <div style={{color: '#44ff44'}}>🟢 Memory: {metrics[metrics.length-1]?.memory?.toFixed(1) || '0'}%</div>
              <div style={{color: '#4444ff'}}>🔵 Disk: {metrics[metrics.length-1]?.disk?.toFixed(1) || '0'}%</div>
            </div>
          </div>
        </div>

        <div>
          <h2>Active Alerts</h2>
          {alerts.map(alert => (
            <div key={alert.id} style={{ 
              padding: '10px', 
              margin: '5px 0', 
              backgroundColor: alert.severity === 'critical' ? '#ffebee' : '#fff3e0',
              border: '1px solid #ddd'
            }}>
              <strong>{alert.name}</strong>
              <p>{alert.description}</p>
            </div>
          ))}
          
          <div style={{marginTop: '20px'}}>
            <button 
              onClick={() => generateReport()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📊 Generate Report Now
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2>Service Status</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {services.map(service => (
            <div key={service.name} style={{
              padding: '10px',
              backgroundColor: service.status === 'healthy' ? '#e8f5e8' : '#ffebee',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}>
              <strong>{service.name}</strong>
              <p>Status: {service.status}</p>
            </div>
          ))}
        </div>
      </div>

      {latestReport && (
        <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', border: '1px solid #ddd'}}>
          <h2>📋 Latest Report ({latestReport.reportTime})</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '10px'}}>
            <div>
              <strong>CPU:</strong> Avg {latestReport.metrics.cpu.avg}% (Max: {latestReport.metrics.cpu.max}%)
            </div>
            <div>
              <strong>Memory:</strong> Avg {latestReport.metrics.memory.avg}% (Max: {latestReport.metrics.memory.max}%)
            </div>
            <div>
              <strong>Disk:</strong> Avg {latestReport.metrics.disk.avg}% (Max: {latestReport.metrics.disk.max}%)
            </div>
          </div>
          <div style={{fontSize: '14px'}}>
            <strong>Summary:</strong> {latestReport.summary.join(' | ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;