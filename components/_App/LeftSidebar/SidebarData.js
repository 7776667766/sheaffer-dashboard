import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";

export const SidebarData = () => {
  return [
    {
      title: "Dashboard",
      path: "/",
      icon: <GridViewIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
    },
   
{
      title: "Todos",
      path: "/todos/",
      icon: <LayersIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
      subNav: [
        {
          title: "All-Todos",
          path: "/todos/",
        },
        {
          title: "Add New Todo",
          path: "/todos/addTodos/",
        },
      ],
    },
    {
      title: "Settings",
      path: "/settings/account/",
      icon: <SettingsIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,

      subNav: [
        
        {
          title: "Privacy Policy",
          path: "/settings/privacy-policy/",
        },
        {
          title: "Logout",
          path: "/authentication/logout/",
        },
      ],
    },
  ];
};
