import React, { useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Alert, Autocomplete, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/components/Authentication/Authentication.module.css";
import { useDispatch, useSelector } from "react-redux";
import ForgetVerify from "./ForgetVerify";
import * as action from "redux/reducer";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const [Username, setUsername] = React.useState();
  useEffect(() => {
    dispatch({ type: "COUNTRY" });
  }, []);
  const open = useSelector((state) => state.open);
  const message = useSelector((state) => state.message);
  const Country = useSelector((state) => state.countries);
  const Base_Url = "https://backend.albaseerdevelopers.com/upload/";
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Forget = {
      username: data.get("phone") + data.get("username"),
    };
    setUsername(Forget.username);
    dispatch({ type: "FORGET_PASSWORD", payload: Forget });
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
                Forgot Password?{" "}
                <img
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Enter your email and we′ll send you instructions to reset your
                password
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
                  </Grid>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "12px 10px",
                    color: "#fff !important",
                  }}
                >
                  Send Otp
                </Button>
              </Box>

              <Box as="div" textAlign="center" mt="20px">
                <Link
                  href="/authentication/sign-in/"
                  className="primaryColor text-decoration-none"
                >
                  <i className="ri-arrow-left-s-line"></i> Back to Sign in
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        <ForgetVerify Username={Username} />
      </div>
    </>
  );
};

export default ForgotPasswordForm;
