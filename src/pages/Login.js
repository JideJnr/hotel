import React, {useState} from 'react'
import {auth, db} from '../firebase'
import {  signInWithEmailAndPassword} from 'firebase/auth'
import {Link, useNavigate } from 'react-router-dom';
import {addDoc, doc,  updateDoc,  Timestamp, collection } from 'firebase/firestore';
import logo from './../assets/logo.png'





const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setloading] = useState('');
    const isInvalid = password === '' || email === '' ;
    const navigate = useNavigate()
  
    


    
    const handleSubmit= async (e) => {
      e.preventDefault();
     
      if ( email==='' || password===''){
          setError('Input All Fields!!!');
      }
      try{
          const result = await signInWithEmailAndPassword( auth, email, password);
        
  
      


          navigate('/');
          
      }
      catch(err){
          
  
      }
  };



    return (
        

<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm ]">
  <div className='bg-[#511e54] w-full'>

  <img
    className="mx-auto h-10 w-auto"
    src={logo}
    alt="Your Company"
  />

  </div>
  
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    Sign in to your account
  </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" action="#" method="POST">
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          onChange={({ target }) => setEmail(target.value)}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div className="text-sm">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="mt-2">
        <input
          id="password"
          onChange={({ target }) => setPassword(target.value)}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleSubmit}
        loading={loading}
      >
        Sign in
      </button>
    </div>
  </form>

  <p className="mt-10 text-center text-sm text-gray-500">
    Not a member?{' '}
    <Link to='/s' >
    <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        Submit Your Resume
    </a>
    </Link>
  </p>
</div>
</div>
  )
}

export default SigninForm