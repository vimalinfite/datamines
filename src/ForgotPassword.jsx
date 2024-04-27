import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper,AppBar,Toolbar } from '@mui/material';
import logo from "./image/logo.png";
import logo1 from "./image/logo1.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import bg1 from './image/bg1.png';
import bg2 from './image/bg2.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email field is required");
            return;
        }
        setLoading(true);
        try {
            console.log(email);
            const formdata = new FormData();
            formdata.append("email", email);
            console.log("adsasdads",);
            const response = await axios.post('https://134.209.153.179/cardapi/v1/forgot_password', 
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
        <>
        <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Link to='/' style={{textDecoration:'none'}}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
              <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data </span>Mines
            </Typography>
          </div>
          </Link>
        </Toolbar>
      </AppBar>
      <div className='main' style={{ height: '60vh', marginTop: '90px', alignItems: 'center', display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg1}), url(${bg2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top left, top right', backgroundSize: '60%, 60%', }}>
            <ToastContainer/>
            <Paper elevation={3} sx={{ padding: '20px', maxWidth: '400px', borderRadius: '10px', boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        </>
    );
};

export default ForgotPassword;
