import React, { useEffect, useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Autocomplete,
  FilledInput,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/components/Authentication/Authentication.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Base_Img } from "redux/BaseImg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Verify from "./Verify";
import * as action from "redux/reducer";

const SignUpForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "COUNTRY" });
  }, []);
  const Base_Url = "https://backend.albaseerdevelopers.com/upload/";
  const [Nationality, setNationality] = useState("");
  const [value, setValue] = React.useState(null);

  const Country = useSelector((state) => state.countries);
  const open = useSelector((state) => state.open);
  const message = useSelector((state) => state.message);

  const Option = (option) => {
    setNationality(option?.id);
    const names = JSON?.parse(option?.name);
    return names?.name_en;
  };

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [Username, setUsername] = React.useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Sign_Up = {
      email: data.get("email"),
      password: data.get("password"),
      nationality_id: JSON.stringify(Nationality),
      name: data.get("name"),
      birthdate: data.get("birthdate"),
      username: data.get("phone") + data.get("username"),
      gender: JSON.parse(data.get("gender")),
      birthdate: data.get("birthdate"),
    };
    setUsername(Sign_Up.username);
    dispatch({ type: "REGISTER", payload: Sign_Up });
  };
  const Confirm = useSelector((state) => state.verify);
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
                Get’s started.{" "}
                <img
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Already have an account?{" "}
                <Link
                  href="/authentication/sign-in/"
                  className="primaryColor text-decoration-none"
                >
                  Sign in
                </Link>
              </Typography>

              <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
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
                            {/*  +{option.phone} */}
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
                        Name
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        InputProps={{
                          style: { borderRadius: 8 },
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
                        Email
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        InputProps={{
                          style: { borderRadius: 8 },
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
                    {/* <Grid item xs={12}> */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Birth Date
                      </Typography>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField name="birthdate" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Gender
                      </Typography>

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Gender"
                          name="gender"
                          // onChange={handleChange}
                        >
                          <MenuItem value={1}>Male</MenuItem>
                          <MenuItem value={0}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* </Grid> */}
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
                        Nationality
                      </Typography>

                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: "auto" }}
                        options={Country}
                        autoHighlight
                        getOptionLabel={(option) => Option(option)}
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
                            {Option(option)}({option.iso})
                            {/*  +{option.phone} */}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            name="nationality_id"
                            autoComplete="nationality_id"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>

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
                  Sign Up
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
        <Verify Username={Username} />
      </div>
    </>
  );
};

export default SignUpForm;
