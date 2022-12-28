import { async } from "@firebase/util";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
    //colRef
    const colRef = collection(db, "posts");

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [postId, setPostId] = useState("");
    const [posts, setPosts] = useState([]);
    const [singlePosts, setSinglePosts] = useState("");

    useEffect(() => {
        //1. ko phải realtime
        // getDocs(colRef)
        //     .then((snapshot) => {
        //         const posts = [];
        //         snapshot.docs.forEach((doc) => {
        //             posts.push({
        //                 id: doc.id,
        //                 ...doc.data(),
        //             });
        //         });
        //         setPosts(posts);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // 2. get document in realtime: ko cần reload trang vẫn hiển thị ngay
        onSnapshot(colRef, (snapshot) => {
            const posts = [];
            snapshot.docs.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(posts);
        });

        // truy xuất 1 Document với getDoc
        const docRefSingle = doc(db, "posts", "p0S39QWDISrjAb7Uc1wn");
        // getDoc(docRefSingle).then((doc) => {
        //     console.log(doc.id, doc.data());
        // });

        //document in realtime: ko cần reload trang vẫn hiển thị ngay
        onSnapshot(docRefSingle, (doc) => {
            console.log(doc.id, doc.data());
        });
    }, []);

    const handleAddPost = (e) => {
        e.preventDefault();
        addDoc(colRef, {
            title,
            author,
            createdAt: serverTimestamp(),
        })
            .then(() => {
                console.log("succes");
            })
            .catch((error) => {
                console.log(error);
            });
        e.reset();
    };

    const handleRemovePost = async (e) => {
        e.preventDefault();
        //xóa đi theo 1 cái document nên lấy ref của doc
        const docRefDelete = doc(db, "posts", postId);
        await deleteDoc(docRefDelete);
        console.log("succes");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const docRefUpdate = doc(db, "posts", postId);
        // có thêm data để update
        await updateDoc(docRefUpdate, {
            title: "this is a new title from update function",
        });
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
                <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
                    {posts.length > 0 &&
                        posts.map((item) => (
                            <div key={item.title}>
                                <div>
                                    {item.title} - {item.author}
                                </div>
                            </div>
                        ))}
                </div>
                <div className="mb-10">
                    <h1 className="font-semibold text-center">
                        handle update data follow id
                    </h1>
                    <form onSubmit={handleUpdate}>
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
                            update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FirebaseApp;
