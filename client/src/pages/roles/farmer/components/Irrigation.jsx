import React, { useState } from 'react';
import styles from './../farmStyles/irrigation.module.scss';
import { FaWater, FaToggleOn, FaToggleOff } from 'react-icons/fa';

function Irrigation() {
  const [isIrrigating, setIsIrrigating] = useState(false);

  const toggleIrrigation = () => {
    setIsIrrigating(!isIrrigating);
    // In future: trigger backend call to control hardware
  };

  return (
    <div className={styles.irrigationContainer}>
      <h2 className="mb-4">💧 Irrigation Control System</h2>

      <div className={styles.controlCard}>
        <FaWater size={50} className={styles.icon} />
        <p className={styles.statusText}>
          Status:{" "}
          <span className={isIrrigating ? styles.on : styles.off}>
            {isIrrigating ? "Irrigation ON" : "Irrigation OFF"}
          </span>
        </p>

        <button
          className={`btn ${isIrrigating ? 'btn-danger' : 'btn-success'} mt-3`}
          onClick={toggleIrrigation}
        >
          {isIrrigating ? (
            <>
              <FaToggleOff className="me-2" />
              Turn OFF
            </>
          ) : (
            <>
              <FaToggleOn className="me-2" />
              Turn ON
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Irrigation;
