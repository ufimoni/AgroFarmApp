
import styles from './../managerStyles/overview.module.scss';
import farmImg from './../../../../assets/farm1.jpg';
import pesticideImg from './../../../../assets/pesticide1.jpg';
import rainImg from './../../../../assets/rain.jpg';
import weatherImg from './../../../../assets/weather.jpg';
import oldTaskImg from './../../../../assets/old-tasks.jpg';
import crop1 from './../../../../assets/maize1.jpg';
import crop2 from './../../../../assets/cabbage1.jpg';

function Overview() {
  return (
    <div className={styles.wrapper}> 
      <div className={styles.overviewContainer}>
      <h1 className={styles.heading}>📊 General Overview - Farm Manager</h1>

      {/* === Top Task Summary Section === */}
      <div className={styles.cardSection}>
        <div className={styles.card}>
          <h3>🌾 Total Farms Assigned</h3>
          <p>3 Farms</p>
        </div>
        <div className={styles.card}>
          <h3>✅ Completed Tasks</h3>
          <p>5 Tasks</p>
        </div>
        <div className={styles.card}>
          <h3>⏳ In Progress Tasks</h3>
          <p>2 Tasks</p>
        </div>
        <div className={styles.card}>
          <h3>📌 Pending Tasks</h3>
          <p>1 Task</p>
        </div>
        <div className={styles.card}>
          <h3>🔁 Tasks Reassigned</h3>
          <p>0 Tasks</p>
        </div>
      </div>

      {/* === Farm Description Sections (5x) === */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className={styles.farmSection}>
          <div className={styles.farmDescription}>
            <h4>Farm #{item} Overview</h4>
            <p>
              This farm focuses on mixed crops including maize, cassava, and beans. 
              Regular use of organic compost and drip irrigation system has improved yields.
            </p>
            <p>
              Manager has scheduled pest control every two weeks and uses satellite data 
              for weather updates. Farm location benefits from fertile volcanic soil.
            </p>
          </div>
          <div className={styles.farmImage}>
            <img src={farmImg} alt={`Farm ${item}`} />
          </div>
        </div>
      ))}

      {/* === Bottom Overview: Miscellaneous Divs === */}
      <div className={styles.miscSection}>
        <div className={styles.miscCard}>
          <img src={pesticideImg} alt="Pesticide" />
          <h4>🧪 Pesticide Info</h4>
          <p>Sprayed Bi-monthly with Neem Oil and Pyrethrin-based solutions.</p>
        </div>
        <div className={styles.miscCard}>
          <img src={rainImg} alt="Rainfall" />
          <h4>🌧 Rainfall Conditions</h4>
          <p>Average monthly rainfall: 120mm. Peak in July and August.</p>
        </div>
        <div className={styles.miscCard}>
          <img src={weatherImg} alt="Weather" />
          <h4>☀️ Weather Forecast</h4>
          <p>Mostly sunny with isolated showers expected next week.</p>
        </div>
        <div className={styles.miscCard}>
          <img src={oldTaskImg} alt="Old Tasks" />
          <h4>📋 View Old Tasks</h4>
          <p>Completed crop rotations and fertilizer applications from Q1.</p>
        </div>
        <div className={styles.miscCard}>
          <img src={crop1} alt="Crop 1" />
          <h4>🌽 Maize Crop</h4>
          <p>Planted in early May, expected harvest mid-August.</p>
        </div>
        <div className={styles.miscCard}>
          <img src={crop2} alt="Crop 2" />
          <h4>🥬 Lettuce Crop</h4>
          <p>Hydroponic lettuce growing indoors under controlled conditions.</p>
        </div>
      </div>
    </div>
    </div>
  
  );
}

export default Overview;

