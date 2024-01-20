import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  addBusinessFunApi,
  getMyBussinessFunApi,
} from "store/business/services";
import { useRouter } from "next/router";
import { requiredValidation, slugValidation } from "@/utils/validation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { ColorPicker } from "@mantine/core";

const BusinessForm = () => {
  const { role } = useSelector((state) => state.auth);
  const { business, dataFatched, isLoading } = useSelector(
    (state) => state.business
  );
  console.log(isLoading, "business123");

  const router = useRouter();
  const dispatch = useDispatch();
  const [avatar1, setavatar1] = useState(null);
  console.log(avatar1);
  const [avatar2, setavatar2] = useState(null);
  console.log(avatar2, "avatar2");

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setavatar1(file);
  };

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getMyBussinessFunApi({
          onSuccess: (businessId) => {
            console.log(businessId, "businessIdd");
          },
        })
      );
    }
  }, [dispatch, dataFatched]);

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setavatar2(file);
    console.log("file2", file);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "dummy-business",
      email: "",
      phone: "",
      description: "",
      address: "",
      logo: "",
      bookingService: false,
      websiteService: false,
      bannerText: "",
      bannerImg: "",
      color: "",
      fontSize:"",
      fontFamily:"",
      // theme: "",
      // socialLinks: {
      //   facebook: "",
      //   twitter: "",
      //   instagram: "",
      // },
    },
    validationSchema: Yup.object({
      name: requiredValidation("name required"),
      slug: slugValidation("slug"),
      email: requiredValidation("email"),
      phone: requiredValidation("phone"),
      description: requiredValidation("description"),
      address: requiredValidation("address"),
      bannerText: requiredValidation("bannerText"),
      color: requiredValidation("color"),
      fontSize: requiredValidation("fontSize"),
      fontFamily: requiredValidation("fontFamily"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = {
          ...values,
          logo: avatar1,
          bannerImg: avatar2,
        };
        
        dispatch(
          addBusinessFunApi({
            data: formData,
            onSuccess: () => {
              router.push("/services/add-dummy-business/");
            },
          })
        );
      } catch (error) {
        console.error("Error adding dummy business:", error);
      }
    },
  });

  const handleInputChange = (field, value) => {
    setBusinessData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleSubmit = () => {
  //   dispatch(
  //     addBusinessFunApi({
  //       data: {
  //         name: businessData.name,
  //         email: businessData.email,
  //         phone: businessData.phone,
  //         slug: businessData.slug,
  //         logo: avatar1,
  //         description: businessData.description,
  //         address: businessData.address,
  //         bannerText: businessData.bannerText,
  //         bannerImg: avatar2,
  //         color: businessData.color,
  //         googleId: "1234567890",
  //         socialLinks: [
  //           {
  //             name: "facebook",
  //             link: "https://www.facebook.com/",
  //           },
  //           {
  //             name: "instagram",
  //             link: "https://www.instagram.com/",
  //           },
  //         ],
  //       },
  //       onSuccess: () => {
  //         router.push("/services/add-dummy-business/");
  //       },
  //     })
  //   );
  // };

  return (
    <>
      <h1>Add Dummy Business</h1>
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Card
          sx={{ boxShadow: "none", borderRadius: "10px", p: "25px 20px 15px" }}
        >
          <CardContent>
            <Grid container spacing={3}>
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
                  name="name"
                  fullWidth
                  id="name"
                  label="Enter Name"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && formik.errors.name}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
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
                  name="slug"
                  fullWidth
                  id="slug"
                  label="Enter Slug"
                  {...formik.getFieldProps("slug")}
                  error={formik.touched.slug && formik.errors.slug}
                  helperText={
                    formik.touched.slug && formik.errors.slug
                      ? formik.errors.slug
                      : ""
                  }
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
                  Email
                </Typography>
                <TextField
                  name="email"
                  fullWidth
                  id="email"
                  label="Enter email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && formik.errors.email}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
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
                  Phone
                </Typography>
                <TextField
                  name="phone"
                  fullWidth
                  id="phone"
                  label="Enter Phone"
                  {...formik.getFieldProps("phone")}
                  error={formik.touched.phone && formik.errors.phone}
                  helperText={
                    formik.touched.phone && formik.errors.phone
                      ? formik.errors.phone
                      : ""
                  }
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
                  Description
                </Typography>
                <TextField
                  name="description"
                  fullWidth
                  id="description"
                  label="Enter description"
                  {...formik.getFieldProps("description")}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : ""
                  }
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
                  Address
                </Typography>
                <TextField
                  name="address"
                  fullWidth
                  id="address"
                  label="Enter Address"
                  {...formik.getFieldProps("address")}
                  error={formik.touched.address && formik.errors.address}
                  helperText={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ""
                  }
                />
              </Grid>

              {/* Other fields go here */}

              <Grid item xs={12} md={6}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Business Logo
                  </Typography>
                  <TextField
                    fullWidth
                    name="logo"
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleFileChange1}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Banner Image
                  </Typography>

                  <TextField
                    fullWidth
                    name="banner-img"
                    type="file"
                    id="banner-img"
                    accept="image/*"
                    onChange={handleFileChange2}
                  />
                </Box>
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
                  Theme Color
                </Typography>
                <ColorPicker
                  name="color"
                  defaultValue="#4F46E5"
                  value={formik.values.color}
                  onChange={(color) => formik.setFieldValue("color", color)}
                />
                {formik.touched.color && formik.errors.color && (
                  <Typography color="error" variant="caption">
                    {formik.errors.color}
                  </Typography>
                )}
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
                  bannerText
                </Typography>
                <TextField
                  name="bannerText"
                  fullWidth
                  id="bannerText"
                  label="Enter bannerText"
                  {...formik.getFieldProps("bannerText")}
                  error={
                    formik.touched.bannerText && formik.errors.bannerText
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.bannerText && formik.errors.bannerText
                      ? formik.errors.bannerText
                      : ""
                  }
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
                  font Size
                </Typography>
                <TextField
                  name="Font Size"
                  fullWidth
                  id="fontSize"
                  label="Enter font Size"
                  {...formik.getFieldProps("fontSize")}
                  error={formik.touched.fontSize && formik.errors.fontSize}
                  helperText={
                    formik.touched.fontSize && formik.errors.fontSize
                      ? formik.errors.fontSize
                      : ""
                  }
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
                  font Family
                </Typography>
                <TextField
                  name="Font Size"
                  fullWidth
                  id="fontSize"
                  label="Enter font Family"
                  {...formik.getFieldProps("fontFamily")}
                  error={formik.touched.fontFamily && formik.errors.fontFamily}
                  helperText={
                    formik.touched.fontFamily && formik.errors.fontFamily
                      ? formik.errors.fontFamily
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12} textAlign="left">
                <LoadingButtonComponent
                  type="submit"
                  fullWidth={false}
                  sx={{
                    paddingX: "30px",
                  }}
                  isLoading={isLoading}
                  value={
                    <>
                      <SendIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-5px"
                      />{" "}
                      Add Business
                    </>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BusinessForm;
