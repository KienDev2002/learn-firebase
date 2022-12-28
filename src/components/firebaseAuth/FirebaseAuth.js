import React, { useEffect, useState } from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";

import { auth, db } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";

const FirebaseAuth = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserInfo(currentUser);
            } else {
                setUserInfo("");
            }
        });
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            //credential
            const cred = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            // show user's name
            await updateProfile(auth.currentUser, {
                displayName: "ngo kien",
            });
            setUserInfo(cred);
            console.log("success!");

            // thêm Collection user vào Firestore
            const useRef = collection(db, "users");
            await addDoc(useRef, {
                email: values.email,
                password: values.password,
                id: cred.user.uid,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
            <div className="mb-10">
                <h1 className="font-semibold text-center">handle add data</h1>
                <form onSubmit={handleCreateUser}>
                    <input
                        name="email"
                        type="text"
                        className="w-full p-3 mb-5 border border-gray-300 rounded outline-none focus:border-blue-500"
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                    />
                    <input
                        name="password"
                        type="password"
                        className="w-full p-3 mb-5 border border-gray-300 rounded outline-none focus:border-blue-500"
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                    >
                        Register
                    </button>
                </form>

                {/* signOut */}
                <div className="flex items-center mt-10 gap-x-5">
                    <span className="flex-1">
                        {userInfo.email && userInfo.displayName}
                    </span>
                    <button
                        onClick={handleSignOut}
                        type="submit"
                        className="w-full p-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                    >
                        SignOut
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FirebaseAuth;
