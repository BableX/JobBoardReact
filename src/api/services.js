import { collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Вакансия кошуу
export const addJob = async (jobData) => {
  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      ...jobData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Вакансия кошууда ката:", error);
    return { success: false, error: error.message };
  }
};

// Вакансия өчүрүү
export const deleteJob = async (id) => {
  try {
    await deleteDoc(doc(db, "jobs", id));
    return { success: true };
  } catch (error) {
    console.error("Вакансия өчүрүүдө ката:", error);
    return { success: false, error: error.message };
  }
};