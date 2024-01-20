import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBussinessFunApi } from "store/business/services";
import { CustomizeThemeForm } from "@/components/Forms/FormLayouts/CustomizeThemeForm";

const CustomizePage = () => {
  const { business, dataFatched } = useSelector((state) => state.business);
  console.log(business, "business1234");
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

  useEffect(() => {
    if (!dataFatched) {
      dispatch(getMyBussinessFunApi({}));
    }
  }, [dispatch, dataFatched]);

  useEffect(() => {
    if (business && !dataInitalized) {
      setInitialData({
        bannerText: business?.bannerText || "",
        bannerImg: business?.bannerImg || "",
        fontSize: business?.fontsize || 16,
        fontFamily: business?.fontfamily || "",
        theme: business?.theme || "",
        color: business?.color || "",
        businessId: business?.id || "",
      });
      setDataInitalized(true);
    }
  }, [business, dataInitalized]);

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
