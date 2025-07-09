import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  LineChart, Line,
  ResponsiveContainer,
} from 'recharts';
import styles from './../managerStyles/reportAnalysis.module.scss';

function ReportAnalytics() {
  const moneyData = [
    { month: 'Jan', farmer: 500, expert: 800 },
    { month: 'Feb', farmer: 300, expert: 700 },
    { month: 'Mar', farmer: 700, expert: 900 },
    { month: 'Apr', farmer: 600, expert: 500 },
    { month: 'May', farmer: 800, expert: 1000 },
  ];

  const toolsData = [
    { tool: 'Drone', farmer: 3, expert: 1 },
    { tool: 'Sensor', farmer: 5, expert: 2 },
    { tool: 'Weather App', farmer: 6, expert: 4 },
    { tool: 'Soil Kit', farmer: 2, expert: 5 },
  ];

  const timeData = [
    { role: 'Farmer', hours: 40 },
    { role: 'Expert', hours: 25 },
    { role: 'Manager', hours: 15 },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Farm Manager - Report Analytics</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Monthly Spending Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moneyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="farmer" stroke="#82ca9d" name="Farmer ($)" />
            <Line type="monotone" dataKey="expert" stroke="#8884d8" name="Expert ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tool Usage by Role</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={toolsData}>
            <XAxis dataKey="tool" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="farmer" fill="#8884d8" name="Farmer" />
            <Bar dataKey="expert" fill="#82ca9d" name="Expert" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Time Spent per Role (hours/week)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeData}>
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="hours" fill="#ffc658" name="Hours Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReportAnalytics;
