import React, { useCallback, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  cancelBookingFunApi,
  completeBookingFunApi,
  deleteBookingFunApi,
  getMyBusinessBookingFunApi,
  rescheduledBookingFunApi,
} from "store/booking/service";
import moment from "moment";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import {
  getMyBussinessFunApi,
} from "store/business/services";
import { getBookedTimeSlotFunApi } from "store/booking/service";

import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";
import Image from "next/image";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DisabledByDefault } from "@mui/icons-material";

const BookingPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);

  const [rescheduleDate, setRescheduleDate] = useState(null);

  const [rescheduleTime, setRescheduleTime] = useState("");

  const [timeSlots, setTimeSlots] = useState([]);
  console.log("TIMESLOTS--->",timeSlots)

  const dispatch = useDispatch();
  const { booking } = useSelector((state) => state.booking);

  booking?.data?.forEach((bookingItem) => {
    const timeSlot = bookingItem.timeSlot;
  });

  const daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const generateTimeSlots = useCallback(async (rescheduleDate, ServiceId) => {

    const dayNumber = new Date(rescheduleDate).getDay();

    const timeSlotData = [
      { active: true, startTime: " 08:05 PM", endTime: "11:48 PM", day: "Monday" },
    ]?.find((slot) => slot.day === daysList[dayNumber]);

    if (timeSlotData?.active.toString() === "true") {
      dispatch(
        getBookedTimeSlotFunApi({
          data: {
            date: rescheduleDate,
            serviceId: ServiceId
          }

        })
      );

      const timeSlots = [];
      const startDate = new Date(`${rescheduleDate} ${timeSlotData?.startTime}`);
      const endDate = new Date(`${rescheduleDate} ${timeSlotData?.endTime}`);
      console.log(startDate,endDate,"----------123")
      let currentTime = startDate;
      while (currentTime < endDate) {
        const formattedStartTime = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        currentTime.setMinutes(currentTime.getMinutes() + timeInterval);
        const formattedEndTime = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const formattedTimeSlot = `${formattedStartTime}-${formattedEndTime}`;
        timeSlots.push({
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          totalTime: formattedTimeSlot,
        });
      }
      setTimeSlots(timeSlots);
    }
  }, []);


  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    const ServiceId = booking?.data[0]?.service.id;

    if (!apiCalled && rescheduleDate && ServiceId) {
      generateTimeSlots(rescheduleDate, ServiceId);
      setApiCalled(true);
    }
  }, [rescheduleDate, booking?.data, apiCalled]);

  const { business, dataFatched } = useSelector((state) => state.business);

  const handleDelete = (id) => {
    dispatch(deleteBookingFunApi(id));
  };

  const handleTooltipClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setIsRescheduleDialogOpen(false);
  };

  const handleCancelBooking = (id) => {   
    dispatch(cancelBookingFunApi(id));
    setDialogOpen(false);
  };

  const handleCompleteBooking = (id) => {
    dispatch(completeBookingFunApi(id));
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(
      rescheduledBookingFunApi({
        data:{
          // date:date,
          // timeSlot:timeSlot
        }
      })
    );
  }, [dispatch, booking.data, booking.dataFatched, business?.id, dataFatched]);

  useEffect(() => {
    if (!dataFatched) {
      dispatch(
        getMyBussinessFunApi({
          onSuccess: (businessId) => {
            dispatch(
              getMyBusinessBookingFunApi({
                data: {
                  businessId: businessId,
                },
              })
            );
          },
        })
      );
    } else {
      if (!booking.dataFatched) {
        dispatch(
          getMyBusinessBookingFunApi({
            data: {
              businessId: business.id,
            },
          })
        );
      }
    }
  }, [dispatch, booking.data, booking.dataFatched, business?.id, dataFatched]);
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
                Business
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
                Service
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
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.business?.name}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
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
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.service?.name || "N/A"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {moment(data.date).format("DD MMM  YYYY")}
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
                    ${data.status?.toLowerCase() === "completed"
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
                {data.status === "pending" ? (
                  <Box
                    sx={{
                      display: "inline-block",
                    }}
                  >
                    <Tooltip title="Delete" placement="top">
                      <TransitionsDialog
                        modelButton={
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="danger"
                            className="danger"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        }
                        submitButtonText="Delete"
                        handleSubmit={() => handleDelete(data.id)}
                      >
                        <div style={{ textAlign: "center" }}>
                          <Image
                            src="/images/icon/alert.png"
                            width={150}
                            height={150}
                            alt="ok"
                          />

                          <Typography sx={{ fontSize: 18 }}>
                            <b>Are You Sure You Want To Delete ?</b>
                            <br />
                            <span style={{ fontSize: 14 }}>
                              You are deleting this data & this action is
                              irreversible
                            </span>
                          </Typography>
                        </div>
                      </TransitionsDialog>
                    </Tooltip>

                    <Tooltip title="Edit" placement="top">
                      <Button
                        style={{
                          backgroundColor: "#E2A248",
                        }}
                        onClick={handleTooltipClick}
                      >
                        Edit
                      </Button>
                    </Tooltip>

                    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                      <DialogTitle>Edit Booking Details</DialogTitle>
                      <DialogContent
                        style={{
                          width: "570px",
                          maxWidth: "100%",
                          borderRadius: "25px",
                        }}
                      >
                        <Typography>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <div>
                                Booking ID : <b>{data.token}</b>
                              </div>
                              <div>
                                <Button style={{ backgroundColor: "#EAEEFD" }}>
                                  {data.status}
                                </Button>
                              </div>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "#EAEEFD",
                                padding: "10px",
                              }}
                            >
                              <div>Business Name</div>
                              <div>{data.business?.name}</div>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <div>Service Name </div>
                              <div>{data.service?.name || "N/A"}</div>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "#EAEEFD",
                                padding: "10px",
                              }}
                            >
                              <div>Date</div>
                              <div>
                                {moment(data.date).format("DD MMM  YYYY")}
                              </div>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <div>Time Slot</div>
                              <div>{data.timeSlot}</div>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "#EAEEFD",
                                padding: "10px",
                              }}
                            >
                              <div> Price </div>
                              <div>${data.price}</div>
                            </Box>

                            <h2>Customer Details</h2>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "#EAEEFD",
                                padding: "10px",
                              }}
                            >
                              <div> Name </div>
                              <div>DEnly</div>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <div> Contact No.</div>
                              <div>+92000000000001</div>
                            </Box>
                          </Box>
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <TransitionsDialog
                              modelButton={
                                <Button
                                  submitButtonText="Cancel"
                                  fullWidth
                                  variant="outlined"
                                >
                                  Cancel Booking
                                </Button>
                              }
                              submitButtonText="Cancel Booking"
                              closeButtonText="Close"
                              handleSubmit={() => handleCancelBooking(data.id)}
                            >
                              <div style={{ textAlign: "center" }}>
                                <Image
                                  src="/images/icon/alert.png"
                                  width={150}
                                  height={150}
                                  alt="ok"
                                />

                                <Typography sx={{ fontSize: 18 }}>
                                  <b>Are You Sure You Want To Cance ?</b>
                                  <br />
                                  <span style={{ fontSize: 14 }}>
                                    You are deleting this data & this action is
                                    irreversible
                                  </span>
                                </Typography>
                              </div>
                            </TransitionsDialog>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <TransitionsDialog
                              maxWidth={"md"}
                              modelButton={
                                <Button fullWidth variant="contained">
                                  Reschedule Booking
                                </Button>
                              }
                              submitButtonText="reshudele"
                              handleSubmit={() =>
                                handleResheduleBooking(data.id)
                              }
                            >
                              <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={6}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <StaticDatePicker
                                      orientation=""
                                      ToolbarComponent={DisabledByDefault}
                                      onChange={(value) => {
                                        setRescheduleDate(value.$d)
                                      }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                  <TextField
                                    label="Time"
                                    type="time"
                                    value={rescheduleTime}
                                    onChange={(e) =>
                                      setRescheduleTime(e.target.value)
                                    }
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </TransitionsDialog>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <Button
                              onClick={() => handleCompleteBooking(data.id)}
                              fullWidth
                              variant="contained"
                            >
                              Mark as completed
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </Dialog>
                  </Box>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};
export default BookingPage;
