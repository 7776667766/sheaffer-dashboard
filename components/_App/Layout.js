import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/_App/LeftSidebar";
import TopNavbar from "@/components/_App/TopNavbar";
import Footer from "@/components/_App/Footer";
import ScrollToTop from "./ScrollToTop";
import ControlPanelModal from "./ControlPanelModal";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { login } from "store/auth/authSlice";
import { getMyBussinessFunApi } from "store/business/services";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const toogleActive = () => {
    setActive(!active);
  };
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user && !isAuthenticated) {
      dispatch(login());
      const otpVerified = localStorage.getItem("otpVerified");
      if (otpVerified) {
        dispatch(getMyBussinessFunApi());
      }
    }

    // if (!router.pathname.includes("/authentication")) {
    //   if (!isAuthenticated) {
    //     router.push("/authentication/sign-in");
    //   }
    // }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, isAuthenticated, router]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        Loading...
      </Box>
    );
  return (
    <>
      <Head>
        <title>
          Admash - Material Design React Next Admin Dashboard Template
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={`main-wrapper-content ${active && "active"}`}>
        {!(
          router.pathname === "/authentication/sign-in" ||
          router.pathname === "/authentication/sign-up" ||
          router.pathname === "/authentication/forgot-password" ||
          router.pathname === "/authentication/lock-screen" ||
          router.pathname === "/authentication/confirm-mail" ||
          router.pathname === "/authentication/verify-otp" ||
          router.pathname === "/authentication/reset-password" ||
          router.pathname === "/authentication/logout"
        ) && (
          <>
            <TopNavbar toogleActive={toogleActive} />

            <LeftSidebar toogleActive={toogleActive} />
          </>
        )}

        <div className="main-content">
          {children}

          {!(
            router.pathname === "/authentication/sign-in" ||
            router.pathname === "/authentication/sign-up" ||
            router.pathname === "/authentication/forgot-password" ||
            router.pathname === "/authentication/lock-screen" ||
            router.pathname === "/authentication/confirm-mail" ||
            router.pathname === "/authentication/verify-otp" ||
            router.pathname === "/authentication/reset-password" ||
            router.pathname === "/authentication/logout"
          ) && <Footer />}
        </div>
      </div>

      {/* ScrollToTop */}
      <ScrollToTop />

      {/* {!(
        router.pathname === "/authentication/sign-in" ||
        router.pathname === "/authentication/sign-up" ||
        router.pathname === "/authentication/forgot-password" ||
        router.pathname === "/authentication/lock-screen" ||
        router.pathname === "/authentication/confirm-mail" ||
        router.pathname === "/authentication/verify-otp" ||
        router.pathname === "/authentication/reset-password" ||
        router.pathname === "/authentication/logout"
      ) && <ControlPanelModal />} */}
    </>
  );
};

export default Layout;
