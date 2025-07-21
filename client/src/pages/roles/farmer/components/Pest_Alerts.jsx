// src/pages/alerts/PestDiseaseAlerts.jsx

import React from 'react';
import styles from './../farmStyles/pest_disease_alerts.module.scss';
/// I will edit this file
// Sample hardcoded data
const alerts = [
  {
    id: 1,
    crop: "Tomato",
    disease: "Late Blight",
    image: "/images/alerts/tomato_blight.jpg",
    description: "Late blight is a serious tomato disease caused by the fungus-like organism Phytophthora infestans.",
    prevention: "Use resistant varieties, avoid overhead watering, and apply fungicides early."
  },
  {
    id: 2,
    crop: "Maize",
    disease: "Fall Armyworm",
    image: "/images/alerts/maize_armyworm.jpg",
    description: "Fall armyworm is a destructive pest affecting maize crops, feeding on leaves and kernels.",
    prevention: "Monitor regularly, use pheromone traps, and apply approved insecticides."
  },
  {
    id: 3,
    crop: "Rice",
    disease: "Bacterial Leaf Blight",
    image: "/images/alerts/rice_leaf_blight.jpg",
    description: "Caused by Xanthomonas oryzae, it leads to wilting and yellowing of rice leaves.",
    prevention: "Use clean seeds, resistant varieties, and avoid excessive nitrogen fertilizer."
  },
  {
    id: 4,
    crop: "Cassava",
    disease: "Cassava Mosaic Virus",
    image: "/images/alerts/cassava_mosaic.jpg",
    description: "A viral disease that causes leaf distortion and reduces yield.",
    prevention: "Plant virus-free cuttings, control whiteflies, and remove infected plants."
  },
];

function PestDiseaseAlerts() {
  return (
    <div className={styles.alertsContainer}>
      <h1 className={styles.heading}>Pest and Disease Alerts</h1>

      <div className={styles.alertsGrid}>
        {alerts.map(alert => (
          <div key={alert.id} className={styles.alertCard}>
            <img src={alert.image} alt={`${alert.crop} - ${alert.disease}`} className={styles.alertImage} />
            <h3>{alert.crop} - {alert.disease}</h3>
            <p><strong>Description:</strong> {alert.description}</p>
            <p><strong>Prevention:</strong> {alert.prevention}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PestDiseaseAlerts;
