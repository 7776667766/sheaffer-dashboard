import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFunApi } from "store/admin/services";
import Image from "next/image";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";

export default function UserList() {
  const { allUsers } = useSelector((state) => state.admin);
  console.log("allUsers=>", allUsers);

  const dispatch = useDispatch();
  

  useEffect(() => {
    if (!allUsers.dataFatched) {
      dispatch(getAllUsersFunApi());
    }
  }, [allUsers.dataFatched, dispatch]);

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            My Users
          </Typography>
        </Box>

        <CustomPaginationTable
          isLoading={allUsers.isLoading}
          tableData={allUsers.data}
          tableHeaderData={
            <>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Sr
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Name
              </TableCell>

              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Phone
              </TableCell>

              <TableCell
                align="center"
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Role
              </TableCell>

              <TableCell
                align="center"
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Verified
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
                style={{ width: 250, borderBottom: "1px solid #F7FAFF" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={40}
                    height={40}
                    className="borRadius100 "
                    style={{
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    }}
                  />

                  <Box className="ml-10px">
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                      as="h5"
                    >
                      {data.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#A9A9C8",
                      }}
                    >
                      @{data.name.toLowerCase().split(" ").join("")}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                }}
              >
                {data.email}
              </TableCell>
              <TableCell
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                }}
              >
               {typeof data?.phone === "object"
              ? `${data?.phone.code} ${data?.phone.number}`
              : data?.phone}
              </TableCell>

              <TableCell
                align="center"
                style={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                }}
              >
                <i
                  className={
                    data.role === "admin"
                      ? "ri-macbook-line"
                      : data.role === "owner"
                      ? "ri-shield-user-fill"
                      : data.role === "manager"
                      ? "ri-edit-line"
                      : "ri-user-3-line"
                  }
                />{" "}
                {data.role}
              </TableCell>

              <TableCell
                align="center"
                style={{
                  fontWeight: 500,
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "12px",
                }}
              >
                <span
                  className={data.verified ? "successBadge" : "dangerBadge"}
                >
                  {data.verified ? "Verified" : "Not Verified"}
                </span>
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
}
