import  { useState } from 'react'
import Navbar from './components/navbar'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

const Loginpage = () => {
    const [username, setusername] = useState("")
    const [Password, setpassword] = useState("")


    const handleusernamechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setusername(e.target.value)
        }
    
    const handlepasswordchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setpassword(e.target.value)
        }

    const handlelogin= async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
         e.preventDefault()
         const body={
            username:username,
            password:Password
        }
        console.log(body)
        try {
            console.log(BACKEND_URL)
            console.log(`${BACKEND_URL}/login`)
            const response= await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                 credentials: 'include',
                
            })
            console.log(response)
    
            if(!response.ok){
               alert("wrong credentials")
                
            }
            const data=await response.json();
            if(data.success){
             // redirect to / endpoint
                window.location.href="/";
            }
            else{
                alert("wrong credentials")
                window.location.href="/login"
            }
        } catch (err) {
            console.log(err)
        }
        
    }

  return (
    <>
     <Navbar></Navbar>
    <div className= "bg-slate-900  min-h-screen text-white text-center font-bold text-5xl p-10">
    <h1 className=''>LOGIN</h1>
    <div className='flex flex-col justify-center items-center p-8 gap-8'>
    <input type="text" value={username} onChange={handleusernamechange} id="default-input" placeholder='Username' className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    <input type="password" value={Password} onChange={handlepasswordchange} id="default-input" placeholder='Password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    <button type="button" onClick={handlelogin} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">login</button>
    </div>


    </div>
    </>
  )
}

export default Loginpage
