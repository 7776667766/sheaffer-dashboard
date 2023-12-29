import React, { useEffect, useState } from "react";
import { Box, DialogContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceFunApi } from "store/service/services";
import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";

const WebsitePage = () => {
  // const dispatch = useDispatch();
  // const { service } = useSelector((state) => state.service);
  // const { business } = useSelector((state) => state.business);
  // const { role } = useSelector((state) => state.auth);
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   if (service.dataFatched !== true) {
  //     dispatch(
  //       getAllServiceFunApi({
  //         businessId: business?.id,
  //       })
  //     );
  //   }
  // }, [dispatch, service.data, service.dataFatched, business?.id]);

  const Data = [
    {
      id: 1,
      name: "Web Theme 1",
      slug: "site/web-theme-1",
    },
    {
      id: 2,
      name: "Web Theme 2",
      slug: "site/web-theme-2",
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
            My Website
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
                }}
              >
                Slug
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
                {data.name}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.slug}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                  textAlign: "end",
                }}
              >
                <Button
                  variant="outlined"
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_WEB_URL}${data.slug}`}
                  target="_blank"
                  sx={{
                    pt: "2px",
                    pb: "1px",
                  }}
                >
                  Demo
                </Button>
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default WebsitePage;
