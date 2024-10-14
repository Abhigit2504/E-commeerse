// import Add from './pages/Add'
// import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Add from './pages/Add';
import List from './pages/List';

export const backEndUrl = "http://localhost:4000"; // Example
export const currency = "₹"

function App() {
  const [count, setCount] = useState(0)
  const [token,setToken]  =  useState(localStorage.token)
  useEffect(()=>{
  setToken(localStorage.token)
  },[localStorage.token])
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <Login setToken={setToken} />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <Add  token={token}/> */}
      <Orders  token={token}/>
    </>
  )
}

export default App
