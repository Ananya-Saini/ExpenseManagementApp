import React, { useState , useEffect} from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const { data } = await axios.post('/users/login', values)
            localStorage.setItem('user', JSON.stringify({
                userid: data.userid,
                ...data,
                password: '',
            }));
            setLoading(false)
            message.success('login success')
            localStorage.setItem('user', JSON.stringify({ ...data, password: '' }))
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    };
    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '58% 42%' }}>
            <img src="9846845.jpg" alt="Login Background" style={{ width: '100%', height: '100%', marginLeft: '2rem'}} />
            <div className='register-page'>
                {loading && <Spinner />}
                <div style={{padding: '2rem', borderRadius: '1rem', boxShadow: '5px 5px 34px 0px'}}>
                <Form layout="vertical" onFinish={submitHandler}>
                    <h1 style={{fontFamily: '"Roboto Slab", serif'}}>Time to Budget Up!</h1>
                    <Form.Item label="" name="email" className='input-box' >
                        <i class="fa fa-envelope icon-envelope my-icon" style={{ position: 'absolute', top: '50%',left: '6%',transform: 'translate(-50%, -50%)', zIndex: '100', fontSize: '1.2rem'}}></i>
                    <Input type="email" placeholder="Enter your email" autoComplete='email' style={{ paddingLeft: '10vh', position: 'relative' }}/>
                    </Form.Item>
                    <Form.Item label="" name="password" className='input-box'>
                    <i class="fa fa-lock" style={{ position: 'absolute', top: '50%',left: '6%',transform: 'translate(-50%, -50%)', zIndex: '100', fontSize: '1.5rem'}}></i>
                        <Input type="password" placeholder='Password' autoComplete='current-password' style={{ paddingLeft: '10vh', position: 'relative' }}/>
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to="/register">Not registered? Click here to register</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
                </div>
            </div>
            </div>
        </>
    )
}

export default Login