import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddSpecialistForm from "@/components/Forms/FormLayouts/AddSpecialistForm";

export default function AddSpecialist() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Specialist</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Specialist</li>
        </ul>
      </div>

      <AddSpecialistForm />
    </>
  );
}
