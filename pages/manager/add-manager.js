import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import ManagerForm from "@/components/Forms/FormLayouts/ManagerForm";

export default function AddManagerPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Manager</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Manager</li>
        </ul>
      </div>

      <ManagerForm />
    </>
  );
}
