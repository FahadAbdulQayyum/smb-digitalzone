import { useState } from 'react';
import LogoComponent from '../Logo';
import Button from '@/app/Screen/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
        // Call the logout API route
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Clear local storage and reset user info
            localStorage.clear();

            // Redirect to the sign-in page
            router.push('/login');
        } else {
            alert('Failed to log out. Please try again.');
        }
    } catch (err) {
        console.error('Error during logout:', err);
        alert('An error occurred. Please try again.');
    } finally {
    }
};

  return (
    <div className="bg-gradient-to-b from-gray-800 to-indigo-900 p-4 h-screen w-64">
      <div className="flex flex-col items-center justify-between mb-4 w-full">
        <LogoComponent size={4} />
        <Button title="Search for" style='border-colorful' ic="" lic="mdi:search" wide={true} cntr={false}/>
      </div>
      <nav>
        <ul className='space-y-3 space-x-0'>
          <li className='pt-5'>
            <Button
                title="Dashboard"
                style="border-colorfull"
                ic=""
                lic="mdi:home"
                wide={true}
                cntr={false}
            />
          </li>
          <li className="flex items-center space-x-1 py-2 px-4 cursor-pointer rounded-lg bg-boxColor text-white border-gray-100"><Icon icon="mdi:notifications"/><p>Notifications</p></li>
          <li className="flex items-center space-x-1 py-2 px-4 cursor-pointer rounded-lg bg-boxColor text-white"><Icon icon="mdi:account"/><p className='flex items-center justify-between w-full'><span>Users</span><span><Icon icon="mdi:arrow-drop-down" fontSize={25}/></span></p></li>
          <li className="flex items-center space-x-1 py-2 px-4 cursor-pointer rounded-lg bg-boxColor text-white"><Icon icon="mdi:post"/><p>Flagged Posts</p></li>
          <li className="flex items-center space-x-1 py-2 px-4 cursor-pointer rounded-lg bg-boxColor text-white"><Icon icon="mdi:ads"/><p className='flex items-center justify-between w-full'><span>Advertisements</span><span><Icon icon="mdi:arrow-drop-down" fontSize={25}/></span></p></li>
          <li className="flex items-center space-x-1 py-2 px-4 cursor-pointer rounded-lg bg-boxColor text-white"><Icon icon="mdi:checkbook"/><p className='flex items-center justify-between w-full'><span>Blogs</span><span><Icon icon="mdi:arrow-drop-down" fontSize={25}/></span></p></li>
        </ul>
      </nav>
      <button className="flex items-center space-x-1 mt-10 bg-boxColor text-start text-white px-4 py-2 w-full rounded hover:bg-gray-600">
      <Icon icon="mdi:logout"/>
        <p onClick={handleLogout}>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;