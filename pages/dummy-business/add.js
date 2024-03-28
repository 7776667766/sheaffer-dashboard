import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Input,
} from "@mui/material";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addBusinessFunApi,
  getMyBussinessFunApi,
} from "store/business/services";
import startsWith from "lodash.startswith";
import { useRouter } from "next/router";
import { requiredValidation, slugValidation } from "@/utils/validation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { ColorPicker } from "@mantine/core";
import PhoneInput from "react-phone-input-2";

const BusinessForm = () => {
  const { dataFatched, isLoading } = useSelector((state) => state.business);

  const router = useRouter();
  const dispatch = useDispatch();
  const [avatar1, setavatar1] = useState(null);
  const [avatar2, setavatar2] = useState(null);
  console.log(avatar2, "avatar2");

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setavatar1(file);
  };

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getMyBussinessFunApi({
          onSuccess: (businessId) => {
            console.log(businessId, "businessId");
          },
        })
      );
    }
  }, [dispatch, dataFatched]);

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setavatar2(file);
    console.log("file2", file);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "dummy-business",
      email: "",
      countryCode: "",
      phoneNumber: "",
      description: "",
      address: "",
      logo: "",
      bookingService: false,
      websiteService: false,
      bannerText: "",
      bannerImg: "",
      color: "",
      fontSize: "",
      fontFamily: "",
    },
    validationSchema: Yup.object({
      name: requiredValidation("name required"),
      slug: slugValidation("slug"),
      email: requiredValidation("email"),
      description: requiredValidation("description"),
      address: requiredValidation("address"),
      bannerText: requiredValidation("bannerText"),
      color: requiredValidation("color"),
      fontSize: requiredValidation("fontSize"),
      fontFamily: requiredValidation("fontFamily"),
    }),
    onSubmit: async (values) => {
      let myPhoneNumberArray = formik.values.phoneNumber.split(
        formik.values.countryCode
      );

      const myCountryCode = myPhoneNumberArray[0] + formik.values.countryCode;
      myPhoneNumberArray.shift();
      const myPhoneNumber = myPhoneNumberArray.join(myCountryCode);
      const formattedCountryCode = myCountryCode.startsWith("+")
        ? formik.values.countryCode
        : `+${formik.values.countryCode}`;

      try {
        const formData = {
          ...values,
          logo: avatar1,
          bannerImg: avatar2,
          phone: {
            code: formattedCountryCode,
            number: myPhoneNumber,
          },
        };

        dispatch(
          addBusinessFunApi({
            data: formData,
            onSuccess: () => {
              router.push("/services/add-dummy-business/");
            },
          })
        );
      } catch (error) {
        console.error("Error adding dummy business:", error);
      }
    },
  });

  return (
    <>
      <h1>Add Dummy Business</h1>
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Card
          sx={{ boxShadow: "none", borderRadius: "10px", p: "25px 20px 15px" }}
        >
          <CardContent>
            <Grid container spacing={3}>
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
                  error={formik.touched.name && formik.errors.name}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
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
                  // disabled="true"
                  label="Enter Slug"
                  {...formik.getFieldProps("slug")}
                  error={formik.touched.slug && formik.errors.slug}
                  helperText={
                    formik.touched.slug && formik.errors.slug
                      ? formik.errors.slug
                      : ""
                  }
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
                  Email
                </Typography>
                <TextField
                  name="email"
                  fullWidth
                  id="email"
                  label="Enter email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && formik.errors.email}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
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
                  Phone
                </Typography>
                <PhoneInput
                  international
                  country={"pk"}
                  isValid={(inputNumber, selectedCountry, countries) => {
                    return countries.some((country) => {
                      return (
                        startsWith(inputNumber, selectedCountry.dialCode) ||
                        startsWith(selectedCountry.dialCode, inputNumber)
                      );
                    });
                  }}
                  {...formik.getFieldProps("phoneNumber")}
                  value={formik.values.phoneNumber || ""}
                  onChange={(value, country) => {
                    console.log(value, "ssss");
                    formik.setFieldValue("countryCode", country.dialCode);
                    formik.setFieldValue("phoneNumber", value);
                  }}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? formik.errors.phoneNumber
                      : ""
                  }
                  InputProps={{
                    style: { borderRadius: 8, width: "100%" },
                  }}
                  buttonStyle={{
                    border:
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "1px solid red"
                        : "1px solid #ced4da",
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "50px",
                    border:
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "1px solid red"
                        : "1px solid #ced4da",

                    "&:focus": {
                      borderColor: "green",
                    },
                  }}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <Typography variant="caption" color="error">
                    {formik.errors.phoneNumber}
                  </Typography>
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
                  Description
                </Typography>
                <TextField
                  name="description"
                  fullWidth
                  id="description"
                  label="Enter description"
                  {...formik.getFieldProps("description")}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : ""
                  }
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
                  Address
                </Typography>
                <TextField
                  name="address"
                  fullWidth
                  id="address"
                  label="Enter Address"
                  {...formik.getFieldProps("address")}
                  error={formik.touched.address && formik.errors.address}
                  helperText={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ""
                  }
                />
              </Grid>

              {/* Other fields go here */}

              <Grid item xs={12} md={6}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Business Logo
                  </Typography>
                  <TextField
                    fullWidth
                    name="logo"
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleFileChange1}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Banner Image
                  </Typography>

                  <TextField
                    fullWidth
                    name="banner-img"
                    type="file"
                    id="banner-img"
                    accept="image/*"
                    onChange={handleFileChange2}
                  />
                </Box>
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
                  Theme Color
                </Typography>
                <Box sx={{ height: "100%", padding: "0px" }}>
                  <TextField
                    type="color"
                    name="color"
                    defaultValue="#4F46E5"
                    // value={formik.values.color}
                    {...formik.getFieldProps("color")}
                    
                    error={
                      formik.touched.color && formik.errors.color ? true : false
                    }
                    helperText={
                      formik.touched.color && formik.errors.color
                        ? formik.errors.color
                        : ""
                    }
                    style={{ width: "100%", height: "50%", padding: "0",border:"none" }}
                  />
                </Box>

                {/* {formik.touched.color && formik.errors.color && (
                  <Typography color="error" variant="caption">
                    {formik.errors.color}
                  </Typography>
                )} */}
                {/* <ColorPicker
            
                  name="color"
                  defaultValue="#4F46E5"
                  value={formik.values.color}
                  onChange={(color) => formik.setFieldValue("color", color)}
                />
                {formik.touched.color && formik.errors.color && (
                  <Typography color="error" variant="caption">
                    {formik.errors.color}
                  </Typography>
                )} */}
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
                  BannerText
                </Typography>
                <TextField
                  name="bannerText"
                  fullWidth
                  id="bannerText"
                  label="Enter bannerText"
                  {...formik.getFieldProps("bannerText")}
                  error={
                    formik.touched.bannerText && formik.errors.bannerText
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.bannerText && formik.errors.bannerText
                      ? formik.errors.bannerText
                      : ""
                  }
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
                  Font Size
                </Typography>
                <TextField
                  fullWidth
                  select
                  value={formik.values.fontSize}
                  label="Font Size"
                  // onChange={(e) => setSelectedFontSize(e.target.value)}
                  {...formik.getFieldProps("fontSize")}
                  error={formik.touched.fontSize && formik.errors.fontSize}
                  helperText={
                    formik.touched.fontSize && formik.errors.fontSize
                      ? formik.errors.fontSize
                      : ""
                  }
                >
                  <MenuItem value="16">16px</MenuItem>
                  <MenuItem value="24">24px</MenuItem>
                  <MenuItem value="36">36px</MenuItem>
                  <MenuItem value="48">48px</MenuItem>
                  <MenuItem value="60">60px</MenuItem>
                  <MenuItem value="72">72px</MenuItem>
                  <MenuItem value="84">84px</MenuItem>
                  <MenuItem value="96">96px</MenuItem>
                </TextField>
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
                  Font Family
                </Typography>
                <TextField
                  select
                  label="Font Family"
                  fullWidth
                  className="w-full"
                  value={formik.values.fontFamily}
                  // onChange={(e) => setSelectedFontFamily(e.target.value)}
                  {...formik.getFieldProps("fontFamily")}
                  error={formik.touched.fontFamily && formik.errors.fontFamily}
                  helperText={
                    formik.touched.fontFamily && formik.errors.fontFamily
                      ? formik.errors.fontFamily
                      : ""
                  }
                >
                  <MenuItem value="Poppins">Poppins</MenuItem>
                  <MenuItem value="Montserrat">Montserrat</MenuItem>
                  <MenuItem value="GreatVibes">Great Vibes</MenuItem>
                  <MenuItem value="playFair">Playfair Display</MenuItem>
                  <MenuItem value="Mulish">Mulish</MenuItem>
                  <MenuItem value="Quicksand">Quicksand</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} textAlign="left">
                <LoadingButtonComponent
                  type="submit"
                  fullWidth={false}
                  sx={{
                    paddingX: "30px",
                  }}
                  isLoading={isLoading}
                  value={
                    <>
                      <SendIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-5px"
                      />{" "}
                      Add Business
                    </>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default BusinessForm;
