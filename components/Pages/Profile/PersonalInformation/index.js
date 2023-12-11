import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const { user } = useSelector((state) => state.auth);

  const personalInfo =  [
    {
      title: "Name",
      text: user?.name,
    },
    {
      title: "Phone",
      text: user?.phone,
    },
    {
      title: "Email",
      text: user?.email,
    },
    {
      title: "Role",
      text: user?.role,
    },
    {
      title: "Account verified",
      text: JSON.stringify(user?.verified)
    },
  ];
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
        <Box
          sx={{
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
            Personal Information
          </Typography>
        </Box>

        <Box>
          <Typography as="h4" fontWeight="500" fontSize="15px" mb={1}>
            About Me:
          </Typography>

          <Typography mb={1}>
            Hi I'm Andrew Burns,has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type.
          </Typography>

          {personalInfo.map((ever) => (
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #F7FAFF",
                p: "10px 0",
              }}
              key={ever.title}
              className="for-dark-bottom-border"
            >
              <Typography
                as="h4"
                fontWeight="500"
                fontSize="14px"
                width="150px"
              >
                {ever.title}
              </Typography>

              <Typography>
               {ever.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </>
  );
};

export default PersonalInformation;
