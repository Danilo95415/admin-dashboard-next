import React, { useCallback } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { Base_Img } from "redux/BaseImg";
import { useDropzone } from "react-dropzone";
import styles from "@/styles/PageTitle.module.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import { useRouter } from "next/router";

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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const DocumentsFiles = () => {
  // Create Files Modal
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [is_classified, setIs_classified] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      image: files,
      is_classified: is_classified,
      parent_id: 0,
      idx: 0,
    });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    if (name == "is_classified") {
      setIs_classified(!is_classified);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
  });
  const Child_Category = useSelector((state) => state.child_category);

  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };
  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img src={file.preview} className={styles.img} alt={file.name} />
      </div>
      {/* <button onClick={removeFile(file)}>Remove File</button> */}
    </div>
  ));
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Child Categories
          </Typography>

          <Button
            onClick={handleOpen}
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
              sx={{ position: "relative", top: "-1px" }}
              className="mr-5px"
            />{" "}
            Create Files
          </Button>
        </Box>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
          justifyContent="center"
        >
          {Child_Category?.map((asset) => {
            const name = JSON.parse(asset?.name);
            return (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={asset.id}>
                <Card
                  sx={{
                    boxShadow: "none",
                    background: "#F3F6F9",
                    borderRadius: "10px",
                    padding: "40px 5px",
                    textAlign: "center",
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "10px 20px 20px",
                    mb: "15px",
                  }}
                  className="dark-BG-101010"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Box>
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={opens ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={opens ? "true" : undefined}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={opens}
                      onClose={handleCloses}
                      onClick={handleCloses}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter:
                            "drop-shadow(0px 2px 8px rgba(229,229,229,0.32))",
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
                    >
                      <MenuItem sx={{ fontSize: "13px" }}>
                        <i className="ri-edit-2-line mr-5px"></i> Rename
                      </MenuItem>
                      {/* <MenuItem sx={{ fontSize: "13px" }}>
                      <i className="ri-download-cloud-line mr-5px"></i> Download
                    </MenuItem> */}
                      <MenuItem sx={{ fontSize: "13px" }}>
                        <i className="ri-delete-bin-line mr-5px"></i> Remove
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "center",
                      padding: "30px 0",
                    }}
                  >
                    <img
                      src={`${Base_Img}/upload/categories/${asset?.image}`}
                      alt="folder"
                    />
                    <Typography
                      as="h3"
                      fontWeight="500"
                      fontSize="14px"
                      mt="10px"
                    >
                      {name.name_en}
                    </Typography>
                    <Link
                      href={`/ecommerce/product?id=${asset.id}`}
                      className="text-decoration-none"
                    >
                      <Button
                        onClick={() => {
                          dispatch({
                            type: "ADD_LIST",
                            payload: { id: asset?.id, take: 20, page: 1 },
                          });
                          // router.push(`/ecommerce/product?id=${asset.id}`);
                        }}
                        variant="contained"
                        color="secondary"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "8px",
                          fontWeight: "500",
                          mt: "20px",
                          color: "#fff !important",
                        }}
                      >
                        View Ads
                      </Button>
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{asset.totalFiles}</Typography>
                    <Typography>{asset.filesSize}</Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      {/* Create Files Modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Create New Child Category
            </Typography>

            <IconButton aria-label="remove" size="small" onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Card
                      className={styles.dropzone}
                      sx={{
                        boxShadow: "none",
                        borderRadius: "10px",
                        p: "25px",
                        mb: "15px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: ["column", "column", "row"],
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: ["center", "center", "inherit"],
                          }}
                        >
                          <Typography variant="h5" fontWeight="500" mb={1}>
                            Drop files here or click to upload.
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </div>
                  <aside className={styles.thumbsContainer}>{thumbs}</aside>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 18,
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    Is Classified
                  </Typography>
                  <FormControlLabel
                    sx={{
                      display: "flex",
                      textAlign: "center",
                    }}
                    control={
                      <Checkbox
                        name="is_classified"
                        value={is_classified}
                        onChange={handleChange}
                      />
                    }
                    label="Classified"
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
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className="mr-5px"
                    />{" "}
                    Create New
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default DocumentsFiles;
