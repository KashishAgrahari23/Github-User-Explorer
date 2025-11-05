import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const SearchBar = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recent , setRecent] = useState([])

  

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
    saveRecent(query)
    
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

  const saveRecent = ((query)=>{
        console.log(query)
        setRecent((prev)=> {
            
            [query , ...prev]
            localStorage.setItem("recent" , JSON.stringify([query , ...prev]))
            return [query , ...prev]


        } )
        
  })


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

    

      {/* {!loading && !error && data.length > 0 && (
        <div className="container mx-auto px-4">
          <UserCard data={data} />
        </div>
      )} */}

      {
        data.length ? <div className="container mx-auto px-4">
          <UserCard data={data} />
        </div> : <p>No user found</p>
      }

      

      <div className="container mx-auto px-4">
          <UserCard data={data} />
        </div>
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
