import React, { useEffect, useState } from "react";

const ViewDetail = ({ user }) => {
  const [res, setRes] = useState([]);
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        let data = await fetch(`https://api.github.com/users/${user}/repos`);
        let res = await data.json();
        console.log(res);
        setRes(res);
      } catch (error) {
        console.error(error);
      }
      
    };
    fetchDetail();
  }, [user]);

  return (
    <div>
      <h1>detail page</h1>
      {res.map((elem) => {
        return (
          <div>
            <h3>{elem.name}</h3>
            <strong>{elem.stargazers_count}</strong>
            <p>{elem.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewDetail;
