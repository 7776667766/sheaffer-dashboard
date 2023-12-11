import React from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { useEffect, useState } from 'react'
import * as Yup from "yup";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  requiredValidation,
} from "@/utils/validation";

import { addManagerFunApi } from "store/manager/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getspecialistApi } from "store/specialist/services";


const AddServiceForm = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { business } = useSelector((state) => state.business);
  console.log(business)
  const { specialist } = useSelector((state) => state.specialist);
  console.log("data", specialist)

  useEffect(() => {
    if (!specialist.specialistFetch) {
      dispatch(getspecialistApi({ data: business?.id }));
    }
  }, [dispatch, specialist.specialistFetch, business?.id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      price: "",
      typeId: "",
      specialistId: "",
      date: "",
      businessId: "",
      timeSlots: [
        {
          day: "",
          startTime: "",
          endTime: "",
          available: false,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      name: requiredValidation("Service Name"),
      description: requiredValidation("Service Description"),
      image: Yup.mixed().required("Image is required").test("fileSize", "File size is too large", (value) => {
        // Assuming you want to set a maximum file size (e.g., 5MB)
        return value ? value.size <= 5 * 1024 * 1024 : true;
      }),
            price: Yup.number().typeError("Price must be a number").required("Price is Required"),
      typeId: requiredValidation("Type ID"),
      specialistId: requiredValidation("Specialist ID"),
      date: Yup.date().typeError("Invalid Date").required("Date is Required"),
      businessId: requiredValidation("Business ID"),
      timeSlots: Yup.array().of(
        Yup.object().shape({
          day: requiredValidation("Day"),
          startTime: requiredValidation("Start Time"),
          endTime: requiredValidation("End Time"),
          available: Yup.boolean().required("Availability is Required"),
        })
      ),
    }),
    onSubmit: (values) => {
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
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

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
              <FormControl fullWidth>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  Select Specialist
                </Typography>
                <Select
                  value={selectedSpecialist}
                  onChange={(e) => setSelectedSpecialist(e.target.value)}
                  displayEmpty
                  inputProps={{
                    "aria-label": "Select Specialist",
                    style: { borderRadius: 8 },
                  }}
                >
                  {specialist.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} md={12} lg={6}>
              {/* Example for 'description' field */}
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
                name="description"
                fullWidth
                id="description"
                label="Enter Description"
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description && formik.errors.description
                    ? true
                    : false
                }
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
          <Typography as="h5" sx={{ fontWeight: '500', fontSize: '14px', mb: '12px' }}>
            Upload Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]);
            }}
          />
          {formik.touched.image && formik.errors.image && (
            <Typography color="error">{formik.errors.image}</Typography>
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
                Password
              </Typography>
              <TextField
                autoComplete="password"
                name="password"
                fullWidth
                id="password"
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
          <Typography as="h5" sx={{ fontWeight: '500', fontSize: '14px', mb: '12px' }}>
            Date
          </Typography>
          <TextField
            autoComplete="date"
            type="date"
            name="date"
            fullWidth
            id="date"
            {...formik.getFieldProps('date')}
            error={formik.touched.date && formik.errors.date ? true : false}
            helperText={formik.touched.date && formik.errors.date ? formik.errors.date : ''}
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />
        </Grid>

        <Grid item xs={12}>
  {/* Example for 'timeSlots' array */}
  <Typography as="h5" sx={{ fontWeight: '500', fontSize: '14px', mb: '12px' }}>
    Time Slots
  </Typography>
  {formik.values.timeSlots.map((slot, index) => (
    <Grid container spacing={2} key={index}>
      <Grid item xs={12} md={4}>
        {/* Day */}
        <TextField
          name={`timeSlots[${index}].day`}
          fullWidth
          label={`Day ${index + 1}`}
          value={formik.values.timeSlots[index]?.day || ''}
          onChange={formik.handleChange}
          error={
            formik.touched.timeSlots && formik.errors.timeSlots
              ? !!formik.errors.timeSlots[index]?.day
              : false
          }
          helperText={
            formik.touched.timeSlots && formik.errors.timeSlots
              ? formik.errors.timeSlots[index]?.day
              : ''
          }
          InputProps={{
            style: { borderRadius: 8 },
          }}
        />
      </Grid>
      {/* ... (similar blocks for 'startTime', 'endTime', etc.) */}
    </Grid>
  ))}
</Grid>

          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default AddServiceForm;
