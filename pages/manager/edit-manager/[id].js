import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useDispatch, useSelector } from "react-redux";
import ManagerForm from "@/components/Forms/FormLayouts/ManagerForm";

export default function EditManagerPage() {
  const router = useRouter();
  const { managers } = useSelector((state) => state.manager);

  const [managerData, setManagerData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query.id) {
      const manager = managers.find(
        (manager) => manager.id === router.query.id
      );

      if (manager) {
        setManagerData(manager);
        setIsLoading(false);
      }
    }
  }, [managers, router.query.id]);
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit Manager</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Manager</li>
        </ul>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ManagerForm formData={managerData} isEditMode={true} />
      )}
    </>
  );
}
