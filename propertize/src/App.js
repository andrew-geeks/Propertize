//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import { ReactSession } from 'react-client-session';

//components
import Home from './components/home';
import Signup from './components/account/signup';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/account/login'; 
import BSignup from './components/account/bsignup'; // business signup
import BDashboard from './components/dashboard/bdashboard'; //business dashboard[owner]

function App() {
  ReactSession.setStoreType("localStorage");

  return (
    <div className='App'>
      <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/bsignup' element={<BSignup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/Bdashboard' element={<BDashboard/>} />
          
          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
