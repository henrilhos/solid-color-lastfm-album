import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { ImageStep } from "../components/ImageStep";
import { SearchStep } from "../components/SearchStep";
import { SEO } from "../components/SEO";

export default function Home() {
  const [step, setStep] = useState(0);
  const [colors, setColors] = useState([]);
  const [albumURL, setAlbumURL] = useState("");

  const validationSchema = yup.object({
    albumURL: yup
      .string()
      .matches(/http(s)?:\/\/(www.)?last.fm\/music\/.*\/.*/, "Invalid URL")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { albumURL: "" },
    validationSchema,
  });

  const onCreateClick = (event) => {
    event.preventDefault();
    formik.setFieldTouched("albumURL");

    if (!formik.errors.albumURL) {
      if (formik.values.albumURL === albumURL && colors) {
        setStep(1);
        return;
      }

      setAlbumURL(formik.values.albumURL);
      axios
        .get("/api/get-cover-color", {
          params: { albumURL: formik.values.albumURL },
        })
        .then(({ data }) => {
          console.log(data);
          setColors(data.colors);
        })
        .catch((err) => console.error(err));
    }
  };

  const onBackClick = () => setStep(0);

  useEffect(() => {
    if (colors && colors.length > 0) setStep(1);
  }, [colors]);

  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <SEO />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {step === 0 && (
            <SearchStep formik={formik} onCreateClick={onCreateClick} />
          )}

          {step === 1 && (
            <ImageStep colors={colors} onBackClick={onBackClick} />
          )}
        </Grid>
      </Container>
    </div>
  );
}
