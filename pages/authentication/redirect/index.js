import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginFunApi } from "store/auth/services";

export default function RedirectPage() {
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
      console.log('ID:', id);
  }, [id]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (router.query) {
      localStorage.setItem("id", router.query);
      dispatch(
        autoLoginFunApi({
          onSuccess: () => {
            router.push("/");
          },
        })
      );
    }
  }, [dispatch, router.query]);

  return (
    <div>
      <h1>please Wait...</h1>
    </div>
  );
}


// Conditionally export the functions based on the environment
// export const { getStaticPaths, getStaticProps } =
//   process.env.NODE_ENV === "development"
//     ? developmentModeFunctions()
//     : {
//         getStaticPaths: async () => {
//           console.log("This is production mode getStaticPaths");

//           // Your production mode logic
//           const tokens = ["token"];

//           const paths = tokens.map((token) => ({
//             params: { token },
//           }));

//           console.log("This is production mode getStaticPaths paths", paths);

//           return { paths, fallback: false };
//         },
//         getStaticProps: async ({ params }) => {
//           // Your production mode logic
//           console.log("This is production mode getStaticProps params", params);
//           const token = params.token;
//           console.log("token", params);

//           return {
//             props: {
//               token,
//             },
//           };
//         },
//       };
