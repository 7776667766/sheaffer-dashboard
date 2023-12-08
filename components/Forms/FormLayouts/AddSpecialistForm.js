import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addspecialistApi } from "../../../store/specialist/Services";
import { useDispatch } from "react-redux";

import dynamic from "next/dynamic";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  requiredValidation,
} from "@/utils/validation";
import { useRouter } from "next/router";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

const AddSpecialistForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      businessId: "656da4aac703af646ae8f124",
    },
    validationSchema: Yup.object({
      name: requiredValidation(),
      email: emailValidation(),
    }),
    onSubmit: (values) => {
      console.log("Handle Submit", values);
      dispatch(
        addspecialistApi({
          data: values,
          onSuccess: () => {
            console.log("Add Specialist Success");
            router.push("/specialist/");
          },
        })
      );
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
                Specialist Name
              </Typography>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
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
                autoComplete="email-address"
                name="emailAddress"
                fullWidth
                id="emailAddress"
                label="Email Address"
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
                Add Specialist
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default AddSpecialistForm;