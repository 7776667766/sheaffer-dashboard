import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import ServiceDummyForm from "@/components/Forms/FormLayouts/ServiceDummyForm";

export default function AddDummyService() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Service</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Add Dummy Service</li>
        </ul>
      </div>

      <ServiceDummyForm />
    </>
  );
}
