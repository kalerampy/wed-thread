import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const UserContext = React.createContext({ name: '', auth: false });

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({});
  const [weddingState, setWeddingState] = useState(null);
  const fetchCurrentUser = () => {
    fetch(`http://localhost:3000/current_user`, {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setUser(data))
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("current_wedding");
    setUser({});
    setWeddingState({});
    navigate('/login')
  }


  return (
    <UserContext.Provider value={{ user, setUser, weddingState, setWeddingState, fetchCurrentUser, logout}}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };