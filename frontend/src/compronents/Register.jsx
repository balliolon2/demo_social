import React, { useState } from 'react'
import axios  from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Register() {

    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const [message,setMessage] =useState('')
    const navigate=useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()   
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
                                <label htmlFor="password"className='form-label'>password</label>
                                <input type="password" className='form-control'
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)} required
                                />
                            </div>
                            <button type='submit' className='btn btn-primary w-100'>Register</button>
                        </form>
                        {message && <p className='mt-3 text-center text-danger'>{message}</p> }
                        <p className='mt-3 text-center'> already Have an account <Link to ='/login'>login</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Register