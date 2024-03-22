import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

function Add() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [companyList, setCompanyList] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const firstNameInputRef = useRef(null);

    useEffect(() => {
        loadCompanies();

        axios.get(`${process.env.REACT_APP_API_KEY}/person/${id}`)
            .then((res) => {
                const responseData = res.data;
                if (responseData.meta && responseData.meta.status === 1) {
                    setFirstName(responseData.data.first_name);
                    setLastName(responseData.data.last_name);
                    setEmail(responseData.data.email);
                    setCompany(responseData.data.company_id._id);
                } else {
                    toast.error(responseData.meta.message);
                    navigate("/peoples");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while updating peoples data");
                navigate("/peoples");
            });
        firstNameInputRef.current.focus();
    }, []);

    const loadCompanies = async () => {
        axios.get(`${process.env.REACT_APP_API_KEY}/company`)
            .then((res) => {
                const responseData = res.data;
                if (responseData.meta && responseData.meta.status === 1) {
                    setCompanyList(responseData.data);
                } else {
                    toast.error(responseData.meta.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while fetching company data");
            });
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            company_id: company,
        };
        axios.put(`${process.env.REACT_APP_API_KEY}/person/${id}`, data)
            .then((res) => {
                const responseData = res.data;
                if (responseData.meta && responseData.meta.status === 1) {
                    toast.success(responseData.meta.message);
                    navigate("/peoples")
                } else {
                    toast.error(responseData.meta.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while updating peoples data");
            });
    }

    return (
        <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
            <h2 className="text-2xl font-bold">Edit</h2>
            <form className="w-[50%] h-full flex flex-col mt-2">
                <input
                    ref={firstNameInputRef}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    type="text"
                    placeholder="Enter first name"
                />
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    type="text"
                    placeholder="Enter last name"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4"
                    type="email"
                    placeholder="Enter your email"
                />

                <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`bg-white/10 outline-none font-normal border border-zinc-400 py-4 pl-4 mt-4`}
                >
                    <option value="" disabled selected>
                        Select Company
                    </option>
                    {/* Map through your company list to create options */}
                    {companyList.map((company) => (
                        <option key={company._id} value={company._id}>
                            {company.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end mt-4">
                    <button
                        className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        type="submit"
                        onClick={submitForm}
                    >
                        Save
                    </button>
                    <Link
                        to={`/peoples`}
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
