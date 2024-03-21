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
        <>
            <div className='register-page'>
                {loading && <Spinner />}
                <Form layout="vertical" onFinish={submitHandler}>
                    <h1>Register Form</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div>
                        <div className='d-block'>
                            <Link to="/login">Already registered? Click here to login</Link>
                        </div>
                        <div>
                            <button className='btn btn-primary'>Register</button>
                        </div>
                    </div>
                </Form>
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