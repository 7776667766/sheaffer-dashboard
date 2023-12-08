import React from 'react';
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from "formik";
import * as Yup from "yup";


import dynamic from 'next/dynamic'
import { confirmPasswordValidation, emailValidation, passwordValidation, phoneValidation, requiredValidation } from '@/utils/validation';
const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
})

const CustomStyles = () => {
  const formik = useFormik({
    initialValues: {
      name:"",
      email:"",
      phone: "",
      password: "",
      confirmpassword:"",
    },
    validationSchema: Yup.object({
      phone: phoneValidation(),
      password: passwordValidation(),
      email:emailValidation(),
      name:requiredValidation(),
    confirmpassword:confirmPasswordValidation(),

    }),
    onSubmit: (values) => {
      console.log("Handle Submit", values);
      dispatch(loginFunApi(values));
      // router.push("/authentication/verify-otp");
      // alert(JSON.stringify(values, null, 2));
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
        {/* <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '15px'
          }}
        >
          Custom Styles
        </Typography> */}

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
                autoFocus
                {...formik.getFieldProps("name")}
                error={
                  formik.touched.name && formik.errors.name
                    ? true
                    : false
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
                autoComplete="email-address"
                name="emailAddress"
                fullWidth
                id="emailAddress"
                label="Email Address"
                autoFocus
                {...formik.getFieldProps("email")}
                error={
                  formik.touched.email && formik.errors.email
                    ? true
                    : false
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
              <TextField
                autoComplete="number"
                name="phonenumber"
                fullWidth
                id="phonenumber"
                label="Phone Number"
                autoFocus 
                {...formik.getFieldProps("phone")}
                error={
                  formik.touched.phone && formik.errors.phone
                    ? true
                    : false
                }
                helperText={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
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
                Password
              </Typography>
              <TextField
                autoComplete="number"
                name="password"
                fullWidth
                id="password"
                label="Password"
                autoFocus 
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
                autoComplete="number"
                name="Confirmpassword"
                fullWidth
                id="confirmpassword"
                label="Confirm Password"
                autoFocus 
                {...formik.getFieldProps("confirmpassword")}
                error={
                  formik.touched.confirmpassword && formik.errors.confirmpassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.confirmpassword && formik.errors.confirmpassword
                    ? formik.errors.confirmpassword
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

  
            {/* <Grid item xs={12} md={12} lg={12}>
              <Typography
                as="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
              >
                Message
              </Typography>
              
              <RichTextEditor
                id="rte"
                controls={[
                  ['bold', 'italic', 'underline', 'link', 'image'],
                  ['unorderedList', 'h1', 'h2', 'h3', 'h4'],
                  ['sup', 'sub'],
                  ['alignLeft', 'alignCenter', 'alignRight'],
                ]}
              />
            </Grid> */}
 
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
                  className='mr-5px'
                />{" "}
                Add Manager
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  )
}

export default CustomStyles;