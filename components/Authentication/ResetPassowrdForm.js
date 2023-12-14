import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "@/components/Authentication/Authentication.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  confirmPasswordValidation,
  passwordValidation,
} from "@/utils/validation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFunApi } from "store/auth/services";
import toast from "react-hot-toast";
import { LoadingButtonComponent } from "../UIElements/Buttons/LoadingButton";

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { id } = router.query;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: passwordValidation(),
      confirmPassword: confirmPasswordValidation(
        "password",
        "Confirm Password"
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        resetPasswordFunApi({
          data: {
            ...values,
            phone: atob(id),
          },
          onSuccess: () => {
            router.push("/authentication/sign-in");
          },
        })
      );
    },
  });

  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            maxWidth: "510px",
            ml: "auto",
            mr: "auto",
            padding: "50px 0 100px",
          }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
                Reset Password{" "}
                <Image
                  width={30}
                  height={30}
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Enter your new password and confirm password to reset your
                password
              </Typography>

              <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <Box
                  sx={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
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
                        autoComplete="new-password"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
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
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
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
                        autoComplete="new-confirm-password"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <LoadingButtonComponent
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                  value="Reset Password"
                />
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ResetPasswordForm;
