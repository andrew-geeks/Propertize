//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


//components
import Home from './components/home';
//import Navbar from './components/navbar';
import Signup from './components/account/signup';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <div className='App'>
      <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
          
          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
