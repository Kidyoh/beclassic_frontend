"use client";

import React, {useEffect, useState} from 'react'

function Order() {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [packages, setPackages] = useState('VIP');
    const [message, setMessage] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormnotSubmitting, setIsFormnotSubmitting] = useState(false);



    useEffect(() => {
        if (isFormSubmitted || isFormnotSubmitting) {
          const timer = setTimeout(() => {
            setIsFormSubmitted(false);
            setIsFormnotSubmitting(false);
          }, 4000);
    
          return () => clearTimeout(timer);
        }
      }, [isFormSubmitted, isFormnotSubmitting]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:1337/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data:{
                 Email: email, 
                 Phone: phone, 
                 Packages: packages, 
                 Request: message 
                }
                
                }),
        })
         if (res.ok) {
        // Order submitted successfully
        console.log('Success submitting the form.');
        setIsFormSubmitted(true);
        
        // TODO:  Redirect to confirmation page
      } else {
        console.error('Error submitting the form.');
        setIsFormnotSubmitting(true);
      }
    } 



  return (
    
    <div className="flex justify-center items-center h-screen">
         {isFormSubmitted && (
    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
            <div className="py-1">
                <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34 8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
            </div>
            <div>
                <p className="font-bold">Success!!</p>
                <p className="text-sm">You have succesfully submitted your order, we will get back to you soon!</p>
            </div>
        </div>
    </div>
)}

{isFormnotSubmitting && (
    <div role="alert">
    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
      Error
    </div>
    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
      <p>Something in your order is wrong, check your email or phone.</p>
    </div>
  </div>
  )}
        <div className="max-w-md"></div>
       
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2" for="email'>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email"' />
            </label>
            </div>
            <div className='mb-6'>
            <label  className='block text-gray-700 text-sm font-bold mb-2" for="username'>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Phone Number"' />
            </label>
            </div>
            <div className="inline-block relative w-64 mb-4">
          <label htmlFor="packages">Packages:</label>
          <select
            id="packages"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={packages}
            onChange={(e) => setPackages(e.target.value)}
          >
            <option value="VIP">VIP</option>
            <option value="VVIP">VVIP</option>
            <option value="DELUXE">DELUXE</option>
          </select>
        </div>
            <div>
            <label>
                Message:
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Phone Number"' />
            </label>
            </div>
            <button>Submit</button>
        </form>
        

    </div>
  )
}

export default Order