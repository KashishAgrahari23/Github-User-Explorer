import React from 'react'
import ViewDetail from './ViewDetail'
import { useNavigate } from 'react-router-dom'

const UserCard = ({data}) => {
  const navigate = useNavigate()
  const handleViewRepo =(user)=>{
    console.log(user)
    navigate(`/user/${user}`)
    
  }
  return (

    <div>
      {
        data.map((elem)=>{
           return <div key={elem.id}>
                <h6>{elem.login}</h6>
                <img src={elem.avatar_url} alt="" />
                <p>{elem.events_url}</p>
                <button onClick={ ()=> handleViewRepo(elem.login)}>View Repos</button>

            </div>
        })
      }
    </div>
  )
}

export default React.memo(UserCard)
