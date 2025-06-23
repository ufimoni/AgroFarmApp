import React from 'react';
import style from './../farmStyles/crops.module.scss';

import maize from './../../../../assets/maize.jpg';
import beans from './../../../../assets/beans.jpg';
import carrots from './../../../../assets/carrots.jpg';
import mango from './../../../../assets/mango.jpg';
import potatoes from './../../../../assets/potatoes.jpg';
import tomatoes from './../../../../assets/ripe-organic-tomatoes.jpg';
import Yam from './../../../../assets/yam1.jpg';

function CropsManagement() {
  const crops = [
    { image: maize, name: 'Maize', type: 'Cereal', farm: 'Ajaokuta-Farm', createdBy: 'Dr. Micheal James' },
    { image: beans, name: 'Beans', type: 'Legume', farm: 'RiverSide Farm', createdBy: 'Prof. Ndoumbe Thomas' },
    { image: carrots, name: 'Carrots', type: 'Cereal', farm: 'Hope Farm', createdBy: 'Prof. Ndoumbe' },
    { image: mango, name: 'Mango', type: 'Fruits', farm: 'East Bertoua Farm', createdBy: 'Dr Caleb Jones' },
    { image: potatoes, name: 'Potatoes', type: 'Vegetables', farm: 'North Carolana Farm', createdBy: 'Mrs. Mirabelle Clinton' },
    { image: tomatoes, name: 'Tomatoes', type: 'Legumes', farm: 'RiverSide Farm', createdBy: 'Prof. Ndoumbe' },
    { image: Yam, name: 'Yam', type: 'Cereal', farm: 'Ekondo titi Farm', createdBy: 'Prof. Ndoumbe' },
  ];

  return (
    <div className={style.scrollwrapper}>
      <div className={style.cropsContainer}>
        <h1 className={style.heading}>Crops Management</h1>

        <div className={style.gridWrapper}>
          {crops.map((crop, index) => (
            <div className={style.cropCard} key={index}>
              <img src={crop.image} alt={crop.name} />
              <div className={style.cardContent}>
                <h3>{crop.name}</h3>
                <p><strong>Type:</strong> {crop.type}</p>
                <p><strong>Farm:</strong> {crop.farm}</p>
                <p><strong>Recommended by:</strong> {crop.createdBy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CropsManagement;

