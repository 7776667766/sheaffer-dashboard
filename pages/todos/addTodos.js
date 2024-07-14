import React from "react";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddTodoForm from "@/components/Forms/FormLayouts/AddTodoForm";

export default function AddSpecialist() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Todo</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Todo</li>
        </ul>
      </div>

      <AddTodoForm />
    </>
  );
}
