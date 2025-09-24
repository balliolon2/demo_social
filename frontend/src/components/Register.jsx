import React, { useState } from 'react'
import axios  from 'axios'
import {Link,useNavigate} from 'react-router-dom'

function Register() {

    const [username,setUsername] =useState('');
    const [email, setEmail] = useState(''); // เพิ่ม state สำหรับ email
    const [password,setPassword] =useState('');
    const [message,setMessage] =useState('');
    const navigate=useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', {
                username,
                email, // ส่ง email ไปยัง backend
                password
            });
            setMessage(response.data.message);
            // หากลงทะเบียนสำเร็จ ให้เปลี่ยนเส้นทางไปหน้า Login
            if (response.status === 201) {
                setTimeout(() => {
                    navigate('/login');
                }, 1500); // หน่วงเวลา 1.5 วินาที ก่อนเปลี่ยนหน้า
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred during registration.');
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
                            Register
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
                                <label htmlFor="email"className='form-label'>Email</label>
                                <input type="email" className='form-control'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)} required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password"className='form-label'>password</label>
                                <input type="password" className='form-control'
                                value={password} // แก้ไขให้ผูกกับ state password
                                onChange={(e)=> setPassword(e.target.value)} required
                                />
                            </div>
                            <button type='submit' className='btn btn-primary w-100'>Register</button>
                        </form>
                        {message && <p className='mt-3 text-center text-danger'>{message}</p> }
                        <p className='mt-3 text-center'> Already have an account? <Link to ='/login'>Login</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Register