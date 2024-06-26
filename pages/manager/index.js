import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteManagerFunApi, getManagerFunApi } from "store/manager/services";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import Link from "next/link";
import TransitionsDialog from "@/components/UIElements/Modal/TransitionsDialog";
import Image from "next/image";
import { getMyBussinessFunApi } from "store/business/services";

const Manager = () => {
  const dispatch = useDispatch();
  const { managers } = useSelector((state) => state.manager);
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log("business?.data.id", business?.data?.id);

  const router = useRouter();

  const nextPage = (id, event) => {
    event.preventDefault();

    router.push(`/manager/edit?id=${id}`);
    console.log();
  };

  // const nextPage = (id) => {
  //   console.log("id", id);
  //   router.push(`/specialist/editform?id=${id}`);
  // };
  //   dispatch(
  //     getMyBussinessFunApi({
  //         data: {
  //             businessId: selectedValue,
  //         },
  //         onSuccess: () => {},
  //     })
  // );
  // useEffect(() => {
  //   if (!dataFatched) {
  //     dispatch(getMyBussinessFunApi({}));
  //   }
  // }, [dispatch, dataFatched]);

  useEffect(() => {
    const selectedBusinessId = localStorage.getItem("selectedBusinessId");

    if (selectedBusinessId) {
      dispatch(
        getMyBussinessFunApi({ data: { businessId: selectedBusinessId } })
      );
    } else {
      if (!dataFatched) {
        dispatch(getMyBussinessFunApi({}));
      }
    }
  }, [dispatch, dataFatched]);

  useEffect(() => {
    if (managers.managerFetch !== true) {
      dispatch(
        getManagerFunApi({
          data: business.data?.id,
        })
      );
    }
  }, [business.data?.id, dispatch, managers.managerFetch]);

  const handleDelete = (managerId) => {
    console.log(managerId, "note");
    dispatch(deleteManagerFunApi(managerId));
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
            My Managers
          </Typography>
          <Link href="/manager/add-manager">
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
              />{" "}
              Add Manager
            </Button>
          </Link>
        </Box>

        <CustomPaginationTable
          isLoading={managers.isLoading}
          tableData={managers}
          tableHeaderData={
            <>
              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Sr.
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
                Email
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
                {`${data.phone.code} ${data.phone.number}`}
              </TableCell>

              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Tooltip title="Remove" placement="top">
                    <TransitionsDialog
                      modelButton={
                        <IconButton
                          aria-label="remove"
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

                  <Tooltip title="Rename" placement="top">
                    <IconButton
                      aria-label="rename"
                      size="small"
                      color="primary"
                      className="primary"
                      onClick={(event) => nextPage(data.id, event)}
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

export default Manager;
