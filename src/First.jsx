
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button, Grid, TextField, Popover, IconButton } from '@mui/material';
import './FIrst.css';
import download1 from './image/download1.png'
import download2 from './image/download2.png'
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
import karzio from '../src/image/krazio.mp4'
import { Facebook, Instagram, LinkedIn, Language } from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';

function First(props) {
  const [selectedClass, setSelectedClass] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [download1, download2]; // Array of image paths
  const isSmallScreen2 = false; // You can define this based on your requirement

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Incrementing the current image index
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds (5000 milliseconds)

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [images.length]);

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
  const [formData2, setFormData2] = useState({
    username: '',
    email: '',
    phone: '',
    company_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value
    });
  };

  const submitdemo2 = () => {
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
        setFormData2({
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
          handlePopoverClose()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
          handlePopoverClose()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const classContent = {
    "How many cards can I upload at once ?": 'You can upload up to 50 cards in one go',
    "What type of cards can I upload ?": 'You can upload various types of cards, including business cards, ID cards, and membership cards',
    "In what format will I receive the extracted text details ?": 'The extracted text details will be provided in either an Excel file or a PDF file, based on your preference',
    "Smart Decision Engines What if I need assistance with the service ?": 'We offer 24/7 support to assist you with any queries or issues you may encounter. Simply reach out to us, and we will provide prompt assistance',
    "How accurate is the text extraction process ?": 'Our system utilizes artificial intelligence  to ensure accurate text extraction from your uploaded cards, providing you with reliable results',
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

  const testimonials = [
    {
      name: 'John Smith',
      company: 'Nano Enterprises',
      content: "I'm amazed by how quickly the system extracts text details from my uploaded cards. It saves me hours of manual data entry. Plus, the 24/7 support is a game-changer!",
    },
    {
      name: 'Priya Patel',
      company: 'Patel & Sons',
      content: "As a small business owner, I appreciate the efficiency of this product. It's incredibly user-friendly, and the support team is always there when I need them.",
    },
    {
      name: 'Michael Johnson',
      company: 'Arctech Consulting Services',
      content: "This product has transformed the way I manage my contacts. With just a few clicks, I can upload multiple cards and receive the extracted details in a convenient format. Highly recommended!",
    },
    {
      name: 'Amit Sharma',
      company: 'Craziwings solutions',
      content: "I rely on this product for its accuracy and reliability. It never fails to deliver precise text details from my cards, allowing me to streamline my work"

    },
    {
      name: 'Emily Jones',
      company: 'Marketing Agency',
      content: "I've tried several similar products, but none compare to the speed and efficiency of this one. The ability to upload 50 cards at once and receive the details in Excel or PDF format is unmatched"

    },
    {
      name: 'Rajesh Kumar',
      company: 'Legal Services',
      content: "I'm impressed by the seamless experience offered by this product. It simplifies the process of digitizing business cards, and the round-the-clock support ensures that I never face any downtime"

    }

  ];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex2((prevIndex) => (prevIndex === testimonials.length - 3 ? 0 : prevIndex + 3));
    }, 4000); // Change slide duration as needed (e.g., every 2 seconds)

    return () => clearInterval(interval);
  }, [testimonials.length]);


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

  //************************************************* */

  return (
    <div style={{ backgroundColor: '#fffefe' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={{ background: 'white', color: "black", justifyContent: 'center' }}>
          <Toolbar style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            {/* <Link to='/' style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <img src={logo} style={{height:'90px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px'}} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000', marginLeft: '10px' }}>
                  <span style={{ flexGrow: 1, color: '#000', marginLeft: '10px', fontWeight: 'bold' }}>Data</span> Mines
                </Typography>
              </div>
            </Link> */}
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

                <div className="drawer-links">
                  <Link className='pricing' to='/aboutus'>
                    <Typography variant='h6' style={{ color: 'black', paddingRight: '10px' }} >About Us</Typography>
                  </Link>
                  <Link className='pricing' to='/pricing'>
                    <Typography variant="h6" style={{ color: 'black' }}>Pricing</Typography>
                  </Link>
                </div>
                <div className="drawer-btn">
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

      <div className='divput' style={{ height: '60vh', marginTop: '90px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg1}), url(${bg2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top left, top right', backgroundSize: '50%, 50%' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography className='put' style={{ color: 'black', fontSize: '1.9rem', fontWeight: '600', lineHeight: '48px', fontFamily: 'Inter, sans-serif' }}>Discover insights in documents and automate tasks <br /> with AI workflows for efficiency</Typography><br />
          <Typography className='uncover' variant="body1" style={{ color: 'black', fontSize: '16px', fontWeight: '400', lineHeight: '24px', fontFamily: 'Inter, sans-serif' }}>Unlock insights from documents and automate tasks with AI workflows</Typography>
          <Link to={"/SignIn"}>
            <Button style={{ marginTop: '20px', fontFamily: 'Inter, sans-serif', padding: '10px' }} sx={{ color: '#546fff', border: '1px solid #546fff' }}>
              Get Started Free
            </Button>
          </Link>
          <Button onClick={handlePopoverOpen} style={{ marginLeft: '20px', marginTop: '20px', fontFamily: 'Inter, sans-serif', padding: '10px', backgroundColor: '#546fff' }} sx={{ color: 'white' }}>
            Request A Demo
          </Button>
        </div>
      </div>
      <Grid container justifyContent="center" spacing={4} style={{ marginTop: '40px', padding: '20px', textAlign: 'center' }}>
        <Grid item xs={12} md={4.5}>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '556px', borderRadius: '10px', backgroundColor: '#f4f9ff', padding: '32px' }}>
            <img src="https://assets-global.website-files.com/602f5458a0b1d868c6c84d5b/64d0bd1c2907f799c97e4bd2_Frame%201000001746.png" alt="Company logos" style={{ maxWidth: '100%', marginBottom: '32px' }} />
            <Typography variant="h4" style={{ marginBottom: '20px', fontSize: '30px', fontWeight: '600', lineHeight: '40px', fontFamily: 'Inter, sans-serif' }}>Aggregate all your data in one place</Typography>
            <Typography variant="body1" style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '400', lineHeight: '24px', fontFamily: 'Inter, sans-serif' }}>
              Utilize Data Mines AI to extract valuable information from unstructured data sources from any documents and breaking down data barriers, transforming unstructured data into actionable insights
            </Typography>
          </Grid>
        </Grid>
        {/* Space between grids */}

        <Grid item xs={12} md={4.5}>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '556px', borderRadius: '10px', backgroundColor: '#f4f9ff', padding: '32px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', fontSize: '30px', fontWeight: '600', lineHeight: '40px', fontFamily: 'Inter, sans-serif' }}>Let AI handle your business tasks for you</Typography>
            <Typography variant="body1" style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '400', lineHeight: '24px', fontFamily: 'Inter, sans-serif' }}>
              Datamines easy-to-use platform automates complicated processes without any coding. Our smart decision engines help your team make quicker, smarter choices
            </Typography>
            <img src="https://assets-global.website-files.com/602f5458a0b1d868c6c84d5b/64cf618ad9d267abe700ff45_a2.png" alt="Company logos" style={{ maxWidth: '100%', marginBottom: '32px' }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={4} style={{ marginTop: '40px', padding: '20px', textAlign: 'center' }}>
        <Grid item xs={12} md={9}>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '300px', borderRadius: '10px', backgroundColor: '#262c4d', padding: '32px' }}>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#8d9fff' }}>
                DISCOVER NEW OPPORTUNITY
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* Wrap the text in a Typography component with variant="body1" */}
              <Typography className='ty1' variant="body1" style={{ marginBottom: '20px', fontSize: '36px', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: '#e4e8ff' }}>
                Automate quickly - <br /> get started now!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handlePopoverOpen} style={{ fontFamily: 'Inter, sans-serif', padding: '10px', backgroundColor: '#546fff' }} sx={{ color: 'white' }}>
                Request A Demo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '40px' }}>
        <Typography className='font1' variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#546fff', paddingBottom: '20px' }}>How it operates</Typography>
        <Typography className='font2' variant="body1" style={{ fontSize: '2rem', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: 'black', textAlign: 'center' }}>Facilitate complete process automation</Typography>
        <video src={karzio} loop muted controls={true} style={{ width: '60vw', maxHeight: '60vh', marginTop: '20px' }} />
      </div>



      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography className='font1' variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#546fff', paddingBottom: '20px' }}>UNCOVER NEW POSSIBILITIES</Typography>
        <Typography className='font2' variant="body1" style={{ fontSize: '2rem', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: 'black', textAlign: 'center' }}>
          How businesses use Data Mines AI
        </Typography>
      </div>
      <div>
        <Grid className='girdog' container justifyContent="center" spacing={4} style={{ textAlign: 'left', paddingLeft: '10px', paddingRight: '10px', height: isSmallScreen ? '750px' : '' }}>
          <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column' }}>
            <Grid container style={{ height: '100%', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
              {/* Render dropdown text lines */}
              {Object.keys(classContent).map((className, index) => (
                <div
                  key={index}
                  style={{ cursor: 'pointer', marginBottom: isSmallScreen ? '8px' : '16px' }}
                  onMouseEnter={() => handleMouseEnter(className)}
                  onMouseLeave={() => handleMouseLeave(className)}
                  onClick={() => setIsExpanded((prevState) => ({ ...prevState, [className]: !prevState[className] }))}
                >
                  <Typography
                    className='ty'
                    variant="body2"
                    style={{
                      fontSize: isSmallScreen ? '16px' : '20px',
                      fontWeight: '500',
                      lineHeight: isSmallScreen ? '24px' : '32px',
                      fontFamily: 'Inter, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {className}
                    {isExpanded[className] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </Typography>
                  {/* Render content when class is hovered */}
                  {isExpanded[className] && (
                    <Typography
                      variant="body1"
                      style={{ fontSize: '16px', fontWeight: '400', lineHeight: '20px', fontFamily: 'Inter, sans-serif', paddingTop: '10px' }}
                    >
                      {classContent[className]}
                    </Typography>
                  )}
                  <div style={{ borderBottom: '1px solid #D3D3D3', marginBottom: '10px', marginTop: '10px' }} />
                </div>
              ))}
            </Grid>
          </Grid>
          {/* Grid 2 */}
          <Grid item xs={12} md={4.5}>
            <Grid container style={{ borderRadius: '10px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={images[currentImageIndex]}
                alt="Company logos"
                style={{ maxWidth: '100%', height: isSmallScreen ? 'auto' : '50vh', width: 'auto' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography className='font1' variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#546fff', paddingBottom: '20px' }}>CUSTOMERS STORIES</Typography>
        <Typography className='font2' variant="body1" style={{ fontSize: '2rem', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: 'black', textAlign: 'center' }}>
          Why Businesses Choose Us for Automation
        </Typography>
      </div>


      <Grid item xs={12} style={{ marginTop: '40px', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
  <div style={{ position: 'relative', width: '100%' }}>
    <Grid container justifyContent="center" spacing={4} style={{ overflowX: 'hidden' }}>
      {testimonials.slice(currentIndex2, currentIndex2 + 3).map((testimonial, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Grid 
            container 
            direction="column" 
            justifyContent="flex-start" 
            alignItems="flex-start" 
            style={{ 
              height: '100%', 
              borderRadius: '10px', 
              backgroundColor: 'white', 
              position: 'relative', 
              border: '1px solid #393bc5', 
              padding: '22px', 
              transition: 'box-shadow 0.3s, border 0.3s',
              boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2)', // Initial box-shadow
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.boxShadow = '0px 0px 25px 0px rgba(0,0,0,0.2)'; // Box-shadow on hover
              e.currentTarget.style.borderColor = '#393bc5'; // Border color on hover
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0.1)'; // Remove box-shadow on mouse leave
              e.currentTarget.style.borderColor = '#393bc5'; // Restore border color on mouse leave
            }}
          >
            <img src={logo} alt="Person" style={{ borderRadius: '50%', width: '80px', height: '80px', marginBottom: '15px' }} />
            <Typography variant="h6" style={{ marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>{testimonial.name}</Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>{testimonial.company}</Typography>
            <Typography style={{ fontSize: '16px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }} variant="body2">{testimonial.content}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </div>
</Grid>





      <div style={{ marginTop: '40px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <img src={badges1} style={{ height: '150px', gap: '20px' }} alt="" />
        <img src={badges2} style={{ height: '150px', gap: '20px' }} alt="" />
        <img src={badges3} style={{ height: '150px', gap: '20px' }} alt="" />

      </div>



      <Grid container justifyContent="center" spacing={4} style={{ marginTop: '40px', padding: '20px', textAlign: 'center' }}>
        <Grid item xs={12} md={9}>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '300px', borderRadius: '10px', backgroundColor: '#2a2f50', padding: '32px' }}>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#8d9fff' }}>
                DISCOVER NEW OPPORTUNITY
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className='ty1' variant="body1" style={{ marginBottom: '20px', fontSize: '36px', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: '#e4e8ff' }}>
                Automate quickly - <br /> get started now!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handlePopoverOpen} style={{ fontFamily: 'Inter, sans-serif', padding: '10px', backgroundColor: '#546fff' }} sx={{ color: 'white' }}>
                Request A Demo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{ height: '100vh', position: 'relative' }}>
        <div style={{ height: '50vh', width: '100%' }} />
        <div className='Query' style={{ width: '90%', marginLeft: '5%', marginRight: '5%', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex: 100, justifyContent: 'center', alignSelf: 'center', display: 'flex' }} >
          <Grid item xs={12} md={9} style={{ backgroundColor: '#fefdff', borderRadius: '10px', border: '1px solid #D3D3D3', padding: '20px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontFamily: 'Inter, sans-serif' }}>Send a Query</Typography>
            <Grid container spacing={4}>

              <Grid item xs={12} md={8}>

                <div style={{ textAlign: 'left' }}>

                  <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}></Typography>
                  <TextField name="username" value={formData2.username} onChange={handleChange2} label="Your Work Email" fullWidth style={{ marginBottom: '10px' }} />
                  <TextField name="email" value={formData2.email} onChange={handleChange2} label="Your Phone Number" fullWidth style={{ marginBottom: '10px' }} />
                  <TextField name="phone" value={formData2.phone} onChange={handleChange2} label="How can we help you" fullWidth multiline rows={4} style={{ marginBottom: '10px' }} />
                  <ToastContainer />
                  <Button onClick={submitdemo2} variant="contained" style={{ backgroundColor: '#546fff', fontFamily: 'Inter, sans-serif' }}>Submit a Query</Button>
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
            <div className='pop1' style={{ padding: '20px', width: '50vw',alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" gutterBottom style={{ fontFamily: 'Inter, sans-serif', marginBottom: '20px', color: 'black',fontSize:'1.4rem' }}>
                Request A Demo
              </Typography>
              <TextField name="username" label="Your Name" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <TextField name="email" label="Your Email" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <TextField name="phone" label="Your Phone Number" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <TextField name="company_name" label="Company Name" onChange={handleChange} style={{ marginBottom: '10px', width: '60%', borderRadius: '5px' }} />
              <ToastContainer />
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
                <a href="https://www.kraziocloud.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Language /></a>
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
}

export default First;