import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Image from "next/image";
import UploadImg from "@/public/images/upload.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import Button from "@mui/material/Button";
import { regsiterBusinessFunApi } from "store/business/services";

import { useFormik } from "formik";
import {
  emailValidation,
  phoneValidation,
  requiredValidation,
  slugValidation,
} from "@/utils/validation";
import { Input } from "@mui/base";
import {
  AccountCircle,
  Facebook,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import Twitter from "@mui/icons-material/Twitter";

const CustomBussiness = (index) => {
  const initialValue = {
    name: "",
    email: "",
    slug: "",
    address: "",
    description: "",
    facebook: "",
    instagram: "",
    twitter: "",
    countryCode: "",
    phoneNumber: "",
    googleId: "",
    bookingService: "",
    websiteService: "",
    color: "",
    theme: "",
    files: "",
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      name: requiredValidation("Name"),
      email: emailValidation("Email"),
      phoneNumber: phoneValidation("Phone"),
      slug: slugValidation("Slug"),
      address: requiredValidation("Address"),

      description: requiredValidation("Description"),
      facebook: Yup.string().url("Enter a valid Facebook link"),
      instagram: Yup.string().url("Enter a valid Instagram link"),
      twitter: Yup.string().url("Enter a valid Twitter link"),
    }),
  });

  const dispatch = useDispatch();
  const handleAddRequest = () => {
    console.log("formik.values:", formik.values);
    const { countryCode, phoneNumber, ...allvalues } = formik.values;

    let myPhoneNumberArray = formik.values.phoneNumber.split(
      formik.values.countryCode
    );

    console.log("phone number is ", myPhoneNumberArray);
    const myCountryCode = myPhoneNumberArray[0] + formik.values.countryCode;
    myPhoneNumberArray.shift();
    console.log("country code is ", myCountryCode);
    const myPhoneNumber = myPhoneNumberArray.join(formik.values.countryCode);
    const formattedCountryCode = myCountryCode.startsWith("+")
      ? countryCode
      : `+${countryCode}`;

    const formData = new FormData();

    Object.entries({
      ...allvalues,
      // phone: {
      //   code: formattedCountryCode,
      //   number: myPhoneNumber,
      // },
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("phone[code]", formattedCountryCode);
    formData.append("phone[number]", myPhoneNumber);
    selectedFiles.forEach((files, index) => {
      formData.append("files", files);
    });
    console.log("selected files 87", selectedFiles);
    dispatch(
      regsiterBusinessFunApi({
        data: formData,
        onSuccess: () => {},
      })
    );
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [selectedFiles, setSelectedFiles] = useState([]);

  console.log("all files is", selectedFiles);
  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...Array.from(files),
    ]);
  };
  const handleDelete = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (file, index) => index !== indexToRemove
    );

    setSelectedFiles(updatedFiles);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Add Custom Businesses
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <div sx={{ padding: "30px", margin: "16px" }}>
            <Grid container spacing={3} md>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "110px",
                    background: "#EBF4FF",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    // margin: "10px",
                    alignItems: "center",

                    gap: "10px",
                    padding: "10px",
                    // Add cursor pointer to indicate it's clickable
                  }}
                  // onClick={handleImageClick}
                >
                  <Button
                    variant="outlined"
                    sx={{ height: "100px", width: "100px" }}
                    onClick={handleButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </Button>
                  <input
                    id="files"
                    name="files"
                    type="file"
                    {...formik.getFieldProps("files")}
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {selectedFiles?.map((file, index) => (
                    <Box key={index} style={{ position: "relative" }}>
                      <Box
                        // variant="outlined"
                        sx={{
                          height: "20px",
                          width: "20px",
                          position: "absolute",
                          top: "8px",
                          right: "2px",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="white"
                          class="w-10 h-10 "
                          style={{ fontWeight: "bold" }}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </Box>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Selected ${index + 1}`}
                        width={100}
                        height={100}
                        style={{ borderRadius: "5px" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  label="Business Name"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && formik.errors.name}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="email"
                  fullWidth
                  id="email"
                  label="Business Email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && formik.errors.email}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="slug"
                  fullWidth
                  id="slug"
                  label="Business slug"
                  {...formik.getFieldProps("slug")}
                  error={formik.touched.slug && formik.errors.slug}
                  helperText={
                    formik.touched.slug && formik.errors.slug
                      ? formik.errors.slug
                      : ""
                  }
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="bannerText"
                  fullWidth
                  id="bannerText"
                  label="Enter BannerText"
                  {...formik.getFieldProps("bannerText")}
                  error={formik.touched.bannerText && formik.errors.bannerText}
                  helperText={
                    formik.touched.bannerText && formik.errors.bannerText
                      ? formik.errors.bannerText
                      : ""
                  }
                />
              </Grid> */}

              <Grid item xs={12} md={6} lg={6}>
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

              <Grid item xs={12} md={6} lg={6}>
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
                  // defaultErrorMessage={'yyey'}
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
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="facebook"
                  id="facebook"
                  label="Facebook"
                  {...formik.getFieldProps("facebook")}
                  error={formik.touched.facebook && formik.errors.facebook}
                  helperText={
                    formik.touched.facebook && formik.errors.facebook
                      ? formik.errors.facebook
                      : ""
                  }
                  style={{
                    width: "100%",
                    color: "blue",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <Facebook style={{ color: "#757FEF" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="instagram"
                  id="instagram"
                  label="Instagram"
                  {...formik.getFieldProps("instagram")}
                  error={formik.touched.instagram && formik.errors.instagram}
                  helperText={
                    formik.touched.instagram && formik.errors.instagram
                      ? formik.errors.instagram
                      : ""
                  }
                  style={{
                    width: "100%",
                    color: "blue",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <Instagram style={{ color: "#757FEF" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="twitter"
                  id="twitter"
                  label="Twitter"
                  {...formik.getFieldProps("twitter")}
                  error={formik.touched.twitter && formik.errors.twitter}
                  helperText={
                    formik.touched.twitter && formik.errors.twitter
                      ? formik.errors.twitter
                      : ""
                  }
                  style={{
                    width: "100%",
                    color: "blue",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <Twitter style={{ color: "#757FEF" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  multiline
                  rows={3}
                  name="description"
                  id="description"
                  label="Enter Description"
                  {...formik.getFieldProps("description")}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : ""
                  }
                  style={{
                    width: "100%",
                    color: "blue",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
                  <Box sx={{ flex: 1 }}></Box>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              item
              xs={12}
              md={12}
              lg={12}
              justifyContent="flex-end"
              alignItems="flex-end"
              // sx={{  marginTop: "0px" }}
            >
              <Grid item xs={12} md={3} lg={3} order={{ xs: 2, md: 2 }}>
                <Box>
                  {/* <Button
                              type="button"
                              color="primary"
                              sx={{
                                border: "1px solid #ddd",
                                width: "160px",
                                height: "40px",
                              }}
                              onClick={handleFormClose}
                            >
                              Cancel
                            </Button> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={3} lg={3} order={{ xs: 1, md: 2 }}>
                <Box>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleAddRequest}
                    sx={{ width: "160px", height: "40px" }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CustomBussiness;
