import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewDetail = () => {
  const [result, setResult] = useState([]);
  const { user } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log(user);
        let data = await fetch(`https://api.github.com/users/${user}/repos`);
        let res = await data.json();
        console.log(res);
        setResult(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetail();
  }, [user]);


  const handleBack=()=>{
        navigate(-1)

  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">
         {user} Info
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {result.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No repositories found for this user.
          </p>
        )}
        {result.map((elem) => (
          <div
            key={elem.id}
            className="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              {elem.name}
            </h3>
            <p className="text-gray-300 mb-3">
              ⭐ {elem.stargazers_count} stars
            </p>
            <p className="text-gray-400 text-sm">
              {elem.description || "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDetail;
