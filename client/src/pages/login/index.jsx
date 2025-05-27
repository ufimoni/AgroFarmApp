/*..... This is the login page for the agroSmartApp..*/
import  { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { LoginUser } from './../../api/auth.js'
import { toast } from 'react-hot-toast';
import { hideLoader, showLoader } from '../../redux/loaderSlice.js';
import { setUser } from './../../redux/userSlice.js'
import { useDispatch } from 'react-redux';
import styles from './../../style/loginsignup.module.scss'
function Login(){
      const dispatch = useDispatch();
      const [ user, setUserState ] = useState({ email: '', password: ''});
      const navigate = useNavigate();

      const onFormSubmit = async (e) => {
        e.preventDefault();
        try{
            /// recieve data from the backend.
            dispatch(showLoader());
            const response = await LoginUser(user);
            dispatch(hideLoader());
            if(response.success){
                toast.success(response.message);
                localStorage.setItem('token', response.token);
                dispatch(setUser(response.user));

                const role = response.user.role;
                if(role === 'farmer'){
                    navigate('/farmer')
                }else if(role === 'farm-manager'){
                   navigate('/manager')
                }else if(role === 'agro-expert'){
                  navigate('/expert')
                }else if(role === 'owner'){
                  navigate('/owner')
                }else{
                    navigate('/notfound');
                }
            }else{
                toast.error(response.message);
            }
            


        }catch(error){
            console.log('Login Failed Check your email and password again!');
            dispatch(hideLoader())
            toast.error('Login Failed try again');
        }
      };

    return (
      
        <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles}`}>
           <div className="card p-4 shadow rounded w-100" style={{maxWidth: '420px'}}>
            <h1 className="text-center text-success mb-4">Login</h1>
            <form onSubmit={onFormSubmit} className='d-flex flex-column gap-3'>
                <input type="email" 
                className='form-control'
                 placeholder='Email'
                 value={user.email}
                 onChange={(e) => 
                 setUserState({ ...user, email: e.target.value})}
                  required/>

                  <input type="password" 
                className='form-control'
                 placeholder='Password'
                 value={user.password}
                 onChange={(e) => 
                 setUserState({ ...user, password: e.target.value})}
                  required/>
                  <button type="submit" className="btn btn-success">Login</button>
            </form>
            <div className="text-center mt-3">
        <span>Don't have an account? <Link to="/signup">Signup</Link>

        </span>
            </div>
           </div>
        </div>
    )
}
export default Login;