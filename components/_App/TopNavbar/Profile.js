import * as React from "react";
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Link,
  ListItemIcon,
  Divider,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logoutFunApi } from "store/auth/services";

const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutFunApi());
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="ml-2"
        >
          <Avatar
            src={user?.image}
            alt={user?.name}
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "10px",
            boxShadow: "0px 10px 35px rgba(50, 110, 189, 0.2)",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="for-dark-top-navList"
      >
        <MenuItem>
          <Avatar src={user?.image} alt={user?.name} className="mr-1" />
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                color: "#757FEF",
                textTransform: "capitalize",
              }}
            >
              {role}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#260944",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              {user?.name}
            </Typography>
          </Box>
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/pages/profile/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Profile
          </Link>
        </MenuItem>

        {/* <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <MailOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/email/inbox/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Inbox
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/apps/chat/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Chat
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link
            href="/settings/account/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Settings
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/pages/pricing/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Pricing
          </Link>
        </MenuItem> */}

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <Logout fontSize="small" />
          </ListItemIcon>

          <Typography
            sx={{
              fontSize: "14px",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            Logout
          </Typography>
          {/* <Link
            href="/authentication/logout/"
            fontSize="13px"
            color="inherit"
            underline="none"
            variant="button"
            onClick={handleLogout}
          >
            Logout
          </Link> */}
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
