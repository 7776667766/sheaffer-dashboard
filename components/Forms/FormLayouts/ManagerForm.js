import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  requiredValidation,
} from "@/utils/validation";

import { addManagerFunApi, editManagerFunApi } from "store/manager/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const ManagerForm = ({ formData, isEditMode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { business } = useSelector((state) => state.business);

  const initialValues = isEditMode
    ? {
        ...formData,
        businessId: business?.id,
      }
    : {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        businessId: business?.id,
      };

  const validation = {
    phone: phoneValidation(),
    email: emailValidation(),
    name: requiredValidation(),
  };

  if (!isEditMode) {
    validation.password = passwordValidation();
    validation.confirmPassword = confirmPasswordValidation();
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(
      validation
      //   {
      //   phone: phoneValidation(),
      //   email: emailValidation(),
      //   name: requiredValidation(),
      //   password: passwordValidation(),
      //   confirmPassword: confirmPasswordValidation(),
      // }
    ),
    onSubmit: (values) => {
      if (isEditMode) {
        dispatch(
          editManagerFunApi({
            data: values,
            onSuccess: () => {
              console.log("Edit Manager Success");
              router.push("/manager/");
            },
          })
        );
      } else {
        console.log("Handle Submit", values);
        dispatch(
          addManagerFunApi({
            data: values,
            onSuccess: () => {
              console.log("Add Manager Success");
              router.push("/manager/");
            },
          })
        );
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
                Email Address
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                autoComplete="email-address"
                {...formik.getFieldProps("email")}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
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
                Phone Number
              </Typography>
              <TextField
                autoComplete="number"
                fullWidth
                label="Phone Number"
                {...formik.getFieldProps("phone")}
                error={
                  formik.touched.phone && formik.errors.phone ? true : false
                }
                helperText={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>
            {!isEditMode && (
              <>
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    autoComplete="password"
                    fullWidth
                    label="Password"
                    {...formik.getFieldProps("password")}
                    error={
                      formik.touched.password && formik.errors.password
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
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
                    Confirm Password
                  </Typography>
                  <TextField
                    autoComplete="confirm-password"
                    fullWidth
                    label="Confirm Password"
                    {...formik.getFieldProps("confirmPassword")}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
              </>
            )}

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
                />{" "}
                {isEditMode ? "Edit" : "Add"} Manager
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default ManagerForm;