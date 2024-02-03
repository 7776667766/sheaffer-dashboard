import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBussinessFunApi } from "store/business/services";
import { CustomizeThemeForm } from "@/components/Forms/FormLayouts/CustomizeThemeForm";

const CustomizePage = () => {
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business?.data, "business1234");
  const [dataInitalized, setDataInitalized] = useState(false);
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState({
    bannerText: "",
    bannerImg: "",
    fontSize: 16,
    fontFamily: "",
    theme: "",
    businessId: "",
  });

  // useEffect(() => {
  //   const selectedBusinessId = localStorage.getItem('selectedBusinessId');

  //   if (selectedBusinessId) {
  //     dispatch(getMyBussinessFunApi({ data: { businessId: selectedBusinessId } }));
  //   } else {
  //     if (!dataFatched) {
  //       dispatch(getMyBussinessFunApi({}));
  //     }
  //   }
  // }, [dispatch, dataFatched]);


  useEffect(() => {
    if (!dataFatched) {
      const selectedBusinessId = localStorage.getItem('selectedBusinessId');
      console.log("selectedBusinessId", selectedBusinessId)
      dispatch(getMyBussinessFunApi({
        data: { businessId: selectedBusinessId },
        onSuccess: () => {},
      }));
    }
  }, [dispatch, dataFatched]);

  // useEffect(() => {
  //   const selectedBusinessId = localStorage.getItem('selectedBusinessId');
  //   console.log("selectedBusinessId",selectedBusinessId)

  //   if (selectedBusinessId) {
  //     dispatch(getMyBussinessFunApi({ data: { businessId: selectedBusinessId } }));
  //   } else {
  //     if (!dataFatched) {
  //       dispatch(getMyBussinessFunApi({}));
  //     }
  //   }
  // }, [dispatch, dataFatched]);


  useEffect(() => {
    if (business?.data && !dataInitalized) {
      setInitialData({
        bannerText: business.data?.bannerText || "",
        bannerImg: business.data?.bannerImg || "",
        fontSize: business?.data?.fontsize || 16,
        fontFamily: business?.data?.fontfamily || "",
        theme: business?.data?.theme || "",
        color: business?.data?.color || "",
        businessId: business?.id || "",
      });
      setDataInitalized(true);
    }
  }, [business?.data, dataInitalized]);

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "10px",
          }}
        >
          Customize Theme
        </Typography>
        {dataInitalized && (
          <CustomizeThemeForm formData={initialData} isEditMode={true} />
        )}
      </Card>
    </>
  );
};

export default CustomizePage;
