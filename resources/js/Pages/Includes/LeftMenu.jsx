// File: resources/js/components/LeftMenu.jsx

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import OrdersIcon from '@mui/icons-material/Receipt';
import ReportsIcon from '@mui/icons-material/Assessment';
import UsersIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { router } from '@inertiajs/react';
import LogoutIcon from '@mui/icons-material/Logout';
const LeftMenu = () => {
  const [open, setOpen] = useState({});

  const handleClick = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      link: '/dashboard',
      subItems: [] 
    },
    { 
      text: 'Inventory', 
      icon: <InventoryIcon />, 
      link: '#',
      subItems: [
        { text: 'Add Inventory', link: '/inventory/add' },
        { text: 'View Inventory', link: '/inventory/view' }
      ]
    },
    { 
      text: 'Orders', 
      icon: <OrdersIcon />, 
      link: '#',
      subItems: [
        { text: 'New Orders', link: '/orders/new' },
        { text: 'Order History', link: '/orders/history' }
      ]
    },
    { 
      text: 'Reports', 
      icon: <ReportsIcon />, 
      link: '#',
      subItems: [
        { text: 'Sales Reports', link: '/reports/sales' },
        { text: 'Inventory Reports', link: '/reports/inventory' }
      ]
    },
    { 
      text: 'Users', 
      icon: <UsersIcon />, 
      link: '#',
      subItems: [
        { text: 'System Users', link: '/users' },
        { text: 'Customers', link: '/users/customers' }
      ]
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => router.post(route('logout')),
      subItems: []
    },
  ];

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
            <ListItem
              button
              onClick={item.onClick ? item.onClick : () => handleClick(index)}
              component={item.link !== '#' ? 'a' : 'div'}
              href={item.link !== '#' ? item.link : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems.length > 0 ? open[index] ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItem>
            {item.subItems.length > 0 && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem button key={subIndex} component="a" href={subItem.link} sx={{ pl: 4 }}>
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
