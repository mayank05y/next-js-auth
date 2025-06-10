"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(){

    //to get the token from the URL
    const [token, setToken] = useState("");

    //to check if user is verified
    const [verified, setVerified] = useState(false);

    //to check if there is an error
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    //to extract the token from the URL
    useEffect(() => {
        //here we will take token as everything from right of "=" in the URL as token,
        //[1] indicates the 2nd element of the array
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    //if there is a change in the token, we will run this:
    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token"}</h2>
            
            {verified && (
                <div>
                    <h2 className="text-2xl">Email verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}