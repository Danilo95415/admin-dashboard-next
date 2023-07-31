import { Box, Card, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const [files, setFiles] = useState([]);
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: "auto",
    height: "auto",
    padding: 4,
    boxSizing: "border-box",
  };
  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
      {/* <button onClick={removeFile(file)}>Remove File</button> */}
    </div>
  ));

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
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
        <aside style={thumbsContainer}>{thumbs}</aside>
      </Card>
    </div>
  );
}
export default MyDropzone;
