import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import ServiceTypeForm from "@/components/Forms/FormLayouts/ServiceTypeForm";

export default function FormLayouts() {
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Add Service Type</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Service Types</li>
        </ul>
      </div>

      <ServiceTypeForm />
    </>
  );
}
