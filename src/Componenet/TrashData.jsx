import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, AppBar, Toolbar, Popover, IconButton, Typography, Pagination, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import logo1 from "../image/logo1.png";
import DownloadIcon from '@mui/icons-material/Download';
import "./TrashData.css"
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avtar from '../image/Avtar.png';

const TrashData = () => {

  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [recoverData, setRecoverData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchdata, setSearchData] = useState(false);
  const [filterdata, setFilteredData] = useState([])
  const [username, setUsername] = useState('');


  const handleSortStatus = () => {
    setSortOrder(sortOrder === 'activate' ? 'deactivate' : 'activate');
    setUserData((prevUserData) => [...prevUserData].sort((a, b) => {
      if (sortOrder === 'activate') {
        return a.status.localeCompare(b.status); // Sort ascending
      } else {
        return b.status.localeCompare(a.status); // Sort descending
      }
    }));
  };
  const TokenId = localStorage.getItem('token')
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

      const response = await fetch(`http://139.59.58.53:2424/cardapi/v1/get_all_user?user_id=${userId}`, requestOptions);
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
      setFilteredData([]); // Reset filtered data if search input is empty
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

      const response = await fetch(`http://139.59.58.53:2424/cardapi/v1/get_all_user?file_status=false`, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("======trash user=========", data.data.user_data);
      setUserData(data.data.user_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePopoverOpen = async (event, trash) => {
    try {
      setAnchorEl(event.currentTarget);
      setSelectedUser(trash);
      console.log("Asdasdasdssss", trash);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`http://139.59.58.53:2424/cardapi/v1/get_user_files?user_id=${trash.user_id}&file_status=false`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setUserFiles(result.data.files_data);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  const handleRecoverFile = async (record) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`http://139.59.58.53:2424/cardapi/v1/delete_file?user_id=${selectedUser.user_id}&record_id=${record}&type=recover`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const RecoverFileIndex = userFiles.findIndex(file => file.record_id === record);
      const recoverFile = userFiles[RecoverFileIndex];

      if (recoverFile) {
        recoverFile.status = true;
        setRecoverData(prevRecoverData => [...prevRecoverData, { ...recoverFile, record_id: record }]);
      }

      setUserFiles(prevFiles => prevFiles.filter(file => file.record_id !== record));

    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
  console.log("==============Recover Data ================", recoverData);
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
    setUserFiles([]);
  };


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);


  const open = Boolean(anchorEl);

  return (
    <div style={{ width: '100vw', overflow: 'hidden', fontFamily: "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
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
      <br />
      <Link to="/admin">
                <ArrowBackIcon style={{ marginBottom: '10px', color: '#393BC5' }} />
              </Link>
              <br />

      <Popover
        style={{ boxShadow: 'none !important', overflow: 'auto' }}
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
          <div style={{ width: '100vw', height: '85vh' }}>
            <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handlePopoverClose}>
              <CloseIcon />
            </IconButton>
            <h3 style={{ fontSize: '30px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginBottom: 20, padding: 20 }}>Trash Files</h3>
            <TableContainer style={{ padding: 20, width: '90vw', boxShadow: 'none !important' }} component={Paper} >
              <Table style={{ borderCollapse: 'collapse', boxShadow: 'none' }}>
                <TableHead style={{ backgroundColor: '#D3D3D3' }}>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>Sr.no</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>File Name</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Inserted On</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userFiles.map((file, index) => (
                    <TableRow key={index}  style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                      <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <a href={file.file_url_excel} download={file.file_name_excel}>
                          {file.file_name_excel}
                          <IconButton aria-label="download" color="primary" size="small" style={{ marginLeft: '5px' }}>
                            <DownloadIcon />
                          </IconButton>
                        </a>
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{file.inserted_on}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <Button variant="outlined" style={{ backgroundColor: 'green', color: '#fff' }} onClick={() => handleRecoverFile(file.record_id)}>Recover</Button>
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

      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>Trash Data</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <TextField
          label="Search by UserName and Mobile No."
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ marginBottom: '20px', width: '300px' }}
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

      <TableContainer style={{ padding: 10 }} component={Paper}>
        <Table size="small" aria-label="a dense table" style={{ borderCollapse: 'collapse' }}>
          <TableHead style={{ backgroundColor: '#D3D3D3' }}>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Sr.no</TableCell>
              <TableCell style={{ textAlign: 'center' }}>User_ID</TableCell>
              <TableCell style={{ textAlign: 'center' }}>UserName</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Email</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Password</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Contact_no</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Data</TableCell>
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
              <TableRow key={user.id}  style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <TableCell style={{ textAlign: 'center' }}>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.user_id}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.username}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.email}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.password}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{user.contact_no}</TableCell>
                <TableCell style={{ textAlign: 'center', verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }}>{user.count}</div>
                    <Button color="primary" onClick={(event) => handlePopoverOpen(event, user)}>see details</Button>
                  </div>
                </TableCell>

                <TableCell>
                  <Button variant="contained" onClick={() => user.status === 'activate' ? handleDeactivateUser(user.user_id) : handleActivateUser(user.user_id)} style={{ backgroundColor: user.status === 'activate' ? 'green' : 'red', color: 'white' }}>
                    {user.status}
                  </Button>
                </TableCell>
              </TableRow>
            )) :
              userData.slice(indexOfFirstItem, indexOfLastItem).map((trash, index) => (
                <TableRow key={trash.id}  style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                  <TableCell style={{ textAlign: 'center' }}>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{trash.user_id}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{trash.username}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{trash.email}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{trash.password}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{trash.contact_no}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div>{trash.count}</div> <Button color="primary" onClick={(event) => handlePopoverOpen(event, trash)}>see details</Button>
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Button variant="contained" style={{ backgroundColor: trash.status === 'activate' ? 'green' : 'red', color: 'white' }}>{trash.status}</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filterdata.length < 101 || userData.length < 101 ? <></> :
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Pagination
            count={searchdata ? Math.ceil(filterdata.length / itemsPerPage) : Math.ceil(userData.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            style={{ marginTop: 10, justifyContent: 'center' }}
          />
        </div>}
    </div>
  );
}

export default TrashData;