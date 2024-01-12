import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Grid, Card, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { addBusinessFunApi } from "store/business/services";
import { getMyBussinessFunApi } from "store/business/services";
import Image from "next/image";
import { useRouter } from "next/router";

const BusinessForm = () => {
  const { role } = useSelector((state) => state.auth);
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business, "business123");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getMyBussinessFunApi({
          onSuccess: (businessId) => {
            console.log(businessId, "businessIdd");
          },
        })
      );
    }
  }, [dispatch, dataFatched]);

  const handleClickOpen = () => {
    router.push("/dummy-business/add");
  };

  const [avatar, setavatar] = useState(null);
  console.log(avatar);

  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    address: "",
    logo: "",
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
          name: businessData.name,
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
    <>
      <div>
        <ul>
          <li>
            {role === "admin" && (
              <>
                <Button
                  variant="contained"
                  disabled={business ? true : false}
                  onClick={handleClickOpen}
                >
                  Add Dummy Business
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>

      <Card
        sx={{ boxShadow: "none", borderRadius: "10px", p: "25px 20px 15px" }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} md={12} lg={12} xl={8}>
            {business && (
              <Card
                sx={{
                  boxShadow: "none",
                  borderRadius: "10px",
                  p: "0px 20px",
                  mb: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    mb: "15px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontSize: 15, fontWeight: 700, mb: "5px" }}
                    >
                      <ul
                        style={{
                          listStyle: "none",
                          lineHeight: "35px",
                          paddingLeft: "0px",
                        }}
                      >
                        <li>Name</li>
                        {business?.websiteService === true && (
                          <li>Website Url</li>
                        )}
                        {business?.bookingService === true && (
                          <li>Booking Url</li>
                        )}

                        <li>Description</li>
                        <li>Email</li>
                        <li>Phone</li>
                        <li>Logo</li>
                        <li>Theme</li>
                        <li>Social icons</li>
                        <li>Address</li>
                      </ul>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="p" fontSize={14}>
                      <ul
                        style={{
                          listStyle: "none",
                          marginLeft: "35px",
                          lineHeight: "35px",
                        }}
                      >
                        <li>{business?.name}</li>
                        {business?.websiteService === true && (
                          <li>
                            <Button
                              variant="outlined"
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business.slug}`}
                              target="_blank"
                              sx={{
                                pt: "2px",
                                pb: "1px",
                              }}
                            >
                              {business.slug}
                            </Button>
                          </li>
                        )}

                        {business?.bookingService === true && (
                          <li>
                            <Button
                              variant="outlined"
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business.slug}`}
                              target="_blank"
                              sx={{
                                pt: "2px",
                                pb: "1px",
                              }}
                            >
                              {business.slug}
                            </Button>
                          </li>
                        )}

                        <li>{business.description}</li>
                        <li>{business.email}</li>
                        <li>{business.phone}</li>
                        <li>
                          <Image
                            src={business.logo}
                            width={100}
                            height={50}
                            alt="Logo"
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        </li>
                        <li>{business.theme || "N/A"}</li>
                        <li>
                          {business.socialLinks &&
                            business.socialLinks.map((socialLink, index) => (
                              <span key={index}>
                                <a
                                  href={socialLink.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    marginRight: "12px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {socialLink.name}
                                </a>
                              </span>
                            ))}
                        </li>
                        <li>{business.address}</li>
                      </ul>
                    </Typography>
                  </Box>
                </Box>
              </Card>
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default BusinessForm;
