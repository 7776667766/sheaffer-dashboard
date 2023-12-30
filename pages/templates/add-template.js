import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import TemplateForm from "@/components/Forms/FormLayouts/TemplateForm";

export default function AddTemplatePage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Template</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Template</li>
        </ul>
      </div>

      <TemplateForm />
    </>
  );
}
