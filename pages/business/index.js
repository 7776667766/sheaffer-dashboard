import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import {
  addCustomBusinessApprovedFunApi,
  addCustomBusinessFunApi,
  getMyBussinessFunApi,
  getallBussinessesFunApi,
} from "store/business/services";
import Image from "next/image";
import closeIcon from "@/public/images/icon/carbon_close.png";
import { useRouter } from "next/router";
import BusinessForm from "./businessform";

const BusinessPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isRenameFormOpen, setIsRenameFormOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState([]);
  console.log("selectedBusiness", selectedBusiness);
  // console.log("BUSINESS ID", selectedBusiness?.id);
  const [open, setOpen] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const { businessAll } = useSelector((state) => state.business);
  console.log("businessAll", businessAll);

  const isSmallScreen = useMediaQuery("(max-width:800px)");

  /// ALL BUSINESS API

  const businessImages = selectedBusiness?.images || [];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    if (businessAll.dataFatched !== true) {
      dispatch(
        getallBussinessesFunApi({
          onSuccess: (response) => {
            console.log("API Response:", response);
          },
        })
      );
    }
  }, [dispatch, businessAll.dataFatched, businessAll.data]);

  const handleClick = (id) => {
    const selectedBusiness = businessAll?.data?.find((item) => item.id === id);
    setSelectedBusiness(selectedBusiness);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsRejecting(false);
  };

  const handleReject = () => {
    setOpen(true);
    setIsRejecting(true);
  };

  ///CUSTOM REJECTED API

  const handleRejectConfirm = () => {
    dispatch(
      addCustomBusinessFunApi({
        data: {
          businessId: selectedBusiness.id,
          rejectreason: rejectReason,
        },
      })
    );
    setIsRejecting(false);
    handleClose();
  };

  const handleApproved = () => {
    dispatch(
      addCustomBusinessApprovedFunApi({
        data: {
          businessId: selectedBusiness.id,
        },
      })
    );
    handleClose();
  };

  const OpenPopUp = (id) => {
    console.log("id", id);
    const selectedBusiness = businessAll?.data?.find((item) => item.id === id);
    setSelectedBusiness(selectedBusiness);
    setIsRenameFormOpen(true);
  };
  const handleClosePopup = () => {
    setIsRenameFormOpen(false);
  };

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
            Business List
          </Typography>
        </Box>

        <CustomPaginationTable
          isLoading={businessAll.isLoading}
          tableData={businessAll.data}
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
                Business Name
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Address
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Email
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
                Status
              </TableCell>
              <TableCell
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
                {data?.name}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data?.address}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data?.email}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data?.phone}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <span
                  className={
                    data?.requestStatus === "approved"
                      ? "successBadge"
                      : data?.requestStatus === "rejected"
                      ? "dangerBadge"
                      : "infoBadge"
                  }
                >
                  {data?.requestStatus}
                </span>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <Tooltip title="Rename" placement="top">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    color="primary"
                    className="primary"
                    onClick={(event) => handleClick(data?.id, event)}
                  >
                    <DriveFileRenameOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </>
          )}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          PaperProps={{
            sx: {
              width: "800px",
              borderRadius: "30px",
              padding: "20px",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleClose}>
              {" "}
              <Image src={closeIcon} width={30} height={30} alt="dndn" />
            </Button>
          </Box>

          <h2 style={{ textAlign: "start" }}>Owner Business Details</h2>

          <Box sx={{ marginLeft: "10px" }}>
            {" "}
            {businessImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={150}
                height={100}
                alt={`Image ${index + 1}`}
                //  onClick={() => handleImageClick(image)}
                //  style={{ margin: '8px', maxWidth: '100%', height: 'auto' }}
              />
            ))}
          </Box>
          <Box
            style={{
              padding: "10px",
              textAlign: "left",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table style={{ borderCollapse: "collapse" }}>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>Business Name</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.name}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>Email:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.email}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>Address:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.address}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>Slug:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.slug}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>Phone:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.phone}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>Description:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.description}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRight: "none",
                      }}
                    >
                      <strong>BannerText:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderLeft: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.bannerText}
                    </StyledTableCell>
                  </StyledTableRow>
                  {/* <StyledTableRow>
        <StyledTableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>BannerImage:</strong>
        </StyledTableCell>
        <StyledTableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.bannerImg ? (
            <Image
              src={selectedBusiness.bannerImg}
              alt="Banner Image"
              width={10}
              height={10}
            />
          ) : (
            "No Image"
          )}
        </StyledTableCell>
      </StyledTableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {selectedBusiness.requestStatus === "rejected" ||
          selectedBusiness.requestStatus === "approved" ? null : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "end",
                  marginY: 2,
                }}
              >
                <Button
                  variant="contained "
                  onClick={handleReject}
                  sx={{
                    backgroundColor: "white", // Set the background color
                    color: "#F00",
                    width: "173px",
                    padding: "10px 26px", // Set the text color
                    border: "2px solid #F00", // Add a red border
                  }}
                >
                  Rejected
                </Button>
                <Button
                  variant="contained"
                  onClick={handleApproved}
                  sx={{ width: "173px", padding: "10px 26px" }}
                >
                  Approved
                </Button>
              </Box>
              <Box>
                {isRejecting && (
                  <Box>
                    <TextField
                      fullWidth
                      label="Reason to Reject"
                      variant="outlined"
                      multiline
                      rows={3}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />

                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRejectConfirm}
                        sx={{ marginTop: "30px" }}
                      >
                        Confirm Reject
                      </Button>
                    </div>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Dialog>

        {/* {selectedBusiness && (
          <BusinessForm
            open={isRenameFormOpen}
            onClose={handleClosePopup}
            businessData={selectedBusiness}
          />
        )} */}
      </Card>
    </>
  );
};

export default BusinessPage;
