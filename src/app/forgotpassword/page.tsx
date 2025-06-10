"use client";

import axios from "axios";
import React, { useState } from "react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    //to check if there is an error
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/users/forgotpassword", { email });
            console.log("Reset link sent to your email");
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
        setLoading(false);
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
            <input
                type="email"
                value={email}                
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="border p-2"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded">
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
        </form>
    )
}