"use client"; // Mark this file as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Button from '@/app/Screen/Button';
import LogoComponent from '../Logo';

export default function SignupComponent() {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Correct useRouter for App Router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Login attempt:', { email, password }); // Log the login attempt

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Signup successful!');
      router.push('/login'); // Redirect to login page
    } else {
      alert(data.message); // Display error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 px-3 sm:px-0">
      <div className="text-center text-white">
        <LogoComponent size={32}/>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
        <div className='mb-6'>
            <span>
                <h1 className="text-2xl font-bold text-white">Create an Account!</h1>
                <p className="text-sm text-grayColor">Create a new account here.</p>
            </span>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-grayColor">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-boxColor text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-grayColor">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-boxColor text-white"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-grayColor">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-boxColor text-white"
          />
        </div>
        <Button style='bg-colorful' title='Sign Up' ic='' lic='' wide={true} cntr={true}/>
      </form>
    </div>
  );
}