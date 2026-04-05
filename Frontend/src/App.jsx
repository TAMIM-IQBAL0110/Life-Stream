import {BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/AuthPages/SignUp'
import SignIn from './pages/AuthPages/SignIn';
import Verification from './pages/AuthPages/Verification';
import Dashboard from './pages/Dashboard';

import UserProvider,{ useUser } from './context/UserContext';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Finddonor from './pages/Finddonor';

//public Route Layout Component
const PublicRoute = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
};

// protected Route Layout Component
const ProtectedRouteLayout = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Dashboard Layout with navbar and sidebar
const DashboardLayout = ()=>{
  return (
    <div>
      <Navbar/>
      <Outlet/> 
    </div>
  )
};

// Root Redirect
const Root = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>

          {/* Root Redirect */}
          <Route path = "/" element = {<HomePage/>}/>

          {/* Auth Routes */}
          {/* <Route element={<PublicRoute />}> */}
            <Route path = "/signin" element = {<SignIn/>}/>
            <Route path = "/become-a-donor" element = {<SignUp/>}/>
            <Route path = "/verify" element = {<Verification/>}/>
            <Route path = "/find-donor" element = {<Finddonor/>}/>

          {/* </Route> */}

          {/* Protected Routes with navbar */}
          {/* <Route element = {<ProtectedRouteLayout/>}>
            <Route element = {<DashboardLayout/>}> */}
              <Route path = "/dashboard" element = {<Dashboard/>}/>
              
              {/*  add your page here with proper file name and path  */}

            {/* </Route>
          </Route > */}

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}
