import axios from "axios";
import React, {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';

function Add() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const nameInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        nameInputRef.current.focus();
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            mobile: mobile,
            address: address,
        };
        axios.post(`${process.env.REACT_APP_API_KEY}/company`, data)
            .then((res) => {
                const responseData = res.data;
                if (responseData.meta && responseData.meta.status === 1) {
                    toast.success(responseData.meta.message);
                    navigate("/companies");
                } else {
                    toast.error(responseData.meta.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while inserting company data");
            });
    }

    return (
        <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
            <h2 className="text-2xl font-bold">Add New</h2>
            <form className="w-[50%] h-full flex flex-col mt-2">
                <input
                    value={name}
                    ref={nameInputRef}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    type="text"
                    placeholder="Enter company name"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    type="email"
                    placeholder="Enter company email"
                />
                <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    type="phone"
                    placeholder="Enter mobile no."
                />
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    placeholder="Enter company address"
                />
                <div className="flex justify-end mt-4">
                    <button
                        className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        type="submit"
                        onClick={submitForm}
                    >
                        Save
                    </button>
                    <Link
                        to={`/companies`}
                        className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Add;
