import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import writerImg from '../assets/writer.svg'

function Login() {

    const [overlaySide, setOverlaySide] = useState("-50%")

    const [validationMsg, setValidationMsg] = useState({
        status: false,
        msg: "",
        type: ""
    })

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            name: data.get('name'),
            password: data.get('password'),
            confPassword: data.get('confPassword')
        }
        console.log(actualData);

        if (actualData.password !== actualData.confPassword) {
            setValidationMsg({ status: "true", msg: "Password and Confirm Password did not match", type: "Danger" })
        }
        else{
            setValidationMsg({ status: "true", msg: "Login Successful", type: "Success" })
            navigate('/')
        }
        document.getElementById('register-form').reset()
    }


    function Validation() {
        return (
            <>
                <div className={`alert alert-${validationMsg.type.toLowerCase()} d-flex align-items-center fs-6`} role="alert">
                    <p>
                        {validationMsg.msg}
                    </p>
                </div>
            </>
        )
    }

    return (
        <div className='login'>
            <div className="container row m-5 justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header-1 mt-5 text-start ms-5">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form className='p-4' action="">
                                <input type="email" className='form-control my-3' placeholder='Enter Email' />
                                <input type="password" className='form-control my-3' placeholder='Enter Password' />

                                <div className="my-3">
                                    <button className='btn btn-primary form-control my-4'>Login</button>
                                    <p className='text-dark text-center'>
                                        Don't have an account?
                                        <span onClick={() => setOverlaySide("-50%")}><strong> Register</strong></span>
                                    </p>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header-1 mt-5 text-start ms-5">
                            <h2>Create Account</h2>
                        </div>
                        <div className="card-body">
                            <form className='pb-4 px-4' id="register-form" onSubmit={handleSubmit}>
                                <input type="text" name='name' className='form-control my-3' placeholder='Enter Name' required />
                                <input type="email" name='email' className='form-control my-3' placeholder='Enter Email' required />
                                <input type="password" name='password' className='form-control my-3' placeholder='New Password' required />
                                <input type="password" name='confPassword' className='form-control my-3' placeholder='Confirm Password' required />

                                <div className='validationMsg mb-2' style={{height:"1rem"}}>
                                    {validationMsg.status ?<Validation/>:""}
                                </div>


                                <div className="mb-3">
                                    <button type='submit' className='btn btn-primary form-control my-4'>Register</button>
                                    <p className='text-dark text-center'>
                                        Already have an account?
                                        <span onClick={() => setOverlaySide("50%")}><strong> Login</strong></span>
                                    </p>

                                </div>

                                
                            </form>
                        </div>
                    </div>
                </div>
                <div className="overlay-card" style={{ transform: `translateX(${overlaySide})` }}>
                    <img src={writerImg} alt="asset" />
                </div>
            </div>
        </div>
    )
}



export default Login