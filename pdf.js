import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container, Typography, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Avtar from './image/Avtar.png';
import logo1 from './image/logo1.png';
import logo from './image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import loader from './image/loader.gif';
import excelIcon from './image/exl.png';
import pdfIcon from './image/pdf.png';
import {MdDelete } from 'react-icons/md'; 

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [userStatus, setUserStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const itemsPerPage = 15;
  const uidFromPerformOCR = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUserFiles();
    fetchUserStatus();
  }, []);

  const fetchUserFiles = async () => {
    try {
      const TokenId = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${TokenId}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify({ user_id: uidFromPerformOCR }),
      };

      const response = await fetch(`https://3.109.181.180/cardapi/v1/get_user_files?user_id=${uidFromPerformOCR}`, requestOptions);
      const data = await response.json();
      setFolders(data.data.files_data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserStatus = async () => {
    try {
      const TokenId = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization',  `Bearer ${TokenId}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`https://3.109.181.180/cardapi/v1/get_all_user?user_id=${uidFromPerformOCR}`, requestOptions);
      const data = await response.json();

      // Extracting the status field from the user_data array
      const userStatus = data?.data?.user_data?.[0]?.status;
      const username = data?.data?.user_data?.[0]?.username;
      if (userStatus === 'deactivate') {
        setOpenDialog(true);
      }
      setUserStatus(userStatus);
      setUsername(username);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHover = (e) => {
    e.target.style.boxShadow = '0px 6px 12px rgba(57, 59, 197, 0.3)'; // Change box shadow on hover
  };

  const handleLeave = (e) => {
    e.target.style.boxShadow = '0px 4px 8px rgba(57, 59, 197, 0.1)'; // Reset box shadow on leave
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderContent = () => {
    if (userStatus === null) {
      return (
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <img src={loader} style={{ height: 100, width: 100 }} alt="" />
        </div>
      );
    } else if (userStatus === 'activate') {
      return (
        <div style={{ position: 'relative' }}>
          <div style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '20px', display: 'flex' }}>
            <Link to="/performOCR" style={{ textDecoration: 'none' }}>
              <Button className='bnt' id='boxbtn'
                style={{
                  color: "white",
                  width: '200px',
                  borderRadius: '10px',
                  backgroundColor: '#393bc5',
                  transition: 'box-shadow 0.3s ease',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Click here to Extract Data
              </Button>
            </Link>
          </div>
          <div >
            <Typography variant="h6" sx={{ color: 'black' }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Extracted Data
            </Typography>
          </div>
          <div className="grid-container" style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', fontFamily: "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
  {currentItems.map((folder, index) => (
    <div className='aax' key={index} style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #393bc5',
      transition: 'box-shadow 0.3s ease',
      maxWidth: '300px',
      textAlign: 'center' // Center align content
    }}>
      <div style={{
        marginBottom: '8px', // Add some space between image and PNG icon
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img src={logo}
          style={{
            width: '100%',
            height: '100px',
            borderRadius: '20px',
            objectFit: 'contain',
            paddingBottom: '70px'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
         
        }}>
    <MdDelete size={"20px"}  />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          padding: '4px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          <Link to={folder.file_url_excel} download={folder.file_name_excel}>
            <Tooltip title="Download" arrow>
              <img src={excelIcon} alt="Excel" style={{ width: '40px', height: '40px' }} />
            </Tooltip>
          </Link>
          <Link to={folder.file_url_pdf} download={folder.file_name_pdf}>
            <Tooltip title="Download" arrow>
              <img src={pdfIcon} alt="PDF" style={{ width: '40px', height: '40px', marginLeft: '10px' }} />
            </Tooltip>
          </Link>
        </div>
      </div>
      <span style={{ marginBottom: '4px' }}>{folder.file_name_excel.slice(0, -4)}</span>
      <span>{folder.inserted_on.slice(0, 10)}</span>
    </div>
  ))}
</div>

          <div style={{ display: 'flex', gap: '10px', margin: '20px', alignItems: 'center', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button key={index} onClick={() => handlePageChange(index + 1)} variant={currentPage === index + 1 ? "contained" : "outlined"} style={{ backgroundColor: '#393bc5', color: '#fff' }}>
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (userStatus === 'deactivate') {
      return (
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <img src={loader} style={{ height: 100, width: 100 }} alt="" />
          <Typography variant="h6" style={{ marginTop: '20px' }}>Please Wait For Admin Response...</Typography>
        </div>
      );
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = folders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(folders.length / itemsPerPage);

  return (
    <>
      <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
              <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data </span>Mines
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography onClick={handleProfileClick} style={{ paddingRight: '10px' }}>Hello, {username}</Typography>
            <img src={Avtar} style={{ height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50px' }} onClick={handleProfileClick} />
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{ minHeight: '90vh', paddingTop: '64px' }}>
        {renderContent()}
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Please Wait</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Your account is being activated. This process may take up to 48 hours. Please wait patiently.</Typography>
          <Typography variant="body2">If you have any urgent concerns, please contact the administrator.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;