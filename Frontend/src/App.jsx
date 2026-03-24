import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import BecomeDonor from './pages/BecomeDonor';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/donate" element={<BecomeDonor />} />
      <Route path="/find-donor" element={<HomePage />} />
    </Routes>
  );
}
