import React, { useEffect } from "react";
import { Box, FormControlLabel, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as Yup from "yup";
import useTodo from "../../../hooks/useTodo";
import { useRouter } from "next/router";
import Checkbox from "@mui/material/Checkbox"; // Corrected import

const AddTodosForm = ({ formData, isEditMode }) => {
  console.log("formdata todo", formData)
  const router = useRouter()
  const {
    addTodoFunApi,
    updateTodoFunApi
  } = useTodo();



  const initialValues = isEditMode
    ? { ...formData, completed: false } // Add completed field to formData if it exists, otherwise default to false
    : {
      title: "",
      description: "",
    };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      description: Yup.string().required("description is required")
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await updateTodoFunApi({
            todoId: formData.id,
            data: values,
            onSuccess: () => {
              console.log("Update Todo Success");
              router.push("/specialist");
            },
          });
        } else {
          await addTodoFunApi({
            data: values,
            onSuccess: () => {
              console.log("Add Todo Success");
              router.push("/specialist");
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
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
                Todo Title
              </Typography>
              <TextField
                autoComplete="title"
                name="title"
                fullWidth
                id="name"
                label="Enter title"
                {...formik.getFieldProps("title")}
                error={formik.touched.title && formik.errors.title ? true : false}
                helperText={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
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
                Description
              </Typography>
              <TextField
                name="description"
                fullWidth
                label="Email Description"
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description && formik.errors.description ? true : false
                }
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : ""
                }
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>


            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="completed"
                    checked={formik.values.completed}
                    onChange={(e) => formik.setFieldValue('completed', e.target.checked)}
                    color="primary"
                  />
                }
                label="Completed"
              />
            </Grid>


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
                {isEditMode ? "UPDATE TODO" : "ADD TODO"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default AddTodosForm;
