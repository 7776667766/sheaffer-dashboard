import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import AddSpecialistForm from "@/components/Forms/FormLayouts/AddSpecialistForm";

export default function EditServicePage({ id }) {
  const router = useRouter();
  const { specialist } = useSelector((state) => state.specialist);
  console.log("specialist", specialist);

  const [tempData, settempData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log("my Getting id", id);

  useEffect(() => {
    if (id) {
      const myspecialist = specialist.find((item) => item.id === id);
      console.log(myspecialist, "mytemplate");
      if (myspecialist) {
        settempData(myspecialist);
        setIsLoading(false);
      } else router.push("/specialist/addSpecialist");
    }
  }, [id, router, specialist.data]);
  if (router.isFallback) {
    return <div>Loading Fallback ...</div>;
  }
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit specialist</h1>
        <ul>
          {/* <li>
            <Link href="/">Dashboard</Link>
          </li> */}
          <li>specialist</li>
        </ul>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AddSpecialistForm formData={tempData} isEditMode={true} />
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}
