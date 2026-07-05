

import { getCategories } from '@/api/server-api';
import React from 'react'
import { FaEdit} from "react-icons/fa";

import Link from 'next/link';
import StatusBtn from '@/components/admin/StatusBtn';
import DeleteBtn from '@/components/admin/DeleteBtn';



export default async function category () {

  let categories =[];
  let meta = {};


  try {
      const res = await getCategories();
      // categories = res.data.data;
      // meta = res.data.meta;

       categories = res?.data || [];   
  meta = res?.meta || {}; 
console.log("FULL RESPONSE:", res);

    
  } catch (error) {
    console.log(error)
    
  }

  return (
    <div className="p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-500 text-sm">
            Manage users, roles and status
          </p>
        </div>

        <Link  href="/admin/category/add">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          + Add category
        </button></Link>

        
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          
          {/* Head */}
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th>slug</th>
             
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            
            {categories.length === 0 ? (
  <tr>
    <td colSpan="5" className="text-center p-4">
      No category found
    </td>
  </tr>
)  :
            categories.map((cat) => (
              <tr key={cat._id} className="border-t hover:bg-gray-50">
                
                <td className="p-4 font-medium"><img className='object-cover rounded-lg' src={meta.imageBaseUrl + cat.image || "https://previews.123rf.com/images/ionutparvu/ionutparvu1612/ionutparvu161201044/67602567-category-stamp-sign-text-word-logo-red.jpg"} width={24} height={24} alt={cat.image} /></td>
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="text-gray-500">{cat.slug}</td>
                <td className="text-gray-500"> 
                  <StatusBtn value ={cat.status} id={cat._id} field ="status" /> 
                  <StatusBtn value ={cat.Is_home} id={cat._id} field = "Is_home" /> 
                  <StatusBtn value ={cat.Is_top} id={cat._id} field = "Is_top"/> 
                  <StatusBtn value ={cat.Is_popular} id={cat._id} field = "Is_popular" /> 
                  </td>
                
                
               
                

                <td className="text-center space-x-3">
                  <Link href={`/admin/category/edit/${cat._id}`}> 
                  <button className="p-2 bg-yellow-100 text-yellow-600 rounded">
                    <FaEdit />
                  </button>
                  </Link>
                  

                <DeleteBtn API={`category/delete/${cat._id}`} />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}