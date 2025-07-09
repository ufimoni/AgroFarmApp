import React, { useEffect, useState } from 'react';
import style from './../farmStyles/crops.module.scss';
import { getAllCrops } from './../../../../api/crop';

function CropsManagement() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      const data = await getAllCrops();

      console.log('🌿 Raw Response from getAllCrops():', data);

      if (data?.success && data?.crops) {
        setCrops(data.crops);
      } else {
        console.error('❌ Failed to fetch crops or crops not found:', data);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div className={style.scrollwrapper}>
      <div className={style.cropsContainer}>
        <h1 className={style.heading}>Crops Management</h1>

        <div className={style.gridWrapper}>
          {crops.map((crop, index) => (
            <div className={style.cropCard} key={index}>
              <img
                src={crop.image || 'https://via.placeholder.com/150'}
                alt={crop.name}
              />
              <div className={style.cardContent}>
                <h3>{crop.name}</h3>
                <p><strong>Type:</strong> {crop.type}</p>
                <p><strong>Farm:</strong> {crop.farm?.name || crop.farm}</p>
                <p><strong>Description:</strong>{crop.description}</p>
                <p><strong>Recommended by:</strong> {crop.createdBy?.firstname || crop.createdBy}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CropsManagement;
