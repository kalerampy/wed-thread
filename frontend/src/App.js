// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, {useContext} from "react";
import Home from "./pages/Home";
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Weddings from './pages/Weddings'
import Threads from './pages/Threads'
import MessageContainer from "./pages/MessageContainer";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className='App'>
      <Routes>
        <Route path="/home" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path='/login' element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route path='/dashboard' element={user ? <DashBoard /> : <Navigate to="/login" replace />}/>
        <Route path='/threads/:id/messages' element={user ? <MessageContainer/> : <Navigate to="/login" replace />}/>
        <Route path='/weddings' element={user ? <Weddings /> : <Navigate to="/login" replace />}/>
        <Route path='/threads' element={user ? <Threads /> : <Navigate to="/login" replace />}/>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="*" element={<p>404! Page Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;