import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Dashboard/eCommerce/Features";
import UserList from "./users";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogTitle,
  List,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import {
  getMyBussinessFunApi,
  regsiterBusinessFunApi,
} from "store/business/services";
import { Twitter } from "@mui/icons-material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import copyImage from "@/public/images/icon/solar_copy-bold.png";
import { LoadingButtonComponent } from "@/components/UIElements/Buttons/LoadingButton";

export default function DashboardPage() {
  const { user, role } = useSelector((state) => state.auth);
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business, "business information");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [openthirdDialog, setOpenthirdDialog] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [avatar, setavatar] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    googleId: "",
    color: "",
    theme: "",
    file: null,
  });

  const handleOpenRequest = () => {
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = (business) => {
    setSelectedBusiness(business);
    setOpenSecondDialog(true);
  };

  const handleClose = () => {
    setSelectedBusiness(null);
    setOpenSecondDialog(false);
    setOpen(false);
  };

  useEffect(() => {
    if (role === "owner" || role === "manager") {
      if (!dataFatched) {
        dispatch(getMyBussinessFunApi({}));
      }
    }
  }, [dispatch, dataFatched, role]);

  const businessList = [
    {
      title: "Business 1",
      image: "",
    },
    {
      title: "Business 2",
      image: "",
    },
  ];

  const handleRegisterBusiness = () => {
    dispatch(
      regsiterBusinessFunApi({
        data: {
          name: `${user.name} Business`,
          email: user.email,
          phone: user.phone,
          slug: slug,
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

        onSuccess: () => {
          handleClose();
        },
      })
    );
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setavatar(file);
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleSiteCopyLink = () => {
    const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business.slug}`;
    navigator.clipboard.writeText(linkToCopy);
    setIsLinkCopied(true);

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  const handleCopyLink = () => {
    const linkToCopy = `${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business.slug}`;
    navigator.clipboard.writeText(linkToCopy);
    setIsLinkCopied(true);

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>MAKELY</h1>
        <ul>
          <li>
            {role === "owner" && (
              <>
                <Button
                  variant="contained"
                  // disabled={business ? true : false}
                  onClick={handleClickOpen}
                >
                  Sync Business
                </Button>
                <Button
                  variant="contained"
                  // disabled={business ? true : false}
                  onClick={handleOpenRequest}
                >
                  Send Custom Booking Request
                </Button>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>
                    {" "}
                    Select Your Business
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <List sx={{ pt: 0 }}>
                    {businessList.map((data, index) => (
                      <ListItem disableGutters key={index}>
                        <ListItemButton onClick={() => handleOpen(data)}>
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText primary={data.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Dialog>

                {/* {FORM FOR REQUEST BUSINESS  } */}

                <Dialog
                  open={openForm}
                  onClose={handleFormClose}
                  PaperProps={{
                    sx: {
                      width: "700px",
                      height: "500px",
                    },
                  }}
                >
                  <DialogTitle>
                    Business Form Request
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleFormClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>

                  <div sx={{ padding: "16px", margin: "16px" }}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Typography
                        as="h5"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "12px",
                        }}
                      >
                        Name
                      </Typography>
                      <TextField
                        name="name"
                        fullWidth
                        id="name"
                        label="Enter Name"
                        value={formData.name}
                      />
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Typography
                        as="h5"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "12px",
                        }}
                      >
                        Email
                      </Typography>
                      <TextField
                        name="email"
                        fullWidth
                        id="email"
                        label="Enter Email"
                        value={formData.email}
                      />
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
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
                        id="description"
                        label="Enter Description"
                        value={formData.description}
                      />
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Typography
                        as="h5"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "12px",
                        }}
                      >
                        Google ID
                      </Typography>
                      <TextField
                        name="googleId"
                        fullWidth
                        id="googleId"
                        label="Enter Google ID"
                      />
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Typography
                        as="h5"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "12px",
                        }}
                      >
                        Color
                      </Typography>
                      <TextField
                        name="color"
                        fullWidth
                        id="color"
                        label="Enter Color"
                        value={formData.color}
                      />
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Typography
                        as="h5"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "12px",
                        }}
                      >
                        Theme
                      </Typography>
                      <TextField
                        name="theme"
                        fullWidth
                        id="theme"
                        label="Enter Theme"
                        value={formData.theme}
                      />
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            as="h5"
                            sx={{
                              fontWeight: "500",
                              fontSize: "14px",
                              mb: "12px",
                            }}
                          >
                            Upload Banner Image
                          </Typography>

                          <TextField
                            fullWidth
                            name="file"
                            type="file"
                            id="file"
                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
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
                            name="file"
                            type="file"
                            id="file"
                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} textAlign="left">
                      <LoadingButtonComponent
                        type="submit"
                        fullWidth={false}
                        sx={{
                          paddingX: "10px",
                        }}
                        value={
                          <>
                            <SendIcon className="mr-5px" />
                            Add Request
                          </>
                        }
                      />
                    </Grid>
                  </div>
                </Dialog>

                {selectedBusiness && (
                  <Dialog open={openSecondDialog} onClose={handleClose}>
                    <DialogTitle>
                      {selectedBusiness?.title} Grid
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <Grid container spacing={3} paddingX={3} paddingBottom={3}>
                      <Grid item xs={12}>
                        <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "12px",
                          }}
                        >
                          Business Slug
                        </Typography>
                        <TextField
                          label="Slug"
                          name="slug"
                          onChange={(e) => setSlug(e.target.value)}
                          fullWidth
                          InputProps={{
                            style: {
                              borderRadius: "5px",
                              padding: "5px",
                            },
                          }}
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

                      <Grid
                        item
                        xs={12}
                        style={{
                          marginRight: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        <Button
                          onClick={handleRegisterBusiness}
                          variant="contained"
                          color="primary"
                        >
                          Register Business
                        </Button>
                      </Grid>
                    </Grid>
                  </Dialog>
                )}
              </>
            )}
          </li>
        </ul>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          {business && (
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "0px 0px",
                mb: "15px",
              }}
            >
              <Accordion className="bg-black">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography component="h1" fontWeight="500">
                    <div>
                      <Image
                        src={business.logo}
                        width={100}
                        height={50}
                        alt="Logo"
                        style={{
                          objectFit: "contain",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          paddingLeft: "10px",
                        }}
                      >
                        {" "}
                        {business?.name}{" "}
                      </span>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ marginTop: "-24px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: "15px",
                    }}
                  >
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="p" fontSize={14}>
                        <ul
                          style={{
                            listStyle: "none",
                            marginLeft: "0px",
                            paddingLeft: "0px",
                            lineHeight: "20px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10%",
                              marginBottom: "20px",
                            }}
                          >
                            {business?.websiteService === true && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "end",
                                  gap: "4px",
                                }}
                              >
                                <Box>
                                  <Button
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}site/${business.slug}`}
                                    target="_blank"
                                    sx={{
                                      pt: "2px",
                                      pb: "1px",
                                      textDecoration: "underline",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                      color: "#757FEF",
                                      backgroundColor: "#F1F2FD",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Go to Website
                                  </Button>
                                </Box>
                                <Box>
                                  <Image
                                    src={copyImage}
                                    width={20}
                                    height={20}
                                    alt="copy"
                                    onClick={handleSiteCopyLink}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Box>
                              </Box>
                            )}

                            {business?.bookingService === true && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "end",
                                  gap: "4px",
                                }}
                              >
                                <Box>
                                  <Button
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}booking/${business.slug}`}
                                    target="_blank"
                                    sx={{
                                      pt: "2px",
                                      pb: "1px",
                                      textDecoration: "underline",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                      color: "#757FEF",
                                      backgroundColor: "#F1F2FD",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Go to Booking
                                  </Button>
                                </Box>
                                <Box>
                                  <Image
                                    src={copyImage}
                                    width={20}
                                    height={20}
                                    alt="copy"
                                    onClick={handleCopyLink}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Box>
                              </Box>
                            )}
                          </Box>
                          <li style={{ marginBottom: "20px" }}>
                            {business.description}
                          </li>
                          <li
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#303030",
                              marginBottom: "5px",
                            }}
                          >
                            {business.email}
                          </li>
                          <li
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#303030",
                              marginBottom: "5px",
                            }}
                          >
                            {business.phone}
                          </li>
                          <li
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#303030",
                              marginBottom: "5px",
                            }}
                          >
                            {business.address}
                          </li>

                          {/* <li>{business.bannerText}</li> */}
                          {/* <li>
                        <Image
                          src={business.bannerImg}
                          width={100}
                          height={50}
                          alt="bannerImg"
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </li> */}
                          {/* <li
                        style={{
                          backgroundColor: business.color,
                          height: "30px",
                          width: "50px",
                        }}
                      ></li> */}
                        </ul>
                      </Typography>
                    </Box>

                    <Box sx={{ width: "50%", textAlign: "right" }}>
                      <Typography variant="p" fontSize={14}>
                        <div
                          style={{
                            listStyle: "none",
                            marginLeft: "0px",
                            paddingLeft: "0px",
                            lineHeight: "35px",
                          }}
                        >
                          <div style={{ height: "100px" }}>
                            {/* {business?.images?.map((data, key) => (
                              <Image
                                key={key}
                                src={data}
                                alt={business.name}
                                width={100}
                                height={100}
                                style={{ borderRadius: "10px" }}
                              />
                            ))} */}

                            {business?.images?.map((data, key) => (
                              <Image
                                key={key}
                                src={data}
                                alt={business.name}
                                width={100}
                                height={100}
                                style={{
                                  borderRadius: "10px",
                                  marginLeft: "8px",
                                }}
                              />
                            ))}
                          </div>
                          <Box
                            sx={{
                              marginTop: "15px",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            {business.socialLinks?.map((socialLink, index) => (
                              <div key={index}>
                                <a
                                  rel="noreferrer"
                                  href={socialLink.link}
                                  target="_blank"
                                  className="text-3xl"
                                  style={{
                                    color: "#a8a8a8",
                                    marginRight: "5px",
                                  }}
                                >
                                  {socialLink.name === "facebook" ? (
                                    <Facebook style={{ fontSize: "30px" }} />
                                  ) : socialLink.name === "instagram" ? (
                                    <Instagram style={{ fontSize: "29px" }} />
                                  ) : (
                                    <Twitter />
                                  )}
                                </a>
                              </div>
                            ))}
                          </Box>
                        </div>
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Card>
          )}

          <Features />
        </Grid>
      </Grid>

      {/* Recent Orders */}
      {/* <RecentOrders /> */}

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {role === "admin" && (
          <Grid item xs={12} md={12} lg={12} xl={8}>
            <UserList />
          </Grid>
        )}

        {/* <Grid item xs={12} md={12} lg={12} xl={4}>
          <BestSellingProducts />
        </Grid> */}
      </Grid>
    </>
  );
}
