
import App from './App.tsx'
import './index.css'
import Signup from './signuppage.tsx'
import Loginpage from './loginpage.tsx'
import Errorpage from './components/errorpage.tsx'

import ReactDOM from 'react-dom/client'
import Createpost from './createpost.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Blogpage from './blogpage.tsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Errorpage/>
  },
  {
    path:'/login',
    element:<Loginpage/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
  {
    path:'/createpost',
    element:<Createpost/>
  },  
  {
  path:'/updatepost/:id',
  element:<Createpost/>
  },
  {
    path:'/blog/:id',
    element:<Blogpage/>
  }

  
   
])

const rootElement=document.getElementById('root');
try {
  if(!rootElement){
    throw new Error("Root element not found");
  }
} catch (err) {
  console.log(err)
  
}

const root=ReactDOM.createRoot(rootElement as HTMLElement);


root.render(
  // <StrictMode>
    <RouterProvider router={router}/>
  // </StrictMode>,
)
