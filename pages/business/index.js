import React, { useState } from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { getMyBussinessFunApi, getallBussinessesFunApi, } from "store/business/services";
import Image from "next/image";
import { useRouter } from "next/router";
import BusinessForm from "./businessform";

const BusinessPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isRenameFormOpen, setIsRenameFormOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [open, setOpen] = useState(false);
    const { role } = useSelector((state) => state.auth);
    const [isRejecting, setIsRejecting] = useState(false);
    const { business, dataFatched, isLoading } = useSelector((state) => state.business);

    useEffect(() => {
        if (!dataFatched) {
            dispatch(getallBussinessesFunApi({
            }));
        }
    }, [dispatch, dataFatched]);


    const handleClick = (id) => {
        const selectedBusiness = business.find((item) => item.id === id);
        setSelectedBusiness(selectedBusiness);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReject = () => {
        setOpen(true);
        setIsRejecting(true);
    };

    const handleRejectConfirm = () => {
       
        setIsRejecting(false);
        handleClose();
    };


    const OpenPopUp = (id) => {
        const selectedBusiness = business.find((item) => item.id === id);
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
                    isLoading={isLoading}
                    tableData={business}
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
                                address
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                description
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                email
                            </TableCell>


                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Phone Number
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Custom Request

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
                                {data.name}
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    pt: "16px",
                                    pb: "16px",
                                }}
                            >
                                {data.address}
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13px",
                                    pt: "16px",
                                    pb: "16px",
                                }}
                            >
                                {data.email}
                            </TableCell>


                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13px",
                                    pt: "16px",
                                    pb: "16px",
                                }}
                            >
                                {data.phone}
                            </TableCell>
                            <Button
                                component="div"
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13px",
                                    pt: "16px",
                                    pb: "16px",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}

                                onClick={(event) => handleClick(data.id, event)}

                            >
                                {data.requestStatus}
                            </Button>

                            <Tooltip title="Rename" placement="top">
                                <IconButton
                                    aria-label="edit"
                                    size="small"
                                    color="primary"
                                    className="primary"
                                    onClick={(event) => OpenPopUp(data.id, event)}
                                >
                                    <DriveFileRenameOutlineIcon fontSize="inherit" />

                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                />
                <Dialog open={open} onClose={handleClose}>
                    <div style={{ padding: '20px', maxWidth: '400px', textAlign: 'left' }}>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><strong>Name:</strong> {selectedBusiness?.name}</li>
                            <li><strong>Email:</strong> {selectedBusiness?.email}</li>
                            <li><strong>Slug:</strong> {selectedBusiness?.slug}</li>
                            <li><strong>Phone:</strong> {selectedBusiness?.phone}</li>
                            <li><strong>Description:</strong> {selectedBusiness?.description}</li>
                            <li><strong>BannerText:</strong> {selectedBusiness?.bannerText}</li>
                        </ul>
                    </div>

                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <Button variant="contained">
                            Approved
                        </Button>
                        <Button variant="contained"
                            onClick={handleReject}
                        >
                            Rejected
                        </Button>
                        {isRejecting && (
                            <div style={{ marginTop: '20px' }}>
                                <TextField
                                    label="Reason to Reject"
                                    variant="outlined"
                                    onChange={(e) => setRejectReason(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleRejectConfirm}
                                    style={{ marginTop: '10px' }}
                                >
                                    Confirm Reject
                                </Button>
                            </div>
                        )}
                    </div>
                </Dialog>

                {selectedBusiness && (
                    <BusinessForm
                        open={isRenameFormOpen}
                        onClose={handleClosePopup}
                        businessData={selectedBusiness}
                    />
                )}

            </Card>
        </>
    );
};

export default BusinessPage;
