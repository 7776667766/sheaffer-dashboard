import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getServicesTypeFunApi } from "store/service/services";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { requiredValidation } from "@/utils/validation";


const addPlans = () => {
  //   const { serviceType } = useSelector((state) => state.service);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (serviceType.dataFatched !== true) {
  //       dispatch(getServicesTypeFunApi());
  //     }
  //   }, [dispatch, serviceType.dataFatched, serviceType.serviceFetch]);
  const plans = [
    {
      name: "3 Months",
      value: "3months",
    },
    { name: "6 Months", value: "6months" },
    { name: "1 Year", value: "1 year" },
  ];
  const formik = useFormik({
    initialValues: {
      name: "",
      duration:"",
      Price:"",
      Descripition:""
    },
    validationSchema: Yup.object({
      name: requiredValidation(),
      duration:requiredValidation('duration'),
      Price: requiredValidation('Price'),
      Descripition:requiredValidation('Descripition'),
    }),
    onSubmit: (values) => {
      console.log("Handle Submit", values);
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
          Add Plans
        </Typography>

        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: "10px" }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
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
                 
                <TextField id="" select fullWidth label="Duration"  name="duration" 
                 {...formik.getFieldProps("duration")}
                 error={
                   formik.touched.duration && formik.errors.duration ? true : false
                 }
                 helperText={
                   formik.touched.duration && formik.errors.duration
                     ? formik.errors.duration
                     : ""
                 }
                >
                  {plans.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                  
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="Price"
                  label="Price"
                  type="text"
                  id=""
                  autoComplete="Price"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}

                  {...formik.getFieldProps("Price")}
                  error={
                    formik.touched.Price && formik.errors.Price ? true : false
                  }
                  helperText={
                    formik.touched.Price && formik.errors.Price
                      ? formik.errors.Price
                      : ""
                  }

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Descripition"
                  label="Descripition"
                  multiline
                  id=""
                  autoComplete="Descripition"
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                  {...formik.getFieldProps("Descripition")}
                  error={
                    formik.touched.Descripition && formik.errors.Descripition ? true : false
                  }
                  helperText={
                    formik.touched.Descripition && formik.errors.Descripition
                      ? formik.errors.Descripition
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
                  control={<Checkbox defaultChecked />}
                  label="Is Featured"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="left">
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                padding: "12px 10px",
                color: "#fff !important",
                textAlign: "left",
                width: "200px",
              }}
            >
              Get Started
            </Button>
          </Grid>
          <Typography fontSize="14px" mt="20px" align="center">
            Already have an account?
            <Link href="#" className="primaryColor text-decoration-none">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default addPlans;
