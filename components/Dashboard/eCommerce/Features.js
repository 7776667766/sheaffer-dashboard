import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { getMyBussinessFunApi, getMultipleBussinessesFunApi } from "store/business/services";
import {
  getAllServiceFunApi, getServicesTypeFunApi,
} from "store/service/services";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyBusinessBookingFunApi } from "store/booking/service";
import { getAllUsersFunApi } from "store/admin/services";
import { getMyCardFunApi } from "store/card/card";

const Features = () => {
  const { business } = useSelector((state) => state.business);
  console.log("business19",business)
  const { businessAll, dataFatched } = useSelector((state) => state.business);
  console.log("business All ",businessAll)
  const businessDataArray = businessAll?.data;
  const totalBusinesses = businessDataArray?.length;
  const { allUsers } = useSelector((state) => state.admin);
  const userDataArray = allUsers?.data;
  const totalUsers = userDataArray?.length;
  const { service } = useSelector((state) => state.service);
  const servicesDataArray = service.data;
  const totalServices = servicesDataArray?.length;
  const { booking } = useSelector((state) => state.booking);
  const bookingDataArray = booking.data;
  const totalBookings = bookingDataArray.length;
  const { role } = useSelector((state) => state.auth);
  const { serviceType } = useSelector((state) => state.service);
  const serviceDataArray = serviceType.data;
  const totalServiceTypes = serviceDataArray.length;
  const { card } = useSelector((state) => state.card);
   const cardDataArray = card.data;
  const totalCardTypes = cardDataArray.length;
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (!allUsers.dataFatched) {
      dispatch(getAllUsersFunApi());
    }
  }, [allUsers.dataFatched, dispatch]);

  useEffect(() => {
    if (serviceType.dataFatched !== true) {
      dispatch(getServicesTypeFunApi());
    }
  }, [dispatch, serviceType.dataFatched, serviceType.serviceFetch]);

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getMultipleBussinessesFunApi({
          onSuccess: () => {
          },
        })
      );
    }

  }, [dispatch, dataFatched]);

  useEffect(() => {     
    dispatch(
      getMyBusinessBookingFunApi({
        data: {
          businessId: business?.data?.id
        },
      })
    );
}, [dispatch, business?.data?.id]);

  useEffect(() => {
    if (!dataFatched && business?.data?.id) {
      // dispatch(
      //   getMyBussinessFunApi({
      //     onSuccess: () => {
      //       dispatch(
      //         getMyBusinessBookingFunApi({
      //           data: {
      //             businessId: business?.data?.id,
      //           },
      //         })
      //       );
      //     },
      //   })
      // );
    }
  }, [dispatch, dataFatched, business?.data?.id]);

  useEffect(() => {
    if (card.dataFatched !== true) {
      dispatch(
        getMyCardFunApi({
          data: {
            businessId: business?.data?.id,
          },
        })
      );
    }
  }, [dispatch, card.data, card.dataFatched, business?.id]);

  const FeaturesData = [
    {
      id: "1",
      title: role === "admin" ? `${totalUsers}` : `${totalBusinesses}`,
      subTitle: role === "admin" ? "Total Users" : "Total Businesses",
      image: "/images/graph-icon.png",
      color: "successColor",
    },
    {
      id: "2",
      title: role === "admin" ? `${totalServiceTypes}` : `${totalServices}`,
      subTitle: role === "admin" ? "Total Service Types" : "Business Services",
      image: "/images/work-icon.png",
    },
    {
      id: "3",
      title: role === "admin" ? `${totalCardTypes}` :`${totalBookings}`,
      subTitle: role === "admin" ? "All Transactions" : "Business Bookings",
      image: "/images/users-icon.png",
    },
  ];

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getAllServiceFunApi({
          onSuccess: () => {
            console.log("businessId");
          },
        })
      );
    }
  }, [dispatch, dataFatched]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData.map((feature) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={feature.id}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "15px 30px",
                mb: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // mb: "px",
                }}
                
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: 25, fontWeight: 700, mb: "5px" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="p" fontSize={14}>
                    {feature.subTitle}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "62px",
                    height: "62px",
                    lineHeight: "85px",
                    background: "rgba(85, 112, 241, 0.12)",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <img src={feature.image} alt="Graph" />
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span className={`mr-5px ${feature.color}`}>
                    {feature.icon}
                  </span>
                  {feature.growthText}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
