import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

function Add() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const nameInputRef = useRef(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/company/${id}`)
            .then((res) => {
                const responseData = res.data;
                if (responseData.meta && responseData.meta.status === 1) {
                    setName(responseData.data.name);
                    setEmail(responseData.data.email);
                    setMobile(responseData.data.mobile);
                    setAddress(responseData.data.address);
                } else {
                    toast.error(responseData.meta.message);
                    navigate("/companies");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while updating company data");
                navigate("/companies");
            });

        nameInputRef.current.focus();
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            mobile: mobile,
            address: address
        };
        axios.put(`${process.env.REACT_APP_API_KEY}/company/${id}`, data)
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
            <h2 className="text-2xl font-bold">Edit</h2>
            <form className="w-[50%] h-full flex flex-col mt-2">
                <input
                    ref={nameInputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
                    type="text"
                    placeholder="Enter company name"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
                    type="email"
                    placeholder="Enter company email"
                />
                <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
                    type="phone"
                    placeholder="Enter mobile no."
                />
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
                    placeholder="Enter company address"
                />
                <div className="flex justify-end mt-4"> {/* Adjusted justify-end here */}
                    <button
                        className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        type="submit"
                        onClick={submitForm}
                    >
                        Update
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
