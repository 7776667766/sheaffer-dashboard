import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import { requiredValidation, slugValidation } from "@/utils/validation";

import { addtemplateApi } from "store/template/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const TemplateForm = () => {

  const [avatar1, setavatar1] = useState(null);
  const [avatar2, setavatar2] = useState(null);

  console.log(avatar1, "avatar1")
  console.log(avatar2, "avatar2")

  const dispatch = useDispatch();
  const router = useRouter();


  const handleWebsiteImageChange = (event) => {
    const file = event.target.files[0];
    setavatar1(file);
    console.log("file1", file)
  };

  const handleBookingImageChange = (event) => {
    const file = event.target.files[0];
    setavatar2(file);
    console.log("file2", file)
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      websiteImage: "",
      bookingImage: ""

    },
    validationSchema: Yup.object({
      name: requiredValidation(),
      slug: slugValidation(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = {
          ...values,
          websiteImage: avatar1,
          bookingImage: avatar2
        };

        console.log(formData);

        dispatch(
          addtemplateApi({
            data: formData,
            onSuccess: () => {
              router.push("/templates")

            },
          })
        );
      } catch (error) {
        console.error("Error adding template:", error);
      }
    },

  });

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
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
                fullWidth
                label="Enter Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && formik.errors.name ? true : false}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Slug
              </Typography>
              <TextField
                fullWidth
                label="Slug"
                {...formik.getFieldProps("slug")}
                error={formik.touched.slug && formik.errors.slug ? true : false}
                helperText={
                  formik.touched.slug && formik.errors.slug
                    ? formik.errors.slug
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Upload Website Image
              </Typography>

              <TextField
                required
                fullWidth
                name="websiteImage"
                type="file"
                onChange={handleWebsiteImageChange}
                id="websiteImage"

              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Upload Booking Image
              </Typography>

              <TextField
                required
                fullWidth
                name="bookingImage"
                type="file"
                id="bookingImage"
                accept="image/*"
                onChange={handleBookingImageChange}

              />
            </Grid>

            <Grid item xs={12} textAlign="left">
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
                <SendIcon
                  sx={{
                    position: "relative",
                    top: "-2px",
                  }}
                  className="mr-5px"
                />
                Add Template
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default TemplateForm;
