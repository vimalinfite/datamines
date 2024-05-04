
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button, Grid, TextField, Popover, IconButton } from '@mui/material';
import './Pricing.css'
import { Close } from '@mui/icons-material';
import flag from './image/flag.png'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './image/logo.png';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Facebook, Instagram, LinkedIn, Language } from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';


const Pricing = (props) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const TokenId = localStorage.getItem('token')


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

    fetch("http://134.209.153.179/cardapi/v1/data_store", requestOptions)
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
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to='/' style={{ textDecoration: 'none' }} >
              <div className='flex justify-center items-center' >
                <img src={logo} alt="" className='h-[90px] m-2'/>
                <p className='text-xl'>
                  <span className='font-bold '>Data</span> Mines
                </p>

              </div>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box className="main-header" >
              <div style={{ flexDirection: 'row', display: 'flex', gap: '20px', alignItems: "center" }}>
                <Link className='pricing' to='/aboutus'>
                  <Typography variant='h6' style={{ color: 'black', fontSize: '14px' }} >About Us</Typography>
                </Link>
                <Link className='pricing' to='/pricing'>
                  <Typography variant="h6" style={{ color: 'black', fontSize: '14px' }}>Pricing</Typography>
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
              display: { xs: 'flex', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              justifyContent: "center"
            }}
          >
            {mobileOpen && (
              <div className="mobile-menu-content">
                <Close onClick={handleDrawerToggle} style={{ margin: '20px' }} />

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
      <br /><br /><br /><br />
      <div className='grido' style={{ fontFamily: 'Montserrat, sans-serif', background: '#f7f7ff', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
        <header className='text101' style={{ color: '#393bc5', margin: '2rem 0',padding:'0 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: '#3E4B72', fontSize: '2rem', textAlign: 'center' }}>Simple and Transparent Pricing</p>
          <p style={{ color: '#354454', fontSize: '1rem',textAlign:'center' }}>Find the right plan for you, or seek help from experts</p>
        </header>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
          <div
            style={{
              background: '#fff',
              color: '#000',
              borderRadius: '0.8rem',
              boxShadow: 'inset 0 6px #98D6FB, 0 1px 4px rgba(0,0,0,.04)',
              margin: '10px',
              height: '55vh',
              transition: 'transform 0.3s',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ul style={{ listStyleType: 'none', margin: '2.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <li style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem 0', fontWeight: '600' }}>BASIC</li>
              <li style={{ fontSize: '2rem', color: '#000', paddingBottom: '2rem' }} className="price bottom-bar">
                ₹3000 + GST
              </li>
              <li className="bottom-bar">1000 Card Credit</li>
              <li className="bottom-bar">1 Year - Credit Usage Time</li>
              <li className="bottom-bar">Download into Excel & PDF</li>
              <li className="bottom-bar">Mail Support</li>
              <li className="bottom-bar">‎ </li>

              <li>
                <button onClick={handlePopoverOpen} style={{ marginTop: '1rem', height: '2.6rem', width: '13.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', background: '#393bc5', color: '#fff', outline: 'none', border: '0', fontWeight: 'bold', transition: 'transform 0.3s' }}>Order Now</button>
              </li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#fff', color: '#000', borderRadius: '0.8rem', boxShadow: 'inset 0 6px #BDD1C5, 0 1px 4px rgba(0,0,0,.04)', margin: '10px', height: '55vh',transition: 'transform 0.3s',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
            <ul style={{ listStyleType: 'none', margin: '2.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <li style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem 0', fontWeight: '600' }}>STANDARD</li>
              <li style={{ listStyleType: 'none', fontSize: '2rem', color: '#000', paddingBottom: '2rem' }} className="price bottom-bar">
                ₹6250 + GST
              </li>
              <li className="bottom-bar">2500 Card Credit</li>
              <li className="bottom-bar">1 Year - Credit Usage Time</li>
              <li className="bottom-bar">Download into Excel & PDF</li>
              <li className="bottom-bar">Mail Support</li>
              <li className="bottom-bar">‎ </li>

              <li>
                <button onClick={handlePopoverOpen} style={{ marginTop: '1rem', height: '2.6rem', width: '13.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', background: '#393bc5', color: '#fff', outline: 'none', border: '0', fontWeight: 'bold' }}>Order Now</button>
              </li>
            </ul>
          </div>
          <div style={{ background: '#fff', color: '#000', borderRadius: '0.8rem', boxShadow: 'inset 0 6px #E8B096, 0 1px 4px rgba(0,0,0,.04)', margin: '10px', textDecoration: 'none', height: '55vh',transition: 'transform 0.3s',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
            <ul style={{ listStyleType: 'none', margin: '2.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', textDecoration: 'none' }}>
              <li style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem 0', textDecoration: 'none', fontWeight: '600' }}>PREMIUM</li>
              <li style={{ fontSize: '2rem', color: '#000', paddingBottom: '2rem', textDecoration: 'none' }} className="price bottom-bar">
                ₹10000 + GST
              </li>
              <li style={{ textDecoration: 'none' }} className="bottom-bar">5000 Card Credit</li>
              <li className="bottom-bar">2 Year - Credit Usage Time</li>
              <li className="bottom-bar">Download into Excel & PDF</li>
              <li className="bottom-bar">Mail & Call Support</li>
              <li className="bottom-bar">‎ </li>

              <li>
                <button onClick={handlePopoverOpen} style={{ marginTop: '1rem', height: '2.6rem', width: '13.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', background: '#393bc5', color: '#fff', outline: 'none', border: '0', fontWeight: 'bold' }}>Order Now</button>
              </li>
            </ul>
          </div>
          <div style={{ background: '#fff', color: '#000', borderRadius: '0.8rem', boxShadow: 'inset 0 6px #EFCC8C, 0 1px 4px rgba(0,0,0,.04)', margin: '10px', textDecoration: 'none', height: '55vh',transition: 'transform 0.3s',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>
            <ul style={{ listStyleType: 'none', margin: '2.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', textDecoration: 'none' }}>
              <li style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem 0', textDecoration: 'none', fontWeight: '600' }}>GOLD</li>
              <li style={{ fontSize: '2rem', color: '#000', paddingBottom: '2rem', textDecoration: 'none' }} className="price bottom-bar">
                ₹15000 + GST
              </li>
              <li style={{ textDecoration: 'none' }} className="bottom-bar">10000 Card Credit</li>
              <li className="bottom-bar">3 Year - Credit Usage Time</li>
              <li className="bottom-bar">Download into Excel & PDF</li>
              <li className="bottom-bar">Mail & Call Support</li>
              <li className="bottom-bar">Free NFC Card</li>
              <li>
                <button onClick={handlePopoverOpen} style={{ marginTop: '1rem', height: '2.6rem', width: '13.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', background: '#393bc5', color: '#fff', outline: 'none', border: '0', fontWeight: 'bold' }}>Order Now</button>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div style={{ height: '100vh', position: 'relative' }}>
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
                  <Button onClick={submitdemo} variant="contained" style={{ backgroundColor: '#546fff', fontFamily: 'Inter, sans-serif' }}>Submit a Query</Button>
                </div>
              </Grid>
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
            <div className='pop1' style={{ padding: '20px', width: '50vw', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>

              <Typography variant="h4" gutterBottom style={{ fontFamily: 'Inter, sans-serif', marginBottom: '20px', color: 'black' }}>
                Request A Demo
              </Typography>
              <TextField name="username" label="Your Name" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <TextField name="email" label="Your Email" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <TextField name="phone" label="Your Phone Number" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <TextField name="company_name" label="Company Name" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
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
              <Typography variant='body1' style={{ color: '#fff', fontSize: '13px' }}><a href='https://www.kraziocloud.com' style={{ color: '#fff', textDecoration: 'none' }}>
                A Product of Krazio Cloud Pvt. Ltd. (Proudly Made in </a></Typography>
              <img src={flag} style={{ height: '23px', width: '23px', marginRight: '5px', marginLeft: '5px' }} />
              <Typography variant='body1' style={{ color: '#fff' }}> )</Typography>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Pricing;