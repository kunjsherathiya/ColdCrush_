import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import Path from '../common/Path';

const drawerWidth = 240;

export default function Layout({ component }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to={Path.DASHBOARD}>
            <ListItemButton selected={location.pathname === Path.DASHBOARD} className={location.pathname === Path.DASHBOARD ? 'selectedItem' : ''}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Path.CATEGORIES}>
            <ListItemButton selected={location.pathname === Path.CATEGORIES} className={location.pathname === Path.CATEGORIES ? 'selectedItem' : ''}>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary={"Category"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Path.PRODUCTS}>
            <ListItemButton selected={location.pathname === Path.PRODUCTS} className={location.pathname === Path.PRODUCTS ? 'selectedItem' : ''}>
              <ListItemIcon><InventoryIcon /></ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Path.MEDIA}>
            <ListItemButton selected={location.pathname === Path.MEDIA} className={location.pathname === Path.MEDIA ? 'selectedItem' : ''}>
              <ListItemIcon><PermMediaIcon /></ListItemIcon>
              <ListItemText primary={"Media"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Path.ORDERS}>
            <ListItemButton selected={location.pathname === Path.ORDERS} className={location.pathname === Path.ORDERS ? 'selectedItem' : ''}>
              <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Path.USERS}>
            <ListItemButton selected={location.pathname === Path.USERS} className={location.pathname === Path.USERS ? 'selectedItem' : ''}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Path.ADS_SLIDERS}>
            <ListItemButton selected={location.pathname === Path.ADS_SLIDERS} className={location.pathname === Path.ADS_SLIDERS ? 'selectedItem' : ''}>
              <ListItemIcon><CampaignIcon /></ListItemIcon>
              <ListItemText primary={"Ads & Sliders"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: "100%" },
          ml: { sm: `100%` },
          zIndex: 1300
        }}
        className='bg_main'
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Kryonix Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {
          component
        }
      </Box>
    </Box>
  );
}
