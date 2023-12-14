import React from "react";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddManagerForm from "@/components/Forms/FormLayouts/AddManagerForm";

export default function FormLayouts() {
  
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

    <AddManagerForm />
    </>
  );
}
