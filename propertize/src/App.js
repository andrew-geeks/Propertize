//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
//import PrivateRoute from 'react-private-route'

import { ReactSession } from 'react-client-session';

//components
import Home from './components/home';
import Signup from './components/account/signup';
import Dashboard from './components/dashboard/dashboard';
import { Login  } from './components/account/login';
import BSignup from './components/account/bsignup'; // business signup
import BDashboard from './components/dashboard/bdashboard'; //business dashboard[owner]
import { Add } from './components/business/add'; //business add
import { Predict } from './components/predict';






export const PrivateRoute = ({ children}) => {
  ReactSession.setStoreType("localStorage");
  const loggedIn = ReactSession.get("id");
      
  if (loggedIn !== undefined ) {
    return children
  }
  else{
    return <Navigate to="/login" />
  }
    
  
}

export const BusinessRoute = ({ children}) => {
  ReactSession.setStoreType("localStorage");
  const loggedIn = ReactSession.get("id");
  const actype = ReactSession.get("actype");

  if (loggedIn !== undefined && actype === "business" ) {
    return children
  }
  else if(loggedIn !== undefined && actype === "tenant"){
    return <Navigate to="/dashboard" />
  }
  else{
    return <Navigate to="/login" />
  }
    
  
}


function App() {
  

  return (
    <div className='App'>
      <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/bsignup' element={<BSignup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/predict' element={<Predict/>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/Bdashboard' element={<PrivateRoute><BDashboard/></PrivateRoute>}/>
            <Route path='/addproperty' element={<PrivateRoute><Add/></PrivateRoute>}/>
          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
