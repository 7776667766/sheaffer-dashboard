import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Dashboard/eCommerce/Features";
import UserList from "./users";
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

export default function ECommerce() {
  const { user, role } = useSelector((state) => state.auth);
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business, "business");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");
  const [open, setOpen] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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
      if (!dataFatched) dispatch(getMyBussinessFunApi());
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
                  disabled={business}
                  onClick={handleClickOpen}
                >
                  Sync Business
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
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={12}>
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
                              <li>{business?.description}</li>
                              <li>{business?.email}</li>
                              <li>{business?.phone}</li>
                              {business?.socialLinks &&
                                business?.socialLinks.map(
                                  (socialLink, index) => (
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
                                  )
                                )}
                              <li>{business?.address}</li>

                              {/* <li style={{ height: '50px' }}>
                                {selectedBusiness &&
                                  selectedBusiness.images &&
                                  selectedBusiness.images.map((data, index) => (
                                    <Image
                                      key={index}
                                      src={data}
                                      alt={`Image ${index}`}
                                      width={50}
                                      height={50}
                                      style={{ marginRight: '12px' }}
                                    />
                                  ))}
                              </li> */}
                            </ul>
                          </Typography>
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
                          Submit
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
          {/* Features */}
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
                  alignItems: "center",
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
                      <li>Url</li>
                      <li>Description</li>
                      <li>Email</li>
                      <li>Phone</li>
                      <li>Social icons</li>
                      <li>Address</li>
                      <li>Images</li>
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
                      <li>{business.name}</li>
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
                      <li>{business.description}</li>
                      <li>{business.email}</li>
                      <li>{business.phone}</li>
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
                      <li>{business.address}</li>

                      <li style={{ height: "50px" }}>
                        {business.images.map((data, key) => (
                          <Image
                            key={key}
                            src={data}
                            alt={business.name}
                            width={50}
                            height={50}
                            style={{ marginRight: "12px" }}
                          />
                        ))}
                      </li>
                    </ul>
                  </Typography>
                </Box>
              </Box>
            </Card>
          )}

          <Features />

          {/* AudienceOverview */}
          {/* <AudienceOverview /> */}

          {/* <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid item xs={12} md={8}>
              <VisitsByDay />
            </Grid>

            <Grid item xs={12} md={4}>
              <Impressions />

              <ActivityTimeline />
            </Grid>

            <Grid item xs={12} md={12}>
              <RevenuStatus />
            </Grid>
          </Grid> */}
        </Grid>

        {/* <Grid item xs={12} md={12} lg={12} xl={4}>
          <Ratings />

          <LiveVisitsOnOurSite />

          <SalesByCountries />

          <NewCustomers />
        </Grid> */}
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
