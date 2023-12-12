import React from "react";
import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { requiredValidation } from "@/utils/validation";

import { addManagerFunApi } from "store/manager/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getspecialistApi } from "store/specialist/services";
import { getServicesTypeFunApi } from "store/service/services";

const AddServiceForm = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedServices, setSelectedServices] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { business } = useSelector((state) => state.business);
  console.log(business);
  const { specialist } = useSelector((state) => state.specialist);
  console.log("specialist data", specialist);
  const { serviceType } = useSelector((state) => state.service);
  console.log("service data", serviceType);

  useEffect(() => {
    if (!specialist.specialistFetch) {
      dispatch(getspecialistApi({ data: business?.id }));
    }
  }, [dispatch, specialist.specialistFetch, business?.id]);

  useEffect(() => {
    if (!serviceType.dataFatched) {
      dispatch(getServicesTypeFunApi({ data: business?.id }));
    }
  }, [dispatch, business?.id, serviceType.dataFatched]);

  const servicesArray =
    serviceType && serviceType[0] && Array.isArray(serviceType[0])
      ? serviceType[0]
      : [];

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
          day: "Monday",
          startTime: "10:00",
          endTime: "12:00",
        },
        {
          day: "Tuesday",
          startTime: "10:00",
          endTime: "12:00",
        },
        {
          day: "Wednesday",
          startTime: "10:00",
          endTime: "12:00",
        },
        {
          day: "thursday",
          startTime: "10:00",
          endTime: "12:00",
        },
        {
          day: "Friday",
          startTime: "10:00",
          endTime: "12:00",
        },
        {
          day: "Saturday",
          startTime: "10:00",
          endTime: "12:00",
        },
        {
          day: "Sunday",
          startTime: "10:00",
          endTime: "12:00",
        },
      ],
    },
    validationSchema: Yup.object().shape({
      name: requiredValidation("Service Name"),
      description: requiredValidation("Service Description"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File size is too large", (value) => {
          return value ? value.size <= 5 * 1024 * 1024 : true;
        }),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is Required"),
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
              <FormControl fullWidth>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  Select Services
                </Typography>
                <Select
                  value={selectedServices}
                  onChange={(e) => setSelectedServices(e.target.value)}
                  displayEmpty
                  inputProps={{
                    style: { borderRadius: 8 },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a service
                  </MenuItem>
                  {serviceType.data.map((service) => (
                    <MenuItem key={service._id} value={service._id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

            <Grid item xs={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Upload Image
              </Typography>

              <TextField
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                autoComplete="file"
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
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
                Price
              </Typography>
              <TextField
                autoComplete="price"
                name="price"
                fullWidth
                id="price"
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
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}
              >
                Date
              </Typography>
              <TextField
                autoComplete="date"
                type="date"
                name="date"
                fullWidth
                id="confirmPassword"
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

            <Grid item xs={12}>
              {/* Example for 'timeSlots' array */}
              <Typography
                as="h5"
                sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}
              >
                Time Slots
              </Typography>
              {formik.values.timeSlots.map((slot, index) => (
                <Grid container spacing={6} key={index}>
                  <Grid item xs={12} md={4} sx={{ mb: 3 }}>
                    {/* Day */}
                    <TextField
                      name={`timeSlots[${index}].day`}
                      fullWidth
                      label={`Day ${index + 1}`}
                      value={formik.values.timeSlots[index]?.day || ""}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.timeSlots && formik.errors.timeSlots
                          ? !!formik.errors.timeSlots[index]?.day
                          : false
                      }
                      helperText={
                        formik.touched.timeSlots && formik.errors.timeSlots
                          ? formik.errors.timeSlots[index]?.day
                          : ""
                      }
                      InputProps={{
                        readOnly: true,
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name={`timeSlots[${index}].startTime`}
                      fullWidth
                      type="time"
                      label={"start time"}
                      {...formik.getFieldProps(`timeSlots[${index}].startTime`)}
                      error={
                        formik.touched.timeSlots && formik.errors.timeSlots
                          ? !!formik.errors.timeSlots[index]?.startTime
                          : false
                      }
                      helperText={
                        formik.touched.timeSlots && formik.errors.timeSlots
                          ? formik.errors.timeSlots[index]?.startTime
                          : ""
                      }
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {/* End Time */}
                    <TextField
                      name={`timeSlots[${index}].endTime`}
                      fullWidth
                      type="time"
                      label={"End time"}
                      {...formik.getFieldProps(`timeSlots[${index}].endTime`)}
                      error={
                        formik.touched.timeSlots && formik.errors.timeSlots
                          ? !!formik.errors.timeSlots[index]?.endTime
                          : false
                      }
                      helperText={
                        formik.touched.timeSlots && formik.errors.timeSlots
                          ? formik.errors.timeSlots[index]?.endTime
                          : ""
                      }
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
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
                Add Services
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default AddServiceForm;
