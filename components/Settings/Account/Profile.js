import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  emailValidation,
  phoneValidation,
  requiredValidation,
} from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileFunApi } from "store/auth/services";

export default function Profile() {
  const {user}= useSelector(
    (state) => state.auth
  );
  console.log(user);
  const dispatch=useDispatch()

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
    },
    validationSchema: Yup.object({
      name: requiredValidation(),
      email: emailValidation(),
      phone: phoneValidation(),
    }),
    onSubmit: (values) => {
      console.log("Handle Submit", values);
      dispatch(updateProfileFunApi(values))
    },
  });

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
            Profile
          </Typography>

          <Typography fontSize="13px">
            Update your photo and personal details here.
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
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
                Name
              </Typography>
              <TextField
                autoComplete="given-name"
                name="name"
                fullWidth
                id="name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && formik.errors.name ? true : false}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
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
                Email Address
              </Typography>

              <TextField
                fullWidth
                id="email"
                name="email"
                disabled
                {...formik.getFieldProps("email")}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
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
                Phone Number
              </Typography>

              <TextField
                fullWidth
                id="phone"
                name="phone"
                disabled
                {...formik.getFieldProps("phone")}
                error={
                  formik.touched.phone && formik.errors.phone ? true : false
                }
                helperText={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
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

              <Box mt={1}>
                <img
                  src={user.image}
                  alt="profile"
                  className="borRadius100"
                  width="50px"
                  height="50px"
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              padding: "12px 30px",
              color: "#fff !important",
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}
