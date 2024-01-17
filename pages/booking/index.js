import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
} from "store/booking/service";
import moment from "moment";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { getMyBussinessFunApi , getBookedTimeSlotFunApi } from "store/business/services";
import { getallServicesFunApi } from "store/service/services";

import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";
import Image from "next/image";
import { Button } from "@mui/base";

const BookingPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  const dispatch = useDispatch();
  const { booking } = useSelector((state) => state.booking);
  console.log("booking",booking)

  const { service } = useSelector((state) => state.service);
  console.log("service", service)

  const { business, dataFatched } = useSelector((state) => state.business);


  // useEffect(() => {
  //   dispatch(getallServicesFunApi());
  // }, [dispatch]);

  // getMyBussinessFunApi({
  //   onSuccess: (businessId) => {
  //     dispatch(
  //       getMyBusinessBookingFunApi({
  //         data: {
  //           businessId: businessId,
  //         },
  //       })
  //     );
  //   },
  // })

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

  const handleRescheduleClick = () => {
    setIsRescheduleDialogOpen(true);
  };

  const handleRescheduleConfirm = () => {
    setIsRescheduleDialogOpen(false);
  };

  const handleCancelBooking = (id) => {
    console.log("id", id);
    dispatch(cancelBookingFunApi(id));
    console.log("Cancel Booking");
    setDialogOpen(false);
  };

  const handleCompleteBooking = (id) => {
    dispatch(completeBookingFunApi(id));
    console.log("Complete Booking");
    setDialogOpen(false);
  };

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
                      <IconButton
                        aria-label="edit"
                        size="small"
                        color="primary"
                        className="primary"
                        onClick={handleTooltipClick}
                      >
                        <DriveFileRenameOutlineIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>

                    {/* <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                      <DialogTitle>Edit Booking Details</DialogTitle>
                      <DialogContent>
                        <Typography sx={{ fontSize: 18 }}>
                          Edit the data as needed.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => handleCancelBooking(data.id)}
                          color="secondary"
                        >
                          Cancel Booking
                        </Button>
                        <Button
                          onClick={() => handleCompleteBooking(data.id)}
                          color="primary"
                        >
                          Complete Booking
                        </Button>
                        <Button
                       
                          color="primary"
                        >
                          Resheduled Booking
                        </Button>
                      </DialogActions>
                    </Dialog> */}

                    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                      <DialogTitle>Edit Booking Details</DialogTitle>
                      <DialogContent>
                        <Typography sx={{ fontSize: 18 }}>
                          Edit the data as needed.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleCancelBooking(data.id)} color="secondary">
                          Cancel Booking
                        </Button>
                        <Button onClick={() => handleCompleteBooking(data.id)} color="primary">
                          Complete Booking
                        </Button>
                        <Button onClick={handleRescheduleClick} color="primary">
                          Reschedule Booking
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* Reschedule Dialog */}
                    <Dialog open={isRescheduleDialogOpen} onClose={handleDialogClose}>
                      <DialogTitle>Reschedule Booking</DialogTitle>
                      <DialogContent>
                        <TextField
                          label="Date"
                          type="date"
                          value={rescheduleDate}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Time"
                          type="time"
                          value={rescheduleTime}
                          onChange={(e) => setRescheduleTime(e.target.value)}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleRescheduleConfirm} color="primary">
                          Confirm Reschedule
                        </Button>
                        <Button onClick={handleDialogClose} color="secondary">
                          Cancel
                        </Button>
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
