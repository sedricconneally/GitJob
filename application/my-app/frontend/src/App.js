import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Careers from './pages/Careers';
import JobPosting from './pages/JobPosting';
import Profile from "./pages/Profile";
import MyJobs from "./pages/MyJobs";
import Form from './components/Form';
import AdminDelete from './pages/AdminDelete';
import CompanyDelete from './pages/CompanyDelete';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<MyJobs />} />
          <Route path="/JobPosting" element={<JobPosting />} />
          <Route path="/JobPosting2" element={<Form />} />
          <Route path="/AdminDelete" element={<AdminDelete />} />
          <Route path="/CompanyDelete" element={<CompanyDelete />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;