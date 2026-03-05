import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";


export const createJob = async (title, company, description, category) => {
  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      title,
      company,
      description,
      category,
      createdAt: serverTimestamp()
    });
    console.log("Вакансия добавлена с ID: ", docRef.id);
  } catch (e) {
    console.error("Ошибка при добавлении: ", e);
  }
};


export const deleteJob = async (id) => {
  try {
    const jobDoc = doc(db, "jobs", id);
    await deleteDoc(jobDoc);
    console.log("Вакансия успешно удалена!");
  } catch (e) {
    console.error("Ошибка при удалении: ", e);
  }
};