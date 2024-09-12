import React, { useContext } from 'react'
import { Context } from '../../Context/Main'
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../reducers/Cart';

export default function Product({ _id, main_image, original_price, final_price, name }) {
    const dispatcher = useDispatch();
    const { API_BASE_URL, productImageBaseUrl } = useContext(Context);
    return (
        <div className='shadow p-3'>
            <img src={API_BASE_URL + productImageBaseUrl + "/" + main_image} />
            <div className='text-center my-3 font-bold'>{name}</div>
            <div className='flex justify-center gap-3'>
                <span className='text-[#FF4858]'>${final_price}</span>

                <del>${original_price}</del>
            </div>
            <div className='flex justify-center w-full my-2'>
                <button onClick={
                    () => dispatcher(addToCart({
                        product_id: _id,
                        price: final_price
                        
                    }))}>
                    <FaCartPlus fontSize={20} />
                </button>
            </div>
        </div>
    )
}
