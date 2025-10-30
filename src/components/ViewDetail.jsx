import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewDetail = () => {
  const [result, setResult] = useState([]);
  const {user} = useParams()
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log(user)
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

  return (
    <div>
      <h1>detail page of {user}</h1>
      {result.map((elem) => {
        return (
          <div key={elem.id}>
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
