import React from 'react';
import { withRouter, Link } from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    mobileMenuLink: {
      color: 'black',
      textDecoration: 'none'
    },
    desktopMenuLink: {
      color: 'white',
      textDecoration: 'none'
    }
  }));

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLoggedIn = Boolean(window.sessionStorage.username)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const redirectToTarget = (path) => {
    props.history.push(path);
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('username')
    redirectToTarget('/login')
  }

  const renderMobileMenu = () => {
    if (isLoggedIn) {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton color="inherit">
              <Badge color="secondary">
                <ExitToAppIcon />
              </Badge>
            </IconButton>
            <Button onClick={handleLogout}>Logout</Button>
          </MenuItem>
        </Menu>
      )
    }
    else {
      return (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link className={classes.mobileMenuLink} to='/login'>
            <MenuItem>
              <IconButton color="inherit">
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
              </IconButton>
              <p>Login</p>
            </MenuItem>
          </Link>
          <Link className={classes.mobileMenuLink} to='/signup'>
            <MenuItem>
              <IconButton color="inherit">
                <Badge color="secondary">
                  <PersonAddIcon />
                </Badge>
              </IconButton>
              <p>Sign Up</p>
            </MenuItem>
          </Link>
        </Menu>
      )
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Tindigo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />

          {isLoggedIn ? (

            <div className={classes.sectionDesktop}>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </div>

          ) : (

            <div className={classes.sectionDesktop}>
              <Button color="inherit">
                <Link className={classes.desktopMenuLink} to='/login'>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.desktopMenuLink} to='/signup'>
                  Sign Up
                </Link>
              </Button>
            </div>

          )}

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu()}
    </div>
  );
}

export default withRouter(Header);