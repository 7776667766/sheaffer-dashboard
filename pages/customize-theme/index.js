import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { requiredValidation } from "@/utils/validation";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getMyBussinessFunApi } from "store/business/services";

const CustomizePage = () => {
  const [selectedFontFamily, setSelectedFontFamily] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business, "business1234");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataFatched) {
      dispatch(getMyBussinessFunApi({}));
    }
  }, [dispatch, dataFatched]);

  const initialValues = business
    ? {
        bannertext: business?.bannerText || "",
        file: business?.bannerImg || "",
        fontsize: business?.fontsize || "",
        fontfamily: business?.fontfamily || "",
        theme: business?.theme || "",
        color: business?.color || "",
      }
    : {
        bannerText: "",
        file: "",
        fontsize: "",
        fontfamily: "",
        selecttheme: "",
        color: "",
      };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      bannerText: requiredValidation("Banner Text"),
      fontsize: requiredValidation("fontsize"),
      fontfamily: requiredValidation("fontfamily"),
      selecttheme: requiredValidation("selecttheme"),
      color: requiredValidation("color"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "10px",
          }}
        >
          Customize Theme
        </Typography>
        {business && (
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: "10px" }}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={6}>
                  <label>Banner Text</label>

                  <TextField
                    fullWidth
                    id="bannerText"
                    name="bannerText"
                    autoComplete="bannerText"
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    defaultValue={business.bannerText}
                    {...formik.getFieldProps("bannerText")}
                    error={
                      formik.touched.bannerText && formik.errors.bannerText
                    }
                    helperText={
                      formik.touched.bannerText && formik.errors.bannerText
                        ? formik.errors.bannerText
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <label>Banner Image</label>

                  <TextField
                    fullWidth
                    name="banner-img"
                    type="file"
                    id="banner-img"
                    accept="image/*"
                    {...formik.getFieldProps("file")}
                    error={formik.touched.file && formik.errors.file}
                    helperText={
                      formik.touched.file && formik.errors.file
                        ? formik.errors.file
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <label>Font Size</label>

                  <TextField
                    fullWidth
                    name="fontsize"
                    type="text"
                    id="fontsize"
                    autoComplete="Font-Size"
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                    // defaultValue={business.fontSize}
                    {...formik.getFieldProps("fontsize")}
                    error={formik.touched.fontsize && formik.errors.fontsize}
                    helperText={
                      formik.touched.fontsize && formik.errors.fontsize
                        ? formik.errors.fontsize
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <div className="fontfamily">
                    <div className="my-2">
                      <label>Font Family</label>
                      <TextField
                        select
                        fullWidth
                        name="fontfamily"
                        id="fontfamily"
                        type="text"
                        variant="outlined"
                        className="w-full"
                        value={selectedFontFamily}
                        onChange={(e) => setSelectedFontFamily(e.target.value)}
                        {...formik.getFieldProps("fontfamily")}
                        error={
                          formik.touched.fontfamily && formik.errors.fontfamily
                        }
                        helperText={
                          formik.touched.fontfamily && formik.errors.fontfamily
                            ? formik.errors.fontfamily
                            : ""
                        }
                      >
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                        <MenuItem value="ExtraLarge">Extra Large</MenuItem>
                      </TextField>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className="Selecttheme">
                    <div className="my-2">
                      <label>Select Theme</label>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        name="selecttheme"
                        id="selecttheme"
                        type="text"
                        className="w-full"
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        {...formik.getFieldProps("selecttheme")}
                        error={
                          formik.touched.selecttheme &&
                          formik.errors.selecttheme
                        }
                        helperText={
                          formik.touched.selecttheme &&
                          formik.errors.selecttheme
                            ? formik.errors.selecttheme
                            : ""
                        }
                      >
                        <MenuItem value="Small">Theme-1</MenuItem>
                        <MenuItem value="Medium">Theme-2</MenuItem>
                        <MenuItem value="Large">Theme-3</MenuItem>
                        <MenuItem value="ExtraLarge">Theme-4</MenuItem>
                      </TextField>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <label>Color Picker</label>
                  <TextField
                    type="color"
                    fullWidth
                    name="color"
                    defaultValue="#4F46E5"
                  />
                </Grid>
              </Grid>
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                padding: "8px 25px",
                color: "#fff !important",
              }}
            >
              Get Started
            </Button>

            <Typography fontSize="14px" mt="20px" align="center">
              Already have an account?{" "}
              <Link href="#" className="primaryColor text-decoration-none">
                Sign In
              </Link>
            </Typography>
          </Box>
        )}
      </Card>
    </>
  );
};

export default CustomizePage;
