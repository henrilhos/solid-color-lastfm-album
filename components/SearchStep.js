import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

export const SearchStep = ({ formik, onCreateClick }) => (
  <>
    <Grid item xs={12}>
      <Typography variant="h5" component="h1">
        Solid color - Last.fm cover albums
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <TextField
        error={formik.touched.albumURL && Boolean(formik.errors.albumURL)}
        fullWidth
        helperText={formik.touched.albumURL && formik.errors.albumURL}
        id="albumURL"
        label="Last.fm album URL"
        onChange={formik.handleChange}
        value={formik.values.albumURL || ""}
      />
    </Grid>
    <Grid item xs={12} style={{ textAlign: "end" }}>
      <Button variant="contained" color="primary" onClick={onCreateClick}>
        Create
      </Button>
    </Grid>
  </>
);
