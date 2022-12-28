import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
    //colRef
    const colRef = collection(db, "posts");

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        getDocs(colRef)
            .then((snapshot) => {
                const posts = [];
                snapshot.docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddPost = (e) => {
        e.preventDefault();
        addDoc(colRef, {
            title,
            author,
        })
            .then(() => {
                console.log("succes");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
                <form onSubmit={handleAddPost}>
                    <input
                        name="title"
                        type="text"
                        className="w-full p-3 mb-5 border border-gray-300 rounded outline-none focus:border-blue-500"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your title"
                    />
                    <input
                        name="author"
                        type="text"
                        className="w-full p-3 mb-5 border border-gray-300 rounded outline-none focus:border-blue-500"
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter your author"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FirebaseApp;
