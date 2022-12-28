import React, { useState } from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
} from "firebase/auth";

import { auth } from "../firebase/firebase-config";
import { async } from "@firebase/util";

const FirebaseAuth = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [userInfo, setUserInfo] = useState("");

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        if (user) setUserInfo(user);
        console.log("create user successfully");
    };

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    console.log(values);
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
            </div>
        </div>
    );
};

export default FirebaseAuth;
