import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import BuyScreen from '../Screens/BuyScreen';
import SellScreen from '../Screens/SellScreen';
import RegisterScreen from '../Screens/RegisterScreen';
function App() {
  return (
    <BrowserRouter>
          <div className="auth-wrapper">
          <img style={{marginTop: "10px", marginLeft: "10px", width: "130px", height: "100px"}}src={require("./logo.png")} alt="abc"/>
        <div className="auth-inner">
        
      <Routes>
        <Route exact path="/" element={<RegisterScreen/>}/>
        <Route exact path='/home' element={<HomeScreen/>}/>
        <Route exact  path="/login" element={<LoginScreen/>}/>
        <Route exact path='/buy' element={<BuyScreen/>}/>
        <Route exact path='/sell' element={<SellScreen/>}/>
        {/* <Navigate to="/"/> */}
      </Routes>
      </div></div>
    </BrowserRouter>
  );
}

export default App;
