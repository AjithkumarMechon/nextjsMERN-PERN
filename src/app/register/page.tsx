"use client";

import { Spin } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
interface initialFormDataProps{
    username: string; password: string;   cpassword: string; name: string; email: string | null;  dob: Date | null; salary: number; work: string|null; weight: number;   height: number;    gender: string; education: string|null; mobile: string|null; role?: string; 
}

const Register: React.FC = () => {
  const {data:session, status}=useSession();
  const [pending, setPending] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const initialFormData:initialFormDataProps={
    username: '',
    password: '',
    cpassword:'',
    name:'',
    email: null,
    dob: null,
    salary: 0,  
    work: null,
    weight: 0,  
    height: 0, gender:'Male',education: null,mobile: null,
    role:"user"
  }
  const [formData, setFormData] = useState<initialFormDataProps>(initialFormData);
  useEffect(()=>{
    if (status === "authenticated" && session?.user) {
      setFormData({...formData, username:session?.user?.name??'', email:session?.user?.email??''})
    }
  },[session, status])

  const fetchData = async (value: initialFormDataProps)=>{
   setPending(true); // assuming you're setting loading state

try {
  const response = await axios.post("/api/auth/register", value, {
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 201) {
    toast.success("Registered successfully!");
    setFormData(initialFormData);
    // router.replace("/dashboard"); 
  }
} catch (error: any) {
  if (error.response) {
    toast.error(`${error.response.data.message || "Something went wrong!"}`);
    if (error.response.status === 409) {
      toast.error("User already exists");
    }
  } else if (error.request) {
    toast.error("No response from server. Please try again.");
  } else {
    toast.error(`${error.message}`);
  }
} finally {
  setPending(false);
}    
}
  
  useEffect(()=>{
      (formData.password===formData.cpassword) ? setIsButton(false) : setIsButton(true)
  },[formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    await fetchData(formData);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  const nullFields = ['education', 'mobile', 'work', 'email', 'dob'];
  const numberFields = ['height', 'weight', 'salary'];
  let newValue: any = value;
  if (nullFields.includes(name) && value.trim() === '') {
    newValue = null;
  } else if (name === 'dob') {
    newValue = value ? new Date(value) : null;
  } else if (numberFields.includes(name)) {
    newValue = value.trim() === '' ? null : Number(value);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};
    if (status === "loading") {
        return (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-white z-50">
            <Spin size="large" />
          </div>
        );
    }

  return (<>
    <button className="flex w-16 p-2 m-4 rounded-lg text-blue-300 border border-blue-400 justify-start items-start transition duration-300 hover:text-white hover:bg-blue-500"><a href="/login">Login</a></button>
    <div className='flex justify-center items-center text-center'>
      <form method="POST" action="/login" onSubmit={handleSubmit} >
      <h2 className='text-[24px] my-4'>Register Form</h2>
       <div className='flex my-2'>
        <h3 className='mr-8'>Username</h3> 
        <input name='username' type="text" value={formData.username} onChange={handleChange} className="px-3 py-2 ml-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="username"/>
        </div> 
             <div className='flex my-4'>
        <h3 className='mr-8'>Name</h3> 
        <input name='name' type="text" value={formData.name} onChange={handleChange} className="px-3 py-2 ml-24 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="name"/>
        </div> 
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Password</h3> 
        <input name='password' type="password" value={formData.password} onChange={handleChange} className="px-3 py-2 ml-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="new-password"/>
        </div>
          <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Confirm Password</h3> 
        <input name='cpassword' type="password" value={formData.cpassword} onChange={handleChange} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="new-password"/>
        </div>
                <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Mobile Number</h3> 
        <input name='mobile' type="string" value={formData.mobile??''} onChange={handleChange} className="ml-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Email</h3> 
        <input name='email' type="email" value={formData.email??''} onChange={handleChange} className="ml-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Date Of Birth</h3> 
        <input name='dob' type="Date" value={formData.dob ? formData.dob.toISOString().split('T')[0] : ''} onChange={handleChange} className="ml-12 w-54 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
              <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Education Qualification </h3> 
        <input name='education' type="text" value={formData.education??''} onChange={handleChange} className="ml-[-1.25rem] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-54"/>
        </div>
                    <div className='flex my-2 ml-1'>
        <h3 className='mr-8 pt-2'>Gender  </h3> 
        <div className='flex my-2 ml-1'>
          <select name="gender" id="gender" value={formData.gender}  onChange={handleChange} autoComplete="gender" className='border-1 rounded p-2 ml-22 w-54'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        </div>
                        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Height</h3> 
        <input name='height' type="number" value={formData.height} onChange={handleChange} className="ml-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
                        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Weight </h3> 
        <input name='weight' type="number" value={formData.weight} onChange={handleChange} className="ml-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
                        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Work </h3> 
        <input name='work' type="text" value={formData.work??''} onChange={handleChange} className="ml-27 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
                        <div className='flex my-2 ml-1'>
        <h3 className='mr-8'>Salary</h3> 
        <input name='salary' type="number" value={formData.salary} onChange={handleChange} className="ml-25 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className='flex justify-center align-middle'>
       <button disabled={isButton} type="submit"   className={`border border-blue-500 text-blue-500 mt-4 px-4 py-2 rounded-lg transition duration-300 ${isButton ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}`}>{pending ? "Loading..." : "Register"}</button>
        </div>
      </form>
    </div></>
  );
};


export default Register;