import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import HistoryPage from '../pages/HistoryPage'
import PredictionPage from '../pages/PredictionPage'
import NotFound from '../components/NotFound'
import Dashboard from '../components/Dashboard'
import Profile from '../components/Profile'
import AuthenticationPage from '../pages/AuthenticationPage'
import ProtectedRoutes from './ProtectedRoutes'
import UploadPage from '../pages/UploadPage'

const Router = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/history' element={<HistoryPage/>}/>
            <Route path='/prediction' element={<ProtectedRoutes element={<PredictionPage/>}/>}/>
            <Route path='/upload' element={<UploadPage/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/dashboard' element={<ProtectedRoutes element={<Dashboard/>}/>}/>
            <Route path='/profile' element={<ProtectedRoutes element={<Profile/>}/>}/>
            <Route path='/signin' element={<AuthenticationPage/>}/>
            <Route path='/signup' element={<AuthenticationPage/>}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default Router
