import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import Link from "next/link";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";

function createData(
  name,
  url,
  startDate,
  endDate,
  status,
  badgeClass,
  completion,
  priority
) {
  return {
    name,
    url,
    startDate,
    endDate,
    status,
    badgeClass,
    completion,
    priority,
  };
}

const rows = [
  createData(
    "Public Beta Release",
    "/images/user1.png",
    "1 Jan 2022",
    "1 Apr 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "Fix Platform Errors",
    "/images/user2.png",
    "1 Mar 2022",
    "1 May 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "Launch our Mobile App",
    "/images/user3.png",
    "15 Apr 2022",
    "15 Jun 2022",
    "On Going",
    "primaryBadge",
    "7/10",
    "Medium"
  ),
  createData(
    "Add the New Pricing Page",
    "/images/user4.png",
    "15 May 2022",
    "15 Jun 2022",
    "Pending",
    "dangerBadge",
    "1/10",
    "Low"
  ),
  createData(
    "Redesign New Online Shop",
    "/images/user5.png",
    "15 Jun 2022",
    "15 Aug 2022",
    "On Going",
    "primaryBadge",
    "0/10",
    "Low"
  ),
  createData(
    "Material Ui Design",
    "/images/user6.png",
    "15 Jul 2022",
    "15 Sep 2022",
    "On Going",
    "primaryBadge",
    "7/10",
    "Medium"
  ),
  createData(
    "Add Progress Track",
    "/images/user7.png",
    "15 Mar 2022",
    "15 May 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "Web Design",
    "/images/user8.png",
    "15 Aug 2022",
    "15 Dec 2022",
    "On Going",
    "primaryBadge",
    "9/10",
    "High"
  ),
  createData(
    "Web Development",
    "/images/user9.png",
    "15 Nov 2022",
    "15 Jan 2023",
    "On Going",
    "primaryBadge",
    "8/10",
    "High"
  ),
  createData(
    "React App Development",
    "/images/user10.png",
    "15 Jan 2022",
    "15 Mar 2022",
    "Completed",
    "successBadge",
    "10/10",
    "High"
  ),
  createData(
    "eCommerce Development",
    "/images/user11.png",
    "15 Mar 2022",
    "15 May 2022",
    "On Going",
    "primaryBadge",
    "8/10",
    "Medium"
  ),
  createData(
    "App Development",
    "/images/user12.png",
    "15 May 2022",
    "15 Jul 2022",
    "On Going",
    "primaryBadge",
    "5/10",
    "Medium"
  ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const Services = () => {
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
            My Services
          </Typography>

          <Link href="/services/add-service">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
                color: "#fff !important",
              }}
            >
              <AddIcon
                sx={{ position: "relative", top: "-1px" }}
                className="mr-5px"
              />
              Add Service
            </Button>
          </Link>
        </Box>

        <CustomPaginationTable
          tableData={rows}
          isLoading={false}
          tableHeaderData={
            <>
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
                Assigned
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Start Date
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                End Date
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
                align="center"
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Completion
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Priority
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
          tableBodyData={(data) => (
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
                <Checkbox {...label} size="small" />
                {data.name}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <Avatar
                  alt="User"
                  src={data.url}
                  sx={{ width: 35, height: 35 }}
                />
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.startDate}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.endDate}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 500,
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "11px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <span className={data.badgeClass}>{data.status}</span>
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
                {data.completion}
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
                {data.priority}
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
                  <Tooltip title="Remove" placement="top">
                    <IconButton
                      aria-label="remove"
                      size="small"
                      color="danger"
                      className="danger"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>

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

export default Services;
