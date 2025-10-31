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

    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6' >
      {
        data.map((elem)=>{
           return (
  <div
    key={elem.id}
    className="bg-gray-800 text-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center"
  >
    <img
      src={elem.avatar_url}
      alt={elem.login}
      className="w-24 h-24 rounded-full border-2 border-blue-500 mb-3"
    />
    <h3 className="text-lg font-semibold mb-1">{elem.login}</h3>
    <p className="text-sm text-gray-400 mb-3 break-all text-center">{elem.events_url}</p>
    <button
      onClick={() => handleViewRepo(elem.login)}
      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
    >
      View Repos
    </button>
  </div>
)

        })
      }
    </div>
  )
}

export default React.memo(UserCard)
