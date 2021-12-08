import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <div className="navbar">
            <AppBar position="static" className = "appbar">
                <Toolbar variant="dense" className = "toolbar">
                    <IconButton edge="start"
                        className="menuButton"
                        color="inherit"
                        aria-label="menu"
                        id="menu-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose} as={Link} to='/'>Upload Song</MenuItem>
                        <MenuItem onClick={handleClose} as={Link} to='/allsongs'>All Songs</MenuItem>
                        <MenuItem onClick={handleClose} as={Link} to='/mysongs'>My Songs</MenuItem>
                    </Menu>
                    <Typography variant="h6" className="title">
                        GrooveTree
                    </Typography>
                    {props.web3Modal}
                </Toolbar>                
            </AppBar>
        </div>
    )
}

export default NavBar