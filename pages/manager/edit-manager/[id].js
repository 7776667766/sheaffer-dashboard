import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import AddManagerForm from "@/components/Forms/FormLayouts/AddManagerForm";
import { filterManagerById } from "store/manager/managerSlice";
import { useDispatch, useSelector } from "react-redux";
 

export default function FormEdit() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch=useDispatch()
  const managers=useSelector((state)=>state.manager.managers) ;
 

  return (
    <>
    
      <div className={styles.pageTitle}>
        <h1>Edit Manager</h1>
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
