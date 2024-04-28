import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container, Typography, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useMediaQuery } from '@mui/material';
import Avtar from './image/Avtar.png';
import logo1 from './image/logo1.png';
import logo from './image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import loader from './image/loader.gif';
import excelIcon from './image/exl.png';
import pdfIcon from './image/pdf.png';
import { MdDelete } from 'react-icons/md';
import flag from './image/flag.png'
import { Facebook, Instagram, LinkedIn, Language } from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';


const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [userStatus, setUserStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [userpoints, setUserPoints] = useState(0);


  const itemsPerPage = 15;
  const uidFromPerformOCR = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSearch = () => {

    if (searchInput.length > 0) {
      const filtered = folders.filter(folder =>

        folder.file_name_excel.toLowerCase().includes(searchInput.toLowerCase()) ||
        folder.file_name_pdf.toLowerCase().includes(searchInput.toLowerCase())
      );

      setFilteredData(filtered);
      setSearchData(true);
    } else {
      setFilteredData([]);
      setSearchData(false);
    }
  };

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

      const response = await fetch(`https://134.209.153.179/cardapi/v1/get_user_files?user_id=${uidFromPerformOCR}&file_status=true`, requestOptions);
      const data = await response.json();
      setFolders(data.data.files_data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserStatus = async () => {
    try {
      const TokenId = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${TokenId}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/get_all_user?user_id=${uidFromPerformOCR}`, requestOptions);
      const data = await response.json();

      const userStatus = data?.data?.user_data?.[0]?.status;
      const username = data?.data?.user_data?.[0]?.username;
      const userpoints = data?.data?.user_data?.[0]?.points;
      setUserPoints(userpoints);
      if (userStatus === 'deactivate') {
        setOpenDialog(true);
      }
      setUserStatus(userStatus);
      setUsername(username);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (record_id) => {
    try {
      setDeleteFolder(record_id);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleCloseDialog = () => {
    setDeleteFolder(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const TokenId = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${TokenId}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/delete_file?user_id=${uidFromPerformOCR}&file_id=${deleteFolder}&type=delete`, requestOptions);
      if (response.ok) {
        setFolders(prevFolders => prevFolders.filter(folder => folder.record_id !== deleteFolder));
        setDeleteFolder(null);
        setOpenDialog(false);
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHover = (e) => {
    e.target.style.boxShadow = '0px 6px 12px rgba(57, 59, 197, 0.3)';
  };

  const handleLeave = (e) => {
    e.target.style.boxShadow = '0px 4px 8px rgba(57, 59, 197, 0.1)';
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderContent = () => {
    if (searchData && filteredData.length === 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">No results found.</Typography>
        </div>
      );
    } else {
      const dataToRender = searchData ? filteredData : folders;
      return (
        <div style={{ position: 'relative', marginBottom: '12vh' }}>
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


            {searchData == false ? (
              currentItems.map((folder, index) => {
                const fileName = folder.file_name_excel.slice(0, -4);
                return (
                  <div className='aax' key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #393bc5',
                    transition: 'box-shadow 0.3s ease',
                    maxWidth: '300px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      marginBottom: '8px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <img src={logo} style={{
                        width: '100%',
                        height: '100px',
                        borderRadius: '20px',
                        objectFit: 'contain',
                        paddingBottom: '10px'
                      }} />
                      <MdDelete size={"20px"} color='#393bc5' onClick={() => handleDelete(folder.record_id)} style={{ position: 'absolute', top: 1, right: 1 }} />
                      <div style={{
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
                        <Link to={folder.file_url_pdf} target="_blank" download={folder.file_name_pdf}>
                          <Tooltip title="Download" arrow>
                            <img src={pdfIcon} alt="PDF" style={{ width: '40px', height: '40px', marginLeft: '10px' }} />
                          </Tooltip>
                        </Link>
                      </div>
                    </div>
                    <span style={{ marginBottom: '4px' }}>{fileName.length > 6 ? `${fileName.slice(0, 6)}...` : fileName}</span>
                    <span>{folder.inserted_on.slice(0, 10)}</span>
                  </div>
                );
              })
            ) : (
              filteredData.map((folder, index) => {
                const fileName = folder.file_name_excel.slice(0, -4);
                return (
                  <div className='aax' key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #393bc5',
                    transition: 'box-shadow 0.3s ease',
                    maxWidth: '300px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      marginBottom: '8px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <img src={logo} style={{
                        width: '100%',
                        height: '100px',
                        borderRadius: '20px',
                        objectFit: 'contain',
                        paddingBottom: '10px'
                      }} />
                      <MdDelete size={"20px"} onClick={() => handleDelete(folder.record_id)} style={{ position: 'absolute', top: 1, right: 1 }} />
                      <div style={{
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
                        <Link to={folder.file_url_pdf} target="_blank" download={folder.file_name_pdf}>
                          <Tooltip title="Download" arrow>
                            <img src={pdfIcon} alt="PDF" style={{ width: '40px', height: '40px', marginLeft: '10px' }} />
                          </Tooltip>
                        </Link>
                      </div>
                    </div>
                    <span style={{ marginBottom: '4px' }}>{fileName.length > 6 ? `${fileName.slice(0, 6)}...` : fileName}</span>
                    <span>{folder.inserted_on.slice(0, 10)}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className='pagination'>
            <Button
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              variant="outlined"
              style={{ marginRight: '10px', backgroundColor: '#393bc5', color: '#fff' }}
            >
              Prev
            </Button>
            <div className='pagination'>
              {Array.from({ length: 3 }, (_, index) => {
                const pageNumber = currentPage - 1 + index;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <Button
                      key={index}
                      onClick={() => handlePageChange(pageNumber)}
                      variant={currentPage === pageNumber ? "contained" : "outlined"}
                      style={{ backgroundColor: '#393bc5', color: '#fff' }}
                    >
                      {pageNumber}
                    </Button>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <Button
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              variant="outlined"
              style={{ marginLeft: '10px', backgroundColor: '#393bc5', color: '#fff' }}
            >
              Next
            </Button>
          </div>


        </div>
      );
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = folders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(folders.length / itemsPerPage);
  const isMobile = useMediaQuery('(max-width:600px)');
  const credits = 100;
  return (
    <>
      <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
              {!isMobile && (
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
                  <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data </span>Mines
                </Typography>
              )}
            </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>
              <Typography onClick={handleProfileClick}>Hello, {username.length > 8 ? username.slice(0, 8) + '...' : username}</Typography>
              <Typography >Credit Points : {userpoints}</Typography>
            </div>
            <img src={Avtar} style={{ height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50px' }} onClick={handleProfileClick} />
          </div>
        </Toolbar>
      </AppBar>
      <br /><br />
      <Container style={{ minHeight: '90vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

          <TextField
            label="Search by FileName"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ marginBottom: '20px', width: '300px' }}
          />
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" style={{ backgroundColor: '#393bc5', color: 'white', marginRight: '10px' }} onClick={handleSearch}>
              Search
            </Button>
            {searchInput && <Button variant="contained" onClick={() => {
              setSearchInput('');
              setSearchData(false);
            }} style={{ backgroundColor: '#ff0000', color: 'white', marginRight: '10px' }}>
              Clear
            </Button>}
          </div>

        </div>
        <br />
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

      <Dialog open={deleteFolder !== null} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete the file? Once deleted, it cannot beretrieved.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ backgroundColor: '#2b3570', height: '15vh', justifyContent: 'flex-end', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Facebook /></a>
            </Typography>
            <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><XIcon /></a>
            </Typography>
            <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Instagram /></a>
            </Typography>
            <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><LinkedIn /></a>
            </Typography>
            <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
              <a href="https://www.example.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Language /></a>
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
    </>
  );
}

export default Dashboard;
