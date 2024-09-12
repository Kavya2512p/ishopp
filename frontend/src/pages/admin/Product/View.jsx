import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../Context/Main';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { GrGallery } from "react-icons/gr";
import { FaRegWindowClose } from "react-icons/fa";


export default function View() {
    const { productImageBaseUrl, API_BASE_URL, fetchProducts, product, PRODUCT_URL, notify } = useContext(Context);
    const [popup, setPopup] = useState(false);
    const [product_other_images, setOtherImage] = useState([]);
    const [product_id, setProductId] = useState(null);


    const multipleImagePopup = (p_id, other_images) => {
        setPopup(true);
        setOtherImage(other_images);
        setProductId(p_id);
    }

    const delImg = (index) => {
        // console.log(index);
        axios.get(`http://localhost:5000/product/delete-image/${index}/${product_id}`)
        .then(
            (success) =>{
                if(success.data.status){
                    fetchProducts();
                    const newArr = product_other_images.filter(
                        (d,i) =>{
                            return i != index;
                        }
                    )
                    setOtherImage(newArr);
                }
                notify(success.data.msg, success.data.status);
            }
        ).catch(
            (error) =>{

            }
        )
    }

    const otherImagesSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let other_image of e.target.other_images.files) {
            formData.append("other_images", other_image);
        }
        axios.post("http://localhost:5000/product/upload-other-images/" + product_id, formData)
            .then(
                (success) => {
                    // console.log(success);
                    if (success.data.status == 1) {
                        e.target.reset();
                        fetchProducts();
                        setPopup(false);
                    }
                    console.log(success.data);
                    notify(success.data.msg, success.data.status);

                }
            ).catch(
                (error) => {
                    console.log(error.message);
                }
            )
    }

    useEffect(
        () => {
            fetchProducts()
        }, []

    )

    // const changeStatus = (prod_id, new_status) => {
    //     axios.put(API_BASE_URL + PRODUCT_URL + "/change-status/" + prod_id + "/" + new_status)
    //         .then(
    //             (success) => {
    //                 if (success.data.status) {
    //                     fetchProducts();
    //                 }
    //                 notify(success.data.msg, success.data.status);
    //             }
    //         ).catch(
    //             (error) => {
    //                 notify("some client side error", false);
    //             }
    //         )
    // }

    // const deleteData = (prod_id, image_name) => {
    //     axios.delete(API_BASE_URL + PRODUCT_URL + `/delete/${prod_id}/${image_name}`)
    //         .then(
    //             (success) => {
    //                 console.log(success);
    //                 if (success.data.status == 1) {
    //                     fetchProducts();
    //                 }
    //                 notify(success.data.msg, success.data.status);
    //             }
    //         ).catch(
    //             () => {

    //             }
    //         )
    // }

    return (
        <>
            <div className='fixed flex-col top-0 justify-center items-center left-0 w-full h-full z-50 ' style={{ display: popup ? 'flex' : 'none', background: "rgba(0,0,0,0.7" }}>

                <div className='bg-white mb-2 p-3 w-[800px]'>
                    <form action="" onSubmit={otherImagesSubmit} className='relative'>
                        <FaRegWindowClose onClick={() => setPopup(false)} className="cursor-pointer absolute right-[20px] top-[10px]" fontSize={30} />
                        <label htmlFor="">Upload more images</label>
                        <br />
                        <input multiple={true} name="other_images" type="file" />
                        <button className='border border-black px-2 py-2'>Upload</button>
                    </form>

                </div>

                <div className='bg-white justify-center p-3 w-[800px] rounded grid grid-cols-4 gap-5 '>
                    {
                        product_other_images.length == 0
                            ? <h4>No images yet</h4>
                            :
                            product_other_images.map(
                                (image , index) => {
                                    return <div key={index}>
                                        <img  className='w-full' src={`${API_BASE_URL}${productImageBaseUrl}/${image}`} alt="" />
                                        <MdDelete onClick={()=> delImg(index)} fontSize={20} className='cursor-pointer' />
                                    </div>
                                }
                            )
                    }
                </div>

            </div>
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
                                        Product
                                    </a>
                                </div>
                            </li>

                        </ol>
                    </nav>

                    <Link to={"/admin/product/add"} className='py-1 border border-[#323a49] px-4 '>Add</Link>

                </div>

                <hr className='my-3' />
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name / Slug
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
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
                                Array.isArray(product)
                                &&
                                product.map(
                                    (prod) => {
                                        return (
                                            <tr key={prod._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    Name: {prod.name}
                                                    <br />
                                                    Slug: {prod.slug}
                                                </th>
                                                <td className="px-6 py-4">
                                                    Original: ${prod.original_price}
                                                    <br />
                                                    Discount: {prod.discount_percentage}%
                                                    <br />
                                                    Final: ${prod.final_price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <img width={100} src={`${API_BASE_URL}${productImageBaseUrl}/${prod.main_image}`} alt="" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {
                                                        prod.status
                                                            ? <button onClick={() => changeStatus(prod._id, false)}>Active</button>
                                                            : <button onClick={() => changeStatus(prod._id, true)}>Inactive</button>
                                                    }

                                                </td>
                                                <td className="px-6 py-4 flex gap-3">
                                                    <MdDelete onClick={() => deleteData(prod._id, prod.main_image)} className="cursor-pointer" fontSize={20} />
                                                    <Link to={`/admin/product/edit/${prod._id}`}>
                                                        <FaPen className="cursor-pointer" fontSize={20} />
                                                    </Link>
                                                    <GrGallery onClick={() => multipleImagePopup(prod._id, prod.other_images)} className='cursor-pointer' title='Other images' fontSize={20} />
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

        </>
    )
}
