import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { getMyreviewsFunApi } from "store/review/service";
import { CustomPaginationTable } from "@/components/Table/CustomPaginationTable";
import Image from "next/image";

const Review = () => {
  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.review);
  console.log(review.data, "review");
  const { business } = useSelector((state) => state.business);

  useEffect(() => {
    if (review.dataFatched !== true) {
      dispatch(
        getMyreviewsFunApi({
          data: business?.id,
        })
      );
    }
  }, [ dispatch, review.dataFatched]);

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
            My Reviews
          </Typography>
        </Box>

        <CustomPaginationTable
          isLoading={review.isLoading}
          tableData={review.data}
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
                Image
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Description
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                }}
              >
                Rating
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
                {data.title}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13px",
                  pt: "16px",
                  pb: "16px",
                }}
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  width={50}
                  height={50}
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
                {data.description}
              </TableCell>

              <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
              >
                {data.rating}
              </TableCell>
            </>
          )}
        />
      </Card>
    </>
  );
};

export default Review;
