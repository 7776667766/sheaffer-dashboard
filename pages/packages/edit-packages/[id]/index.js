import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import AddBusinessPackagePage from "pages/packages/add-package";



export default function EditPackagePage() {
  const router = useRouter();
  const { plan } = useSelector((state) => state.plan);


  const [packageData, setpackageData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query.id) {
      const myPlan = plan.data.find(
        (data) => data.id === router.query.id
      );
      console.log(myPlan, "myplan");
      if (myPlan) {
        setpackageData(myPlan);
        setIsLoading(false);
      } else router.push("/packages");
    }
  }, [router.query.id, router, plan.data]);
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit Service</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Plan</li>
        </ul>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AddBusinessPackagePage formData={packageData} isEditMode={true} />
      )}
    </>
  );
}
