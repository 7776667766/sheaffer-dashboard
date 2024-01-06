import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import BusinessDummyForm from "@/components/Forms/FormLayouts/BusinessDummyForm";

export default function AddDummyBusiness() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Dummy Business</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Add Dummy Business</li>
        </ul>
      </div>

      <BusinessDummyForm />
    </>
  );
}
