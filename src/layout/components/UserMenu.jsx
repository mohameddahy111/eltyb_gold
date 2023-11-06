import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Favorite, Inventory2 } from '@mui/icons-material';
import { Store } from '../../context/dataStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserMenu() {
  const {setUserInfo , setUserToken ,userInfo  ,userToken}=Store()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // navigate(`${url}`)
    setAnchorEl(null);
  };
  const logout=async()=>{
    await axios.patch(`https://eltaybbackend.onrender.com/users/logout/${userInfo._id}` , {
      _isActive:false
    } , {headers: { Authorization: `Bearer ${userToken}` }}).then((res)=>{
      if(res.status === 200){
        console.log(res)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        setUserInfo(null)
        setUserToken(null);
        navigate('/')
 
      }
    }).catch((err)=>{
      console.log(err)
    })

  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={()=>handleClose(navigate("/user/wishList/"))}>
          <Favorite /> My Favorite 
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>handleClose(navigate(`/user/${userInfo._id}/orders`))}>
          <ListItemIcon>
            <Inventory2 fontSize="small" />
          </ListItemIcon>
          My orders
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
