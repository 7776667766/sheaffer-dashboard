import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddServiceForm from "@/components/Forms/FormLayouts/AddServiceForm";

export default function AddService() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Service</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Service</li>
        </ul>
      </div>

      <AddServiceForm />
    </>
  );
}
