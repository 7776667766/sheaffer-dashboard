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
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";

import copyImage from "@/public/images/icon/solar_copy-bold.png";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { addBusinessFunApi } from "store/business/services";
import { getMyBussinessFunApi } from "store/business/services";
import Image from "next/image";
import { useRouter } from "next/router";

const BusinessForm = () => {
  const { role } = useSelector((state) => state.auth);
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business.data, "business123");
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

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isBookingLinkCopied, setIsBookingLinkCopied] = useState(false);
  const handleSiteCopyLink = () => {
    const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business.data.slug}`;
    navigator.clipboard.writeText(linkToCopy);
    setIsLinkCopied(true);

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  const handleBookingLink = () => {
    const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business.data.slug}`;
    navigator.clipboard.writeText(linkToCopy);
    setIsBookingLinkCopied(true);

    setTimeout(() => {
      setIsBookingLinkCopied(false);
    }, 1000);
  };
  console.log(business?.data?.log);
  return (
    <>
      <div>
        <ul>
          <li>
            {role === "admin" && (
              <>
                <Button
                  variant="contained"
                  // disabled={business.data ? true : false}
                  onClick={handleClickOpen}
                >
                  Add Dummy Business
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>
      <Accordion
        sx={{
          borderRadius: "15px",
          marginTop: "20px",
          position: "unset",
          boxShadow: "none",
        }}
        defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          sx={{ border: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingLeft: "10px",
            }}
          >
            <Box
              sx={{
                // width: "60px",
                height: "50px",
                borderRadius: "10px",

                overflow: "hidden",
                border: "1px solid gray",
              }}
            >
              {business?.data?.logo ? (
                <Image
                  src={business?.data.logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  sx={{width:"100%"}}
                />
              ) : (
                <Image
                  src={
                    "https://media.istockphoto.com/id/692999494/photo/hairdresser-cutting-some-hair-tips.jpg?b=1&s=612x612&w=0&k=20&c=gvycPdlljfuUCqiNmOpBF_dmlb09EZkqKew8h11KumU="
                  }
                  alt="Logo"
                  width={50}
                  height={50}
                />
              )}
            </Box>

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
              p: "0 0px 15px",
            }}
          >
            <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={12} md={8} lg={8} xl={8}>
                {business && (
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "5px",
                      p: "0px 10px",
                      mb: "15px",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={5}>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          {/* {business?.data?.websiteService === true && (
                            <Typography variant="h6">Website Url</Typography>
                          )} */}
                          {business?.data?.websiteService === true && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {" "}
                              <Button
                                // variant="outlined"
                                href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business?.data.slug}`}
                                target="_blank"
                                sx={{
                                  background: "rgba(117, 127, 239, 0.10)",

                                  border: "none",
                                  textDecoration: "underline",
                                  pt: "2px",
                                  pb: "1px",
                                }}
                              >
                                Go to Website
                              </Button>
                              <Box>
                                <Image
                                  src={copyImage}
                                  width={20}
                                  height={20}
                                  alt="copy"
                                  onClick={handleSiteCopyLink}
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "5px",
                                    marginTop: "4px",
                                  }}
                                />
                              </Box>
                              {isLinkCopied &&
                                business?.data.websiteService === true && (
                                  <div
                                    style={{
                                      position: "relative",
                                      top: "-2px",
                                      right: "26px",
                                      padding: "3px",
                                      background: "#F1F2FD",
                                      borderRadius: "3px",
                                      color: "#000",
                                      marginLeft: "7px",
                                    }}
                                  >
                                    Copied!
                                  </div>
                                )}
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          {business?.data?.bookingService === true && (
                            <Box sx={{ display: "flex" }}>
                              {" "}
                              <Button
                                // variant="outlined"
                                href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business?.data.slug}`}
                                target="_blank"
                                sx={{
                                  background: "rgba(117, 127, 239, 0.10)",

                                  border: "none",
                                  textDecoration: "underline",
                                  pt: "2px",
                                  pb: "1px",
                                }}
                              >
                                Go to Booking
                              </Button>
                              <Box sx={{ display: "flex" }}>
                                <Image
                                  src={copyImage}
                                  width={20}
                                  height={20}
                                  alt="copy"
                                  onClick={handleBookingLink}
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "5px",
                                    marginTop: "4px",
                                  }}
                                />
                              </Box>
                              {isBookingLinkCopied &&
                                business?.data.bookingService === true && (
                                  <div
                                    style={{
                                      position: "relative",
                                      top: "-2px",
                                      right: "26px",
                                      padding: "3px",
                                      background: "#F1F2FD",
                                      borderRadius: "3px",
                                      color: "#000",
                                      marginLeft: "7px",
                                    }}
                                  >
                                    Copied!
                                  </div>
                                )}
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        mb: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Box sx={{ marginTop: "10px" }}>
                        {business?.data?.description}
                      </Box>
                      <Box sx={{ marginTop: "10px", display: "block" }}>
                        <Box>{business?.data?.email}</Box>
                        <Box>
                          {`${business?.data?.phone.code} ${business?.data?.phone.number}`}
                        </Box>
                        <Box>{business?.data?.address}</Box>
                        <Box>{business?.data?.theme || "N/A"}</Box>
                        <Box>{business?.data?.bannerText}</Box>
                        <Box
                          sx={{
                            backgroundColor: business?.data?.color,
                            width: "50px",
                            height: "20px",
                            borderRadius: "5px",
                          }}
                        >
                          {" "}
                        </Box>
                      </Box>
                      <Box></Box>
                    </Box>
                  </Card>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                xl={4}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "end",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      width: "150px",
                      height: "100px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      overflow: "hidden",
                      marginTop: "0px",
                    }}
                  >
                    {business?.data?.bannerImg ? (
                      <Image
                        src={business.data.bannerImg}
                        alt="Banner Image"
                        width={150}
                        height={100}
                      />
                    ) : (
                      <Image
                        src={
                          "https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        alt="Banner Image"
                        width={70}
                        height={70}
                      />
                    )}
                  </Box>
                  <Box sx={{ marginTop: "20px" }}>
                    {" "}
                    {business?.data?.socialLinks &&
                    business.data.socialLinks.length > 0 ? (
                      business.data.socialLinks.map((socialLink, index) => (
                        <a
                          key={index}
                          href={socialLink.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            marginRight: "12px",
                            textTransform: "capitalize",
                            marginTop: "30px",
                          }}
                        >
                          {socialLink.name}
                        </a>
                      ))
                    ) : (
                      <span>No social links available</span>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BusinessForm;
