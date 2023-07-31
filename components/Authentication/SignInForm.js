import React, { useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/components/Authentication/Authentication.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as action from "redux/reducer";

const SignInForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "COUNTRY" });
  }, []);

  const Country = useSelector((state) => state.countries);
  const open = useSelector((state) => state.open);
  const message = useSelector((state) => state.message);
  const [showPassword, setShowPassword] = React.useState(false);
  const Base_Url = "https://backend.albaseerdevelopers.com/upload/";

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Login = {
      username: data.get("phone") + data.get("username"),
      password: data.get("password"),
      admin: true,
    };
    dispatch({ type: "LOGIN", payload: Login });
  };
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            maxWidth: "510px",
            ml: "auto",
            mr: "auto",
            padding: "50px 0 100px",
          }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
                Sign In{" "}
                <img
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Already have an account?{" "}
                <Link
                  href="/authentication/sign-up"
                  className="primaryColor text-decoration-none"
                >
                  Sign up
                </Link>
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Box
                  sx={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4} alignItems="">
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        User Name
                      </Typography>
                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: "auto" }}
                        options={Country}
                        autoHighlight
                        getOptionLabel={(option) =>
                          option?.phone_prefix?.replace("00", "+")
                        }
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={Base_Url + option?.flag}
                              srcSet={Base_Url + option?.flag}
                              alt=""
                            />
                            ({option?.phone_prefix?.replace("00", "+")})
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Country Code"
                            name="phone"
                            value={params?.id}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ marginTop: "30px" }}>
                      <TextField
                        // autoComplete="given-name"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        type="number"
                        autoFocus
                        InputProps={{
                          style: { borderRadius: 8 },
                          // inputProps: {
                          //   max: 8,
                          //   min: 8,
                          // },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Password
                      </Typography>

                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          inputProps={{
                            style: { borderRadius: 8 },
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Remember me."
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} textAlign="end">
                    <Link
                      href="/authentication/forgot-password"
                      className="primaryColor text-decoration-none"
                    >
                      Forgot your password?
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "12px 10px",
                    color: "#fff !important",
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default SignInForm;
