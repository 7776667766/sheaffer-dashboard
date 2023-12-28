import React from "react";
import { Box, Typography } from "@mui/material";
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
  const dispatch = useDispatch();

  const { booking } = useSelector((state) => state.booking);

  console.log("booking", booking);
  const { role } = useSelector((state) => state.auth);
  console.log("role", role);

  const { business } = useSelector((state) => state.business);
  console.log("business", business);

  useEffect(() => {
    if (booking.dataFatched !== true) {
      dispatch(
        getMyBusinessBookingFunApi({
          data: {
            businessId: business?.id,
          },
        })
      );
    }
  }, [dispatch, booking.data, booking.dataFatched, business?.id]);

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
          isLoading={booking.isLoading}
          tableData={booking.data}
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
                }}
              >
                Phone
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Date
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Time Slot
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Price
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Status
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Action
              </TableCell>
            </>
          }
          tableBodyData={(data, index) => (
            <>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {index}
              </TableCell>

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
                {data.name}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.phone}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {moment(data.date).format("MMMM D, YYYY")}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.timeSlot}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
                align="center"
              >
                {data.price}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 500,
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "12px",
                  padding: "8px 10px",
                  textTransform: "capitalize",
                }}
              >
                <span
                  className={` 
                    ${
                      data.status?.toLowerCase() === "completed"
                        ? "successBadge"
                        : data.status?.toLowerCase() === "pending"
                        ? "primaryBadge"
                        : data.status?.toLowerCase() === "cancelled"
                        ? "dangerBadge"
                        : ""
                    }
                      `}
                >
                  {data.status}
                </span>
              </TableCell>

              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                  }}
                >
                  <Tooltip title="Rename" placement="top">
                    <IconButton
                      aria-label="rename"
                      size="small"
                      color="primary"
                      className="primary"
                    >
                      <DriveFileRenameOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default bookingPage;
