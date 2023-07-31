import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Checkbox,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Base_Img } from "redux/BaseImg";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import MyDropzone from "../components/Forms/FileUploader/upload";
import FileUploaderMultiple from "../components/Forms/FileUploader/UploadMultipleFiles";
import { useDropzone } from "react-dropzone";

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
const Sellers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    dispatch({ type: "MAIN_CATEGORY" });
  }, []);

  const Main_Category = useSelector((state) => state.main_category);
  const { locale, query } = router;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img src={file.preview} className={styles.img} alt={file.name} />
      </div>
      {/* <button onClick={removeFile(file)}>Remove File</button> */}
    </div>
  ));

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
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Categories</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Category</li>
        </ul>
      </div>
      <div>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            padding: "12px 20px",
            color: "#fff !important",
            marginBottom: "20px",
          }}
        >
          <AddIcon
            sx={{ position: "relative", top: "-1px" }}
            className="mr-5px"
          />{" "}
          Create New
        </Button>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {Main_Category?.map((seller) => {
          const Name = JSON.parse(seller.name);

          return (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={seller.id}>
              <Card
                sx={{
                  boxShadow: "none",
                  borderRadius: "10px",
                  p: "25px",
                  mb: "15px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <img
                  src={`${Base_Img}upload/${seller?.image}`}
                  alt="Seller"
                  width="110px"
                  height="110px"
                  className="borRadius100"
                />

                <Typography
                  as="h4"
                  fontWeight="500"
                  fontSize="17px"
                  mt="10px"
                  mb="5px"
                >
                  {locale == "en" ? Name.name_en : Name.name_ar}
                </Typography>

                <Link
                  href={`/ecommerce/product?id=${seller.id}`}
                  className="text-decoration-none"
                >
                  <Button
                    onClick={() =>
                      dispatch({
                        type: "ADD_LIST",
                        payload: { id: query.id, take: 20, page: 1 },
                      })
                    }
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

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "20px",
                  }}
                >
                  <Box>
                    <Typography fontSize="13px">
                      {/* Item Stock */}
                      {seller?.is_classified ? "Classified" : "Commercial"}
                    </Typography>

                    <Typography
                      as="h4"
                      fontWeight="500"
                      fontSize="17px"
                      mt="5px"
                    >
                      {seller.itemStock}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontSize="13px">Wallet Balance</Typography>

                    <Typography
                      as="h4"
                      fontWeight="500"
                      fontSize="17px"
                      mt="5px"
                    >
                      {seller.walletBalance}
                    </Typography>
                  </Box>
                </Box>

                {/* Edit & Delete Button */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  <Tooltip title="Edit" placement="top">
                    <IconButton aria-label="edit" size="small">
                      <BorderColorIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" placement="top">
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          );
        })}
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
                Create New
              </Typography>

              <IconButton
                aria-label="remove"
                size="small"
                onClick={handleClose}
              >
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
      </Grid>
    </>
  );
};

export default Sellers;
