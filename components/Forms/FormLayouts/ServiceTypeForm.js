import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { requiredValidation, slugValidation } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  addServicesTypeFunApi,
  editServicesTypeFunApi,
} from "store/service/services";

import { useRouter } from "next/router";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";
import Image from "next/image";
import toast from "react-hot-toast";

const ServiceTypeForm = ({ formData, isEditMode }) => {
  const [avatar, setavatar] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setavatar(null);
      if (isEditMode) {
        setProfileImageUrl(formData?.image || null);
      } else {
        setProfileImageUrl(null);
      }
      return false;
    } else {
      const type = file.type.split("/")[0];
      if (type !== "image") {
        toast.error("Please select an image");
        setavatar(null);
        event.target.value = null;
        if (isEditMode) {
          setProfileImageUrl(formData?.image || null);
        } else {
          setProfileImageUrl(null);
        }
        return false;
      } else {
        setavatar(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setProfileImageUrl(e.target.result);
        };
      }
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setProfileImageUrl(formData?.image);
    }
  }, [formData?.image, isEditMode]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { serviceType } = useSelector((state) => state.service);

  const initialValues = isEditMode
    ? {
      name: formData?.name || "",
      slug: formData?.slug || "",
      image: formData?.image || "",
      id: formData?.id || "",
    }
    : {
      name: "",
      image: "",
      slug:"",    };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: requiredValidation("Service Type Name"),
      slug: slugValidation("Slug"),
    }),

    onSubmit: async (values) => {
      if (avatar === null && !isEditMode) {
        toast.error("Please select an image");
        return;
      }
      try {
        const myServiceData = {
          ...values,
          image: avatar,
        };

        if (isEditMode) {
          dispatch(
            editServicesTypeFunApi({
              data: myServiceData,
              onSuccess: () => {
                console.log("Edit Service Success");
                router.push("/services/service-type/");
              },
            })
          );
        } else {
          dispatch(
            addServicesTypeFunApi({
              data: myServiceData,
              onSuccess: () => {
                router.push("/services/service-type/");
              },
            })
          );
        }
      } catch (error) {
        console.error("Error adding/editing service:", error);
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
                name="name"
                fullWidth
                id="name"
                label="Enter Service Name"
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
                name="slug"
                fullWidth
                id="slug"
                label="Enter Slug"
                {...formik.getFieldProps("slug")}
                error={
                  formik.touched.slug && formik.errors.slug ? true : false
                }
                helperText={
                  formik.touched.slug && formik.errors.slug
                    ? formik.errors.slug
                    : ""
                }
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
                    Upload Image
                  </Typography>

                  <TextField
                    fullWidth
                    name="file"
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Box>
                {profileImageUrl && (
                  <Image
                    src={profileImageUrl}
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
              <LoadingButtonComponent
                type="submit"
                fullWidth={false}
                sx={{
                  padding: "12px 20px",
                }}
                isLoading={serviceType.isLoading}
                value={
                  <>
                    <SendIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className="mr-5px"
                    />{" "}
                    Add Services Type
                  </>
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default ServiceTypeForm;
