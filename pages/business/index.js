import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { getMyBussinessFunApi, getallBussinessesFunApi } from "store/business/services";
import Image from "next/image";
import { useRouter } from "next/router";
import BusinessForm from "./businessform";

const BusinessPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isRenameFormOpen, setIsRenameFormOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);


    const { business, dataFatched, isLoading } = useSelector((state) => state.business);
    console.log("is it alll business", business);

    useEffect(() => {
        if (!dataFatched) {
            dispatch(getallBussinessesFunApi({
            }));
        }
    }, [dispatch, dataFatched]);

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
                                logo
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Phone Number
                            </TableCell>
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Banner Image
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Banner Text
                            </TableCell> */}
                            <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Action
                            </TableCell>

                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Slug
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                websiteService
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                bookingService
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Verified
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                }}
                            >
                                Payment
                            </TableCell> */}
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
                            <Image
                                src={data.logo}
                                width={100}
                                height={50}
                                alt="image"
                                style={{
                                    objectFit: "contain",
                                }}
                            />

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

                            {/* <Image
                                src={data.bannerImg}
                                width={100}
                                height={50}
                                alt="bannerImg"
                                style={{
                                    objectFit: "contain",
                                }}
                            /> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13px",
                                    pt: "16px",
                                    pb: "16px",
                                }}
                                align="center"
                            >
                                {data.bannerText}
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13px",
                                    pt: "16px",
                                    pb: "16px",
                                }}
                                align="center"
                            >
                                {data.slug}
                            </TableCell> */}

                            {/* <TableCell
                                sx={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13px",
                                    pt: "16px",
                                    pb: "16px",
                                }}
                                align="center"
                            >
                                {data.websiteService ? 'True' : 'N/A'}
                            </TableCell> */}

                            {/* <TableCell
                                align="center"
                                sx={{
                                    fontWeight: 500,
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "12px",
                                    padding: "8px 10px",
                                    textTransform: "capitalize",
                                }}
                            >
                                {data.bookingService ? 'True' : 'N/A'}
                            </TableCell> */}
                            {/* 
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
                                {data.status ? 'pending' : 'N/A'}
                            </TableCell> */}
                            {/* <TableCell
                                align="center"
                                sx={{
                                    fontWeight: 500,
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "12px",
                                    padding: "8px 10px",
                                    textTransform: "capitalize",
                                }}
                            >
                                {data?.payment}
                            </TableCell> */}
                        </>
                    )}
                />
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
