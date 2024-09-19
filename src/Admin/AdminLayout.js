import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    return (
        <div className='relative min-h-screen bg-white'>
            <HeaderAdmin />
            <div className='flex'>
                <SidebarAdmin />
                <main className='flex-1 p-4'>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;