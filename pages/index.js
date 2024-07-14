import React, { useEffect, useState } from "react";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Dashboard/eCommerce/Features";
import Todo from "./todos/index"
export default function DashboardPage() {

  return (
    <>
    
      <div className={styles.pageTitle}>
        <h1>MY TODO APP </h1>
       
      </div>
          <Features />
          <Todo/>
    </>
  );
}
