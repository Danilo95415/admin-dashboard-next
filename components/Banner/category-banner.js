import React, { useEffect } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { Base_Img } from "redux/BaseImg";
import InfoIcon from "@mui/icons-material/Info";

// Create Files Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
};

const CategoryBanner = () => {
  // Create Files Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Child_Category = useSelector((state) => state.child_category);

  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  // Form
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      label: data.get("label"),
      password: data.get("password"),
      filesName: data.get("filesName"),
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "BANNER_HOME",
      payload: { country_id: 109, page: 1 },
    });
  }, []);

  const Images = useSelector((state) => state.banner_category);
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
          Banners
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

      {/* Create Files Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="dark-BG-101010">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#EDEFF5",
                borderRadius: "8px",
                padding: "25px 20px",
              }}
              // className="bg-black"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Create Folder
              </Typography>

              <IconButton
                aria-label="remove"
                size="small"
                onClick={handleClose}
                className="modal-close"
              >
                <ClearIcon />
              </IconButton>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: "8px",
                }}
                className="dark-BG-101010"
              >
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      as="h5"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "12px",
                      }}
                    >
                      Files Name
                    </Typography>

                    <TextField
                      autoComplete="given-name"
                      name="filesName"
                      required
                      fullWidth
                      id="filesName"
                      onChange={handleChange}
                      label="Files Name"
                      autoFocus
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="mt-2">
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} className="mt-2">
                    <TextField
                      fullWidth
                      name="label"
                      label="label"
                      type="text"
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} textAlign="end">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 1,
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "500",
                        fontSize: "13px",
                        padding: "12px 20px",
                        color: "#fff !important",
                      }}
                    >
                      <AddIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-5px"
                      />{" "}
                      Add Files
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CategoryBanner;
