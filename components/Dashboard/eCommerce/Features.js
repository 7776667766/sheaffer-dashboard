import React, { useState } from "react";
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
import {CustomPaginationTable} from "@/components/Table/CustomPaginationTable";
import {TableCell} from "@mui/material";
import toast from "react-hot-toast";
import axios from "helper/api-image";

const Features = () => {
  
  const [totalproducts,setallproducts]=useState([])
  console.log("products",totalproducts)
  const [totalorders,setallorders]=useState([])
  console.log("totalorders",totalorders)

  const userdata = async () => {
    try {
      const response = await axios.get('/product/all');

      console.log("Response from API:", response.data);
      setallproducts(response.data.data)
      if (response.status === 200) {
        toast.success("Data fetched !");
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error in data fetch:", error);
      toast.error("An error occurred while submitting the form. Please try again later.");
    }
  }

  const orderdata = async () => {
    try {
      const response = await axios.get('/order/orders');

      console.log("Response from API:", response.data);
      setallorders(response.data.data)
      if (response.status === 200) {
        toast.success("Data fetched !");
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error in data fetch:", error);
      toast.error("An error occurred while submitting the form. Please try again later.");
    }
  }


  useEffect(() => {
    orderdata()
    userdata()
  }, []);


  const FeaturesData = [
    {
      id: "1",
      // title:{PendingOrders},
      subTitle: "Pending Orders",
      image: "/images/graph-icon.png",
      color: "successColor",
    },
    {
      id: "3",
      // title:{totalOrders},
      subTitle: "Completed Orders",
      image: "/images/users-icon.png",
    },
    {
      id: "2",
      title: totalproducts.length,
      subTitle: "Total Products",
      image: "/images/work-icon.png",
    },
    {
      id: "3",
      title:totalorders.length,
      subTitle: "Total Orders",
      image: "/images/users-icon.png",
    },
  ];

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

      {/* <Grid>
      <CustomPaginationTable
          isLoading={allUsers.isLoading}
          tableData={}
          tableHeaderData={
            <>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Sr
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Name
              </TableCell>

              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Phone
              </TableCell>

              <TableCell
                align="center"
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Role
              </TableCell>

              <TableCell
                align="center"
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Verified
              </TableCell>
            </>
          }
          tableBodyData={(data, index) => (
            <>
              <TableCell
                sx={{
                  fontWeight: "500",
                  fontSize: "13px",
                  borderBottom: "1px solid #F7FAFF",
                  color: "#260944",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {index}
              </TableCell>
              <TableCell
                style={{ width: 250, borderBottom: "1px solid #F7FAFF" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={data.image}
                    alt={data.name}
                    width={40}
                    height={40}
                    className="borRadius100 "
                    style={{
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    }}
                  />

                  <Box className="ml-10px">
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                      as="h5"
                    >
                      {data.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#A9A9C8",
                      }}
                    >
                      @{data.name.toLowerCase().split(" ").join("")}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                }}
              >
                {data.email}
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                }}
              >
               {typeof data?.phone === "object"
              ? `${data?.phone.code} ${data?.phone.number}`
              : data?.phone}
              </TableCell>

              <TableCell
                align="center"
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                }}
              >
                <i
                  className={
                    data.role === "admin"
                      ? "ri-macbook-line"
                      : data.role === "owner"
                      ? "ri-shield-user-fill"
                      : data.role === "manager"
                      ? "ri-edit-line"
                      : "ri-user-3-line"
                  }
                />{" "}
                {data.role}
              </TableCell>

              <TableCell
                align="center"
                style={{
                  fontWeight: 500,
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "12px",
                }}
              >
                <span
                  className={data.verified ? "successBadge" : "dangerBadge"}
                >
                  {data.verified ? "Verified" : "Not Verified"}
                </span>
              </TableCell>
            </>
          )}
        />
      </Grid> */}
    </>
  );
};

export default Features;
