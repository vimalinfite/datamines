
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import PerformOCR from "./PerformOCR";
import TrashData from "./Componenet/TrashData";
import UsersData from "./Componenet/UsersData";
import PrivateRoute from "./Componenet/PrivateRoute";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Profile from './Profile';
import ResetPassword from './ResetPassoword';
import First from './First';
import AboutUs from './AboutUs';
import Pricing from './Pricing';
import Admin from './admin/Admin';
import AdminDashboard from './admin/AdminDashboard';
import AdminPerformOCR from './admin/AdminPerformOCR';
import AdminProfile from './admin/AdminProfile';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/pricing' element={<Pricing/>}/>
                <Route path='/aboutus' element={<AboutUs/>}/>
                <Route path='/' element={<First/>}/>
                <Route path="/ResetPassword" element={<ResetPassword/>}/>
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
                <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
                <Route path="/performocr" element={<PrivateRoute Component={PerformOCR} />} />
                <Route path="/admin" element={<PrivateRoute Component={Admin} isAdmin />} />
                <Route path='/admindashboard' element={<PrivateRoute Component={AdminDashboard} isAdmin />} />
                <Route path='/adminPerformOCR'  element={<PrivateRoute Component={AdminPerformOCR} isAdmin/>}/>
                <Route path='/adminProfile'  element={<PrivateRoute Component= {AdminProfile} isAdmin/>} />
                <Route path="/admin/trashdata" element={<PrivateRoute Component={TrashData} isAdmin />} />
                <Route path="/admin/usersdata" element={<PrivateRoute Component={UsersData} isAdmin />} />
            </Routes>
        </Router>
    );
}

export default App;
