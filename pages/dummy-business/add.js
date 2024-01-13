import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { addBusinessFunApi } from "store/business/services";
import { useRouter } from "next/router";

const BusinessForm = () => {
  const { role } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [avatar1, setavatar1] = useState(null);
  console.log(avatar1);
  const [avatar2, setavatar2] = useState(null);
  console.log(avatar2, "avatar2");

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setavatar1(file);
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setavatar2(file);
    console.log("file2", file);
  };

  const [businessData, setBusinessData] = useState({
    name: "",
    slug: "dummy-business",
    email: "",
    phone: "",
    description: "",
    address: "",
    logo: "",
    bookingService: false,
    websiteService: false,
    bannerText: "",
    bannerImg: "",
    color: "",
    theme: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const handleInputChange = (field, value) => {
    setBusinessData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(
      addBusinessFunApi({
        data: {
          name: businessData.name,
          email: businessData.email,
          phone: businessData.phone,
          slug: businessData.slug,
          logo: avatar1,
          description: businessData.description,
          address: businessData.address,
          bannerText: businessData.bannerText,
          bannerImg: avatar2,
          color: businessData.color,
          googleId: "1234567890",
          socialLinks: [
            {
              name: "facebook",
              link: "https://www.facebook.com/",
            },
            {
              name: "instagram",
              link: "https://www.instagram.com/",
            },
          ],
        },
        onSuccess: () => {
          router.push("/services/add-dummy-business/");
        },
      })
    );
  };

  return (
    <>
      <h1>Add dummy Business</h1>
      <Card
        sx={{ boxShadow: "none", borderRadius: "10px", p: "25px 20px 15px" }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                fullWidth
                value={businessData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Slug"
                fullWidth
                value={businessData.slug}
                defaultValue={"dummy-business" || businessData.slug}
                disabled={true}
                onChange={(e) => handleInputChange("slug", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                value={businessData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                fullWidth
                value={businessData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                minRows={4}
                fullWidth
                value={businessData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                value={businessData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  Business Logo
                </Typography>

                <TextField
                  fullWidth
                  name="logo"
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleFileChange1}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  as="h5"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "12px",
                  }}
                >
                  Banner Image
                </Typography>

                <TextField
                  fullWidth
                  name="banner-img"
                  type="file"
                  id="banner-img"
                  accept="image/*"
                  onChange={handleFileChange2}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="color"
                label="Theme Color"
                fullWidth
                defaultValue={"#4F46E5"}
                value={businessData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Banner Text"
                fullWidth
                value={businessData.bannerText}
                onChange={(e) =>
                  handleInputChange("bannerText", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit}>
                Add Dummy Business
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default BusinessForm;
