/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Typography, Toolbar, Box, Paper, AppBar } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo1 from "./image/logo1.png";
import { Link, useNavigate } from 'react-router-dom';
import loader from './image/loader.gif';
import loader2 from './image/loader2.gif';
import bg1 from './image/bg1.png';
import bg2 from './image/bg2.png';

import axios from 'axios';
import "./Signin.css"
const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const defaultData1 = {
        condition: '',
        password: '',
    };
    const [data, setData] = useState({ ...defaultData1 });
    const [apiOtp, setApiOtp] = useState();
    const [emaill, setEmaill] = useState();
    const [loginData, setLoginData] = useState();

    const handleChange = (e) => {
        if (e.target.name === 'condition') {
            // Convert email to lowercase before updating state
            setData({ ...data, [e.target.name]: e.target.value.toLowerCase() });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (loginData?.statusCode === 200) {
            setLoading(false);
            console.log("=============typrrrr ==========", loginData.data.type);
            if (loginData.data.type == 'admin') {
                toast.success("Welcome Admin");
                setTimeout(() => navigate('/admin'), 2000);
            }
            else {
                toast.success("Welcome User");
                setTimeout(() => navigate('/dashboard'), 2000);
            }

        }

    }, [loginData]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!data.condition || !data.password) {
            toast.error("Email and password are required");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        const newData = { ...data };
        for (let key in newData) {
            formData.append(key, newData[key]);
        }

        try {
            console.log("ASdad");
            const response = await axios.post("https://134.209.153.179/cardapi/v1/login", formData);
            setEmaill(response.data.data.email);
            setApiOtp(response.data.data.mail_otp);
            setLoginData(response.data);
            console.log("===========ressss=====", response.data.data);

            // console.log("========= >>>hiiiiiiiiiiiiiiiiiiiii>>> =======",response.data.data.user_id);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('uid', response.data.data.user_id);
            localStorage.setItem('type', response.data.data.type);

            if (response.data.data.type === undefined) {
                // Display error toast for incorrect email or password
                toast.error("Incorrect email or password");
                setLoading(false);
            }

        } catch (error) {
            console.error("Login failed:", error);
            setLoading(false); // Stop loading if login failed
        }

    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
                <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Link to ='/' style={{textDecoration:'none'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
                            <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data</span> Mines
                        </Typography>
                    </div>
                    </Link>
                </Toolbar>
            </AppBar>
            {loading && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ffffff80', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
                    <img src={loader2} style={{ height: 100, width: 100 }} alt="" />
                </div>
            )}
                  <div className='main' style={{ height: '60vh', marginTop: '90px', alignItems: 'center', display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg1}), url(${bg2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top left, top right', backgroundSize: '60%, 60%', }}>
                <ToastContainer />
                <div  sx={{ padding: '20px', maxWidth: '400px', borderRadius: '10px', boxShadow: 'none', }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Sign In
                        </Typography>
                    </Box>
                    <form onSubmit={handleSignIn} style={{margin: " 0px 0px"}}>
                        <TextField
                            type="text"
                            placeholder="E-mail"
                            name="condition"
                            value={data.condition}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            style={{background: "white"}}
                        />
                        <div style={{ position: 'relative', width: '100%' }}>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                style={{background: "white"}}
                                InputProps={{
                                    endAdornment: (
                                        <Button onClick={handleTogglePassword} edge="end" style={{display:"flex", justifyContent: "flex-end", paddingRight: "0px"}}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </Button>
                                    ),
                                }}
                            />
                        </div>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#393bc5', borderRadius: '50px' }}>
                            Sign In
                        </Button>
                    </form>
                    <Typography variant="body2" gutterBottom align="center" style={{ marginTop: '10px' }}>
                        <Link to="/ForgotPassword" style={{ color: '#393bc5', textDecoration: 'none' }}>Forgot your password?</Link>
                    </Typography>
                    <Typography variant="body2" gutterBottom align="center" style={{ marginTop: '10px' }}>
                        Don't have an account?<Link to="/SignUp" style={{ color: "#393bc5", textDecoration: 'none' }}> Sign up now</Link>
                    </Typography>

                </div>
            </div>
        </div>
    );
};

export default SignIn;