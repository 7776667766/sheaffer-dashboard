import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { getMyBussinessFunApi, getallBussinessesFunApi } from "store/business/services";
import {

  getAllServiceFunApi,
} from "store/service/services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyBusinessBookingFunApi } from "store/booking/service";




const Features = () => {
  const { business } = useSelector((state) => state.business);
  const { businessAll, dataFatched } = useSelector((state) => state.business);
  const businessDataArray = businessAll.data;
  const totalBusinesses = businessDataArray.length;
  const { service } = useSelector((state) => state.service);
  const servicesDataArray = service.data;
  const totalServices = servicesDataArray.length;
  const { booking } = useSelector((state) => state.booking);
  const bookingDataArray = booking.data;
  const totalBookings = bookingDataArray.length;

  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getallBussinessesFunApi({
          onSuccess: () => {
          },
        })
      );
    }

  }, [dispatch, dataFatched]);

  useEffect(() => {
    if (dataFatched !== true) {
      dispatch(
        getMyBussinessFunApi({
          
          onSuccess: (businessId) => {
            dispatch(

              getAllServiceFunApi({
                businessId: businessId,
              })
            );
          },
        })
      );
    }
  }, [dispatch, dataFatched]);

  // useEffect(() => {
  //   if (!dataFatched) {
  //     dispatch(
  //       getMyBussinessFunApi({
  //         onSuccess: () => {
  //           dispatch(
  //             getMyBusinessBookingFunApi({
  //               data: {
  //                 businessId: business?.data?.id,
  //               },
  //             })
  //           );
  //         },
  //       })
  //     );
  //   } else {
  //     if (!booking.dataFatched) {
  //       dispatch(
  //         getMyBusinessBookingFunApi({
  //           data: {
  //             businessId: business?.data?.id,
  //           },
  //         })
  //       );
  //     }
  //   }
  // }, [dispatch, booking.data, booking.dataFatched, business?.data?.id, dataFatched]);

  useEffect(() => {
    if (!dataFatched && business?.data?.id) {
      dispatch(
        getMyBussinessFunApi({
          onSuccess: () => {
            dispatch(
              getMyBusinessBookingFunApi({
                data: {
                  businessId:  business?.data?.id,
                },
              })
            );
          },
        })
      );
    }
  }, [dispatch, dataFatched, business?.data?.id]);
  
  const FeaturesData = [
    {
      id: "1",
      title: `${totalBusinesses}`,
      subTitle: "Total Businesses",
      image: "/images/graph-icon.png",
      // icon: <TrendingUpIcon />,
      // growthText: "1.3% Up from past week",
      color: "successColor",
    },
    {
      id: "2",
      title: `${totalServices}`,
      subTitle: "Total Services",
      image: "/images/work-icon.png",
      // icon: <TrendingUpIcon />,
      // growthText: "1.5% Up from past week",
      // color: "successColor",
    },
    {
      id: "3",
      title: `${totalBookings}`,
      subTitle: "Total Bookings",
      image: "/images/users-icon.png",
      // icon: <TrendingDownIcon />,
      // growthText: "1.6% Up from past week",
      // color: "dangerColor",
    },
  ];


  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getAllServiceFunApi({
          onSuccess: () => {
            console.log("businessIdd");
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
                p: "25px 20px",
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
