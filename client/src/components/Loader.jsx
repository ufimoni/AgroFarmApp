import { BeatLoader } from 'react-spinners';
import React from 'react';
import styles from './../style/loader.module.scss'

function Loader(){
  return (
   <div className={styles.loaderOverlay}>
    <BeatLoader color='#2ecc71' size={45}/>

   </div>
  )
}
export default Loader;