import { CardContent, Typography, Button, Avatar, Box, } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signin.css";
import loader from './image/loader.gif';
import logo1 from './image/logo1.png';
import ProfileImage from './image/Avtar.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("========= user data !!!!!!!! ===========>", userData[0]);


  const TokenId = localStorage.getItem('token');
  const TokenUser_id = localStorage.getItem('uid')
  console.log("============Token Id==============", TokenUser_id);
  useEffect(() => {
    fetchData();
  }, []);

  const handleHover = (e) => {
    e.target.style.boxShadow = '0px 6px 12px rgba(57, 59, 197, 0.3)'; // Change box shadow on hover
  };

  const handleLeave = (e) => {
    e.target.style.boxShadow = '0px 4px 8px rgba(57, 59, 197, 0.1)'; // Reset box shadow on leave
  };

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`http://139.59.58.53:2424/cardapi/v1/get_all_user?file_status=true`, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("============== user_data  ===============", data.data.user_data);
      // Filter the user data based on user_id
      const filteredUserData = data.data.user_data.filter(user => user.user_id === TokenUser_id);
      setUserData(filteredUserData);
      setLoading(false);
      console.log("============= filterdata ==============>", filteredUserData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('type');
    console.log('ss');
    navigate('/');
  };



  const companyName = [
    { letter: 'D', },
    { letter: 'a', },
    { letter: 't', },
    { letter: 'a', },
    { letter: 'C', },
    { letter: 'r', },
    { letter: 'a', },
    { letter: 'f', },
    { letter: 't', },
  ];

  return (
    <div>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={loader} style={{ height: 100, width: 100 }} alt="" />
        </Box>
      ) : (

        <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh' }}>
          <div className='ph' style={{ width: '10vw', height: '100vh', backgroundColor: '#393BC5', alignItems: 'center', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <img className='egg' id='ede' src={logo1} style={{ height: '10vh', width: '5vw', paddingTop: '10px', paddingBottom: '10px' }} />
            {companyName.map((item) => (
              <div key={item} style={{ paddingTop: '10px' }}>
                <p className='ppps' style={{ fontSize: '3vw', fontWeight: 'bold', color: '#fff' }}>{item.letter.toUpperCase()}</p>
              </div>
            ))}

          </div>
          <div style={{ width: '80vw', height: '100vh', backgroundColor: '#fff' }}>

            <CardContent sx={{ padding: '1.5rem' }}>
              <Link to="/dashboard">
                <ArrowBackIcon style={{ marginBottom: '10px', color: '#393BC5' }} />
              </Link>

              <Avatar alt={userData[0]?.username} src={ProfileImage} sx={{ width: '8rem', height: '8rem', border: '2px solid #fff', backgroundColor: '#D3D3D3' }} />
              <Typography variant="h5" sx={{ width: '8rem', fontFamily: 'Arial, sans-serif', color: '#000', marginTop: '0.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                {userData[0]?.username}
              </Typography>
              <div class="container">
                <div class="item">
                  <p>Linked Account</p>
                  <p>{userData[0].email}</p>
                </div>
                <div class="item">
                  <p>Contact No.</p>
                  <p>{userData[0].contact_no}</p>
                </div>
                <div class="item">
                  <p>Country</p>
                  <p>{userData[0].country}</p>
                </div>
                <div class="item">
                  <p>State</p>
                  <p>{userData[0].state}</p>
                </div>
                <div class="item">
                  <p>City</p>
                  <p>{userData[0].city}</p>
                </div>
                <div class="item">
                  <p>Pincode</p>
                  <p>{userData[0].pincode}</p>
                </div>
                <div class="item">
                  <p>File Generated</p>
                  <p>{userData[0].count}</p>
                </div>
              </div>

              <div style={{ margin:'20px' }}>
                <Button onClick={handleLogout} style={{}} variant="contained" sx={{ backgroundColor: '#393bc5', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#d32f2f' } }}>
                  Logout
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      )}

    </div>

  );
};

export default Profile;
