import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
    //colRef
    const colRef = collection(db, "posts");

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [postId, setPostId] = useState("");

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

    const handleRemovePost = async (e) => {
        e.preventDefault();
        //xóa đi theo 1 cái document nên lấy ref của doc
        const docRefDelete = doc(db, "posts", postId);
        await deleteDoc(docRefDelete);
        console.log("succes");
    };
    return (
        <div>
            <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
                <div className="mb-10">
                    <h1 className="font-semibold text-center">
                        handle add data
                    </h1>
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
                <div className="mb-10">
                    <h1 className="font-semibold text-center">
                        handle remove data follow id
                    </h1>
                    <form onSubmit={handleRemovePost}>
                        <input
                            name="postId"
                            type="text"
                            className="w-full p-3 mb-5 border border-gray-300 rounded outline-none focus:border-blue-500"
                            onChange={(e) => setPostId(e.target.value)}
                            placeholder="Enter your id"
                        />

                        <button
                            type="submit"
                            className="w-full p-3 text-sm font-medium text-white bg-red-500 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FirebaseApp;
