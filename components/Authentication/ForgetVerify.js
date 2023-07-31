import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/reducer";
import { Avatar, Box, Container, CssBaseline, TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ForgetVerify({ Username }) {
  const dispatch = useDispatch();
  const Confirm = useSelector((state) => state.verify);
  const handleClose = () => {
    dispatch(actions.Verify(false));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleClose();
    console.log({
      username: Username,
      otp: data.get("otp"),
    });
    const Otp = {
      username: Username,
      otp: data.get("otp"),
      newPassword: data.get("newPassword"),
    };
    dispatch({ type: "FORGET_VERIFY", payload: Otp });
  };
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={Confirm}
      >
        <div className="bg-black">
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Forget Password
          </BootstrapDialogTitle>

          <DialogContent dividers>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Verify
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="otp"
                    label="Otp"
                    name="otp"
                    type="number"
                    autoComplete="otp"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    type="password"
                    autoComplete="password"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, mb: 2, color: "#fff !important" }}
                  >
                    Send Otp
                  </Button>
                </Box>
              </Box>
            </Container>
          </DialogContent>

          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions> */}
        </div>
      </BootstrapDialog>
    </>
  );
}
