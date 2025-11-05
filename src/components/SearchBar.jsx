import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const SearchBar = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (!user.trim()) {
      setData([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchData(user);
      // setUser("")
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, page]);

  const handleChange = (e) => {
    setUser(e.target.value);
    setPage(1);
  };

  const fetchData = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
      );
      const jsonData = await res.json();
      setData(jsonData.items || []);
      //   console.log(jsonData.items);
      saveRecent(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const newSearch = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(newSearch);
  }, []);

  const saveRecent = (query) => {
    console.log(query);
    setRecent((prev) => {
        const newData = [query , ...prev.filter((el)=> el!=query)]
      localStorage.setItem("recent", JSON.stringify(newData));
      return newData
    });
  };

  const handleRecent = (user) => {
    setUser(user);
    fetchData(user);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col  items-center p-6 text-white">
      <input
        type="text"
        placeholder="Type a Git user name"
        onChange={(e) => handleChange(e)}
        value={user}
        className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-blue-500 shadow-sm"
      />

      {loading && <p>Loading.....</p>}
      {error && <p>{error}</p>}
      {recent.length > 0 && (
  <div className="mt-6 w-full max-w-md text-gray-200">
    <h5 className="font-semibold text-lg mb-3 text-center text-blue-400">
      Recent Searches
    </h5>

    <div className="flex flex-wrap gap-2 justify-center">
      {recent.map((item, id) => (
        <p
          key={id}
          onClick={() => handleRecent(item)}
          className="px-4 py-2 rounded-full bg-gray-800 text-sm hover:bg-gray-900 transition-all duration-300 border border-gray-700"
        >
          {item.length > 15 ? item.slice(0, 15) + "..." : item}
        </p>
      ))}
    </div>

    <div className="mt-4 border-b border-gray-700 w-full"></div>
  </div>
)}


      {/* {!loading && !error && data.length > 0 && (
        <div className="container mx-auto px-4">
          <UserCard data={data} />
        </div>
      )} */}

      {data.length ? (
        <div className="container mx-auto px-4">
          <UserCard data={data} />
        </div>
      ) : (
        <p>No user found</p>
      )}

      <span className="items-center gap-4 mt-6">
        <button
          disabled={page == 1}
          onClick={handlePrev}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Prev
        </button>
        <span className="mx-3 text-white">{page}</span>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Next
        </button>
      </span>
    </div>
  );
};

export default SearchBar;
