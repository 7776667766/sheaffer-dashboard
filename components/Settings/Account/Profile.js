import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
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

  const [avatar, setavatar] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setavatar(null);
      return false;
    } else {
      const type = file.type.split("/")[0];
      if (type !== "image") {
        toast.error("Please select an image");
        setavatar(null);
        console.log("File False", file);
        event.target.value = null;
        return false;
      } else {
        console.log("file true", file);
        setavatar(file);
      }
    }
  };

  const {user}= useSelector(
    (state) => state.auth
  );
 

  const dispatch=useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "ahmad",
      image: "",
    },
    validationSchema: Yup.object({
      name: requiredValidation(),
    }),
    onSubmit: async (values) => {
      if (avatar === null) {
        toast.error("Please select an image");
        return false;
      }
      try {
        const formData = {
          ...values,
          image: avatar,
        };
        console.log(formData);

        dispatch(
          updateProfileFunApi({
            data: formData,
          })
        );
      } catch (error) {
        console.error("Error adding service:", error);
      }
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
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
              />
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
