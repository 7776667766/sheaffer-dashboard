import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyBusinessBookingFunApi } from "store/booking/service";
import moment from "moment";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";

const bookingPage = () => {
  // const dispatch = useDispatch();

  // const { booking } = useSelector((state) => state.booking);

  // console.log("booking", booking);
  // const { role } = useSelector((state) => state.auth);
  // console.log("role", role);

  // const { business } = useSelector((state) => state.business);
  // console.log("business", business);

  // useEffect(() => {
  //   if (booking.dataFatched !== true) {
  //     dispatch(
  //       getMyBusinessBookingFunApi({
  //         data: {
  //           businessId: business?.id,
  //         },
  //       })
  //     );
  //   }
  // }, [dispatch, booking.data, booking.dataFatched, business?.id]);

  const Data = [
    {
      id: 1,
      name: "Ali",
      slug: "Demo",
    },
    {
      id: 2,
      name: "Bilal",
      slug: "Demo",
    },
  ];

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            My Booking List
          </Typography>
        </Box>

        <CustomPaginationTable
          tableData={Data}
          isLoading={false}
          tableHeaderData={
            <>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Sr.No
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Name
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  textAlign: "end",
                }}
              >
                View More
              </TableCell>
            </>
          }
          tableBodyData={(item, index) => (
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
                {index + 0}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {item.name}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                  textAlign: "end",
                }}
              >
                <Button variant="outlined" href="#" sx={{
                  pt:"2px",
                  pb:"2px",
                }}>
                  {item.slug}
                </Button>
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default bookingPage;