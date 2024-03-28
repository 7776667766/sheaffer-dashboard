import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { isStrongPassword } from 'genie-password-validator';
import validator from "validator";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "@/utils/validation";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";
import { useDispatch } from "react-redux";
import { changePasswordFunApi } from "store/auth/services";

export default function ChangePassword() {
  const [isPasswordEntered, setIsPasswordEntered] = React.useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: passwordValidation(),
      // newPassword: passwordValidation(),
      confirmPassword: confirmPasswordValidation("newPassword"),
    }),
    onSubmit: (values) => {
      console.log("Handle Submit", values);
      dispatch(changePasswordFunApi(values));
    },
  });
  //   const handlePasswordChange = (event) => {
  //     const password = event.target.value;
  //     const options = {
  //         minUppercase: 1,
  //         minLowercase: 1,
  //         minDigits: 1,
  //         minSpecialChars: 1,
  //         minLength: 8,
  //     };

  //     const validationResult = isStrongPassword(password, options);

  //     formik.setFieldTouched('newPassword', true);

  //     if (!validationResult.isValid) {
  //         formik.setFieldError('newPassword', validationResult.messages.join(', '));
  //     } else {
  //         formik.setFieldError('newPassword', ''); r
  //     }

  //     formik.handleChange(event);
  // };
  const [errorMessage, setErrorMessage] = React.useState("");

  const validate = (value) => {
    let error = "";

    if (!validator.isStrongPassword(value, { minLength: 8 })) {
      error += "Password should be at least 8 characters long.\n";
    }
  
    if (!validator.isStrongPassword(value, { minLowercase: 1 })) {
      error += "Password should contain at least 1 lowercase character.\n";
    }
  
    if (!validator.isStrongPassword(value, { minUppercase: 1 })) {
      error += "Password should contain at least 1 uppercase character.\n";
    }
  
    if (!validator.isStrongPassword(value, { minNumbers: 1 })) {
      error += "Password should contain at least 1 number.\n";
    }
  
    if (!validator.isStrongPassword(value, { minSymbols: 1 })) {
      error += "Password should contain at least 1 symbol.\n";
    }
  
    setErrorMessage(error.trim());
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography component="h1" fontWeight="500" fontSize="18px">
            Change Password
          </Typography>

          <Typography fontSize="13px">Update your password here.</Typography>
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Old Password
              </Typography>
              <TextField
                autoComplete="old-password*"
                name="oldPassword*"
                fullWidth
                id="oldPassword"
                type="password"
                {...formik.getFieldProps("oldPassword")}
                error={
                  formik.touched.oldPassword && formik.errors.oldPassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                    ? formik.errors.oldPassword
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                New Password
              </Typography>
              <TextField
                autoComplete="new-password*"
                name="newPassword*"
                fullWidth
                id="newPassword"
                type="password"
                {...formik.getFieldProps("newPassword")}
                // onChange={handlePasswordChange}
                onChange={(e) => {
                  formik.handleChange(e);
                  validate(e.target.value);
                }}
                // error={
                //   formik.touched.newPassword && formik.errors.newPassword
                //     ? true
                //     : false
                // }
                // helperText={
                //   formik.touched.newPassword && formik.errors.newPassword
                //     ? formik.errors.newPassword
                //     : ""
                // }
                // onChange={(event) => {
                //   formik.handleChange(event);
                //   setIsPasswordEntered(true);
                // }}
              />
              <Box sx={{marginTop:"10px"}}> {errorMessage === "" ? null : (
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                    
                  }}
                >
                  {errorMessage}
                </span>
              )}</Box>
             
             
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
              >
                Confirm Password
              </Typography>
              <TextField
                autoComplete="confirm-password*"
                name="confirmPassword*"
                fullWidth
                id="confirmPassword"
                type="password"
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
              />
            </Grid>
          </Grid>

          <LoadingButtonComponent
            fullWidth={false}
            type="submit"
            value="Change Password"
            sx={{
              mt: 2,

              fontSize: "14px",
              padding: "12px 30px",
            }}
            isLoading={false}
            disabled={false}
          />
        </Box>
      </Box>
    </>
  );
}
