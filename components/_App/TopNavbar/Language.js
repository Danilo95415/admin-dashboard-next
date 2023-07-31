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
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Logout from "@mui/icons-material/Logout";
import { Language } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Languages = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t } = useTranslation();
  return (
    <>
      <Tooltip title="Language">
        <IconButton
          size="small"
          sx={{
            backgroundColor: "#f5f5f5",
            width: "40px",
            height: "40px",
            p: 0,
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="ml-2 for-dark-email"
          onClick={handleClick}
        >
          <Language color="action" />
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
          <Avatar src="/images/usa-flags.png" className="mr-1" />
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#260944",
                fontWeight: "500",
              }}
            >
              <Link fontSize="13px" color="inherit" underline="none" href="/">
                English
              </Link>
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem>
          <Avatar src="/images/kw-flag.png" className="mr-1" />
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#260944",
                fontWeight: "500",
              }}
            >
              <Link fontSize="13px" color="inherit" underline="none" href="/ar">
                العربية
              </Link>
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Languages;
