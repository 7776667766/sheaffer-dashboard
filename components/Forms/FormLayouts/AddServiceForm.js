import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Autocomplete,
  Checkbox,
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
import { addservicesFunApi, editServicesFunApi } from "store/service/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getspecialistApi } from "store/specialist/services";
import { getServicesTypeFunApi } from "store/service/services";
import toast from "react-hot-toast";
import Image from "next/image";
// import dynamic from "next/dynamic";
// import RichTextEditor from "@mantine/rte";
// const RichTextEditor = dynamic(() => import("@mantine/rte"), {
//   ssr: false,
// });

const AddServiceForm = ({ formData, isEditMode }) => {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
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
  const dispatch = useDispatch();
  const router = useRouter();
  const { business } = useSelector((state) => state.business);
  const { specialist } = useSelector((state) => state.specialist);
  const { serviceType } = useSelector((state) => state.service);

  useEffect(() => {
    if (isEditMode) {
      setProfileImageUrl(formData?.image);
    }
  }, [formData?.image, isEditMode]);

  useEffect(() => {
    if (!specialist.specialistFetch) {
      dispatch(
        getspecialistApi({
          data: business?.id,
          onSuccess: (specialistList) => {
            if (isEditMode) {
              const selected = specialistList?.find(
                (s) => s.id === formData.specialist.id
              );
              setSelectedSpecialist(selected || null);
            }
          },
        })
      );
    }
  }, [
    business?.id,
    dispatch,
    formData?.specialist.id,
    isEditMode,
    specialist.specialistFetch,
  ]);

  useEffect(() => {
    if (!serviceType.dataFatched) {
      dispatch(
        getServicesTypeFunApi({
          data: business?.id,
          onSuccess: (serviceTypesList) => {
            if (isEditMode) {
              const selected = serviceTypesList?.find(
                (s) => s.id === formData.type.id
              );
              setSelectedServiceType(selected || null);
            }
          },
        })
      );
    } else {
      if (isEditMode && selectedServiceType === null) {
        const selected = serviceType.data?.find(
          (s) => s.id === formData.type.id
        );
        setSelectedServiceType(selected || null);
      }
    }
  }, [
    business?.id,
    dispatch,
    formData?.type.id,
    isEditMode,
    selectedServiceType,
    serviceType.data,
    serviceType.dataFatched,
  ]);

  const initialValues = isEditMode
    ? {
      ...formData,
    }
    : {
      name: "",
      description: "",
      image: "",
      price: "",
      typeId: "",
      specialistId: "",
      timeInterval: 0,
      businessId: business?.id,
      timeSlots: [
        {
          day: "Monday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
        {
          day: "Tuesday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
        {
          day: "Wednesday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
        {
          day: "Thursday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
        {
          day: "Friday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
        {
          day: "Saturday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
        {
          day: "Sunday",
          startTime: "0:00",
          endTime: "0:00",
          active: false,
        },
      ],
    };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: requiredValidation("Service Name"),
      description: requiredValidation("Service Description"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is Required")
        .min(0, "Price must be greater than or equal to 0"),
      timeInterval: Yup.number()
        .typeError("Must be a number")
        .required("TimeInterval is Required")
        .positive("TimeInterval must be positive")
        .integer("TimeInterval must be an integer"),
      timeSlots: Yup.array().of(
        Yup.object().shape({
          day: requiredValidation("Day"),
          startTime: requiredValidation("Start Time"),
          endTime: requiredValidation("End Time"),
        })
      ),
    }),

    onSubmit: async (values) => {
      if (avatar === null && isEditMode === false) {
        toast.error("Please select an image");
        return false;
      }

      try {
        const myServiceData = {
          ...values,
          specialistId: selectedSpecialist ? selectedSpecialist.id : "",
          typeId: selectedServiceType ? selectedServiceType.id : "",
          image: avatar,
        };

        console.log(myServiceData);
        if (isEditMode) {
          dispatch(
            editServicesFunApi({
              data: myServiceData,
              onSuccess: () => {
                console.log("Edit Service Success");
                router.push("/services/");
              },
            })
          );
        } else {
          dispatch(
            addservicesFunApi({
              data: myServiceData,
              onSuccess: () => {
                console.log("Add Service Success");
                router.push("/services/");
              },
            })
          );
        }
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
        }}
      >
        {specialist.isLoading || serviceType.isLoading ? (
          <p>Loading</p>
        ) : (
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
                  name="name"
                  fullWidth
                  id="name"
                  label="Enter Name"
                  {...formik.getFieldProps("name")}
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
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
                    value={selectedServiceType || null}
                    onChange={(event, newValue) =>
                      setSelectedServiceType(newValue)
                    }
                    options={serviceType?.data || []}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Service Type"
                        inputProps={{
                          ...params.inputProps,
                          style: { borderRadius: 8 },
                        }}
                      />
                    )}
                  />
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
                    onChange={(event, newValue) =>
                      setSelectedSpecialist(newValue)
                    }
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
                  fullWidth
                  name="file"
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {/* Show Image */}
                {profileImageUrl && (
                  <Image
                    src={profileImageUrl}
                    alt="profile"
                    className="borRadius100"
                    width={50}
                    height={50}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Typography
                  as="h5"
                  sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}
                >
                  Time Interval in Minutes
                </Typography>
                <TextField
                  type="date"
                  name="timeIntervalDate"
                  fullWidth
                  id="timeInterval"
                  {...formik.getFieldProps("timeInterval")}
                  error={
                    formik.touched.timeInterval && formik.errors.timeInterval
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.timeInterval && formik.errors.timeInterval
                      ? formik.errors.timeInterval
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

                <TextareaAutosize
                  name="description"
                  id="description"
                  fullWidth
                  minRows={5}
                  placeholder="Enter Description"
                  {...formik.getFieldProps("description")}
                  error={
                    formik.touched.description && formik.errors.description
                      ? true
                      : false
                  }
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    padding: "8px",
                    border: `1px solid ${formik.touched.description && formik.errors.description
                      ? "red"
                      : "#e0e0e0"
                      }`,
                  }}
                />
                {formik.touched.description && formik.errors.description && (
                  <Typography color="error" variant="body2">
                    {formik.errors.description}
                  </Typography>
                )}
                {/* <RichTextEditor
                id="description"
                // value={}
                onChange={() => {
                  console.log(
                    "rte.current.getContent()",
                    rte.current.getContent()
                  );

                  formik.setFieldValue("description", rte.current.getContent());
                }}
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
                controls={[
                  ["bold", "italic", "underline", "link", "image"],
                  ["unorderedList", "h1", "h2", "h3", "h4", "h5", "h6"],
                  ["sup", "sub"],
                  ["alignLeft", "alignCenter", "alignRight"],
                ]}
              /> */}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  as="h5"
                  sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}
                >
                  Time Slots
                </Typography>
                {formik.values.timeSlots.map((slot, index) => (
                  <Grid container spacing={5} key={index} marginBottom={4}>
                    <Grid item xs={12} md={4}>
                      <Checkbox
                        name="timeSlots"
                        checked={formik.values.timeSlots[index].active}
                        {...formik.getFieldProps(`timeSlots[${index}].active`)}
                        onChange={formik.handleChange}
                      />
                      {formik.values.timeSlots[index].day}

                      {/* ))} */}
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
                        label={"Start Time"}
                        {...formik.getFieldProps(
                          `timeSlots[${index}].startTime`
                        )}
                        error={
                          formik.touched.timeSlots && formik.errors.timeSlots
                            ? !!formik.errors.timeSlots[index]?.startTime
                            : false
                        }
                        disabled={
                          !formik.values.timeSlots[index]?.active || false
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
                        label={"End Time"}
                        {...formik.getFieldProps(`timeSlots[${index}].endTime`)}
                        disabled={
                          !formik.values.timeSlots[index]?.active || false
                        }
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
                  {isEditMode ? "Edit" : "Add"} Add Services
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Card>
    </>
  );
};

export default AddServiceForm;
