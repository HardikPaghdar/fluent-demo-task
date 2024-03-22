import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}/person/${id}`)
        .then((res) => {
          const responseData = res.data;
          if (responseData.meta && responseData.meta.status === 1) {
            setPeople(responseData.data)
          } else {
            toast.error(responseData.meta.message);
            navigate("/peoples");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while fetching peoples data");
          navigate("/companies");
        });
  }, []);

  return (
      <>
        <div className="relative">
          <Link
              to={`/peoples`}
              className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-teal-600 text-white font-bold rounded hover:bg-teal-700"
          >
            Back
          </Link>
        </div>
        <div className="h-full w-full flex flex-col items-center mt-20">
          {people && (
              <div className="max-w-screen-lg w-full mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-8">
                    <h2 className="text-teal-600 font-bold text-3xl mb-4">
                      Name: {people.first_name+" "+ people.last_name}
                    </h2>
                    <p className="text-gray-700 text-lg mb-4">Email: {people.email}</p>
                    <p className="text-gray-700 text-lg mb-4">Company Name: {people.company_id ? people.company_id.name : "-"}</p>
                  </div>
                </div>
              </div>
          )}
        </div>
      </>
  );
}

export default Details;
