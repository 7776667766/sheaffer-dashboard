import React from "react";
import { LoadingButton } from "@mui/lab";

export const LoadingButtonComponent = ({ value, isLoading, ...props }) => {
  return (
    <LoadingButton
      type="button"
      fullWidth
      variant="contained"
      disabled={isLoading || props.disabled}
      loading={isLoading}
      {...props}
      sx={{
        mt: 1,
        textTransform: "capitalize",
        borderRadius: "8px",
        fontWeight: "500",
        fontSize: "16px",
        padding: "12px 10px",
        color: "#fff !important",
      ...props.sx
      }} 
    >
      {isLoading ? "Loading ..." : value || "Submit"}
    </LoadingButton>
  );
};
