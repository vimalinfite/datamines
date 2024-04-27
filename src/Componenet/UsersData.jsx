import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, AppBar, Toolbar, Popover, IconButton, Typography, Pagination, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import logo1 from "../image/logo1.png";
import "../PerformOCR.css";
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avtar from '../image/Avtar.png';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const UsersData = () => {
  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [trashData, setTrashData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchdata, setSearchData] = useState(false);
  const [filterdata, setFilteredData] = useState([])
  const [username, setUsername] = useState('');
  const [updatedCreditPoints, setUpdatedCreditPoints] = useState('');
  const [fetchPoints, setFetchPoints] = useState('')
  const [expireDate, setExpireDate] = useState(null);



  const handleSortStatus = () => {

    setSortOrder(sortOrder === 'activate' ? 'deactivate' : 'activate');

    setUserData((prevUserData) => [...prevUserData].sort((a, b) => {

      if (sortOrder === 'activate') {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    }));
  };

  const TokenId = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    fetchUser()
  }, []);
  const handleProfileClick = () => {
    navigate('/adminProfile');
  };
  const fetchUser = async () => {
    try {
      const TokenId = localStorage.getItem('token');
      const userId = localStorage.getItem('uid');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${TokenId}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/get_all_user?user_id=${userId}`, requestOptions);
      const data = await response.json();

      const username = data?.data?.user_data?.[0]?.username;
      setUsername(username);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = () => {
    if (searchInput.length > 0) {
      const filtered = userData.filter(user =>
        user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.contact_no.includes(searchInput)
      );
      setFilteredData(filtered);
      console.log("Filtered Data:", filtered);
    } else {
      setFilteredData([]);
    }
    setSearchData(true);
  };

  useEffect(() => {
    if (searchInput.length == 0) {
      setSearchData(false)
    }
  }, [searchInput])

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/get_all_user?file_status=true`, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("============== user_data  ===============", data.data.user_data);
      setUserData(data.data.user_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePopoverOpen = async (event, user) => {
    try {
      setAnchorEl(event.currentTarget);
      setSelectedUser(user);
      console.log("Asdasdasdssss", user);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/get_user_files?user_id=${user.user_id}&file_status=true`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setUserFiles(result.data.files_data);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
    setUserFiles([]);
  };

  const handleDeleteFile = async (record) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/delete_file?user_id=${selectedUser.user_id}&record_id=${record}&type=delete`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const deletedFileIndex = userFiles.findIndex(file => file.record_id === record);
      const deletedFile = userFiles[deletedFileIndex];

      if (deletedFile) {
        deletedFile.status = false;
        setTrashData(prevTrashData => [...prevTrashData, { ...deletedFile, record_id: record }]);
      }

      setUserFiles(prevFiles => prevFiles.filter(file => file.record_id !== record));

    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  const handleActivateUser = async (userId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/user_activate?user_id=${userId}&status=activate`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }


      setUserData(prevUserData =>
        prevUserData.map(user =>
          user.user_id === userId ? { ...user, status: 'activate' } : user
        )
      );

    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`https://134.209.153.179/cardapi/v1/user_activate?user_id=${userId}&status=deactivate`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUserData(prevUserData =>
        prevUserData.map(user =>
          user.user_id === userId ? { ...user, status: 'deactivate' } : user
        )
      );

    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);


  const [creditPoints, setCreditPoints] = useState('');
  const [editAnchorEl, setEditAnchorEl] = useState(null);
  const handleEditPopoverOpen = (userId) => {
    setEditAnchorEl(userId);
  };

  const handleEditPopoverClose = () => {
    setEditAnchorEl(null);
  };

  const handleCreditPointsChange = (event) => {
    setCreditPoints(event.target.value);
  };
  const handleExpireDateChange = (date) => {
    setExpireDate(date); 
  };

  const handleSubmitCreditPoints = async (userId, points, ExpDate, user) => {
    try {
      const updatedPoints = parseInt(points) + parseInt(user.points); // Calculate total points
      const formattedExpireDate = ExpDate.toISOString();
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({ points: updatedPoints, ExpDate: formattedExpireDate }),
      };
  
      const response = await fetch(`http://139.59.58.53:2424/cardapi/v1/user_activate?user_id=${userId}&status=activate&points=${updatedPoints}&timestamp=${formattedExpireDate}`, requestOptions);
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        handleEditPopoverClose();
        fetchData();
      } else {
        console.error("Error updating points:", result.message || result);
      }
      setExpireDate(null);
      setCreditPoints('');
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };
  

  const open = Boolean(anchorEl);

  return (
    <div style={{ width: '100%', overflowX: 'hidden', fontFamily: "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}> {/* Adjusted width and overflow */}
      <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
          <Link to ='/'style={{textDecoration:'none'}} >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
              <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data </span>Mines
            </Typography>
          </div>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography onClick={handleProfileClick} style={{ paddingRight: '10px' }}>Hello,  {username.length > 5 ? username.slice(0, 5) + '...' : username}</Typography>
            <img src={Avtar} style={{ height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50px' }} onClick={handleProfileClick} />
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <Link to="/admin">
        <ArrowBackIcon style={{ color: '#393BC5' }} />
      </Link>
      <br />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {selectedUser && (
          <div style={{ overflowY: 'auto', height: '85vh', width: '100vw' }}>
            <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handlePopoverClose}>
              <CloseIcon />
            </IconButton>
            <h3 style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginBottom: 20, padding: 20 }}>User Files</h3>
            <TableContainer style={{ padding: 20, width: '90vw' }} component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: '#D3D3D3' }}>
                  <TableRow >
                    <TableCell >Sr.no</TableCell>
                    <TableCell >File Name</TableCell>
                    <TableCell >Inserted On</TableCell>
                    <TableCell >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userFiles.map((file, index) => (
                    <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                      <TableCell >{index + 1}</TableCell>
                      <TableCell >
                        <a href={file.file_url_excel} download={file.file_name_excel}>
                          {file.file_name_excel}
                          <IconButton aria-label="download" color="primary" size="small" style={{ marginLeft: '5px' }}>
                            <DownloadIcon />
                          </IconButton>
                        </a>
                      </TableCell>
                      <TableCell >{file.inserted_on}</TableCell>
                      <TableCell>
                        <Button variant="outlined" style={{ backgroundColor: 'red', color: '#fff' }} onClick={() => handleDeleteFile(file.record_id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Popover>
      <br />
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>User Data</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <TextField
          label="Search by UserName and Mobile No."
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ marginBottom: '10px', width: '300px' }}
        />
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" style={{ backgroundColor: '#393bc5', color: 'white', marginRight: '10px' }} onClick={handleSearch}>
            Search
          </Button>
          {searchInput && <Button variant="contained" onClick={() => setSearchInput('')} style={{ backgroundColor: '#ff0000', color: 'white', marginRight: '10px' }}>
            Clear
          </Button>}
          <Button variant="contained" style={{ backgroundColor: '#393bc5', color: 'white' }} onClick={handleSortStatus}>
            Sort by Status
          </Button>
        </div>
      </div>
      <TableContainer style={{ padding: 10, maxWidth: '100%', overflowX: 'auto' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: '#D3D3D3', }}>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Sr.no</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Company Name</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Business Type</TableCell>
              <TableCell style={{ textAlign: 'center' }}>User ID</TableCell>
              <TableCell style={{ textAlign: 'center' }}>UserName</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Email</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Password</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Contact No</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Country</TableCell>
              <TableCell style={{ textAlign: 'center' }}>State</TableCell>
              <TableCell style={{ textAlign: 'center' }}>City</TableCell>
              <TableCell style={{ textAlign: 'center' }}>PinCode</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Data</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Credit Points</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchdata ? filterdata.length == 0 ? <TableRow>
              <TableCell colSpan={14} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '24px', }}>
                  No record found
                </div>
              </TableCell>
            </TableRow> : filterdata.slice(indexOfFirstItem, indexOfLastItem).map((user, index) => (
              <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <TableCell style={{ textAlign: 'center' }}>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.company_name}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.business_type}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.user_id}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.username}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.email}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.password}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.contact_no}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.country}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.state}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.city}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.pincode}</TableCell>

                <TableCell style={{ textAlign: 'center', verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }}>{user.count}</div>
                    <Button color="primary" onClick={(event) => handlePopoverOpen(event, user)}>see details</Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }}>{user.points}</div>
                    <Button variant="outlined" color="primary" onClick={() => handleEditPopoverOpen(user.user_id)}>Edit</Button>
                    <Popover
                      open={editAnchorEl === user.user_id}
                      anchorEl={editAnchorEl}
                      onClose={handleEditPopoverClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}

                    >
                      <div style={{ padding: '10px', height: '30vh', width: '20vw' }}>
                        <Typography> Credit Points: {user.points}</Typography>
                        <TextField
                          variant="outlined"
                          value={creditPoints}
                          onChange={handleCreditPointsChange}
                          style={{ marginBottom: '10px' }}
                          size="small"
                        /><br />
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Select expire date"
                            value={expireDate} // Set the value prop to the selected date
                            onChange={handleExpireDateChange} // Handle the onChange event to update the selected date
                            renderInput={(params) => <TextField {...params} />}
                            style={{ marginBottom: '10px' }}
                          />
                        </LocalizationProvider><br /><br />
                        <Button variant="contained" color="primary" onClick={() => handleSubmitCreditPoints(user.user_id, creditPoints, expireDate, user)}>Submit</Button>

                      </div>
                    </Popover>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => user.status === 'activate' ? handleDeactivateUser(user.user_id) : handleActivateUser(user.user_id)} style={{ backgroundColor: user.status === 'activate' ? 'green' : 'red', color: 'white' }}>
                    {user.status}
                  </Button>
                </TableCell>

              </TableRow>
            )) :
              userData.slice(indexOfFirstItem, indexOfLastItem).map((user, index) => (
                <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                  <TableCell style={{ textAlign: 'center' }}>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.company_name}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.business_type}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.user_id}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.username}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.email}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.password}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.contact_no}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.country}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.state}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.city}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.pincode}</TableCell>
                  <TableCell style={{ textAlign: 'center', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ marginRight: '10px' }}>{user.count}</div>
                      <Button color="primary" onClick={(event) => handlePopoverOpen(event, user)}>see details</Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ marginRight: '10px' }}>{user.points}</div>
                      <Button variant="outlined" color="primary" onClick={() => handleEditPopoverOpen(user.user_id)}>Edit</Button>
                      <Popover
                        open={editAnchorEl === user.user_id}
                        anchorEl={editAnchorEl}
                        onClose={handleEditPopoverClose}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'right',
                        }}

                      >
                        <div style={{ padding: '10px', height: '30vh', width: '20vw' }}>
                          <Typography> Credit Points: {user.points}</Typography>
                          <br />
                          <TextField
                            variant="outlined"
                            value={creditPoints}
                            onChange={handleCreditPointsChange}
                            style={{ marginBottom: '10px' }}
                            size="small"
                          /><br />

                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Select expire date"
                              value={expireDate} // Set the value prop to the selected date
                              onChange={handleExpireDateChange} // Handle the onChange event to update the selected date
                              renderInput={(params) => <TextField {...params} />}
                              style={{ marginBottom: '10px' }}
                            />
                          </LocalizationProvider><br /><br />
                          <Button variant="contained" color="primary" onClick={() => handleSubmitCreditPoints(user.user_id, creditPoints, expireDate, user)}>Submit</Button>


                        </div>
                      </Popover>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => user.status === 'activate' ? handleDeactivateUser(user.user_id) : handleActivateUser(user.user_id)} style={{ backgroundColor: user.status === 'activate' ? 'green' : 'red', color: 'white' }}>
                      {user.status}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',flexWrap:'wrap'}}>

        <Pagination
          count={searchdata ? Math.ceil(filterdata.length / itemsPerPage) : Math.ceil(userData.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          style={{ marginTop: 10, justifyContent: 'center' }}
        />

      </div>
    </div>
  );
}
export default UsersData;