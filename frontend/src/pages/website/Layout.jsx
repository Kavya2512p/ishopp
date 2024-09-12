import React from 'react'
import Footer from '../../components/website/Footer';
import Header from '../../components/website/Header';
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer/>
        </div>
    )
}
