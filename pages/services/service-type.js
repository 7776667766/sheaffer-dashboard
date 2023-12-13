import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getServicesTypeFunApi } from "store/service/services";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";

const Services = () => {

  const { serviceType } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    if (serviceType.dataFatched !== true) {
      dispatch(getServicesTypeFunApi());
    }
  }, [dispatch, serviceType.serviceFetch]);

<<<<<<< HEAD
=======
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  // End Add Task Modal
>>>>>>> c7b32520302c59f8ae7eb226912eee48c095eb32

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
            Services Types
          </Typography>

          <Link href="/services/add-service-type">
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
              Add Services Type
            </Button>
          </Link>
        </Box>

        <CustomPaginationTable
          isLoading={serviceType.isLoading}
          tableData={serviceType.data}
          tableHeaderData={<><TableCell
            sx={{
              fontWeight: "500",
              fontSize: "13px",
              borderBottom: "1px solid #F7FAFF",
              color: "#260944",
              pt: "16px",
              pb: "16px",
            }}
          >
            Sr
          </TableCell>

          <TableCell
            sx={{
              borderBottom: "1px solid #F7FAFF",
              fontSize: "13px",
              pt: "16px",
              pb: "16px",
            }}
          >
            Name
          </TableCell>

          <TableCell
            align="right"
            sx={{ borderBottom: "1px solid #F7FAFF" }}
          >
            Action
          </TableCell></>}
          tableBodyData={
            (data, index)=> <><TableCell
            sx={{
              fontWeight: "500",
              fontSize: "13px",
              borderBottom: "1px solid #F7FAFF",
              color: "#260944",
              pt: "16px",
              pb: "16px",
            }}
          >
            {index}
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
          </TableCell></>
          }
        />
      </Card>
    </>
  );
};

export default Services;
