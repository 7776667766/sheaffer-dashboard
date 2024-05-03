import React, { useEffect, useState } from "react";
import { Box, Typography,TableRow ,TableContainer, Table, TableBody, } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Image from "next/image";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteServicTypeFunApi,
  getServicesTypeFunApi,
} from "store/service/services";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "helper/api";


const ServicesType = () => {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#EAEEFD",
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const { serviceType } = useSelector((state) => state.service);
  const [open, setOpen] = useState(false);

  const { role } = useSelector((state) => state.auth);
  const [orders,setallorders]=useState([])
  console.log("orders", orders.cart)

const [selectedBusiness, setSelectedBusiness] = useState([]);
  console.log("selected business", selectedBusiness)


  const handleClick = (id) => {
    console.log("id 65", id)
    const selectedBusiness = orders?.find((item) => item._id === id);
    setSelectedBusiness(selectedBusiness);
    setOpen(true);
  };
  const handleReject = () => {
    setOpen(false);

    // setOpen2(true);
    // setIsRejecting(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  console.log("servicetype data", serviceType);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = (id) => {
    dispatch(deleteServicTypeFunApi(id));
  };

  const nextPage = (id) => {
    router.push(`/services/edits?id=${id}`);
  };

  const userdata = async () => {
    try {
      const response = await axios.get('/order/orders');

      console.log("Response from API:", response.data.data);
      setallorders(response.data.data)
      if (response.status === 200) {
        toast.success("Data fetched !");
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error in data fetch:", error);
      toast.error("An error occurred while submitting the form. Please try again later.");
    }
  }

  useEffect(() => {
    userdata()
  }, []);


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
          Orders
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
          tableData={orders}
          tableHeaderData={
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
         Customer Name
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
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
                Address 
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                City
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Country
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Products
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Total Amount
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                Payment Method
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                Status
              </TableCell>


              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
              >
                
                Actions
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
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.contact}
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
                {data.city}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.country}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <Tooltip title="Shade" placement="top"> <IconButton

                  aria-label="edit"
                  size="small"
                  color="primary"
                  className="primary"

                  onClick={(event) => handleClick(data?.cart, event)}
                >
                  {data?.requestStatus === "Approved" ? (
                    <VisibilityIcon />
                  ) : data?.requestStatus === "Rejected" ? (
                    <VisibilityIcon />
                  ) : (
                    <DriveFileRenameOutlineIcon fontSize="inherit" />
                  )}
                </IconButton></Tooltip>


              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.totalAmount}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.paymentMethod}
              </TableCell>


              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                {data.status}
              </TableCell>


              {/* <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <Image
                  src={data.email}
                  width={100}
                  height={50}
                  alt="image"
                  style={{
                    objectFit: "fill",
                  }}
                />
              </TableCell> */}

              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
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
                      onClick={() => nextPage(data.id)}
                    >
                      <DriveFileRenameOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
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

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleClose}>
            </Button>
          </Box>


          <Typography
            variant="h6"
            sx={{ textAlign: "start", marginLeft: "10px" }}
          >
            Shade Details
          </Typography>

          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              justifyContent: "end",
              paddingRight: "10px",
            }}
          >

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

                  <div>
                    {selectedBusiness?.imageURLs?.map((item, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          style={{
                            padding: "10px",
                            border: "none",
                          }}
                        >
                          <strong>{item.color.name ? item.color.name : 'No color name found'}</strong>
                          <br />
                          <br />
                          <strong>{item.color.clrCode ? item.color.clrCode : 'No color code found'}</strong>
                          <br />
                          <br />
                          {item.shade.map((shadeUrl, shadeIndex) => (
                            <img key={shadeIndex} src={shadeUrl} alt={`Shade ${shadeIndex}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
                          ))}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            padding: "10px",
                            border: "none",
                            textAlign: "end",
                          }}
                        >
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </div>


                </TableBody>
              </Table>
            </TableContainer>
          </Box>

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
                  backgroundColor: "white",
                  color: "#707070",
                  width: "173px",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "2px solid #707070",
                }}
              >
                Close
              </Button>
            </Box>
          </Box>

        </Dialog>


      </Card>
    </>
  );
};

export default ServicesType;
