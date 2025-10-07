/*
 * CPU Stress Test Utility
 * 
 * This script creates artificial CPU load to demonstrate the real-time monitoring
 * capabilities of the DevOps Dashboard. It's useful for testing alert systems
 * and verifying that the dashboard correctly displays high CPU usage.
 * 
 * Purpose:
 * - Generate high CPU usage for testing
 * - Trigger CPU usage alerts in the dashboard
 * - Demonstrate real-time monitoring capabilities
 * - Validate alert thresholds and notifications
 * 
 * Usage:
 * 1. Start the backend server: npm start (in backend directory)
 * 2. Open the dashboard: http://localhost:3000
 * 3. Run this script: node stress-test.js
 * 4. Watch the dashboard show increased CPU usage and alerts
 * 
 * Duration: 30 seconds (configurable)
 * Expected Result: CPU usage should spike and trigger alerts
 */

// Display start message with instructions
console.log('🔥 Starting CPU stress test for 30 seconds...');
console.log('📊 Watch the dashboard at http://localhost:3000');
console.log('⚠️  You should see CPU usage spike and alerts appear');
console.log('');

// Record the start time for duration calculation
const startTime = Date.now();

// Test duration in milliseconds (30 seconds)
const duration = 30000;

// Function to create intensive CPU load
const stressTest = () => {
  console.log('⏳ Creating CPU load...');
  
  // Continuous loop that performs intensive mathematical calculations
  // This will consume CPU cycles and increase system load
  while (Date.now() - startTime < duration) {
    // Perform intensive floating-point operations
    // Math.random() generates random numbers, multiplication creates CPU work
    Math.random() * Math.random();
    
    // Optional: Add more intensive operations
    // Math.sqrt(Math.random() * 1000000);
    // JSON.stringify({data: Math.random()});
  }
  
  // Test completed - display completion message
  console.log('✅ Stress test completed!');
  console.log('📉 CPU usage should return to normal levels');
  console.log('🔔 Check if any alerts were triggered in the dashboard');
};

// Execute the stress test
stressTest();