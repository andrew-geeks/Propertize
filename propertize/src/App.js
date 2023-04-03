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
import { ForgotPassword } from './components/account/forgotPassword';
import { ResetPassword } from './components/account/resetPassword';
import Manage from './components/business/manage';
import ManageProp from './components/business/manageprop';
import None from './components/404';
import Assign from './components/business/assign';
import MaintainHome from './components/maintenance/maintainHome';
import MaintainProp from './components/maintenance/maintainProp';
import MaintainRequests from './components/maintenance/mrequests'; //for tenant
import MrequestsHome from './components/maintenance/mrequestHome'; //for business
import Insights from './components/business/insights';
import Payhome from './components/payment/payHome';
import ViewpropO from './components/property/viewpropO';
import ViewpropT from './components/property/viewpropT';





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

  if(loggedIn === undefined){
    return <Navigate to="/blogin"/>
  }
  else if(actype === "owner"){
    return children;
  }
  else{
    console.log("actype: "+actype)
    return <Navigate to="/"/>
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
            <Route path='/forgotpassword' element={<ForgotPassword/>} />
            <Route path='/reset/:rtoken' element={<ResetPassword/>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/Bdashboard' element={<PrivateRoute><BDashboard/></PrivateRoute>}/>
            <Route path='/addproperty' element={<PrivateRoute><Add/></PrivateRoute>}/>
            <Route path='/manage' element={<BusinessRoute><Manage/></BusinessRoute>}/>
            <Route path='/manage/:propid' element={<BusinessRoute><ManageProp/></BusinessRoute>}/>
            <Route path='/assign/:propid' element={<BusinessRoute><Assign/></BusinessRoute>}/>
            <Route path='/maintenance' element={<PrivateRoute><MaintainHome/></PrivateRoute>}/>
            <Route path='/maintainprop/:propid' element={<PrivateRoute><MaintainProp/></PrivateRoute>}/>
            <Route path='/mrequests' element={<PrivateRoute><MaintainRequests/></PrivateRoute>}/>
            <Route path='/mrequestshome' element={<BusinessRoute><MrequestsHome/></BusinessRoute>}/>
            <Route path='/insights' element={<BusinessRoute><Insights/></BusinessRoute>}/>
            <Route path='/payrent' element={<PrivateRoute><Payhome/></PrivateRoute>}/>
            <Route path='/viewpropt' element={<PrivateRoute><ViewpropT/></PrivateRoute>}/>
            <Route path='/viewpropo' element={<BusinessRoute><ViewpropO/></BusinessRoute>}/>
            <Route path='/none' element={<None/>}/>
          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
