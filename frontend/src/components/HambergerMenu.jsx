import * as React from 'react';
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



export default function SwipeableTemporaryDrawer() {
  const navigate = useNavigate();
  
  
  
  
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
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary={'Threads'} />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/threads')}>
              <ListItemIcon>
                <MdMail />
              </ListItemIcon>
              <ListItemText primary={'Invite Guests'} />
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
