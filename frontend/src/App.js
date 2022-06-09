// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Weddings from './pages/Weddings'
import Threads from './pages/Threads'
import MessageContainer from "./pages/MessageContainer";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<DashBoard />}/>
        <Route path='/threads/:id/messages' element={<MessageContainer/>}/>
        <Route path='/weddings' element={<Weddings />}/>
        <Route path='/threads' element={<Threads />}/>

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;