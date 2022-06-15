import * as React from 'react';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { API_ROOT } from '../constants';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/AppHeaderBar.css'
import DiamondIcon from '@mui/icons-material/Diamond';
import { useNavigate } from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt';
import { MdMail } from 'react-icons/md';
import { FaCamera, FaListAlt, FaInfo, FaRegCalendarPlus, FaAddressCard } from "react-icons/fa";



export default function SwipeableTemporaryDrawer() {
  const navigate = useNavigate();
  const { weddingState, setWeddingState, user } = useContext(UserContext);
  // useEffect(() => {
  //   if (weddingState?.id) {
  //   fetch(API_ROOT + `/permissions/${weddingState.id}`)
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   }
  // }, [])
  
  
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/weddings')}>
            <ListItemIcon>
              <DiamondIcon />
            </ListItemIcon>
            <ListItemText primary='My Weddings' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/threads')}>
              <ListItemIcon>
                <FaListAlt />
              </ListItemIcon>
              <ListItemText primary={'Threads'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/photos')}>
              <ListItemIcon>
                <FaCamera />
              </ListItemIcon>
              <ListItemText primary={'Photos'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/info')}>
              <ListItemIcon>
                <FaInfo />
              </ListItemIcon>
              <ListItemText primary={'Wedding Info'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List> 
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/invite')}>
              <ListItemIcon>
                <MdMail />
              </ListItemIcon>
              <ListItemText primary={'Invite Guests'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/create-wedding')}>
              <ListItemIcon>
                <FaRegCalendarPlus/>
              </ListItemIcon>
              <ListItemText primary={'Create Wedding'} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
          <MenuIcon onClick={toggleDrawer('left', true)} style={{fontSize: 30}}/>
          <SwipeableDrawer
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
    </div>
  );
}
