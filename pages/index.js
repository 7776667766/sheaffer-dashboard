import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Dashboard/eCommerce/Features";
import Ratings from "@/components/Dashboard/eCommerce/Ratings";
import AudienceOverview from "@/components/Dashboard/eCommerce/AudienceOverview";
import VisitsByDay from "@/components/Dashboard/eCommerce/VisitsByDay";
import Impressions from "@/components/Dashboard/eCommerce/Impressions";
import ActivityTimeline from "@/components/Dashboard/eCommerce/ActivityTimeline";
import RevenuStatus from "@/components/Dashboard/eCommerce/RevenuStatus";
import SalesByCountries from "@/components/Dashboard/eCommerce/SalesByCountries";
import NewCustomers from "@/components/Dashboard/eCommerce/NewCustomers";
import RecentOrders from "@/components/Dashboard/eCommerce/RecentOrders";
import BestSellingProducts from "@/components/Dashboard/eCommerce/BestSellingProducts";
import LiveVisitsOnOurSite from "@/components/Dashboard/eCommerce/LiveVisitsOnOurSite";
import UserList from "./users";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import { getMyBussinessFunApi } from "store/business/services";

export default function ECommerce() {
  const { role } = useSelector((state) => state.auth);
  const { business } = useSelector((state) => state.business);
  console.log(business, "done");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (business && !business.businessFetch)
      dispatch(getMyBussinessFunApi({ data: business?.id }));
  }, [dispatch, business?.businessFetch, business?.id]);
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

  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>MAKELY</h1>
        <ul>
          <li>
            <Button variant="contained" onClick={handleClickOpen}>
              Sync Business
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle> Select Your Business </DialogTitle>
              <List sx={{ pt: 0 }}>
                {businessList.map((data, index) => (
                  <ListItem disableGutters key={index}>
                    <ListItemButton onClick={() => {}}>
                      <ListItemAvatar>
                        <Avatar src={data.image} alt={data.title} />
                      </ListItemAvatar>
                      <ListItemText primary={data.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Dialog>
          </li>

          {/* <li>
            <Link href="/">Dashboard</Link>
          </li> */}
          {/* <li style={{ textTransform: "capitalize" }}>{role}</li> */}
        </ul>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          {/* Features */}

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
                justifyContent: "space-between",
                alignItems: "center",
                mb: "15px",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontSize: 25, fontWeight: 600, mb: "5px" }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      lineHeight: "35px",
                      paddingLeft: "0px",
                    }}
                  >
                     <li>{business.name}</li>
                    <li style={{ fontSize: "15px", fontWeight: 500, mb: "5px" }}>{business.description}</li>
                    <li style={{ fontSize: "15px", fontWeight: 500, mb: "5px" }}>{business.email}</li>
                    {business.socialLinks &&
                      business.socialLinks.map((socialLink, index) => (
                        <span key={index}>
                          <a
                            href={socialLink.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "15px", fontWeight: 500, mb: "5px" , marginRight:'15px'}}
                          >
                            {socialLink.name}
                          </a>
                        </span>
                      ))}
                      <li style={{ fontSize: "15px", fontWeight: 500, mb: "5px" }}>{business.phone}</li>
                    <li style={{ fontSize: "20px", fontWeight: 600, mb: "5px" }}>{business.address}</li>
                    

                  </ul>
                </Typography>
              </Box>

              <Box>
                <Typography variant="p" fontSize={14}>
                  <ul
                    style={{
                      listStyle: "none",
                    }}
                  >
                   

                    <li>
                      <Image
                        src={business.images[0]}
                        alt="ok"
                        width={100}
                        height={100}
                        style={{ borderRadius: "10px" }}
                      />
                    </li>
                  </ul>
                </Typography>
              </Box>
            </Box>
          </Card>

          <Features />

          {/* AudienceOverview */}
          <AudienceOverview />

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid item xs={12} md={8}>
              {/* VisitsByDay */}
              <VisitsByDay />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Impressions */}
              <Impressions />

              {/* ActivityTimeline */}
              <ActivityTimeline />
            </Grid>

            <Grid item xs={12} md={12}>
              {/* RevenuStatus */}
              <RevenuStatus />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={4}>
          {/* Ratings */}
          <Ratings />

          {/* LiveVisitsOnOurSite */}
          <LiveVisitsOnOurSite />

          {/* SalesByLocations */}
          <SalesByCountries />

          {/* NewCustomers */}
          <NewCustomers />
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <RecentOrders />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {role === "admin" && (
          <Grid item xs={12} md={12} lg={12} xl={8}>
            {/* UsersList */}
            <UserList />
          </Grid>
        )}

        <Grid item xs={12} md={12} lg={12} xl={4}>
          {/* BestSellingProducts */}
          <BestSellingProducts />
        </Grid>
      </Grid>
    </>
  );
}
