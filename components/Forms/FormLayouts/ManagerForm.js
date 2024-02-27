import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  requiredValidation,
} from "@/utils/validation";

import { addManagerFunApi, editManagerFunApi } from "store/manager/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const ManagerForm = ({ formData, isEditMode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { business } = useSelector((state) => state.business);
  console.log("business?.data.id", business?.data?.id);

  const initialValues = isEditMode
    ? {
        ...formData,
        countryCode:formData.phone.countryCode,
        phoneNumber:formData.phone.phoneNumber,
        businessId: business?.data?.id,
      }
    : {
        name: "",
        email: "",

        countryCode: "",
        phoneNumber: "",

        password: "",
        confirmPassword: "",
        businessId: business?.data?.id,
      };

  const validation = {
    email: emailValidation(),
    name: requiredValidation(),

    phoneNumber: Yup.string()
      .required("Phone number is required")
      .min(10, "Phone number is required"),
  };
 

  if (!isEditMode) {
    validation.password = passwordValidation();
    validation.confirmPassword = confirmPasswordValidation();
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(
      validation
      //   {
      //   phone: phoneValidation(),
      //   email: emailValidation(),
      //   name: requiredValidation(),
      //   password: passwordValidation(),
      //   confirmPassword: confirmPasswordValidation(),
      // }
    ),
    
    onSubmit: (values) => {
      let myPhoneNumberArray = values.phoneNumber.split(values.countryCode);
     
      const myCountryCode = myPhoneNumberArray[0] + values.countryCode;
      myPhoneNumberArray.shift();

      const myPhoneNumber = myPhoneNumberArray.join(values.countryCode);

      console.log("Phone Input Value on Submit:", values.phone);
      const { countryCode, phoneNumber, ...valuesWithoutPhone } = values;
      const formattedCountryCode = myCountryCode.startsWith("+")
        ? countryCode
        : `+${countryCode}`;
      if (isEditMode) {
        dispatch(
          editManagerFunApi({
            data: {
              ...valuesWithoutPhone,
              phone: {
                code: formattedCountryCode,
                number: myPhoneNumber,
              },
            },
            onSuccess: () => {
              router.push("/manager/");
            },
          })
        );
      } else {
        console.log("Handle Submit", values);
        let myPhoneNumberArray = values.phoneNumber.split(values.countryCode);
        console.log('first line country code',myPhoneNumberArray)
        const myCountryCode = myPhoneNumberArray[0] + values.countryCode;
console.log('second line of country code',myCountryCode)
        
       myPhoneNumberArray.shift();

        const myPhoneNumber = myPhoneNumberArray.join(values.countryCode);
console.log('my phone number is ',myPhoneNumber)
        const { countryCode, phoneNumber, ...valuesWithoutPhone } = values;
        const formattedCountryCode = myCountryCode.startsWith("+")
          ? countryCode
          : `+${countryCode}`;

        dispatch(
          addManagerFunApi({
            data: {
              ...valuesWithoutPhone,
              phone: {
                code: formattedCountryCode,
                number: myPhoneNumber,
              },
            },
            onSuccess: () => {
              router.push("/manager/");
            },
          })
        );
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
                fullWidth
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
                fullWidth
                label="Email Address"
                autoComplete="email-address"
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

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Phone Number
              </Typography>
              <PhoneInput
                international
                country={"pk"}
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
                inputStyle={{ width: "100%", height: "50px" }}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <Typography variant="caption" color="error">
                  {formik.errors.phoneNumber}
                </Typography>
              )}
            </Grid>
            {!isEditMode && (
              <>
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
                    fullWidth
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
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "12px",
                    }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    autoComplete="confirm-password"
                    fullWidth
                    label="Confirm Password"
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
              </>
            )}

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
                {isEditMode ? "Edit" : "Add"} Manager
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default ManagerForm;
