import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  return (
    <>
      <div>
        <ul>
          <li>
            {role === "admin" && (
              <>
                <Button
                  variant="contained"
                  disabled={business.data ? true : false}
                  onClick={handleClickOpen}
                >
                  Add Dummy Business
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>
      <Accordion sx={{ border: "none", borderRadius: "15px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          sx={{ border: "none" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* {business?.data.logo && (
              <Image
                src={business?.data.logo}
                alt="Logo"
                width={50} // Set the width as per your requirement
                height={50} // Set the height as per your requirement
              />
            )} */}
            <Typography
              variant="h4"
              sx={{ fontSize: 15, fontWeight: 700, color: "black" }}
            >
              {business?.data?.name}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Card
            sx={{
              boxShadow: "none",
              border: "none",
              borderRadius: "10px",
              p: "25px 20px 15px",
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
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
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          {business?.data?.websiteService === true && (
                            <Typography variant="h6">Website Url</Typography>
                          )}
                          {business?.data?.websiteService === true && (
                            <Button
                              variant="outlined"
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business?.data.slug}`}
                              target="_blank"
                              sx={{
                                pt: "2px",
                                pb: "1px",
                              }}
                            >
                              {business?.data.slug}
                            </Button>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {business?.data?.bookingService === true && (
                          <Box>
                            <Typography variant="h6">Booking Url</Typography>
                            {/* Add your booking URL components here */}
                          </Box>
                        )}
                        {business?.data?.bookingService === true && (
                          <li>
                            <Button
                              variant="outlined"
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business?.data.slug}`}
                              target="_blank"
                              sx={{
                                pt: "2px",
                                pb: "1px",
                              }}
                            >
                              {business?.data?.slug}
                            </Button>
                          </li>
                        )}
                      </Grid>
                    </Grid>

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
                            <li>Description</li>
                            <li>Email</li>
                            <li>Phone</li>
                            {/* <li>Logo</li> */}
                            <li>Theme</li>
                            <li>Social icons</li>
                            <li>Address</li>
                            <li>bannerText</li>
                            <li>color</li>
                            <li>bannerImg</li>
                            <li>fontSize</li>
                            <li>fontFamily</li>
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
                            {/* <li>{business?.name}</li> */}
                            {business?.data?.websiteService === true && (
                              <li>
                                <Button
                                  variant="outlined"
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business?.data.slug}`}
                                  target="_blank"
                                  sx={{
                                    pt: "2px",
                                    pb: "1px",
                                  }}
                                >
                                  {business?.data.slug}
                                </Button>
                              </li>
                            )}

                            <li>{business?.data?.description}</li>
                            <li>{business?.data?.email}</li>
                            <li>{business?.data?.phone}</li>
                            <li>
                              {/* <Image
                            src={business.logo}
                            width={50}
                            height={30}
                            alt="Logo"
                            style={{
                              objectFit: "contain",
                            }}
                          /> */}
                            </li>
                            <li>{business?.data?.theme || "N/A"}</li>
                            <li>
                              {business?.data?.socialLinks &&
                                business.data?.socialLinks.map(
                                  (socialLink, index) => (
                                    <a
                                      key={index}
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
                                  )
                                )}
                            </li>
                            <li>{business?.data?.address}</li>

                            <li>{business?.data?.bannerText}</li>
                            <li
                              style={{
                                backgroundColor: business.color,
                                height: "30px",
                                width: "50px",
                              }}
                            >
                              {business?.data?.color}
                            </li>
                            <li>
                              <Image
                                src={business?.data?.bannerImg}
                                width={50}
                                height={30}
                                alt="bannerImg"
                                style={{
                                  objectFit: "contain",
                                }}
                              />
                            </li>
                            <li>{business?.data?.fontSize}</li>
                            <li>{business?.data?.fontFamily}</li>
                          </ul>
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Card>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BusinessForm;
