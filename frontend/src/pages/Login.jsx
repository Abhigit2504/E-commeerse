// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Sign Up'); // 'Sign Up' or 'Login' state
//   const { token, setToken, navigate, backEndUrl } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const hardcodedUrl = 'http://localhost:4000'; // Ensure this URL is correct
//       if (currentState === 'Sign Up') {
//         const response = await axios.post(hardcodedUrl + '/api/user/register', { name, email, password });
//         console.log(response.data)
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success('Registration successful');
//         } else {
//           toast.error(response.data.message);
//         }
//       } else if (currentState === 'Login') {
//         const response = await axios.post(hardcodedUrl + '/api/user/login', { email, password });
//         console.log(response.data)
//         if (response.data.success) {
//           setToken(response.data.token);
//           navigate('/home');
//           toast.success('Login successful');
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Something went wrong, please try again');
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="prata-regular text-3xl">{currentState}</p>
//         <hr className="border-null h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {currentState === 'Sign Up' && (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//           type="text"
//           required
//         />
//       )}
//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         type="email"
//         required
//       />
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         type="password"
//         required
//       />

//       <button className="bg-black text-white font-light px-8 py-2 mt-4 border rounded">
//         {currentState === 'Login' ? 'Log In' : 'Sign Up'}
//       </button>

//       {/* Link to toggle between Sign Up and Login */}
//       <div className="mt-4 flex gap-4">
//         <button type="button" onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}>
//           {currentState === 'Login' ? 'Create an Account' : 'Already have an account? Login'}
//         </button>
//       </div>

//       {/* "Forgot Password" link below */}
//       {currentState === 'Login' && (
//         <div className="mt-4">
//           <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
//         </div>
//       )}
//     </form>
//   );
// };

// export default Login;


import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
// import { Toast } from 'bootstrap';
import { toast } from 'react-toastify';
// import { Button, Form } from 'react-bootstrap';


const Login = () => {

  const [currentState,setCurrentState] =useState('Login');
  const {token,setToken,navigate,backendUrl} =useContext(ShopContext)

  const [name,setName] =useState('')
  const [password,setPassword] =useState('')
  const [email,setEmail] =useState('')


  const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
          const hardcodedUrl = 'https://e-commeerse.onrender.com'; // Ensure this URL is correct
          if (currentState === 'Sign Up') {
            const response = await axios.post(hardcodedUrl + '/api/user/register', { name, email, password });
            
            if (response.data.success) {
              setToken(response.data.token);
              localStorage.setItem('token', response.data.token);
              toast.success('Registration successful');
            } else {
              toast.error(response.data.message);
            }
          } else if (currentState === 'Login') {
            const response = await axios.post(hardcodedUrl + '/api/user/login', { email, password });
            
            if (response.data.success) {
              setToken(response.data.token);
              localStorage.setItem('token', response.data.token);
              
              toast.success('Login successful');
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Something went wrong, please try again');
        }
      };

      useEffect(()=>{
        if(token){
          navigate('/home')
        }
      },[token])
    
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' action="">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>
            {currentState}
          </p>
          <hr className='border-null h-[1.5px] w-8 bg-gray-800'/>

      </div>
      {currentState == 'Login' ?' ' :<input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' type="text" required/>
      }
       <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' type="email" required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' type="password" required/>
      <div className='w-full flex justify-between text-sm mt-[-8px] cursor-pointer'>
        <p className='cursor-pointer '>Forgot your password</p>
        {
          currentState =='Login' ? <p onClick={()=>setCurrentState('Sign Up')}>Create account</p> 
                                  :<p onClick={()=>setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 border rounded'>{currentState =='Login' ? 'Log In' :'Sign Up'}</button>
    </form>
  )
}

export default Login