import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
    MenuItem,
    Typography,
    Paper,
    AppBar,
    Toolbar,
    Grid,
    Box,
} from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo1 from "./image/logo1.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase.config';



const SignUp = () => {
    const navigate = useNavigate();
    const defaultData = {
        username: '',
        email: '',
        password: '',
        company_name: '',
        person_name: '',
        business_type: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    };
    const [data, setData] = useState({ ...defaultData });
    const [localId, setLocalId] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const handleCaptchaVerification = () => {
        // Perform CAPTCHA verification
        // If verification is successful, set captchaVerified to true
        setCaptchaVerified(true);
        console.log("Asdasdasd");
    }
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setData({ ...data, [e.target.name]: e.target.value.toLowerCase() });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (e) => {


        e.preventDefault();
        console.log("asdasd", e);
        // If OTP has not been sent yet, send OTP

        if (!data.username || !data.email || !data.password || !data.company_name || !data.person_name || !data.business_type || !data.city || !data.state || !data.country || !data.pincode || !phone) {
            toast.error('All fields are required');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toast.error('Invalid email address');
            return;
        }

        if (!otpVerified) {
            toast.error('Please verify OTP before signing up');
            return;
        }
        const pincodeRegex = /^\d{6}$/; // 6 digits pincode
        if (!pincodeRegex.test(data.pincode)) {
            toast.error('Invalid pincode. Please enter a valid 6-digit pincode');
            return;
        }

        const formData = new FormData();
        const newData = { ...data };

        for (let key in newData) {
            formData.append(key, newData[key]);
        }
        formData.append("type", "user");
        console.log("phoneeee", phone);
        formData.append("contact_no", phone)
        console.log("=-----------==========>", formData);
        try {
            const response = await axios.post(`http://139.59.58.53:2424/cardapi/v1/register?user_id=${localId}`, formData);
            console.log("=========  res data   ============> Registration successful:", response.data);
            if (response.data.statusCode == 200) {
                toast.success('sign up successfully')
                setTimeout(() => {
                    localStorage.removeItem('uid');
                    navigate('/SignIn');
                }, 2000);
            }
            else {
                toast.success(`${response.data.message}`)
            }

        } catch (error) {
            console.error("Registration failed:", error);
        }
    }


    const [user, setUser] = useState("")
    const [otp1, setOtp1] = useState("")
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [confirmationResult, setConfirmationResult] = useState(null);

    // useEffect(() => {
    //     if (otpSent && !otpVerified) {
    //         initializeRecaptcha();
    //     }
    // }, [otpSent, otpVerified]);

    // const initializeRecaptcha = () => {
    //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //         "recaptcha-container",
    //         {
    //             size: "invisible",

    //         }
    //     );
    // }


    const sendOtp = async (e) => {
        e.preventDefault();

        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
                'size': 'invisible',
            });

            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
            console.log("Adsasdads", confirmation);
            setUser(confirmation);
            setOtpSent(true);
            toast.success('OTP sent successfully');
            handleCaptchaVerification();

            // Attempt auto-verification

        } catch (err) {
            console.log("asdasd", err);
            toast.error('Failed to send OTP. Please try again.');
        }
    };


    // const sendOtp = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    //         setConfirmationResult(confirmation);
    //         setOtpSent(true);
    //         toast.success('OTP sent successfully');
    //     } catch (err) {
    //         console.error(err);
    //         toast.error('Failed to send OTP. Please try again.');
    //     }
    // };
    const verifyOtp = async (e) => {



        e.preventDefault();
        try {
            const dataaa = await user.confirm(otp1);
            if (dataaa && dataaa.user && dataaa.user.uid) {
                setLocalId(dataaa.user.uid);
                localStorage.setItem("uid", JSON.stringify(dataaa.user.uid));
                setOtpVerified(true);
                toast.success('OTP is verified')
            } else {
                toast.error('OTP is invalid');
            }
        } catch (error) {
            console.log(error);
            toast.error('OTP verification failed');
        }
    }


    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column' }}>
            <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
                <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to = '/'>
                        <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
                        </Link>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
                            <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data</span> Mines
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            
            <ToastContainer />
            <Paper style={{ boxShadow: 'none' }} elevation={3} sx={{
                padding: {
                    xs: '5px', // Padding for extra small screens
                    sm: '5px', // Padding for small screens
                    md: '5px', // Padding for medium screens
                    lg: '20px', // Padding for large screens
                    xl: '20px', // Padding for extra large screens
                },
                maxWidth: '800px',
                borderRadius: '10px',
                margin: '15px'
            }}>
                
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={otpSent ? handleSignUp : sendOtp}>
                    <Grid container spacing={2} justifyContent="center">
                        {/* First group */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Company Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Company Name"
                                name="company_name"
                                value={data.company_name}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Person Name"
                                name="person_name"
                                value={data.person_name}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="User Name"
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Business Type"
                                name="business_type"
                                value={data.business_type}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            >
                                <MenuItem value="agriculture">Agriculture</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="construction">Construction</MenuItem>
                                <MenuItem value="financial_services">Financial Services</MenuItem>
                                <MenuItem value="forestry">Forestry</MenuItem>
                                <MenuItem value="mining">Mining</MenuItem>
                                <MenuItem value="transportation">Transportation</MenuItem>
                                <MenuItem value="entertainment">Entertainment</MenuItem>
                                <MenuItem value="healthcare">Healthcare</MenuItem>
                                <MenuItem value="insurance">Insurance</MenuItem>
                                <MenuItem value="chemical_substance">Chemical Substance</MenuItem>
                                <MenuItem value="energy">Energy</MenuItem>
                                <MenuItem value="foodservice">Foodservice</MenuItem>
                                <MenuItem value="retail">Retail</MenuItem>
                                <MenuItem value="technology">Technology</MenuItem>
                                <MenuItem value="wholesale_trade">Wholesale Trade</MenuItem>
                                <MenuItem value="fashion">Fashion</MenuItem>
                                <MenuItem value="manufacturing">Manufacturing</MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="automotive">Automotive</MenuItem>
                                <MenuItem value="biotechnology">Biotechnology</MenuItem>
                                <MenuItem value="human_services">Human Services</MenuItem>
                                <MenuItem value="consumer">Consumer</MenuItem>
                                <MenuItem value="defence">Defence</MenuItem>

                            </TextField>
                        </Grid>
                        {/* Second group */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Location Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="City"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="State"
                                name="state"
                                value={data.state}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Country"
                                name="country"
                                value={data.country}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Pincode"
                                name="pincode"
                                value={data.pincode}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        {/* Third group */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Account Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} flexDirection={"row"}>
                            <PhoneInput
                                country={'us'}
                                value={phone}
                                onChange={(phone) => setPhone("+" + phone)}
                                inputStyle={{ width: '100%', height: '50px', borderRadius: '5px', border: '1px solid #ccc' }}
                                containerStyle={{ marginBottom: '16px' }}
                            />
                            <Grid item md={3} xs={5}>


                                <div style={{ marginBottom: '10px' }} id='recaptcha'></div>

                                <Grid container>
                                    <Grid item xs={12}>
                                        {otpSent && (
                                            <>
                                                <TextField onChange={(e) => setOtp1(e.target.value)} variant='outlined' label='Enter OTP' />

                                                <Button type='button' variant="contained" style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: '#393bc5', color: 'white', borderRadius: '50px', width: '100%' }} onClick={verifyOtp}>Verify OTP</Button>

                                            </>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Button type="submit" variant="contained" style={{ backgroundColor: '#393bc5', borderRadius: '50px' }} fullWidth>
                                {!otpSent ? "Send Otp" : "Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center' marginTop='10px'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" gutterBottom align="center">
                                Already a user?<Link to="/SignIn" style={{ color: '#393bc5', textDecoration: 'none' }}> Please Login</Link>
                            </Typography>
                        </div>
                    </Grid>

                </form>
            </Paper>
        </div>
    );
};

export default SignUp;