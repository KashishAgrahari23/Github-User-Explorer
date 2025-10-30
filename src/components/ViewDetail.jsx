import React, { useEffect, useState } from "react";

const ViewDetail = (user) => {
    const [res,setRes] = useState([])
  useEffect(
    (user) => {
      let data = fetch(`https://api.github.com/users/${user}/repos`);
      let res = data.json();
      console.log(res.data);
      setRes(res.data)
    },
    [user]
  );

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
