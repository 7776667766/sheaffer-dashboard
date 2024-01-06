import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addBusinessFunApi } from "store/business/services";


const BusinessForm = () => {

    const dispatch = useDispatch();

    const [avatar, setavatar] = useState(null);
    console.log(avatar)

    const [businessData, setBusinessData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
        address: "",
        logo:"",
        bookingService: false,
        websiteService: false,
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setavatar(file);
    };

    const handleSubmit = () => {
        dispatch(
            addBusinessFunApi({
                data: {
                    name:businessData.name,
                    email: businessData.email,
                    phone: businessData.phone,
                    slug: businessData.slug,
                    logo: avatar,
                    description: "My business description goes here ...",
                    address: "Address goes here ...",
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
                    images: [
                        "https://resortcabanas.com/wp-content/uploads/Learn-to-Differentiate-Your-Spa-Business_Outdoor-Cabanas_39138676_m.jpg",
                    ],
                },
            })
        );
    };


    return (
        <Card sx={{ boxShadow: "none", borderRadius: "10px", p: "25px 20px 15px" }}>
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
                            label="email"
                            fullWidth
                            value={businessData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="phone"
                            fullWidth
                            value={businessData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="description"
                            fullWidth
                            value={businessData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="address"
                            fullWidth
                            value={businessData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                as="h5"
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    mb: "12px",
                                }}
                            >
                                Upload Logo
                            </Typography>

                            <TextField
                                fullWidth
                                name="logo"
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography variant="subtitle1">Social Links:</Typography>
                        <TextField
                            label="Facebook"
                            fullWidth
                            value={businessData.socialLinks.facebook}
                            onChange={(e) => handleSocialLinksChange("facebook", e.target.value)}
                        />
                    </Grid> */}

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Slug"
                            fullWidth
                            value={businessData.slug}
                            onChange={(e) => handleInputChange("slug", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BusinessForm;
