// src/pages/roles/manager/EquipmentStats.jsx
import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { Build, CheckCircle, Warning, Error } from '@mui/icons-material';
import styles from './../farmStyles/equipment_stats.module.scss';

const equipmentData = [
  {
    id: 1,
    name: 'Tractor A',
    status: 'Operational',
    icon: <CheckCircle color="success" />,
    description: 'Engine working perfectly.',
  },
  {
    id: 2,
    name: 'Irrigation Pump B',
    status: 'Maintenance Needed',
    icon: <Warning color="warning" />,
    description: 'Minor leak detected.',
  },
  {
    id: 3,
    name: 'Harvester C',
    status: 'Out of Service',
    icon: <Error color="error" />,
    description: 'Hydraulic failure.',
  },
  {
    id: 4,
    name: 'Drone Sprayer D',
    status: 'Operational',
    icon: <CheckCircle color="success" />,
    description: 'Battery fully charged.',
  },
];

function EquipmentStats() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Equipment Status Dashboard</h2>
      <Grid container spacing={3}>
        {equipmentData.map((equip) => (
          <Grid item xs={12} sm={6} md={4} key={equip.id}>
            <Card className={styles.card}>
              <CardContent>
                <div className={styles.header}>
                  <Avatar className={styles.icon}><Build /></Avatar>
                  <Typography variant="h6">{equip.name}</Typography>
                </div>
                <Typography className={styles.status}>
                  Status: {equip.icon} {equip.status}
                </Typography>
                <Typography variant="body2" className={styles.description}>
                  {equip.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default EquipmentStats;
