import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    //on submit
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            await axios.post("/users/register", values);
            message.success('Registeration Successful');
            setLoading(false)
            navigate("/login");
        } catch (error) {
            setLoading(false)
            console.log(error)
            message.error("Something went wrong");
        }
    };
    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);
    return (
        // <a href="https://storyset.com/online">Online illustrations by Storyset</a>
        <>
            <img src="Logo.png" alt="Expense Management App" style={{ height: "10vh", position: "absolute", zIndex: "10", marginLeft: "2rem" }} />
            <div style={{ display: 'grid', gridTemplateColumns: '58% 42%' }}>
                <img src="Register.png" alt="Login Background" style={{ width: '87%', height: '85%', marginLeft: '5rem', top: '5vh'}} />
                <div className='register-page'>
                    {loading && <Spinner />}
                    <div style={{ padding: '2rem', borderRadius: '1rem', boxShadow: '5px 5px 34px 0px' }}>
                        <Form layout="vertical" onFinish={submitHandler}>
                            <h1 style={{ fontFamily: '"Roboto Slab", serif' }}>Come on Aboard!</h1>
                            <Form.Item label="Name" name="name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email">
                                <Input type="email" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" pattern=".{8,}" required title="8 characters minimum">
                                <Input type="password" />
                            </Form.Item>
                            <div>
                                <div className='d-block' style={{textAlign: 'center' }}>
                                    <Link to="/login">Already registered? Click here to login</Link>
                                </div>
                                <div style={{textAlign: 'center', marginTop: '3vh' }}>
                                    <button className='btn btn-primary' >Register</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    )
}
export function ProtectedRoutes(props) {
    if (localStorage.getItem("user")) {
        return props.children;
    } else {
        return <Navigate to="/login" />;
    }
}
export default Register