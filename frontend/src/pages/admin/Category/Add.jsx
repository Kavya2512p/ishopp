import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { generateSlug } from '../../../library';
import axios from 'axios';
import { Context } from '../../../Context/Main';
import { useSelector } from 'react-redux';

export default function Add() {
  const { API_BASE_URL, notify, CATEGORY_URL } = useContext(Context);
  const admin = useSelector(store => store.admin);
  const nameRef = useRef();
  const slugRef = useRef();

  const getSlug = () => {
    const slug = generateSlug(nameRef.current.value);
    // console.log(slug);
    slugRef.current.value = slug;
  }

  const submitHandler = (e) => {
    // console.log(e.target.category_image.files[0]);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value.trim());
    formData.append("slug", slugRef.current.value);
    formData.append("category_image", e.target.category_image.files[0]);
    // console.log(admin.token);

    // console.log(API_BASE_URL+ CATEGORY_URL + "/create")
    // console.log(e.target.slug.value);
    axios.post(
      API_BASE_URL + CATEGORY_URL + "/create",
      formData,
      {
        headers: {
          Authorization: admin.token                ///////////??  admin.token
        }
      }

    ).then(
      (success) => {
        // console.log(success);
        if (success.data.status == 1) {
          e.target.reset();
        }
        notify(success.data.msg, success.data.status);
      }
    ).catch(
      (error) => {
        console.log(error);
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
                <Link
                  to="/admin/category"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Category
                </Link>
              </div>
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
                  Add
                </a>
              </div>
            </li>

          </ol>
        </nav>
      </div>
      <hr className='my-3' />

      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div className='grid grid-cols-2 gap-3'>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Name
            </label>
            <input
              onChange={getSlug}
              ref={nameRef}

              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

              required=""
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Slug
            </label>
            <input
              name='slug'
              ref={slugRef}
              readOnly
              type="text"
              id="slug"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Image
            </label>
            <input
              multiple={true}
              name='category_image'
              type="file"
              id="slug"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {/* </div> */}
      </form>

    </div>
  )
}
