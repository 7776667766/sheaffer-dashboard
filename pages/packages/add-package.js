

import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddPackagePage  from "@/components/Forms/FormLayouts/editPackageForm";

export default function AddService() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Plan</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Plan</li>
        </ul>
      </div>

      <AddPackagePage />
    </>
  );
}
