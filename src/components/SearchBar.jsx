import React, { useEffect, useState } from 'react'


const SearchBar = () => {
    const [ user , setUser] = useState("")
    const [ data , setData] = useState([])
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    
    useEffect(()=>{

        if(!user.trim()){
            setData([])
            return
        }

        const timer = setTimeout(()=>{
            fetchData(user)
        } , 1000)
        
        return ()=>clearTimeout(timer)

},[user])

    const handleChange=(e)=>{
        setUser(e.target.value)
    }

    const fetchData= async(query)=>{
        try{
            setLoading(true)
            setError(null)
            const res = await fetch(`https://api.github.com/search/users?q=${query}`)
             const jsonData = await res.json()
             setData(jsonData.items || [])
             console.log(jsonData.items)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    if (error) return <p>{error}</p>
    if (loading) return <p>Loading....</p>
  return (
    <div>
      <input type="text" placeholder='Type a Git user name' onChange={(e)=>handleChange(e)} value={user} />
    </div>
  )
}

export default SearchBar
