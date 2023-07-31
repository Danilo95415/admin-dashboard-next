import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import {
  Button,
  IconButton,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import InfoIcon from "@mui/icons-material/Info";
import ImageListItem from "@mui/material/ImageListItem";
import { useDispatch, useSelector } from "react-redux";

export default function BannerRecommend() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "BANNER_SPLASH",
      payload: { country_id: 109, page: 1 },
    });
  }, []);

  const Pagination = useSelector((state) => state.pagination);
  const Images = useSelector((state) => state.banner_splash);

  const Base_Url =
    "https://backend.albaseerdevelopers.com/upload/orignal_images/";
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
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "10px",
          }}
        >
          Banner Splash
        </Typography>

        <ImageList sx={{ width: "auto", height: "auto" }}>
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">December</ListSubheader>
          </ImageListItem> */}
          {Images?.map((item, i) => (
            <ImageListItem key={i}>
              <img
                src={`${Base_Url + item?.mainimage}`}
                srcSet={`${Base_Url + item?.mainimage}`}
                alt={item?.title}
                loading="lazy"
              />
              <ImageListItemBar
                // title={item.title}
                // subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item?.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </>
  );
}
