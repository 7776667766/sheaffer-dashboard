import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

              padding: "20px",
            },
          }}
        >
          <h2 style={{ textAlign: "center", paddingTop: "10px" }}>
            Owner Business Details
          </h2>
          <div
            style={{
              padding: "10px",
              textAlign: "left",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

<TableContainer component={Paper} style={{ width: '100%' }}>
  <Table style={{ borderCollapse: 'collapse' }}>
    <TableBody>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>Name:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>Email:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.email}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>Address:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.address}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>Slug:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.slug}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>Phone:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.phone}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>Description:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.description}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>BannerText:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          {selectedBusiness?.bannerText}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
          <strong>BannerImage:</strong>
        </TableCell>
        <TableCell style={{ border: '1px solid #ddd', padding: '10px' }}>
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
        </TableCell>
      </TableRow>
      
    </TableBody>
  </Table>
</TableContainer>
        
          </div>
          {selectedBusiness.requestStatus === "rejected" ||
          selectedBusiness.requestStatus === "approved" ? null : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  marginY: 2,
                }}
              >
                <Button variant="contained  " onClick={handleApproved}>
                  Approved
                </Button>
                <Button variant="contained" onClick={handleReject}>
                  Rejected
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
