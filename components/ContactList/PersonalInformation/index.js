import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";

const personalInfo = [
  {
    title: "Full Name :",
    text: "Andrew Burns",
  },
  {
    title: "Mobile :",
    text: "(123) 123 1234",
  },
  {
    title: "Email :",
    text: "andrewburns@gmail.com",
  },
  {
    title: "Location : ",
    text: "USA",
  },
  {
    title: "Experience : ",
    text: "Back end Developer",
  },
];

const PersonalInformation = ({ Profile }) => {
  const Country = useSelector((state) => state.countries);
  let Nationality = "";
  Country?.forEach((data) => {
    if (data.id == Profile?.nationality_id) {
      Nationality = JSON.parse(data.name);
    }
  });
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #EEF0F7",
            // paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Grid item xs={6} md={6} lg={8}>
            <div>
              <img src="/images/profile.png" alt="Profile" />
              <h3>{Profile?.name}</h3>
            </div>
          </Grid>
          {/* <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Personal Information
          </Typography> */}
        </Box>

        <Box>
          <Typography as="h4" fontWeight="500" fontSize="17px" mb={1}>
            Personal Information
          </Typography>

          {/* {personalInfo.map((info) => ( */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #F7FAFF",
              p: "10px 0",
            }}
            className="for-dark-bottom-border"
          >
            <Typography as="h4" fontWeight="500" fontSize="14px" width="100px">
              Email
            </Typography>

            <Typography>{Profile?.email}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #F7FAFF",
              p: "10px 0",
            }}
            className="for-dark-bottom-border"
          >
            <Typography as="h4" fontWeight="500" fontSize="14px" width="100px">
              User Name
            </Typography>

            <Typography>{Profile?.username}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #F7FAFF",
              p: "10px 0",
            }}
            className="for-dark-bottom-border"
          >
            <Typography as="h4" fontWeight="500" fontSize="14px" width="100px">
              Birth Date
            </Typography>

            <Typography>{Profile?.birthdate}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #F7FAFF",
              p: "10px 0",
            }}
            className="for-dark-bottom-border"
          >
            <Typography as="h4" fontWeight="500" fontSize="14px" width="100px">
              Gender
            </Typography>

            <Typography>
              {Profile?.gender == 0
                ? "Female"
                : Profile?.gender == 1
                ? "Male"
                : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #F7FAFF",
              p: "10px 0",
            }}
            className="for-dark-bottom-border"
          >
            <Typography as="h4" fontWeight="500" fontSize="14px" width="100px">
              Nationality
            </Typography>

            <Typography>{Nationality.name_en}</Typography>
          </Box>
          {/* ))} */}
        </Box>
      </Card>
    </>
  );
};

export default PersonalInformation;
