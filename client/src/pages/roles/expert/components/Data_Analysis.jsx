// src/pages/roles/expert/DataAnalysis.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  ComposedChart, Area
} from 'recharts';
import styles from './../expertStyles/data_analysis.module.scss';

const sampleData = [
  { name: 'Jan', yield: 400, rainfall: 240, temperature: 18 },
  { name: 'Feb', yield: 300, rainfall: 139, temperature: 20 },
  { name: 'Mar', yield: 500, rainfall: 980, temperature: 25 },
  { name: 'Apr', yield: 478, rainfall: 390, temperature: 30 },
  { name: 'May', yield: 589, rainfall: 480, temperature: 28 },
  { name: 'Jun', yield: 439, rainfall: 380, temperature: 24 },
  { name: 'Jul', yield: 649, rainfall: 430, temperature: 26 },
];

function DataAnalysis() {
  return (
    <div className={styles.analysisContainer}>
      <h2>📊 Agricultural Data Analysis</h2>

      {/* Line Chart */}
      <div className={styles.chartBox}>
        <h4>Crop Yield Over Time</h4>
        <LineChart
          width={600}
          height={300}
          data={sampleData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Yield (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="yield" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>

      {/* Bar Chart */}
      <div className={styles.chartBox}>
        <h4>Monthly Rainfall Distribution</h4>
        <BarChart
          width={600}
          height={300}
          data={sampleData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="rainfall" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Histogram (as ComposedChart with Area) */}
      <div className={styles.chartBox}>
        <h4>Temperature Histogram (Simulated)</h4>
        <ComposedChart
          width={600}
          height={300}
          data={sampleData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="temperature" fill="#ffc658" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>
  );
}

export default DataAnalysis;
