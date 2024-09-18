// File: resources/js/components/LeftMenu.jsx

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import OrdersIcon from '@mui/icons-material/Receipt';
import ReportsIcon from '@mui/icons-material/Assessment';
import UsersIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, usePage, useForm } from '@inertiajs/react';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import JobIcon from '@mui/icons-material/Work';
import RoleIcon from '@mui/icons-material/Security';
import BankIcon from '@mui/icons-material/AccountBalance';
const LeftMenu = () => {
  const [open, setOpen] = useState({});
  const { url } = usePage();
  const { post } = useForm();

  const handleClick = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const handleLogout = () => {
    post(route('logout'));
  };

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      link: '/dashboard',
      subItems: [] 
    },
    { 
      text: 'Jobs', 
      icon: <JobIcon />, 
      link: '/jobs',
      subItems: []
    },
    { 
      text: 'Users', 
      icon: <UsersIcon />, 
      link: '/users',
      subItems: []
    },
    { 
      text: 'Master Data', 
      icon: <UsersIcon />, 
      link: '/staff',
      subItems: []
    },
    { 
      text: 'Customers', 
      icon: <PeopleIcon />, 
      link: '/customers',
      subItems: []
    },
    { 
      text: 'Roles', 
      icon: <RoleIcon />, 
      link: '/roles',
      subItems: []
    },
    { 
      text: 'Vehicles', 
      icon: <DirectionsCarIcon />, 
      link: '/vehicles',
      subItems: []
    },
    { 
      text: 'Banks', 
      icon: <BankIcon />, 
      link: '/banks',
      subItems: []
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      action: handleLogout,
      subItems: []
    }
  ];

  const isActive = (itemLink) => {
    return url.startsWith(itemLink) && itemLink !== '#';
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', top: 64 },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.action ? (
              <ListItem
                button
                onClick={item.action}
                sx={{
                  backgroundColor: 'transparent',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ) : (
              <ListItem
                button
                component={Link}
                href={item.link}
                method={item.method || 'get'}
                onClick={item.subItems.length > 0 ? () => handleClick(index) : undefined}
                sx={{
                  backgroundColor: isActive(item.link) ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems.length > 0 ? open[index] ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItem>
            )}
            {item.subItems.length > 0 && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      component={Link}
                      href={subItem.link}
                      sx={{
                        pl: 4,
                        backgroundColor: isActive(subItem.link) ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
}

export default LeftMenu;
