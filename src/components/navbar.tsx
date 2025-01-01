import { useState } from 'react'
import { useEffect } from 'react';
//import env file

type User={
    id:number,
    username:string
    email:string
    age:number
    password:string
    
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

const Navbar = () => {
    const [user, setuser] = useState<User|null>(null)
   

    const fetchuser = async () => {
        try {
            console.log("fetching user using effect")
            console.log(BACKEND_URL);
            console.log(`${BACKEND_URL}`);
            const response = await fetch(`${BACKEND_URL}`, {
                method: 'GET',
                credentials: 'include', 
              })

              console.log("fetch user responser:",response)
            if (!response.ok) {
                console.log("error in getting user")
                setuser(null);
                return;
            }
           
                const data = await response.json();
            if (data.success) {
                console.log("found user",data.user)
                setuser(data.user);
                

            }
            else {
                console.log("User not logged in.");
                setuser(null);
                
            }
        
        console.log("(!user) value",!user)
        } catch (err) {
            console.log(err)
            setuser(null);
        }

    }
    
    const handlelogout = async () => {
        console.log("logout hitted")
        try {
            console.log(BACKEND_URL);
            console.log(`${BACKEND_URL}logout`);
            const response = await fetch(`${BACKEND_URL}logout`, {
                method: 'GET',
                credentials: 'include', 
              })
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setuser(null);
                    window.location.href = "/login";
                }
                
                
            }
            else {
                throw new Error(`Logout failed with status ${response.status}`);
            }
            
        } catch (err) {
            console.error("Error during logout:", err);
        }
    }
     
    useEffect(() => {
        console.log("useeffect")
        const getUser = async () => {
             await fetchuser();   
        }
        getUser();
    }, [])





    return (
        <div>


            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="title text-white text-3xl font-bold">BLOG BYTES </div>

                    <div className="hidden w-full md:block md:w-auto" >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">Home</a>
                            </li>
                           

                           {user?
                           (<>
                            
                            <li>
                            <a href='/createpost' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create Post</a>
                        </li>
                        <li>
                        <a href="#" onClick={handlelogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                    </li>
                    </>
                           ):
                           (<>
                           <li>
                                <a href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log in</a>
                            </li>
                           <li>
                                <a href="/signup" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign up</a>
                            </li>
                           </>
                            
                    )}
                            

                            
                            
                          


                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
