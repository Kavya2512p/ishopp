import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Header from '../../components/admin/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='grid grid-cols-5'>
        <Sidebar/>
        <div className='border border-blue-600 col-span-4 min-h-[100vh]'>
            <Header />
            <Outlet/>
        </div>
    </div>
  )
}   
