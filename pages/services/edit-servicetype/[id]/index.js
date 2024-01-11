import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import AddServiceTypeForm from "@/components/Forms/FormLayouts/AddServiceTypeForm";

export default function EditServicePage() {
  const router = useRouter();
  const { serviceType } = useSelector((state) => state.service);
  console.log("serviceType Data ",serviceType)

  const [serviceData, setServiceData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query.id) {
      const myService = serviceType.data.find(
        (data) => data.id === router.query.id
      );
      console.log(myService, "myserviceType");
      if (myService) {
        setServiceData(myService);
        setIsLoading(false);
      } else router.push("/service-type");
    }
  }, [router.query.id, router, serviceType.data]);
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit Service</h1>
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
        <AddServiceTypeForm formData={serviceData} isEditMode={true} />
      )}
    </>
  );
}
