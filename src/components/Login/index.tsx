"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '../Logo';
import Button from '@/app/Screen/Button';
import Loader from '../Loader';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => setLoader(false), 2000); // Simulate loading for 2 seconds
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900">
      {/* Form always rendered */}
      <div className="text-center text-white">
        <LogoComponent size={32} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
        <div className="mb-6">
          <span>
            <h1 className="text-2xl font-bold text-white">Welcome Back, 👋</h1>
            <p className="text-sm text-grayColor">
              Sign in to your dashboard & start tracking your analytics.
            </p>
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

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-grayColor">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-boxColor text-white"
          />
        </div>

        <button
          type="button" // Changed to button to prevent form submission
          className="mb-2 text-grayColor px-4 py-2 w-full text-end"
        >
          Forgot Password?
        </button>
        <Button style="bg-colorful" title="Sign In" ic="" lic="" wide={true} cntr={true} />
      </form>

      {/* Conditionally render Loader */}
      {loader && <Loader />}
    </div>
  );
}















// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import LogoComponent from '../Logo';
// import Button from '@/app/Screen/Button';
// import Loader from '../Loader';

// export default function LoginComponent() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loader, setLoader] = useState(false); // State to control the loader visibility
//   const router = useRouter(); 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoader(true); // Show loader
//     setTimeout(() => setLoader(false), 2000); // Hide loader after 2 seconds
//   }

// // const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       // Send login request to the API
// //       const response = await fetch('/api/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         // Handle error response
// //         alert(data.message || 'Login failed');
// //         setError(data.message || 'Login failed');
// //         return;
// //       }

// //       // Save the token in local storage or cookies
// //       localStorage.setItem('token', data.token);
// //       localStorage.setItem('userId', data.userId);
// //       localStorage.setItem('userName', data.userName);

// //       // Redirect to the dashboard
// //       router.push('/dashboard');
// //     } catch (error) {
// //       console.error(error);
// //       setError('Something went wrong. Please try again.');
// //     }
// //   };

//   return (
//   <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900">
//       <div className="text-center text-white">
//         <LogoComponent size={32}/>
//       </div>

//       <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
//         <div className='mb-6'>
//             <span>
//                 <h1 className="text-2xl font-bold text-white">Welcome Back, 👋</h1>
//                 <p className="text-sm text-grayColor">Sign in to your dashboard & start tracking your analytics.</p>
//             </span>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-grayColor">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="example@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-boxColor text-white"
//           />
//         </div>

//         <div className="mb-2">
//           <label htmlFor="password" className="block text-sm font-medium text-grayColor">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="At least 8 characters"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-boxColor text-white"
//           />
//         </div>

//         <button
//           type="submit"
//           className="mb-2 text-grayColor px-4 py-2 w-full text-end"
//         >
//           Forgot Password?
//         </button>
//         <Button style='bg-colorful' title='Sign In' ic='' lic='' wide={true} cntr={true}/>
//       </form>
//       <p className="absolute p-20 bg-slate-500 text-white blur-lg">Loading...</p>
//     </div>
//   )
//  }