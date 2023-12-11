import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddServiceTypeForm from "@/components/Forms/FormLayouts/AddServiceTypeForm";


export default function FormLayouts() {


  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Service Type</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Services</li>
        </ul>
      </div>

      <AddServiceTypeForm />
    </>
  );
}
