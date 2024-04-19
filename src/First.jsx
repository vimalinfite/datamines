
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button, Grid, TextField, Popover, IconButton } from '@mui/material';
import './FIrst.css';
import download from './image/download.png'
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
import { Facebook, Twitter, Instagram, LinkedIn, Language } from '@mui/icons-material'
function First(props) {
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

  const submitdemo = () => {
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

    fetch("http://139.59.58.53:2424/cardapi/v1/data_store", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((result) => {
        // Check if the result contains a message indicating email exists
        if (result.includes("Email already exits...")) {
          toast.warn('Email already exits...');
        } else {
          // Show success toast if email does not exist
          toast.success('Thank you for visiting. Our team will reach you soon.');
          console.log("============== sent succes  ==============>", result);
        }
      })
      .catch((error) => {
        console.error(error);
        // Show error toast if needed
      });
  };


  const imageSources = {
    class1: download,
    class2: download,
    class3: download,
    class4: download,
    class5: download,
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
      setCurrentIndex2((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
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
              Request a Demo
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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000', marginLeft: '10px' }}>
                <span style={{ flexGrow: 1, color: '#000', marginLeft: '10px', fontWeight: 'bold' }}>Data</span> Mines
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
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center', width: '80vw' }}>
              <div style={{ flexDirection: 'row', display: 'flex', paddingTop: '10px',gap:'20px' }}>
                <Link className='pricing' to='/aboutus'>

                  <Typography variant='h6' style={{ color: 'black', paddingRight: '10px', fontSize: '1rem' }} >About Us</Typography>
                </Link>
                <Link className='pricing' to='/pricing'>
                  <Typography variant="h6" style={{ color: 'black', fontSize: '1rem' }}>Pricing</Typography>
                </Link>
              </div>
              <div style={{ display: 'flex', margin: '20px' }}>
                <Link to='/SignIn'>

                  <Button style={{ fontFamily: 'Inter, sans-serif', padding: '10px' }} sx={{ color: '#546fff', border: '1px solid #546fff' }}>
                    Get Started Free
                  </Button>
                </Link>
                <Button onClick={handlePopoverOpen} style={{ marginLeft: '20px', fontFamily: 'Inter, sans-serif', padding: '10px', backgroundColor: '#546fff' }} sx={{ color: 'white' }}>
                  Request a Demo
                </Button>
              </div>
            </Box>

          </Toolbar>
        </AppBar>

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
                Request a Demo
              </Button>
            </div>
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
            Request a Demo
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
                Request a Demo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '40px' }}>
        <Typography className='font1' variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#546fff', paddingBottom: '20px' }}>How it operates</Typography>
        <Typography className='font2' variant="body1" style={{ fontSize: '2rem', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: 'black', textAlign: 'center' }}>Facilitate complete process automation</Typography>
        <video src={karzio} autoPlay loop muted controls={false} style={{ width: '60vw', height: '60vh', marginTop: '20px' }} />
      </div>



      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography className='font1' variant="body2" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '24px', fontFamily: 'Inter, sans-serif', color: '#546fff', paddingBottom: '20px' }}>UNCOVER NEW POSSIBILITIES</Typography>
        <Typography className='font2' variant="body1" style={{ fontSize: '2rem', fontWeight: '600', lineHeight: '44px', fontFamily: 'Inter, sans-serif', color: 'black', textAlign: 'center' }}>
          How businesses use Data Mines AI
        </Typography>
      </div>
      <div>
        <Grid className='girdog' container justifyContent="center" spacing={4} style={{ textAlign: 'left', paddingLeft: '10px', paddingRight: '10px', height: isSmallScreen ? '750px' : '500px' }}>
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
                      fontWeight: '400',
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
                      style={{ fontSize: '16px', fontWeight: '400', lineHeight: '20px', fontFamily: 'Inter, sans-serif' }}
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
            <Grid container style={{ height: '281px', borderRadius: '10px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={imageSources[selectedClass] || download}
                alt="Company logos"
                style={{ maxWidth: '100%', marginBottom: isSmallScreen ? '16px' : '32px', backgroundSize: 'cover' }}
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
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" style={{ height: '100%', borderRadius: '10px', backgroundColor: 'white', position: 'relative', border: '1px solid #D3D3D3', padding: '22px' }}>
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


      <div style={{ marginTop: '40px', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
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
                Request a Demo
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
                <ToastContainer />

                <div style={{ textAlign: 'left' }}>
                  <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}></Typography>
                  <TextField label="Your Work Email" fullWidth style={{ marginBottom: '10px' }} />
                  <TextField label="Your Phone Number" fullWidth style={{ marginBottom: '10px' }} />
                  <TextField label="How can we help you" fullWidth multiline rows={4} style={{ marginBottom: '10px' }} />
                  <Button onClick={submitdemo} variant="contained" style={{ backgroundColor: '#546fff', fontFamily: 'Inter, sans-serif' }}>Submit a Query</Button>
                </div>
              </Grid>
              <div></div>
              <Grid item xs={12} md={4}>
                <div style={{ textAlign: 'left', borderLeft: '1px solid #ccc', height: '100%', paddingLeft: '30px' }}>
                  <Typography variant="h6" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Talk to an AI expert</Typography>
                  <Typography variant="body1" style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Get a free 15-minute consultation with our Automation experts. We can discuss Pricing, Integrations or try the app live on your own documents.</Typography>
                  <Button onClick={handlePopoverOpen} variant="contained" style={{ backgroundColor: '#546fff', fontFamily: 'Inter, sans-serif' }}>Request a Demo</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorPosition={{ top: 400, left: 400 }}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
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
              <ToastContainer />
              <Typography variant="h4" gutterBottom style={{ fontFamily: 'Inter, sans-serif', marginBottom: '20px', color: 'black' }}>
                Request a Demo
              </Typography>
              <TextField name="username" label="Your Name" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <TextField name="email" label="Your Email" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <TextField name="phone" label="Your Phone Number" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
              <TextField name="company_name" label="Company Name" onChange={handleChange} style={{ marginBottom: '20px', width: '60%', borderRadius: '5px' }} />
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
                <a href="https://facebook.com/profile.php?id=61555752627560" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Facebook /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://twitter.com/KrazioCloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Twitter /></a>
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
  );
}

export default First;