import React from 'react'
import { useState } from 'react'
import Navbar from './components/navbar'
type User={
    id?:number,
    username:string
    email:string
    age?:number
    password:string
   
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const Signup = () => {
    const [user, setuser] = useState<User>({
        
        username:"",
        email:"",
        
        password:""
    })

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        
        setuser({...user,[e.target.id]:e.target.value})
        
    }

    

    const handlesignup=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault() 
        console.log("signup clicked")
        try {
            console.log("user state deatils:",user)
        //to avoid removing values when page refreshes  when clicking submit
        const body={
            ...user
        }
        const response= await fetch(`${BACKEND_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
             credentials: 'include'
        })
        const data=await response.json()
        if(data.success){
            console.log("signup successful")
            window.location.href="/login"
        }
        else{
            console.log("signup failed")
        }
            
        } catch (err) {
            console.log(err)
        }
        
        
        
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-slate-900  min-h-screen text-white text-center font-bold text-5xl p-8">
                <h1 className=''>SIGN UP</h1>
                <div className='flex flex-col justify-center items-center p-8 gap-8'>
                    <input type="text" value={user?.username} onChange={handlechange} id="username" placeholder='Username' className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <input type="text" value={user?.email} onChange={handlechange} id="email" placeholder='Email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    <input type="text" value={user?.age} onChange={handlechange} id="age" placeholder='Age' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    
                    <input type="password" value={user?.password} onChange={handlechange} id="password" placeholder='Password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    <button type="button" onClick={handlesignup} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</button>
                </div>


            </div>
        </div>
    )
}

export default Signup
