import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'


const SearchBar = () => {
    const [ user , setUser] = useState("")
    const [ data , setData] = useState([])
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const [page , setPage] = useState(1)
    
    useEffect(()=>{

        if(!user.trim()){
            setData([])
            return
        }

        const timer = setTimeout(()=>{
            fetchData(user)
            // setUser("")
        } , 1000)
        
        return ()=>clearTimeout(timer)

},[user , page])

    const handleChange=(e)=>{
        setUser(e.target.value)
        setPage(1)
    }

    const fetchData= async(query)=>{
        try{
            setLoading(true)
            setError(null)
            const res = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`)
             const jsonData = await res.json()
             setData(jsonData.items || [])
             console.log(jsonData.items)
        }catch(err){
            
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    const handlePrev =()=>{
        if(page>1){
            setPage((prev)=>prev-1)
        }
    }
    const handleNext =()=>{
            setPage((prev)=>prev+1)
    }
  return (
    <div>
      <input type="text" placeholder='Type a Git user name' onChange={(e)=>handleChange(e)} value={user} />
     {loading && <p>Loading.....</p>}
     {error && <p>{error}</p>}
      {!loading && !error && data.length >0 && <UserCard data={data} />}
      <button disabled={page==1} onClick={handlePrev}>prev</button>
      <span>{page}</span>
      <button onClick={handleNext}>Next</button>
      
    </div>
  )
}

export default SearchBar
