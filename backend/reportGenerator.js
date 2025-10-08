/*
 * Automated Report Generator
 * Generates system performance reports every 10 minutes
 */

const fs = require('fs').promises;
const path = require('path');

// Report storage
let reportHistory = [];

// Generate performance report
const generateReport = (metricsHistory, currentAlerts) => {
  const now = new Date();
  const reportTime = now.toLocaleString();
  
  // Calculate statistics from metrics
  const stats = calculateStats(metricsHistory);
  
  // Create report object
  const report = {
    id: Date.now(),
    timestamp: now.toISOString(),
    reportTime: reportTime,
    duration: '10 minutes',
    metrics: stats,
    alerts: currentAlerts.length,
    alertDetails: currentAlerts,
    summary: generateSummary(stats, currentAlerts)
  };
  
  // Add to history
  reportHistory.push(report);
  
  // Keep only last 24 reports (4 hours)
  if (reportHistory.length > 24) {
    reportHistory.shift();
  }
  
  // Save report to file
  saveReportToFile(report);
  
  console.log(`📊 Report generated at ${reportTime}`);
  return report;
};

// Calculate statistics from metrics data
const calculateStats = (metrics) => {
  if (!metrics || metrics.length === 0) {
    return { cpu: {}, memory: {}, disk: {}, dataPoints: 0 };
  }
  
  const cpuValues = metrics.map(m => m.cpu).filter(v => v !== undefined);
  const memoryValues = metrics.map(m => m.memory).filter(v => v !== undefined);
  const diskValues = metrics.map(m => m.disk).filter(v => v !== undefined);
  
  return {
    cpu: {
      avg: Math.round((cpuValues.reduce((a, b) => a + b, 0) / cpuValues.length) * 10) / 10,
      max: Math.round(Math.max(...cpuValues) * 10) / 10,
      min: Math.round(Math.min(...cpuValues) * 10) / 10,
      current: cpuValues[cpuValues.length - 1] || 0
    },
    memory: {
      avg: Math.round((memoryValues.reduce((a, b) => a + b, 0) / memoryValues.length) * 10) / 10,
      max: Math.round(Math.max(...memoryValues) * 10) / 10,
      min: Math.round(Math.min(...memoryValues) * 10) / 10,
      current: memoryValues[memoryValues.length - 1] || 0
    },
    disk: {
      avg: Math.round((diskValues.reduce((a, b) => a + b, 0) / diskValues.length) * 10) / 10,
      max: Math.round(Math.max(...diskValues) * 10) / 10,
      min: Math.round(Math.min(...diskValues) * 10) / 10,
      current: diskValues[diskValues.length - 1] || 0
    },
    dataPoints: metrics.length
  };
};

// Generate summary text
const generateSummary = (stats, alerts) => {
  let summary = [];
  
  // CPU analysis
  if (stats.cpu.avg > 80) {
    summary.push(`🔴 HIGH CPU: Average ${stats.cpu.avg}% (Peak: ${stats.cpu.max}%)`);
  } else if (stats.cpu.avg > 50) {
    summary.push(`🟡 MODERATE CPU: Average ${stats.cpu.avg}%`);
  } else {
    summary.push(`🟢 NORMAL CPU: Average ${stats.cpu.avg}%`);
  }
  
  // Memory analysis
  if (stats.memory.avg > 85) {
    summary.push(`🔴 HIGH MEMORY: Average ${stats.memory.avg}% (Peak: ${stats.memory.max}%)`);
  } else if (stats.memory.avg > 70) {
    summary.push(`🟡 MODERATE MEMORY: Average ${stats.memory.avg}%`);
  } else {
    summary.push(`🟢 NORMAL MEMORY: Average ${stats.memory.avg}%`);
  }
  
  // Disk analysis
  if (stats.disk.avg > 90) {
    summary.push(`🔴 HIGH DISK: ${stats.disk.avg}% used`);
  } else if (stats.disk.avg > 80) {
    summary.push(`🟡 MODERATE DISK: ${stats.disk.avg}% used`);
  } else {
    summary.push(`🟢 NORMAL DISK: ${stats.disk.avg}% used`);
  }
  
  // Alerts summary
  if (alerts.length > 0) {
    summary.push(`⚠️ ${alerts.length} ACTIVE ALERTS`);
  } else {
    summary.push(`✅ NO ALERTS`);
  }
  
  return summary;
};

// Save report to JSON file
const saveReportToFile = async (report) => {
  try {
    const reportsDir = path.join(__dirname, 'reports');
    
    // Create reports directory if it doesn't exist
    try {
      await fs.access(reportsDir);
    } catch {
      await fs.mkdir(reportsDir, { recursive: true });
    }
    
    // Save individual report
    const filename = `report_${report.id}.json`;
    const filepath = path.join(reportsDir, filename);
    await fs.writeFile(filepath, JSON.stringify(report, null, 2));
    
    // Save latest reports summary
    const summaryPath = path.join(reportsDir, 'latest_reports.json');
    await fs.writeFile(summaryPath, JSON.stringify(reportHistory, null, 2));
    
  } catch (error) {
    console.error('Error saving report:', error.message);
  }
};

// Get all reports
const getReports = () => {
  return reportHistory;
};

// Get latest report
const getLatestReport = () => {
  return reportHistory[reportHistory.length - 1] || null;
};

module.exports = {
  generateReport,
  getReports,
  getLatestReport
};