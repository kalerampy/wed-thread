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
import Invite from "./pages/Invite";
import Info from "./pages/Info";
import Photos from "./pages/Photos";
import NewWedding from "./pages/NewWedding";
import WeddingEnrollment from "./pages/WeddingEnrollment";
import GuestList from "./pages/GuestList";
import { ThemeProvider, createTheme } from "@mui/material"


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00c2cb',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#f50057',
    },
  }
})



function App() {
  const { user } = useContext(UserContext);
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/login' element={user ? <Navigate to="/weddings" replace /> : <Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={user ? <DashBoard /> : <Navigate to="/login" replace />}/>
          <Route path='/threads/:id/messages' element={user ? <MessageContainer/> : <Navigate to="/login" replace />}/>
          <Route path='/weddings' element={user ? <Weddings /> : <Navigate to="/login" replace />}/>
          <Route path='/threads' element={user ? <Threads /> : <Navigate to="/login" replace />}/>
          <Route path="/" element={ <Home />} />
          <Route path="/invite" element={user ? <Invite /> : <Navigate to="/login" replace />} />
          <Route path="/invite/:unique_id" element={<WeddingEnrollment />} />
          {/* <Route path="/info" element={user ? <Info /> : <Navigate to="/login" replace />} /> */}
          {/* <Route path="/photos" element={user ? <Photos /> : <Navigate to="/login" replace />} /> */}
          <Route path="/create-wedding" element={user ? <NewWedding /> : <Navigate to="/login" replace />} />
          <Route path="/guest-list" element={user ? <GuestList />: <Navigate to="/login" replace />} />
          <Route path="*" element={<p>404! Page Not Found</p>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;