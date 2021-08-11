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
  const [color, setColor] = useState();
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
      if (formik.values.albumURL === albumURL && color) {
        setStep(1);
        return;
      }

      setAlbumURL(formik.values.albumURL);
      axios
        .get("/api/get-cover-color", {
          params: { albumURL },
        })
        .then(({ data }) => {
          setColor(data.background);
        })
        .catch((err) => console.error(err));
    }
  };

  const onBackClick = () => setStep(0);

  useEffect(() => {
    if (color) setStep(1);
  }, [color]);

  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <SEO />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {step === 0 && (
            <SearchStep formik={formik} onCreateClick={onCreateClick} />
          )}

          {step === 1 && <ImageStep color={color} onBackClick={onBackClick} />}
        </Grid>
      </Container>
    </div>
  );
}
