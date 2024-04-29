
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button, Grid, TextField, Popover, IconButton } from '@mui/material';
import './FIrst.css';
import { KeyboardArrowUp, KeyboardArrowDown, Close } from '@mui/icons-material';
import flag from './image/flag.png'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import ReactPlayer from 'react-player'
import logo from './image/logo.png';
import badges1 from './image/1.png';
import badges2 from './image/2.png';
import badges3 from './image/3.png';
import bg1 from './image/bg1.png';
import bg2 from './image/bg2.png';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import karzio from '../src/image/karzio.mp4'
import { Facebook, Instagram, LinkedIn, Language } from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';

const AboutUs = (props) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const handleMouseEnter = (className) => {
    setSelectedClass(className);
    setIsExpanded((prevState) => ({
      ...prevState,
      [className]: true
    }));
  };
  const TokenId = localStorage.getItem('token')




  const handleMouseLeave = (className) => {
    setSelectedClass('');
    setIsExpanded((prevState) => ({
      ...prevState,
      [className]: false
    }));
  };


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    company_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };





  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));




  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-demo' : undefined;


  const [currentIndex2, setCurrentIndex2] = useState(0);



  const submitdemo = () => {
    // Check if any required field is empty
    if (!formData.username || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields.');
      return; // Exit the function if any field is empty
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${TokenId}`);
  
    const formdata = new FormData();
    formdata.append("username", formData.username);
    formdata.append("email", formData.email);
    formdata.append("phone", formData.phone);
    formdata.append("company_name", formData.company_name);
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("https://134.209.153.179/cardapi/v1/data_store", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Reset form data
        setFormData({
          username: '',
          email: '',
          phone: '',
          company_name: ''
        });
        return response.text();
      })
      .then((result) => {
        if (result.includes("Email already exists...")) {
          toast.warn('Email already exists...');
        } else {
          toast.success('Thank you for visiting. Our team will reach you soon.');
          console.log("============== sent success ==============>", result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };




  //************************************************* */

  const drawerWidth = 240;
  const navItems = ['About Us', 'Pricing'];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            {/* <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton> */}
            <Button style={{ fontFamily: 'Inter, sans-serif', padding: '10px' }} sx={{ color: '#546fff', border: '1px solid #546fff' }}>
              Get Started Free
            </Button>
            <Button onClick={handlePopoverOpen} style={{ marginLeft: '20px', fontFamily: 'Inter, sans-serif', padding: '10px', backgroundColor: '#546fff' }} sx={{ color: 'white' }}>
              Request A Demo
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  //******
  return (
    <div style={{ backgroundColor: '#fffefe' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={{ background: 'white', color: "black", justifyContent: 'center' }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: 'flex', alignItems: "center" }}
            >
              {/* MUI */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img className="egg" src={logo} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} alt="Logo" />
              </Link>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000', }}>
                <span style={{ flexGrow: 1, color: '#000', fontWeight: 'bold', marginLeft: "10px" }}>Data</span> Mines
              </Typography>
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box className="main-header" >
              <div style={{ flexDirection: 'row', display: 'flex',gap:'20px', alignItems: "center" }}>
                <Link className='pricing' to='/aboutus'>

                <Typography variant='h6' style={{ color: 'black', fontSize: '1rem' }} >About Us</Typography>
                </Link>
                <Link className='pricing' to='/pricing'>
                  <Typography variant="h6" style={{ color: 'black', fontSize: '1rem' }}>Pricing</Typography>
                </Link>
              </div>
              <div style={{ display: 'flex', margin: '20px 0px', justifyContent: 'flex-end' }} >
                <Link to='/SignIn'>

                <Button className='getstarted-btn'>
                    Get Started Free
                  </Button>
                </Link>
                <Button onClick={handlePopoverOpen} className='request-btn'>
                  Request A Demo
                </Button>
              </div>
            </Box>

          </Toolbar>
        </AppBar>
        <ToastContainer />
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            anchor='right'
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              justifyContent: "center"
            }}
          >
             {mobileOpen && (
          <div className="mobile-menu-content">
            <Close onClick={handleDrawerToggle} style={{margin: '20px'}}/>

             <div class="drawer-links">
              <Link className='pricing' to='/aboutus'>
                <Typography variant='h6' style={{ color: 'black', paddingRight: '10px' }} >About Us</Typography>
              </Link>
              <Link className='pricing' to='/pricing'>
                <Typography variant="h6" style={{ color: 'black' }}>Pricing</Typography>
              </Link>
            </div>
            <div class="drawer-btn">
              <Link to='/SignIn'>
                <Button style={{ fontFamily: 'Inter, sans-serif', marginBottom: "20px", width: '200px' }} sx={{ color: '#546fff', border: '1px solid #546fff' }} >
                  Get Started Free
                </Button>
              </Link>
              <Button onClick={handlePopoverOpen} style={{ fontFamily: 'Inter, sans-serif', padding: '10px', backgroundColor: '#546fff' }} sx={{ color: 'white' }}>
                Request A Demo
              </Button>
            </div>
          </div>
        )}
            {/* </Box> */}
          </Drawer>
        </nav>
      </Box>
      <br /><br /><br /><br /><br /><br />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
  <h1 style={{ color: '#546FFF', marginBottom: '20px', width: '90vw', textAlign: 'left' }}>About Us</h1>
  <div style={{ height: 'auto', width: '90vw', backgroundColor: '#546FFF', justifyContent: 'center', display: 'flex', flexDirection: 'column', padding: '20px' }}>
    <p style={{ margin: '10px', color: '#fff', textAlign: 'left' }}>OUR VISION</p>
    <h2 style={{ margin: '10px', color: '#fff', textAlign: 'left' }}>To achieve the same level of widespread adoption for Machine Learning as seen with databases.</h2>
    <p style={{ margin: '10px', color: '#fff', textAlign: 'left' }}>Due to Oracle's dominance, there are no competing companies in the database market. Through our services, all companies will harness the power of Machine Learning.</p>
  </div>
</div>

      <div style={{ marginTop: '40px', padding: '20px', textAlign: 'center' }}>
        <img src={badges1} style={{ height: '150px', gap: '20px' }} alt="" />
        <img src={badges2} style={{ height: '150px', gap: '20px' }} alt="" />
        <img src={badges3} style={{ height: '150px', gap: '20px' }} alt="" />
      </div>
      <div style={{ height: '100vh', position: 'relative'}}>
        <div style={{ height: '50vh', width: '100%' }} />
        <div className='Query' style={{ width: '90%', marginLeft: '5%', marginRight: '5%', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex: 100, justifyContent: 'center', alignSelf: 'center', display: 'flex' }} >
          <Grid item xs={12} md={9} style={{ backgroundColor: '#fefdff', borderRadius: '10px', border: '1px solid #D3D3D3', padding: '20px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontFamily: 'Inter, sans-serif' }}>Send a Query</Typography>
            <Grid container spacing={4}>

              <Grid item xs={12} md={8}>

                <div style={{ textAlign: 'left' }}>
                  <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}></Typography>
                  <TextField label="Your Work Email" fullWidth style={{ marginBottom: '10px' }} />
                  <TextField label="Your Phone Number" fullWidth style={{ marginBottom: '10px' }} />
                  <TextField label="How can we help you" fullWidth multiline rows={4} style={{ marginBottom: '10px' }} />
                <ToastContainer />

                  <Button onClick={submitdemo} variant="contained" style={{ backgroundColor: '#546fff', fontFamily: 'Inter, sans-serif' }}>Submit a Query</Button>
                </div>
              </Grid>
              <div></div>
              <Grid item xs={12} md={4}>
                <div style={{ textAlign: 'left', borderLeft: '1px solid #ccc', height: '100%', paddingLeft: '30px' }}>
                  <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Talk to an AI expert</Typography>
                  <Typography variant="body1" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Get a free 15-minute consultation with our Automation experts. We can discuss Pricing, Integrations or try the app live on your own documents.</Typography>
                  <Button onClick={handlePopoverOpen} variant="contained" style={{ backgroundColor: '#546fff', fontFamily: 'Inter, sans-serif' }}>Request A Demo</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorReference={"none"}
            onClose={handlePopoverClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="close"
              size="small"
              style={{ position: 'absolute', top: '5px', right: '5px' }}
              onClick={handlePopoverClose}
            >
              <Close />
            </IconButton>
            <div className='pop1' style={{ padding: '20px', width: '50vw', height: '70vh', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" gutterBottom style={{ fontFamily: 'Inter, sans-serif', marginBottom: '20px', color: 'black' }}>
                Request A Demo
              </Typography>
              <TextField name="username" label="Your Name" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <TextField name="email" label="Your Email" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <TextField name="phone" label="Your Phone Number" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <TextField name="company_name" label="Company Name" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <ToastContainer/>
              <Button onClick={submitdemo} variant="contained" style={{ backgroundColor: '#546fff', color: 'white', width: '60%', borderRadius: '5px', padding: '12px', fontFamily: 'Inter, sans-serif' }}>
                Submit
              </Button>
            </div>
          </Popover>
        </div>
        <div style={{ backgroundColor: '#2b3570', height: '60vh', justifyContent: 'flex-end', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://www.facebook.com/kraziocloud?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Facebook /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://twitter.com/KrazioCloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><XIcon /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://instagram.com/krazio_cloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Instagram /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://linkedin.com/company/krazio-cloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><LinkedIn /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://kraziocloud.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Language /></a>
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px' }}><a href='https://www.kraziocloud.com' style={{ color: '#fff', textDecoration: 'none' }}>
                A Product of Krazio Cloud Pvt. Ltd. (Proudly Made in </a></Typography>
              <img src={flag} style={{ height: '23px', width: '23px', marginRight: '5px', marginLeft: '5px' }} />
              <Typography variant='body1' style={{ color: '#fff' }}> )</Typography>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default AboutUs
