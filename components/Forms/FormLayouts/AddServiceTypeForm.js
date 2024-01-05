import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { requiredValidation } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";

import { addServicesTypeFunApi } from "store/service/services";
import { useRouter } from "next/router";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

const AddServiceTypeForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { serviceType } = useSelector((state) => state.service);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: requiredValidation(),
    }),
    onSubmit: (values) => {
      dispatch(
        addServicesTypeFunApi({
          data: values,
          onSuccess: () => {
            router.push("/services/service-type/");
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

export default AddServiceTypeForm;
