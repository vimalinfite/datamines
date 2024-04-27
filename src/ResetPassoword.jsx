import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Box,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from "./image/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emailParam = searchParams.get('uuid');
        setEmail(emailParam);
    }, [location]);

    const handleTogglePasswordVisibility = (type) => {
        if (type === 'newPassword') {
            setShowPassword(!showPassword);
        } else if (type === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            const formdata = new FormData();
            formdata.append("password", newPassword);
            formdata.append("confirm_password", confirmPassword);

            const response = await axios.post(`https://134.209.153.179/cardapi/v1/reset_password?uuid=${email}`,
                formdata
            );

            console.log(response.data);
            toast.success("Password changed successfully...")

        } catch (error) {
            toast.error("An error occurred while changing password")
            console.log(error.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToastContainer />
            <Paper elevation={3} sx={{
                padding: '20px',
                maxWidth: '400px',
                borderRadius: '10px',
            }} style={{ boxShadow: 'none' }}>
                <Box sx={{ display: 'flex',  alignItems: 'center' ,justifyContent:'center'}}>
                    <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto', marginBottom: '20px' }} />
                    <Typography variant="h6" gutterBottom style={{ marginLeft: '10px' }}>
    Data Mines
  </Typography>
                </Box>
                <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: '20px' }}>
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Enter Your New Password"
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleTogglePasswordVisibility('newPassword')}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleTogglePasswordVisibility('confirmPassword')}>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ borderRadius: '50px', backgroundColor: '#393bc5' }} type="submit" variant="contained" disabled={loading} fullWidth>
                                {loading ? 'Loading...' : 'Reset Password'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export default ResetPassword;
