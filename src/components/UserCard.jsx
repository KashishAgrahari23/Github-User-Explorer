import React from 'react'

const UserCard = ({data}) => {
  return (

    <div>
      {
        data.map((elem)=>{
           return <div key={elem.id}>
                <h6>{elem.login}</h6>
                <img src={elem.avatar_url} alt="" />
                <p>{elem.events_url}</p>
                <button>View Repos</button>

            </div>
        })
      }
    </div>
  )
}

export default React.memo(UserCard)
