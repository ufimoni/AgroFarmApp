import React, {useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { SignupUser } from './../../api/auth';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from './../../redux/loaderSlice'
import toast from 'react-hot-toast';
import styles from './../../style/loginsignup.module.scss'


function Signup(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ user, setUser ] = useState({
        firstname: '',
        lastname: '',
        email: '',
        passwird: '',
        role: '',
        phone: '',
    });
  
    /// habdling the submit the front
    const onFormSubmit = async (e) => {
        e.preventDefault();
        try{
         dispatch(showLoader())
         const response = await SignupUser(user);
         dispatch(hideLoader());
         if(response.success){
         toast.success(response.message);
         navigate('/login');
         }else{ 
          toast.error(response.message)
         }
         
        } catch(error){
         dispatch(hideLoader())
         toast.error(response.message)
        }
    };
  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles.bgOverlay}`}>
      <div className="card p-4 shadow rounded" style={{ maxWidth: '420px', width: '100%' }}>
        <h1 className="text-center text-success mb-4">Signup</h1>
        <form onSubmit={onFormSubmit} className="d-flex flex-column gap-3">
          <input type="text" className="form-control" placeholder="First Name" required onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
          <input type="text" className="form-control" placeholder="Last Name" required onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
          <input type="email" className="form-control" placeholder="Email" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <input type="password" className="form-control" placeholder="Password" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
          <input type="text" className="form-control" placeholder="Phone" required onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          <select className='form-select' required onChange={(e) => setUser({ ...user, role: e.target.value})}>
           <option value="" className='select-occupation'>Select Occupation</option>
           <option value="farm-manager">Farm Manager</option>
            <option value="farmer">Farmer</option>
            <option value="agro-expert">Agricultural Expert</option>
            <option value="owner">Farm Owner</option>
          </select>

          <button type="submit" className="btn btn-success">Signup</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </div>
      </div>
    </div>
  );
}
export default Signup;