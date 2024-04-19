import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import logo from "./image/logo.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(email);
            const formdata = new FormData();
            formdata.append("email", email);
            console.log("adsasdads",);
            const response = await axios.post('http://139.59.58.53:2424/cardapi/v1/forgot_password', 
                formdata
            );
            console.log(response.data); 
            toast.success("Check Email For Reset Link")
           
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToastContainer/>
            <Paper elevation={3} sx={{ padding: '20px', maxWidth: '400px', borderRadius: '10px', boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto', marginBottom: '20px' }} />
                    <Typography variant="h5" gutterBottom>
                        Forgot Password
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#393bc5', borderRadius: '50px' }} disabled={loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>
                    {error && <Typography variant="body2" color="error" gutterBottom style={{ marginTop: '10px' }}>
                        {error}
                    </Typography>}
                </form>
                <Typography variant="body2" gutterBottom align="center" style={{ marginTop: '10px' }}>
                    Remembered your password? <Link to="/" style={{ color: "#393bc5", textDecoration: 'none' }}>Sign In</Link>
                </Typography>
            </Paper>
        </div>
    );
};

export default ForgotPassword;
