import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Autocomplete,
  List, ListItem,
  Checkbox,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { requiredValidation, slugValidation } from "@/utils/validation";
import { addservicesFunApi, editServicesFunApi } from "store/service/services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getspecialistApi } from "store/specialist/services";
import { getServicesTypeFunApi } from "store/service/services";
import toast from "react-hot-toast";
import Image from "next/image";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";

const ServiceForm = ({ formData, isEditMode }) => {
  const [imgUrlCount, setImgUrlCount] = useState(1);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedSpecialist1, setSelectedSpecialist1] = useState(null);
  const [selectedSpecialist3, setSelectedSpecialist3] = useState(null);
  const dispatch = useDispatch();

  const router = useRouter();
  const specialistArray = [
    { id: "dummy1", name: "Dummy BRAND 1" },
    { id: "dummy2", name: "Dummy BRAND 2" },
  ];
  const specialistArray1 = [
    { id: "CATAGORY2", name: "Dummy CATAGORY 1" },
    { id: "CATAGORY2", name: "Dummy CATAGORY 2" },
  ];
  const specialistArray3 = [
    { id: "CATAGORY3", name: "in-stock" },
    { id: "CATAGORY3", name: "out-stock" },
  ];

  const [avatar, setavatar] = useState([]);
  console.log("avatar", avatar)
  const [profileImageUrl, setProfileImageUrl] = useState([]);
  const handleFileChange = (event) => {
    const files = event.target.files;
    let filesArray = [];
    let imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type = file.type.split("/")[0];

      if (type !== "image") {
        toast.error("Please select an image");
        continue;
      }

      filesArray.push(file);
      setavatar(filesArray);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        imageUrls.push(e.target.result);

        if (imageUrls.length === filesArray.length) {
          setProfileImageUrl(imageUrls);
        }
      };

      reader.onerror = () => {
        toast.error("Error occurred while reading the file.");
      };
    }
    formik.setFieldValue('files', filesArray);
  };
  const handleAddField = () => {
    setImgUrlCount(prevCount => prevCount + 1);
  };

  const formik = useFormik({
    initialValues: {
      sku: formData?.sku || "NTB7SDVX44",
      img: formData?.img || avatar,
      title: formData?.title || "",
      slug: formData?.slug || "",
      unit: formData?.unit || "",
      imgUrls: [
        {
          color: {
            name: "",
            clrCode: ""
          },
          img: avatar
        }
      ],
      parent: formData?.parent || "",
      children: formData?.children || "",
      price: formData?.price || 0,
      discount: formData?.discount || 0,
      quantity: formData?.quantity || 0,
      brand: formData?.brand?.name || "",
      categoryName: formData?.category?.name || "",
      status: formData?.status || "",
      reviews: formData?.reviews || [],
      productType: formData?.productType || "",
      description: formData?.description || "",
      additionalInformation: formData?.additionalInformation || [],
      featured: formData?.featured || false,
      sellCount: formData?.sellCount || 0,
      tags: formData?.tags || ["product","feature"],
    },
    validationSchema: Yup.object().shape({
      // sku: Yup.string().required('SKU is required'),
      // img: Yup.string().required('Image URL is required'),
      title: Yup.string().required('Title is required'),
      slug: Yup.string().required('Slug is required'),
      unit: Yup.string().required('Unit is required'),
      parent: Yup.string().required('Parent is required'),
      children: Yup.string().required('Children is required'),
      price: Yup.number().required('Price is required').positive('Price must be a positive number'),
      discount: Yup.number().min(0, 'Discount must be non-negative'),
      quantity: Yup.number().min(0, 'Quantity must be non-negative'),
      // status: Yup.string().required('Status is required'),
      productType: Yup.string().required('Product Type is required'),
      description: Yup.string().required('Description is required'),
      additionalInformation: Yup.string().required(
      'required'
      ),
      featured: Yup.boolean().required('Featured is required'),
      sellCount: Yup.number().min(0, 'Sell Count must be non-negative'),
    }),

    onSubmit: async (values) => {
      console.log("values of form 83", values)
      dispatch(
        addservicesFunApi({
          data: values,
          onSuccess: () => {
            router.push("/services/");
          },
        })
      );
      try {
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <>
      <Card sx={{ boxShadow: "none", borderRadius: "10px", p: "25px 20px 15px" }}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Title
              </Typography>
              <TextField
                name="title"
                fullWidth
                id="title"
                label="Title"
                {...formik.getFieldProps("title")}
                error={formik.touched.title && formik.errors.title ? true : false}
                helperText={formik.touched.title && formik.errors.title ? formik.errors.title : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                slug
              </Typography>
              <TextField
                name="slug"
                fullWidth
                id="slug"
                label="slug"
                {...formik.getFieldProps("slug")}
                error={formik.touched.slug && formik.errors.slug ? true : false}
                helperText={formik.touched.slug && formik.errors.slug ? formik.errors.slug : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Description
              </Typography>
              <TextField
                name="description"
                fullWidth
                id="description"
                label="Description"
                {...formik.getFieldProps("description")}
                error={formik.touched.description && formik.errors.description ? true : false}
                helperText={formik.touched.description && formik.errors.description ? formik.errors.description : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Price
              </Typography>
              <TextField
                name="price"
                fullWidth
                id="Price"
                label="Price"
                {...formik.getFieldProps("price")}
                error={formik.touched.img && formik.errors.price ? true : false}
                helperText={formik.touched.price && formik.errors.price ? formik.errors.price : ""}
              />

            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Unit
              </Typography>
              <TextField
                name="unit"
                fullWidth
                id="unit"
                label="Enter Unit"
                {...formik.getFieldProps("unit")}
                error={formik.touched.unit && formik.errors.unit ? true : false}
                helperText={formik.touched.unit && formik.errors.unit ? formik.errors.unit : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Discount
              </Typography>
              <TextField
                name="discount"
                fullWidth
                id="discount"
                label="Enter Discount"
                type="number"
                {...formik.getFieldProps("discount")}
                error={formik.touched.discount && formik.errors.discount ? true : false}
                helperText={formik.touched.discount && formik.errors.discount ? formik.errors.discount : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Quantity
              </Typography>
              <TextField
                name="quantity"
                fullWidth
                id="quantity"
                label="Enter Quantity"
                type="number"
                {...formik.getFieldProps("quantity")}
                error={formik.touched.quantity && formik.errors.quantity ? true : false}
                helperText={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <List>
                  <Typography
                    as="h5"
                    sx={{
                      fontWeight: "500",
                      fontSize: "16px",
                      marginTop: "11px",
                      marginLeft: "12px"
                    }}
                  >
                    Shades
                  </Typography>
                  {[...Array(imgUrlCount)].map((_, index) => (
                    <ListItem key={index}>
                      <Box sx={{ display: 'flex', gap: '16px' }}>
                        <TextField
                          label="Color Name"
                          type="text"
                          name={`imgUrls[${index}].color.name`}
                          value={formik.values.imgUrls[index]?.color?.name || ''}
                          onChange={formik.handleChange}
                        />
                        <TextField
                          label="Color Code"
                          type="text"
                          name={`imgUrls[${index}].color.clrCode`}
                          value={formik.values.imgUrls[index]?.color?.clrCode || ''}
                          onChange={formik.handleChange}
                        />
                      </Box>
                      <Grid item xs={12} style={{ textAlign: 'center' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <Typography
                            as="h5"
                            sx={{
                              fontWeight: "500",
                              fontSize: "10px",
                            }}
                          >
                            Upload Images
                          </Typography>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                              display: "none", marginRight: "30px"
                            }}
                            id={`fileInput-${index}`}
                            multiple
                          />
                          <label htmlFor={`fileInput-${index}`}>
                            <Button component="span" variant="contained" color="primary">
                              Choose Files
                            </Button>
                          </label>
                          {profileImageUrl && (
                            <div>
                              {profileImageUrl.map((url, index) => (
                                <img key={index} src={url} alt={`image-${index}`} style={{ width: "30px", height: "30px", margin: "5px" }} />
                              ))}
                            </div>
                          )}
                        </Box>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="outlined" onClick={handleAddField}>+</Button>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <FormControl fullWidth>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  Brands
                </Typography>

                <Autocomplete
                  value={selectedSpecialist || null}
                  onChange={(event, newValue) => {
                    setSelectedSpecialist(newValue);
                    formik.setFieldValue(
                      "brands",
                      newValue?.id || ""
                    );
                  }}
                  options={specialistArray}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Brands" />
                  )}
                />
              </FormControl>
            </Grid>


            <Grid item xs={12} md={12} lg={6}>
              <FormControl fullWidth>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  catagory
                </Typography>

                <Autocomplete
                  value={selectedSpecialist1 || null}
                  onChange={(event, newValue) => {
                    setSelectedSpecialist1(newValue);
                    formik.setFieldValue(
                      "catagory",
                      newValue?.id || ""
                    );
                  }}
                  options={specialistArray1}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Catagory" />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <FormControl fullWidth>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  status
                </Typography>

                <Autocomplete
                  value={selectedSpecialist3 || null}
                  onChange={(event, newValue) => {
                    setSelectedSpecialist3(newValue);
                    formik.setFieldValue(
                      "status",
                      newValue?.id || ""
                    );
                  }}
                  options={specialistArray3}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Status" />
                  )}
                />
              </FormControl>
            </Grid>
        
            <Grid item xs={12} md={12} lg={12}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Additional Information
              </Typography>
              <TextField
                fullWidth
                label="Additional Information"
                minRows={3}
                multiline
                {...formik.getFieldProps("additionalInformation")}
                error={
                  formik.touched.additionalInformation && formik.errors.additionalInformation
                    ? true
                    : false
                }
                helperText={
                  formik.touched.additionalInformation && formik.errors.additionalInformation
                    ? formik.errors.additionalInformation
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Product Type
              </Typography>
              <TextField
                name="productType"
                fullWidth
                id="productType"
                label="Product Type"
                {...formik.getFieldProps("productType")}
                error={formik.touched.productType && formik.errors.productType ? true : false}
                helperText={formik.touched.productType && formik.errors.productType ? formik.errors.productType : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Parent
              </Typography>
              <TextField
                name="parent"
                fullWidth
                id="parent"
                label="Parent"
                {...formik.getFieldProps("parent")}
                error={formik.touched.parent && formik.errors.parent ? true : false}
                helperText={formik.touched.parent && formik.errors.parent ? formik.errors.parent : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Children
              </Typography>
              <TextField
                name="children"
                fullWidth
                id="children"
                label="Children"
                {...formik.getFieldProps("children")}
                error={formik.touched.children && formik.errors.children ? true : false}
                helperText={formik.touched.children && formik.errors.children ? formik.errors.children : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Tags
              </Typography>
              <TextField
                name="tags"
                fullWidth
                id="tags"
                label="Tags"
                // {...formik.getFieldProps("tags")}
                // error={formik.touched.tags && formik.errors.tags ? true : false}
                // helperText={formik.touched.tags && formik.errors.tags ? formik.errors.tags : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Featured
              </Typography>
              <TextField
                name="featured"
                fullWidth
                id="featured"
                label="Featured"
                {...formik.getFieldProps("featured")}
                error={formik.touched.featured && formik.errors.featured ? true : false}
                helperText={formik.touched.featured && formik.errors.featured ? formik.errors.featured : ""}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography as="h5" sx={{ fontWeight: "500", fontSize: "14px", mb: "12px" }}>
                Sell Count
              </Typography>
              <TextField
                name="sellCount"
                fullWidth
                id="sellCount"
                label="Sell Count"
                type="number"
                {...formik.getFieldProps("sellCount")}
                error={formik.touched.sellCount && formik.errors.sellCount ? true : false}
                helperText={formik.touched.sellCount && formik.errors.sellCount ? formik.errors.sellCount : ""}
              />
            </Grid>

            {/* Submit button */}
            <Grid item xs={12} textAlign="left">
              <LoadingButtonComponent
                type="submit"
                fullWidth={false}
                sx={{ paddingX: "30px" }}
                isLoading={false} // Add loading state
                value={
                  <>
                    <SendIcon sx={{ position: "relative", top: "-2px" }} className="mr-5px" />
                    {isEditMode ? "Edit" : "Add"} Services
                  </>
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default ServiceForm;
