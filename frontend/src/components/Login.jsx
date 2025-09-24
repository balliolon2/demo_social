import React, { useState } from 'react'
import axios  from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Login() {

    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const [message,setMessage] =useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                username,
                password
            });
            setMessage(response.data.message);
            // หากเข้าสู่ระบบสำเร็จ ให้เก็บ token และเปลี่ยนเส้นทางไปหน้า Dashboard
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500); // หน่วงเวลา 1.5 วินาที ก่อนเปลี่ยนหน้า
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred during login.');
            }
        }
     }

  return (
    <div className='container mt-5'>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className='card-title text-center md-4'>
                            Login
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username"className='form-label'>username</label>
                                <input type="text" className='form-control'
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)} required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password"className='form-label'>password</label>
                                <input type="password" className='form-control' // แก้ไขให้ผูกกับ state password
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)} required
                                />
                            </div>
                            <button type='submit' className='btn btn-success w-100'>Login</button>
                        </form>
                        {message && <p className='mt-3 text-center text-danger'>{message}</p> }
                        <p className='mt-3 text-center'> Not Have an account <Link to ='/register'>Register</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Login