import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import ServiceForm from "@/components/Forms/FormLayouts/ServiceForm";
import AddPackagePage from "@/components/Forms/FormLayouts/editPackageForm";

export default function EditServicePage() {
  const router = useRouter();
  const { id } = router.query;

  const { plan } = useSelector((state) => state.plan);
  console.log("plan",plan)

  const [serviceData, setServiceData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log("my Getting id", id);

  useEffect(() => {
    console.log("ID:", id);
  }, [id]);

  useEffect(() => {
    if (
      id
    ) {
      const myPackage = plan.data.find(
        (data) => data._id === id 
      );
      console.log(myPackage, "myPackage");
      if (myPackage) {
        setServiceData(myPackage);
        setIsLoading(false);
      } else router.push("/packages/add-package");
    }
  }, [
    id,
    // router.query.id,
    router,
    plan.data,
  ]);
  if (router.isFallback) {
    return <div>Loading Fallback ...</div>;
  }
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit Package</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Service</li>
        </ul>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AddPackagePage formData={serviceData} isEditMode={true} />
      )}
    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const { id } = params;
//   return {
//     props: {
//       id,
//     },
//   };
// }
