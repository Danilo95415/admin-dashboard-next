import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";

import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

const CustomStyles = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      countryId: data.get("firstName"),
      data: {
        type: data.get("emailAddress"),
        message: message,
      },
    };

    dispatch({ type: "NOTIFICATIONS", payload: newData });
  };

  // Select Priority
  const [priority, setPriority] = React.useState("");
  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}>
        <Typography
          as='h3'
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "15px",
          }}>
          Send Notification
        </Typography>

        <Box component='form' noValidate onSubmit={handleSubmit}>
          <Grid container alignItems='center' spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Country ID
              </Typography>
              <TextField
                autoComplete='Country Name'
                name='firstName'
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Type
              </Typography>
              <TextField
                autoComplete='email-address'
                name='emailAddress'
                fullWidth
                id='emailAddress'
                label='Type'
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Message
              </Typography>

              <RichTextEditor
                value={message}
                id='rte'
                onChange={(e) => setMessage(e)}
                controls={[
                  ["bold", "italic", "underline", "link", "image"],
                  ["unorderedList", "h1", "h2", "h3", "h4"],
                  ["sup", "sub"],
                  ["alignLeft", "alignCenter", "alignRight"],
                ]}
              />
            </Grid>

            <Grid item xs={12} textAlign='end'>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  mt: 1,
                  textTransform: "capitalize",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "13px",
                  padding: "12px 20px",
                  color: "#fff !important",
                }}>
                <SendIcon
                  sx={{
                    position: "relative",
                    top: "-2px",
                  }}
                  className='mr-5px'
                />{" "}
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default CustomStyles;
