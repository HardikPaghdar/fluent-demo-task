import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

function List() {
  const [peoples, setPeoples] = useState([]);

  const loadPeoples = async () => {
    axios.get(`${process.env.REACT_APP_API_KEY}/person`)
        .then((res) => {
          const responseData = res.data;
          if (responseData.meta && responseData.meta.status === 1) {
            setPeoples(responseData.data.reverse());
          } else {
            toast.error(responseData.meta.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while fetching peoples data");
        });
  }

  useEffect(() => {
    loadPeoples();
  }, []);

  const deletePeople = (id) => {
    axios.delete(`${process.env.REACT_APP_API_KEY}/person/${id}`).then(async res => {
      const responseData = res.data;
      if (responseData.meta && responseData.meta.status === 1) {
        await loadPeoples()
        toast.success(responseData.meta.message);
      } else {
        toast.error(responseData.meta.message);
      }
    }).catch((error) => {
      toast.error("An error occurred while deleting peoples data");
    });
  }

  return (
      <>
        <div className="w-full h-full flex flex-col px-10 py-8 mt-8">
          <div className="w-full h-16 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Peoples</h1>
            <div className="flex items-center space-x-4">
              <Link
                  to={`/peoples/add`}
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
                      <th className="px-6 py-3"> First Name </th>
                      <th className="px-6 py-3"> Last Name </th>
                      <th className="px-6 py-3"> Email </th>
                      <th className="px-6 py-3"> Company </th>
                      <th className="px-6 py-3"> Action </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {peoples.map((data, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.first_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.last_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{data.company_id && data.company_id.name ? data.company_id.name : "-"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                                to={`/peoples/${data.id}`}
                                className="text-teal-600 hover:text-teal-900 mr-4"
                            >
                              View
                            </Link>
                            <Link
                                to={`/peoples/edit/${data.id}`}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Edit
                            </Link>
                            <button
                                onClick={() => deletePeople(data.id)}
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
