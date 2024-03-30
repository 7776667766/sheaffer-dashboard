import React, { useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import styles from "@/components/Authentication/Authentication.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { passwordValidation, requiredValidation } from "@/utils/validation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginFunApi } from "store/auth/services";
import { LoadingButtonComponent } from "../UIElements/Buttons/LoadingButton";

const SignInForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, otpVerified, user } = useSelector(
    (state) => state.auth
  );

  console.log(otpVerified,user,isLoading,isAuthenticated)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: requiredValidation("Email or phone"),
      password: passwordValidation(),
    }),
    onSubmit: (values) => {
      dispatch(
        loginFunApi({
          data: values,
          onSuccess: (email) => {
            console.log("email",email)
            const myEmail = btoa(JSON.stringify(email));
            router.push(`/`);
          },
        })
      );
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      if (otpVerified) {
        router.push("/");
      } else {
      }
    }
  }, [isAuthenticated, otpVerified, router, user?.email]);

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
                Sign In{" "}
                <Image
                  width={30}
                  height={30}
                  src="/images/favicon.png"
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                Enter your email and password to sign in
             
              </Typography>

              <Box
                component="form"
                noValidate
                // onSubmit={handleSubmit}
                onSubmit={formik.handleSubmit}
              >
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
                        Email or phone
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email or phone"
                        name="email"
                        autoComplete="email"
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
                  </Grid>
                </Box>

                <Grid container alignItems="center" spacing={2}>
                

                  <Grid
                    item
                    xs={12}
                    // xs={6} sm={6}
                    textAlign="end"
                  >
                    <Link
                      href="/authentication/forgot-password"
                      className="primaryColor text-decoration-none"
                    >
                      Forgot your password?
                    </Link>
                  </Grid>
                </Grid>

                <LoadingButtonComponent
                  type="submit"
                  value="Sign In"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SignInForm;
