import React, { useEffect } from "react";
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
import Image from "next/image";

import { addtemplateApi, edittemplateFunApi } from "store/template/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const TemplateForm = ({ formData, isEditMode }) => {

  const [avatar1, setavatar1] = useState(null);
  const [avatar2, setavatar2] = useState(null);
  console.log("avatar2", avatar2)

  const dispatch = useDispatch();
  const router = useRouter();
  const [profileImageUrl1, setProfileImageUrl1] = useState(null);
  const [profileImageUrl2, setProfileImageUrl2] = useState(null);

  const handleWebsiteImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setavatar1(null);
      if (isEditMode) {
        setProfileImageUrl1(formData?.websiteImage || null);
      } else {
        setProfileImageUrl1(null);
      }
      return false;
    } else {
      const type = file.type.split("/")[0];
      if (type !== "image") {
        toast.error("Please select an image");
        setavatar1(null);
        event.target.value = null;
        if (isEditMode) {
          setProfileImageUrl1(formData?.websiteImage || null);
        } else {
          setProfileImageUrl1(null);
        }
        return false;
      } else {
        setavatar1(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setProfileImageUrl1(e.target.result);
        };
      }
    }
  };

  const handleBookingImageChange = (event) => {
    const file = event.target.files[0];
    setavatar2(file)
    if (!file) {
      setavatar2(null);
      if (isEditMode) {
        setProfileImageUrl2(formData?.bookingImage || null);
      } else {
        setProfileImageUrl2(null);
      }
      return false;
    } else {
      const type = file.type.split("/")[0];
      if (type !== "image") {
        toast.error("Please select an image");
        setavatar2(null);
        event.target.value = null;
        if (isEditMode) {
          setProfileImageUrl2(formData?.bookingImage || null);
        } else {
          setProfileImageUrl2(null);
        }
        return false;
      } else {
        setavatar2(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setProfileImageUrl2(e.target.result);
        };
      }
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setProfileImageUrl2(formData?.bookingImage);
    }
  }, [formData?.bookingImage, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      setProfileImageUrl1(formData?.websiteImage);
    }
  }, [formData?.websiteImage, isEditMode]);

  const initialValues = isEditMode
    ? {
      name: formData?.name || "",
      slug: formData?.slug || "",
      description: formData?.description || "",
      websiteImage: formData?.websiteImage || "",
      bookingImage: formData?.bookingImage || "",
      id: formData?.id || "",
    }
    : {
      name: "",
      websiteImage: "",
      bookingImage: "",
      description:"",
      slug: "",
    };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: requiredValidation(" Name"),
      slug: slugValidation("Slug"),
      description: requiredValidation("Description")
    }),

    onSubmit: async (values) => {
      if (avatar1 === null && avatar2 === null && !isEditMode) {
        toast.error("Please select an image");
        return;
      }
      try {
        const formData = {
          ...values,
          websiteImage: avatar1,
          bookingImage: avatar2
        };
        console.log("formData", formData)
        if (isEditMode) {
          dispatch(
            edittemplateFunApi({
              data: formData,
              onSuccess: () => {
                console.log("Edit template Success");
                router.push("/templates/");
              },
            })
          );
        } else {
          dispatch(
            addtemplateApi({
              data: formData,
              onSuccess: () => {
                router.push("/templates/");
              },
            })
          );
        }
      } catch (error) {
        console.error("Error adding/editing template:", error);
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
                autoComplete="description"
                fullWidth
                label="Enter Description"
                {...formik.getFieldProps("description")}
                error={formik.touched.description && formik.errors.description ? true : false}
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={12} lg={6}>
              <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
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
                </Box>
                {profileImageUrl1 && (
                  <Image
                    src={profileImageUrl1}
                    alt="profile"
                    style={{
                      border: "1px solid #e0e0e0",
                    }}
                    width={50}
                    height={50}
                  />
                )}
              </Box>
            </Grid>
        
            <Grid item xs={12} md={12} lg={6}>
              <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
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

                    onChange={handleBookingImageChange}

                  />
                </Box>
                {profileImageUrl2 && (
                  <Image
                    src={profileImageUrl2}
                    alt="profile"
                    style={{
                      border: "1px solid #e0e0e0",
                    }}
                    width={50}
                    height={50}
                  />
                )}
              </Box>
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
