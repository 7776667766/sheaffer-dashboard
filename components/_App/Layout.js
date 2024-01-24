// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import LeftSidebar from "@/components/_App/LeftSidebar";
// import TopNavbar from "@/components/_App/TopNavbar";
// import Footer from "@/components/_App/Footer";
// import ScrollToTop from "./ScrollToTop";
// import { useDispatch, useSelector } from "react-redux";
// import { Box } from "@mui/material";
// import { getMyBussinessFunApi } from "store/business/services";
// import { checkTokenIsValidFunApi } from "store/auth/services";

// const Layout = ({ children }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [active, setActive] = useState(false);
//   const dispatch = useDispatch();

//   const toogleActive = () => {
//     setActive(!active);
//   };
//   const { isAuthenticated, role, otpVerified, validToken } = useSelector(
//     (state) => state.auth
//   );
//   const { business } = useSelector((state) => state.business);

//   // if (business && business.requestStatus === "Pending") {
//   //   return router.push("/wait-for-approval");
//   // }

//   useEffect(() => {
//     if (validToken.dataFetched) {
//       if (validToken.validToken) {
//         const myOtpVerified = localStorage.getItem("otpVerified");
//         if (myOtpVerified && role === "owner" && business === null) {
//           dispatch(getMyBussinessFunApi());
//         }
//         if (router.pathname.includes("/authentication")) {
//           router.push("/");
//         }
//         if ( && business.requestStatus === "Pending") {
//           router.push("/please-wait-for-approval");
//         }
//       } else {
//         if (!router.pathname.includes("/authentication")) {
//           if (!isAuthenticated) {
//             router.push("/authentication/sign-in");
//           }
//         }
//       }
//       setTimeout(() => {
//         setLoading(false);
//       }, 1000);
//     }
//   }, [
//     business,
//     dispatch,
//     isAuthenticated,
//     otpVerified,
//     role,
//     router,
//     validToken.dataFetched,
//     validToken.validToken,
//   ]);

//   useEffect(() => {
//     if (!validToken.dataFetched) {
//       dispatch(checkTokenIsValidFunApi());
//     }
//   }, [dispatch, validToken.dataFetched]);

//   if (validToken.isLoading || loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         sx={{ height: "100vh" }}
//       >
//         Loading...
//       </Box>
//     );
//   return (
//     <>
//       <Head>
//         <title>
//           Admash - Material Design React Next Admin Dashboard Template
//         </title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <div className={`main-wrapper-content ${active && "active"}`}>
//         {!router.pathname.includes("/authentication/") && (
//           <>
//             <TopNavbar toogleActive={toogleActive} />

//             <LeftSidebar toogleActive={toogleActive} />
//           </>
//         )}

//         <div className="main-content">
//           {children}

//           {!router.pathname.includes("/authentication/") && <Footer />}
//         </div>
//       </div>

//       {/* ScrollToTop */}
//       <ScrollToTop />

//       {/* {!(
//         router.pathname === "/authentication/sign-in" ||
//         router.pathname === "/authentication/sign-up" ||
//         router.pathname === "/authentication/forgot-password" ||
//         router.pathname === "/authentication/lock-screen" ||
//         router.pathname === "/authentication/confirm-mail" ||
//         router.pathname === "/authentication/verify-otp" ||
//         router.pathname === "/authentication/reset-password" ||
//         router.pathname === "/authentication/logout"
//       ) && <ControlPanelModal />} */}
//     </>
//   );
// };

// export default Layout;
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/_App/LeftSidebar";
import TopNavbar from "@/components/_App/TopNavbar";
import Footer from "@/components/_App/Footer";
import ScrollToTop from "./ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getMyBussinessFunApi } from "store/business/services";
import { checkTokenIsValidFunApi } from "store/auth/services";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const toogleActive = () => {
    setActive(!active);
  };
  const { isAuthenticated, role, otpVerified, validToken } = useSelector(
    (state) => state.auth
  );
  const { business } = useSelector((state) => state.business);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (validToken.dataFetched) {
          if (validToken.validToken) {
            const myOtpVerified = localStorage.getItem("otpVerified");
            if (myOtpVerified && role === "owner" && business === null) {
              await dispatch(getMyBussinessFunApi());
            }
            if (router.pathname.includes("/authentication")) {
              router.push("/");
            }
            if (business && business.requestStatus === "Pending") {
              if (router.pathname !== "/approval") {
                router.push("/approval");
              }
            }
          } else {
            if (!router.pathname.includes("/authentication")) {
              if (!isAuthenticated) {
                router.push("/authentication/sign-in");
              }
            }
          }
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    business,
    dispatch,
    isAuthenticated,
    otpVerified,
    role,
    router,
    validToken.dataFetched,
    validToken.validToken,
  ]);

  useEffect(() => {
    if (!validToken.dataFetched) {
      dispatch(checkTokenIsValidFunApi());
    }
  }, [dispatch, validToken.dataFetched]);

  if (validToken.isLoading || loading)
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
          MakelyPro - Material Design React Next Admin Dashboard Template
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={`main-wrapper-content ${active && "active"}`}>
        {!router.pathname.includes("/authentication/") && (
          <>
            <TopNavbar toogleActive={toogleActive} />
            <LeftSidebar toogleActive={toogleActive} />
          </>
        )}

        <div className="main-content">
          {children}
          {!router.pathname.includes("/authentication/") && <Footer />}
        </div>
      </div>

      {/* ScrollToTop */}
      <ScrollToTop />
    </>
  );
};

export default Layout;

