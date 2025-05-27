import styles from './../../style/welcome.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

 function Welcome() {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.welcomeCard }>
        <h1 className="mb-3" id="welcome">🌿 Welcome to AgroFarm</h1>
        <p className="lead">
          A smart agricultural management platform for farmers, experts, and farm owners.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-success">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Welcome;