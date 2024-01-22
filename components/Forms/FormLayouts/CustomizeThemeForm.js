import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";
import { requiredValidation } from "@/utils/validation";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeThemeFunApi, getMyBussinessFunApi } from "store/business/services";
import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";


export const CustomizeThemeForm = ({ formData, isEditMode }) => {
  const router = useRouter();
  const [banner, setBanner] = useState(null);
  const [selectedFontFamily, setSelectedFontFamily] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  console.log(selectedFontFamily, selectedTheme)

  const [bannerImageUrl, setBannerImageUrl] = useState(null);

  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business?.data, "business1234");

  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataFatched) {
      dispatch(getMyBussinessFunApi({}));
    }
  }, [dispatch, dataFatched]);



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setBanner(null);
      if (isEditMode) {
        setBannerImageUrl(formData?.bannerImg || null);
      } else {
        setBannerImageUrl(null);
      }
      return false;
    } else {
      const type = file.type.split("/")[0];
      if (type !== "image") {
        toast.error("Please select an image");
        setBanner(null);
        event.target.value = null;
        if (isEditMode) {
          setBannerImageUrl(formData?.bannerImg || null);
        } else {
          setBannerImageUrl(null);
        }
        return false;
      } else {
        setBanner(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setBannerImageUrl(e.target.result);
        };
      }
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setBannerImageUrl(formData?.bannerImg);
    }
  }, [formData, isEditMode]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      bannerText: requiredValidation("Banner Text"),
      fontSize: requiredValidation("Font Size"),
      fontFamily: requiredValidation("Font Family"),
      theme: requiredValidation("theme"),
      color: requiredValidation("color"),
    }),

    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      dispatch(
        customizeThemeFunApi({
          data: {
            businessId: business?.data?.id,
            bannerText: values.bannerText,
            fontSize: values.fontSize,
            fontFamily: values.fontFamily,
            theme: values.theme,
            color: values.color
          },
          onSuccess: () => {
            console.log("Add Service Success");
            router.push("/")
          },
        })
      );
      if (banner === null && !isEditMode) {
        toast.error("Please select an image");
        return;
      }
    },
  });
  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Box sx={{ mb: "10px" }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Banner Text"
              {...formik.getFieldProps("bannerText")}
              error={formik.touched.bannerText && formik.errors.bannerText}
              helperText={
                formik.touched.bannerText && formik.errors.bannerText
                  ? formik.errors.bannerText
                  : ""
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Banner Image"
                  InputLabelProps={{ shrink: true }}
                  name="file"
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Box>
              {bannerImageUrl && (
                <Image
                  src={bannerImageUrl}
                  alt="Banner Image"
                  style={{
                    border: "1px solid #e0e0e0",
                  }}
                  width={50}
                  height={50}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Font Size"
              {...formik.getFieldProps("fontSize")}
              error={formik.touched.fontSize && formik.errors.fontSize}
              helperText={
                formik.touched.fontSize && formik.errors.fontSize
                  ? formik.errors.fontSize
                  : ""
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Font Family"
              fullWidth
              className="w-full"
              onChange={(e) => setSelectedFontFamily(e.target.value)}
              {...formik.getFieldProps("fontFamily")}
              error={formik.touched.fontFamily && formik.errors.fontFamily}
              helperText={
                formik.touched.fontFamily && formik.errors.fontFamily
                  ? formik.errors.fontFamily
                  : ""
              }
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
              <MenuItem value="ExtraLarge">Extra Large</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Theme"
              className="w-full"
              onChange={(e) => setSelectedTheme(e.target.value)}
              {...formik.getFieldProps("theme")}
              error={formik.touched.theme && formik.errors.theme}
              helperText={
                formik.touched.theme && formik.errors.theme
                  ? formik.errors.theme
                  : ""
              }
            >
              <MenuItem value="Small">Theme-1</MenuItem>
              <MenuItem value="Medium">Theme-2</MenuItem>
              <MenuItem value="Large">Theme-3</MenuItem>
              <MenuItem value="ExtraLarge">Theme-4</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Color"
              type="color"
              fullWidth
              {...formik.getFieldProps("color")}
              error={formik.touched.color && formik.errors.color}
              helperText={
                formik.touched.color && formik.errors.color
                  ? formik.errors.color
                  : ""
              }
            />
          </Grid>
        </Grid>
      </Box>

      <LoadingButtonComponent
        type="submit"
        fullWidth={false}
        sx={{
          paddingX: "30px",
        }}

        value={
          <>
            <SendIcon
              sx={{
                position: "relative",
                top: "-2px",
              }}
              className="mr-5px"
            />{" "}
           Update theme
          </>
        }
      />
    </Box>
  );
};
