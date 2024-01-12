import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import ServiceTypeForm from "@/components/Forms/FormLayouts/ServiceTypeForm";

export default function EditServicePage() {
  const router = useRouter();
  const { serviceType } = useSelector((state) => state.service);
  console.log("serviceType Data ", serviceType);

  const [serviceTypeData, setServiceTypeData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query.id) {
      const myServiceType = serviceType.data.find(
        (data) => data.id === router.query.id
      );
      console.log(myServiceType, "myserviceTypeType");
      if (myServiceType) {
        setServiceTypeData(myServiceType);
        setIsLoading(false);
      } else router.push("/services/service-type");
    }
  }, [router.query.id, router, serviceType.data]);
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit Service Type</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Service Types</li>
        </ul>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ServiceTypeForm formData={serviceTypeData} isEditMode={true} />
      )}
    </>
  );
}
