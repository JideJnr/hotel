import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Suspence from './Suspence';
import Main from './Main';
import Login from './pages/Login';
import Facebook from './Facebook';
import AuthProvider from './context/auth'
import AdminProfile from './component/AdminProfile';
import Expenses from './pages/Expenses';
import Test from './component/Test';
import Signup from './pages/Signup';
import Hotel from './pages/Hotel';
import NotFound from './pages/NotFound';
import Receipt from './component/Receipt';
import StaffProfile from './component/StaffProfile';
import Chat from './pages/chat/Chat';
import AllCustomer from './component/AllCustomer';


function App() {
  return (
    <AuthProvider>

    
      <BrowserRouter>      
        <Suspense fallback={<Suspence/>}>
        
          <Routes>
            <Route path='/ac' element={<AllCustomer/>}/> 
            <Route path='/c' element={<Chat/>}/> 
            <Route path='/apc' element={<AdminProfile/>}/> 
            <Route path='/pc' element={<StaffProfile/>}/> 
            <Route path='/r' element={<Receipt/>}/>  
            <Route path='/s' element={<Signup/>}/>
            <Route path='/h' element={<Hotel/>}/>
            <Route path='/t' element={<Test/>}/>
            <Route path='/e' element={<Expenses/>}/>
            
            
            <Route path='/l' element={<Login/>}/>
            <Route path='/' element={<Main/>}/>

            <Route path='/*'element={<NotFound/>}/> 
          </Routes>

        </Suspense>
    </BrowserRouter>

    </AuthProvider>
 
  );
}

export default App;