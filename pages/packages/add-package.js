import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPlanFunApi } from "store/plan/plan";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { requiredValidation } from "@/utils/validation";
import { useRouter } from "next/router";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";

const plansList = [
  {
    name: "3 Months",
    value: "3 Months",
  },
  { name: "6 Months", value: "6 Months" },
  { name: "1 Year", value: "1 Year" },
];

const AddBusinessPackagePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { plan } = useSelector((state) => state.plan);

  const formik = useFormik({
    initialValues: {
      name: "",
      duration: "",
      price: "",
      Features: "",
      isFeatured: false,
    },
    validationSchema: Yup.object({
      name: requiredValidation(),
      duration: requiredValidation("duration"),
      price: requiredValidation("Price"),
      Features: requiredValidation("Features"),
    }),

    onSubmit: (values) => {
      dispatch(
        addPlanFunApi({
          data: values,
          onSuccess: () => {
            router.push("/packages");
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
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "10px",
          }}
        >
          Add Business package
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: "10px" }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  fullWidth
                  {...formik.getFieldProps("name")}
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  label="Duration"
                  {...formik.getFieldProps("duration")}
                  error={
                    formik.touched.duration && formik.errors.duration
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.duration && formik.errors.duration
                      ? formik.errors.duration
                      : ""
                  }
                >
                  {plansList.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  {...formik.getFieldProps("price")}
                  error={
                    formik.touched.price && formik.errors.price ? true : false
                  }
                  helperText={
                    formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Features"
                  minRows={3}
                  multiline
                  {...formik.getFieldProps("Features")}
                  error={
                    formik.touched.Features && formik.errors.Features
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.Features && formik.errors.Features
                      ? formik.errors.Features
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isFeatured"
                      {...formik.getFieldProps("isFeatured")}
                    />
                  }
                  label="Is Featured Plan"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <LoadingButtonComponent
              type="submit"
              value="Add Business Package"
              isLoading={plan.isLoading}
              disabled={plan.isLoading}
              fullWidth={false}
              sx={{
                padding: "10px 36px",
              }}
            />
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default AddBusinessPackagePage;