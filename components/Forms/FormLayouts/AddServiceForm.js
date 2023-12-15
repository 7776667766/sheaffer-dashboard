import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { requiredValidation } from "@/utils/validation";
import { Checkbox} from "@material-ui/core";
import { addservicesFunApi } from "store/service/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getspecialistApi } from "store/specialist/services";
import { getServicesTypeFunApi } from "store/service/services";
import { top100Films } from "@/components/UIElements/Autocomplete/ComboBox";
import dynamic from "next/dynamic";
import { CheckBox } from "@mui/icons-material";
const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

const AddServiceForm = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedServices, setSelectedServices] = useState(null);
  const [avatar, setavatar] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setavatar(file);
  };
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { business } = useSelector((state) => state.business);
  const { specialist } = useSelector((state) => state.specialist);
  const { serviceType } = useSelector((state) => state.service);
  console.log(serviceType);

  useEffect(() => {
    if (!specialist.specialistFetch) {
      dispatch(getspecialistApi({ data: business?.id }));
    }
  }, [dispatch, specialist.specialistFetch, business?.id]);

  useEffect(() => {
    if (!serviceType.dataFatched) {
      dispatch(getServicesTypeFunApi({ data: business?.id }));
    }
  }, [
    dispatch,
    serviceType.serviceFetch,
    business?.id,
    serviceType.dataFatched,
  ]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      price: "",
      typeId: "",
      specialistId: "",
      date: "",
      businessId: business?.id,
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
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is Required"),
      date: Yup.date().typeError("Invalid Date").required("Date is Required"),
      timeSlots: Yup.array().of(
        Yup.object().shape({
          day: requiredValidation("Day"),
          startTime: requiredValidation("Start Time"),
          endTime: requiredValidation("End Time"),
        })
      ),
    }),

    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        const formData = {
          ...values,
          specialistId: selectedSpecialist ? selectedSpecialist.id : "",
          typeId: selectedServices ? selectedServices.id : "",
          image: avatar,
        };

        console.log(formData);

        await dispatch(
          addservicesFunApi({
            data: formData,
            config,
            onSuccess: () => {
              console.log("Add Service Success");
              router.push("/services/");
            },
          })
        );
      } catch (error) {
        console.error("Error adding service:", error);
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
          // mb: "15px",
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
                  Service Type
                </Typography>

                <Autocomplete
                  value={selectedServices || null}
                  onChange={(event, newValue) => {
                    setSelectedServices(newValue);
                  }}
                  options={serviceType?.data || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a service"
                      autoComplete={serviceType}
                      inputProps={{
                        ...params.inputProps,
                        style: { borderRadius: 8 },
                      }}
                    />
                  )}
                />
                {/* <Select
                
                  value={selectedServices ? selectedServices.id : ""}
                  onChange={(e) => {
                    const selected = serviceType.data.find(
                      (service) => service.id === e.target.value
                    );
                    setSelectedServices(selected || null);
                  }}
                  displayEmpty
                  inputProps={{
                    style: { borderRadius: 8 },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a service
                  </MenuItem>
                  {serviceType?.data.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select> */}
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
                  Specialist
                </Typography>

                <Autocomplete
                  value={selectedSpecialist || null}
                  onChange={(event, newValue) => {
                    setSelectedSpecialist(newValue);
                  }}
                  options={specialist || []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a specialist"
                      inputProps={{
                        ...params.inputProps,
                        style: { borderRadius: 8 },
                      }}
                    />
                  )}
                />
                {/* <Select
                  value={selectedSpecialist ? selectedSpecialist.id : ""}
                  onChange={(e) => {
                    const selected = specialist.find(
                      (s) => s.id === e.target.value
                    );
                    setSelectedSpecialist(selected || null);
                  }}
                  displayEmpty
                  inputProps={{
                    style: { borderRadius: 8 },
                  }}
                >
                  {specialist?.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select> */}
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
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}
              >
                Time Slot
              </Typography>
              <TextField
                autoComplete="date"
                type="date"
                name="date"
                fullWidth
                id="date"
                {...formik.getFieldProps("date")}
                error={
                  formik.touched.price && formik.errors.date ? true : false
                }
                helperText={
                  formik.touched.date && formik.errors.date
                    ? formik.errors.date
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            {/* <Box mt={1} ml={2}>
                <img
                  src={user.image}
                  alt="profile"
                  className="borRadius100"
                  width="50px"
                  height="50px"
                  
                />
              </Box> */}
            {/* <Grid item xs={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: '500',
                  fontSize: '14px',
                  mb: '10px',
                  display: 'block',
                }}
              >
                Upload Image
              </Typography>

              <input
                required
                fullWidth
                type="file"
                name="file"
                onChange={handleFileChange}
                id="file"
                autoComplete="file"
                sx={{
                  padding: '16px',
                  borderRadius: '8px',
                }}
              />
            </Grid> */}

            <Grid item xs={12}>
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

              <RichTextEditor
                id="rte"
                controls={[
                  ["bold", "italic", "underline", "link", "image"],
                  ["unorderedList", "h1", "h2", "h3", "h4", "h5", "h6"],
                  ["sup", "sub"],
                  ["alignLeft", "alignCenter", "alignRight"],
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                as="h5"
                sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}
              >
                Time Slots
              </Typography>
              {formik.values.timeSlots.map((slot, index) => (
                <Grid container spacing={6} key={index}>
                  <Grid item xs={12} md={4} sx={{ mb: 3 }}>
                    {slot.days.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <Checkbox
                          name={`timeSlots[${index}].days[${dayIndex}]`}
                          checked={
                            formik.values.timeSlots[index]?.slot.days?.[dayIndex] || false
                          }
                          onChange={formik.handleChange}
                        />
                        {day}
                      </div>
                    ))}
                    {/* <TextField
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
                    /> */}
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
