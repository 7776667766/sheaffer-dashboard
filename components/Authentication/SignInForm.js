import React, { useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import styles from "@/components/Authentication/Authentication.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { requiredValidation } from "@/utils/validation";
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

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: requiredValidation("Email or phone"),
      password: requiredValidation(),
    }),
    onSubmit: (values) => {
      dispatch(
        loginFunApi({
          data: values,
          
          onSuccess: (phone) => {
            console.log("phone40",phone)
            const myPhone = btoa(JSON.stringify(phone));
            router.push(`/authentication/verify-otp/?verify=${myPhone}`);
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
  }, [isAuthenticated, otpVerified, router, user?.phone]);

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
                {/* Already have an account?{" "} */}
                {/* <Link
                  href="/authentication/sign-up"
                  className="primaryColor text-decoration-none"
                >
                  Sign up
                </Link> */}
              </Typography>

              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "30px",
                }}
              >
                <Link href="#" className={styles.googleBtn}>
                  <img src="/images/google-icon.png" />
                  Sign in with Google
                </Link>

                <Link href="#" className={styles.fbBtn}>
                  <img src="/images/fb-icon.png" />
                  Sign in with Facebook
                </Link>
              </Box>

              <div className={styles.or}>
                <span>or</span>
              </div> */}

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
                        id="phone"
                        label="Email or phone"
                        name="phone"
                        autoComplete="phone"
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
                  {/* <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Remember me."
                    />
                  </Grid> */}

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
