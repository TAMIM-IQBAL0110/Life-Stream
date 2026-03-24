import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import BecomeDonor from './pages/BecomeDonor';
import Finddonor from './pages/Finddonor';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/donate" element={<BecomeDonor />} />
      <Route path="/find-donor" element={<Finddonor />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
