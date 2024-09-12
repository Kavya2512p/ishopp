import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/Main';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import axios from 'axios';
// import { applyDefaults } from '../../../../../backend/models/CategoryModel';

export default function View() {
    const { categoryImageBaseUrl, API_BASE_URL, fetchCategory, category, CATEGORY_URL, notify } = useContext(Context);

    useEffect(
        () => {
            fetchCategory();
        }, []
    )

    const changeStatus = (cat_id, new_status) => {
        axios.put(API_BASE_URL+CATEGORY_URL + "/change-status/" +cat_id+ "/" + new_status)
        .then(
            (success)=>{
                if(success.data.status){
                    fetchCategory();
                }
                notify(success.data.msg, success.data.status);
            }
        ).catch(
            (error)=>{
                notify("some client side error",false);
            }
        )
    }

    const deleteData = (cat_id, image_name) =>{
        axios.delete(API_BASE_URL + CATEGORY_URL+ `/delete/${cat_id}/${image_name}`)
        .then(
            (success) =>{
                console.log(success);
                if(success.data.status == 1){
                    fetchCategory();
                }
                notify(success.data.msg, success.data.status);
            }
        ).catch(
            ()=>{

            }
        )
    }

    return (
        <div className='p-5 shadow rounded-lg m-9'>


            <div className='flex justify-between items-center '>

                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <a
                                    href="#"
                                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Category
                                </a>
                            </div>
                        </li>

                    </ol>
                </nav>

                <Link to={"/admin/category/add"} className='py-1 border border-[#323a49] px-4 '>Add</Link>

            </div>

            <hr className='my-3' />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Category name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(category)
                            &&
                            category.map(
                                (cat,i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {cat.name}
                                            </th>
                                            <td className="px-6 py-4">{cat.slug}</td>
                                            <td className="px-6 py-4">
                                                <img width={100} src={`${API_BASE_URL}${categoryImageBaseUrl}/${cat.image_name}`} alt="" />
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    cat.status
                                                        ? <button onClick={() => changeStatus(cat._id,false)}>Active</button>
                                                        : <button onClick={() => changeStatus(cat._id,true)}>Inactive</button>
                                                }

                                            </td>
                                            <td className="px-6 py-4 flex gap-3 h-full">
                                                <MdDelete  onClick={() => deleteData(cat._id, cat.image_name)} className="cursor-pointer" fontSize={20}/>
                                                <Link to={`/admin/category/edit/${cat._id}`}>
                                                <FaPen className="cursor-pointer" fontSize={20}/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }


                    </tbody>
                </table>
            </div>


        </div>
    )
}
