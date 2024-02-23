import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import ServiceForm from "@/components/Forms/FormLayouts/ServiceForm";
import TemplateForm from "@/components/Forms/FormLayouts/TemplateForm";

export default function EditServicePage() {
  const router = useRouter();
  const { id } = router.query;
  const { template } = useSelector((state) => state.template);
  console.log("template", template);

  const [serviceData, setServiceData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log("my Getting id", id);

  useEffect(() => {
    console.log("ID:", id);
  }, [id]);

  useEffect(() => {
    if (id) {
      const mytemplate = template?.find((item) => item.id === id);

      console.log(mytemplate, "mytemplate");

      if (mytemplate) {
        setServiceData(mytemplate);
        setIsLoading(false);
      } else {
        router.push("/templates/add-template");
      }
    }
  }, [id, router, template.data]);

  if (router.isFallback) {
    return <div>Loading Fallback ...</div>;
  }
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>Edit Template</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Template</li>
        </ul>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TemplateForm formData={serviceData} isEditMode={true} />
      )}
    </>
  );
}

// export async function getServerSideProps({ params }) {
//   const { id } = params;
//   return {
//     props: {
//       id,
//     },
//   };
// }
