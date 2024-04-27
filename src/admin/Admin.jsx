import { AppBar, Toolbar, Typography, Button, Container, Grid, Box } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo1 from "../image/logo1.png"
import { MdPeople, MdDelete,MdDashboard } from 'react-icons/md'; 

const Admin = () => {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('type');
    navigate('/');
  };

  return (
    <Container style={{ minHeight: '90vh', paddingTop: '64px', display: 'flex', flexDirection: 'column', fontFamily: 'Montserrat, sans-serif' }}>
      <AppBar position="fixed" style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
      <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
      <Link to ='/' style={{textDecoration:'none'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img className="egg" src={logo1} alt="Logo" style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
        <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px',fontWeight:'bold' }}>Data</span> Mines
      </Typography>
        </div>
        </Link>
        <Button style={{ backgroundColor: 'white', color: '#393bc5',textTransform: 'none' }} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
      <br /> <br /> <br />
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" style={{ marginTop: '10px' }}>
      <Grid item xs={12} sm={6} md={4}>
  <Box bgcolor="#E9E9E9" textAlign="center" p={5} boxShadow={1} borderRadius={4} position="relative" style={{ boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <NavLink to="/admin/usersdata" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button variant="contained" style={{ backgroundColor: '#E9E9E9', color: 'inherit', textTransform: 'none', boxShadow: 'none', borderRadius: 0, '&:hover': { backgroundColor: '#E9E9E9' } }}>
      <MdPeople style={{ marginRight: '10px',fontSize:'70px',color:'#393bc5' }} />
        <Typography variant="h5" style={{ marginBottom: '10px', marginTop: '10px',color:'#393bc5' }}>Users</Typography>
      </Button>
    </NavLink>
  </Box>
</Grid>
<Grid item xs={12} sm={6} md={4}>
  <Box bgcolor="#E9E9E9" textAlign="center" p={5} boxShadow={1} borderRadius={4} position="relative" style={{ boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <NavLink to="/admin/trashdata" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button variant="contained" style={{ backgroundColor: '#E9E9E9', color: 'inherit', textTransform: 'none', boxShadow: 'none', borderRadius: 0, '&:hover': { backgroundColor: '#E9E9E9' } }}>
      <MdDelete style={{ marginRight: '10px',fontSize:'70px',color:'#393bc5' }} /> {/* Add icon here */}
        <Typography variant="h5" style={{ marginBottom: '10px', marginTop: '10px',color:'#393bc5' }}>Trash Data</Typography>
      </Button>
    </NavLink>
  </Box>
</Grid>
<Grid item xs={12} sm={6} md={4}>
  <Box bgcolor="#E9E9E9" textAlign="center" p={5} boxShadow={1} borderRadius={4} position="relative" style={{ boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <NavLink to="/admindashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button variant="contained" style={{ backgroundColor: '#E9E9E9', color: 'inherit', textTransform: 'none', boxShadow: 'none', borderRadius: 0, '&:hover': { backgroundColor: '#E9E9E9' } }}>
      <MdDashboard style={{ marginRight: '10px',fontSize:'68px',color:'#393bc5' }} /> {/* Add icon here */}
        <Typography variant="h5" style={{ marginBottom: '10px', marginTop: '10px',color:'#393bc5' }}>Dashboard</Typography>
      </Button>
    </NavLink>
  </Box>
</Grid>
      </Grid>
    
        <NavLink to="/adminPerformOCR" style={{ textDecoration: 'none' }}>
          <div style={{display:'flex', marginTop:'30px',alignItems:'center',justifyContent:'center'}}>
          <Button style={{ backgroundColor: '#393bc5', color: 'white', height: 40, width: 150 }} title="Perform OCR">
            Perform OCR
          </Button>
          </div>
        </NavLink>
    </Container>
  );
}

export default Admin;
