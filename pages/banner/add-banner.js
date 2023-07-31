import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { useDropzone } from "react-dropzone";
import styles from "@/styles/PageTitle.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";

export default function Add_Banner() {
  const dispatch = useDispatch();
  const [is_classified, setIs_classified] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [Id, setId] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      category: data.get("category"),
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
  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value, "val");
  };
  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img src={file.preview} className={styles.img} alt={file.name} />
      </div>
      {/* <button onClick={removeFile(file)}>Remove File</button> */}
    </div>
  ));
  const options = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];
  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option.label,
  };

  React.useEffect(() => {
    dispatch({ type: "MAIN_CATEGORY" });
  }, []);

  const Main_Category = useSelector((state) => state.main_category);
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

        {/* <IconButton aria-label="remove" size="small" onClick={handleClose}>
          <ClearIcon />
        </IconButton> */}
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
                // required
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
            <Grid item xs={12} md={12} lg={12}>
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
            <Grid item xs={12} md={12} lg={3}>
              <Typography
                as="h3"
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  mb: "10px",
                }}
              >
                Category
              </Typography>
              <Autocomplete
                // {...defaultProps}
                options={options}
                // disablePortal
                getOptionLabel={(option) => option.label}
                id="combo-box-demo"
                sx={{ width: 250 }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={params.id}
                    label="Main Catogory"
                    name="category"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "category", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <Typography
                as="h3"
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  mb: "10px",
                }}
              >
                Category
              </Typography>
              <Autocomplete
                // {...defaultProps}
                options={options}
                // disablePortal
                getOptionLabel={(option) => option.label}
                id="combo-box-demo"
                sx={{ width: 250 }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={params.id}
                    label="Main Catogory"
                    name="category"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "category", // disable autocomplete and autofill
                    }}
                  />
                )}
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
  );
}
