import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/PageTitle.module.css";
import { useSelector } from "react-redux";
import useTodo from "../../hooks/useTodo";

import AddSpecialistForm from "@/components/Forms/FormLayouts/AddTodoForm";

export default function EditServicePage() {
    const [specialist, setSpecialist] = useState([])
    console.log('specialist:', specialist);
    const {
        getUserTodoFunApi,
    } = useTodo();

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserTodoFunApi({
                    onSuccess: (data) => {
                        setSpecialist(data);
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const [tempData, settempData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('ID:', id);
    }, [id]);

    useEffect(() => {
        if (id) {
            const myTodo = specialist.find((item) =>
                item.id === id);
            console.log(myTodo, "myTodo");
            if (myTodo) {
                settempData(myTodo);
                setIsLoading(false);
            }
        }
    }, [id, router, specialist]);
    if (router.isFallback) {
        return <div>Loading Fallback ...</div>;
    }
    return (
        <>
            <div className={styles.pageTitle}>
                <h1>Edit Todo</h1>
                <ul>

                    <li>Todo</li>
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


