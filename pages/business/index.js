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
import InfoIcon from "@mui/icons-material/Info";
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

import AlertIcon from "@/public/images/icon/alert.svg";
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
  const [open2, setOpen2] = useState(false);
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
      backgroundColor: "#EAEEFD",
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
  const handleElimenate = () => {
    setOpen2(false);
  };

  const handleReject = () => {
    setOpen(false);

    setOpen2(true);
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
                    data?.requestStatus === "Approved"
                      ? "successBadge"
                      : data?.requestStatus === "Rejected"
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
                    {data?.requestStatus === "Approved" ? (
                      <InfoIcon />
                    ) : data?.requestStatus === "Rejected" ? (
                      <InfoIcon />
                    ) : (
                      <DriveFileRenameOutlineIcon fontSize="inherit" />
                    )}
                  </IconButton>
                </Tooltip>
              </TableCell>
            </>
          )}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          PaperProps={{
            sx: {
              width: "800px",
              borderRadius: "25px",
              padding: "15px",
            },
          }}
        >
          {selectedBusiness.requestStatus === "Rejected" ||
          selectedBusiness.requestStatus === "Approved" ? (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={handleClose}>
                <Image src={closeIcon} width={30} height={30} alt="dndn" />
              </Button>
            </Box>
          ) : (
            ""
          )}

          <Typography
            variant="h6"
            sx={{ textAlign: "start", marginLeft: "10px" }}
          >
            Owner Business Details
          </Typography>

          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              justifyContent: "end",
              paddingRight: "10px",
            }}
          >
            {selectedBusiness?.bannerImg && (
              <Image
                // key={index}
                src={selectedBusiness?.bannerImg}
                width={80}
                height={80}
                alt={`Image`}
                //  onClick={() => handleImageClick(image)}
                style={{ borderRadius: "50%" }}
              />
            )}
            {/* {businessImages.map((image, index) => ( */}

            {/* // ))} */}
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
            <TableContainer
              component={Paper}
              style={{ width: "100%", boxShadow: "none" }}
            >
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>Business Name</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.name}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>Email:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.email}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>Address:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.address}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>Slug:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.slug}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>Phone:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.phone}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>Description:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                        textAlign: "end",
                      }}
                    >
                      {selectedBusiness?.description}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
                      }}
                    >
                      <strong>BannerText:</strong>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        // border: "1px solid #ddd",
                        padding: "10px",
                        border: "none",
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
          {selectedBusiness.requestStatus === "Rejected" ||
          selectedBusiness.requestStatus === "Approved" ? null : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  marginY: 2,
                }}
              >
                <Button
                  variant="contained "
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "white", // Set the background color
                    color: "#707070",
                    width: "173px",
                    padding: "8px 20px",
                    borderRadius: "8px", // Set the text color
                    border: "2px solid #707070", // Add a red border
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained "
                  onClick={handleReject}
                  sx={{
                    backgroundColor: "white", // Set the background color
                    color: "#F00",
                    width: "173px",
                    borderRadius: "8px",
                    padding: "8px 20px", // Set the text color
                    border: "2px solid #F00", // Add a red border
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  onClick={handleApproved}
                  sx={{
                    width: "173px",
                    padding: "8px 20px",
                    borderRadius: "8px",
                  }}
                >
                  Approve
                </Button>
              </Box>
            </Box>
          )}
        </Dialog>
        <Box>
          {isRejecting && (
            <Dialog
              open={open2}
              onClose={handleClose}
              maxWidth="sm"
              PaperProps={{
                sx: {
                  width: "800px",
                  borderRadius: "10x",
                  padding: "20px",
                },
              }}
            >
              <TextField
                fullWidth
                label="Reason to Reject"
                variant="outlined"
                multiline
                rows={3}
                onChange={(e) => setRejectReason(e.target.value)}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained "
                  onClick={handleElimenate}
                  sx={{
                    backgroundColor: "white", // Set the background color
                    color: "#707070",
                    width: "173px",
                    padding: "8px 20px",
                    borderRadius: "8px", // Set the text color
                    border: "2px solid #707070", // Add a red border
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRejectConfirm}
                  sx={{
                    width: "173px",
                    padding: "8px 20px",
                    borderRadius: "8px",
                  }}
                >
                  Confirm Reject
                </Button>
              </Box>
            </Dialog>
          )}
        </Box>
        {/* <Box>
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

                    <Box sx={{textAlign:"center"}}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRejectConfirm}
                        sx={{ marginTop: "30px",marginBottom:"10px" }}
                      >
                        Confirm Reject
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box> */}
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
