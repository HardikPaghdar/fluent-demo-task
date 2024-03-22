import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

function List() {
  const [companies, setCompanies] = useState([]);

  const loadCompanies = async () => {
    axios.get(`${process.env.REACT_APP_API_KEY}/company`)
        .then((res) => {
          const responseData = res.data;
          if (responseData.meta && responseData.meta.status === 1) {
            setCompanies(responseData.data.reverse());
          } else {
            toast.error(responseData.meta.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while fetching company data");
        });
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  const deleteCompany = (id) => {
    axios.delete(`${process.env.REACT_APP_API_KEY}/company/${id}`).then(async res => {
      const responseData = res.data;
      if (responseData.meta && responseData.meta.status === 1) {
        await loadCompanies()
        toast.success(responseData.meta.message);
      } else {
        toast.error(responseData.meta.message);
      }
    }).catch((error) => {
      console.error("Error:", error);
      toast.error("An error occurred while deleting company data");
    });;
  }

  return (
      <>
        <div className="w-full h-full flex flex-col px-10 py-8 mt-8">
          <div className="w-full h-16 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Companies</h1>
            <div className="flex items-center space-x-4">
              <Link
                  to={`/companies/add`}
                  className="btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full mt-8">
            <div className="overflow-x-auto">
              <div className="py-4">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center divide-y divide-gray-200">
                    <thead className="bg-teal-600 text-white">
                    <tr>
                      <th className="px-6 py-3"> # </th>
                      <th className="px-6 py-3"> Name </th>
                      <th className="px-6 py-3"> Email </th>
                      <th className="px-6 py-3"> Phone </th>
                      <th className="px-6 py-3"> Address </th>
                      <th className="px-6 py-3"> Action </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {companies.map((data, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.mobile}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                                to={`/companies/${data._id}`}
                                className="text-teal-600 hover:text-teal-900 mr-4"
                            >
                              View
                            </Link>
                            <Link
                                to={`/companies/edit/${data._id}`}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Edit
                            </Link>
                            <button
                                onClick={() => deleteCompany(data._id)}
                                className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default List;
