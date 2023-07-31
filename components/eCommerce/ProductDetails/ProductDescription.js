import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";

const ProductDescription = ({ Additional }) => {

  if (Additional) {
    Object?.keys(Additional)?.map((item, i) => {

    });
  }
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
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 4 }}
      >
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <Box>
            {Additional &&
              Object?.keys(Additional)
                .slice(0, 5)
                ?.map((item, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #F7FAFF",
                      p: "10px 0",
                    }}
                    key={i}
                    className="for-dark-bottom-border"
                  >
                    <Typography
                      as="h4"
                      fontWeight="500"
                      fontSize="14px"
                      width="100px"
                    >
                      {item}
                    </Typography>

                    <Typography>{Additional[item]}</Typography>
                  </Box>
                ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <Box>
            {Additional &&
              Object?.keys(Additional)
                ?.slice(5, 10)
                ?.map((item, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #F7FAFF",
                      p: "10px 0",
                    }}
                    key={i}
                    className="for-dark-bottom-border"
                  >
                    <Typography
                      as="h4"
                      fontWeight="500"
                      fontSize="14px"
                      width="100px"
                    >
                      {item}
                    </Typography>

                    <Typography>{Additional[item]}</Typography>
                  </Box>
                ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4}>
          <Box>
            {Additional &&
              Object?.keys(Additional)
                ?.slice(10, 15)
                ?.map((item, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #F7FAFF",
                      p: "10px 0",
                    }}
                    key={i}
                    className="for-dark-bottom-border"
                  >
                    <Typography
                      as="h4"
                      fontWeight="500"
                      fontSize="14px"
                      width="100px"
                    >
                      {item}
                    </Typography>

                    <Typography>{Additional[item]}</Typography>
                  </Box>
                ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDescription;
