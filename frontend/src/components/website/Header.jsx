import React, { useContext, useEffect, useState } from 'react'
import Container from './Container.jsx';
import { FaCaretDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Context } from "../../Context/Main.jsx";
import axios from 'axios';
import { changeQty } from '../../../reducers/Cart.js';
import { logout } from '../../../reducers/User.js';

// import { IoMdClose } from "react-icons/io";
// import Store from './Store.jsx';

// export default function Header() {
//   return (
//     <div>

//     </div>
//   )
// }

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { data: cartData, total: cartTotal } = useSelector(store => store.cart);
  const [products, setProduct] = useState([]);
  const user = useSelector(store => store.user);
  const dispatcher = useDispatch();
  // console.log("cartopen",cartOpen)


  useEffect(
    () => {
      axios.get("http://localhost:5000/product")
        .then(
          (success) => {
            setProduct(success.data.products);
          }
        ).catch(
          (error) => {

          }
        )
    }, []
  )

  const logoutHandler = ()=>{
      dispatcher(logout());
      navigator("/");
  }

  // console.log(cartData);
  // const user = {
  //   data: null
  // };
  const items = [
    {
      name: "home",
      url: "/"
    },
    {
      name: "Store",
      url: "/store"
    },
    {
      name: "Iphone",
      url: "/iphone"
    },
    {
      name: "Ipad",
      url: "/ipad"
    }, {
      name: "Macbook",
      url: "/macbook"
    }, {
      name: "Accessories",
      url: "accessories"
    }
  ]
  return (
    <>
      <div className=' w-[full] header-bg md:block  overflow-hidden'>
        <Container className="flex justify-between">
          <div className='flex gap-4 items-center'>
            <span>EN</span>
            <FaCaretDown />
            <span className='ml-3'>$ </span>
            <FaCaretDown />
          </div>
          {/* 
          <div className='flex gap-4 items-center'>
            <FaRegUser />
            <span>My profile</span>
            <IoBag />
            <span> 2 Items</span>
            <span className='text-grey'>$998</span>
          </div> */}

          <div className='flex items-center gap-2'>
            {
              user.data === null
                ? <Link to="/login">Login</Link>
                : <>
                  <FaUser />
                  <span>Hii, {user.data.name}</span>
                  <span style={{ cursor: "pointer" }} onClick={logoutHandler}>Logout</span>
                </>
            }

            <div className='cursor-pointer flex items-center' onClick={() => {
              setCartOpen(true);
              document.body.style.overflow = "hidden"
            }}>


              <IoBag />
              <span className='ml-3'>{cartData.length} Items</span>
            </div>
            <span className='opacity-[0.5]'>
              ${(cartTotal).toLocaleString()}
            </span>
          </div>
        </Container>
        <div onClick={() => setCartOpen(false)} className='fixed top-0 left-0 w-full h-full' style={{
          background: "rgba(0,0,0,0.7)",
          opacity: cartOpen ? 1 : 0,
          visibility: cartOpen ? "visible" : "hidden"
        }}></div>
        <aside className={`overflow-y-scroll w-[450px] h-[100vh] shadow-lg top-0 duration-[400ms]  absolute z-[99999] right-0 bg-white`}

          style={{
            transform: cartOpen ? "translateX(0)" : "translateX(450px)"
            // right: cartOpen ? 0 : '-450px',
            // visibility: cartOpen ? "visible" : "hidden",
            // opacity: cartOpen ? 1 : 0
          }}

        >
          <div className='p-2 font-lg '>
            <IoMdClose className='absolute' fontSize={25} onClick={
              () => {
                setCartOpen(false);
                document.body.style.overflow = ""
              }
            } />
            <div className='text-center text-2xl'>Cart Listing</div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
              <thead>
                <tr className='text-center'>
                  <th className='border-r'>Sr</th>
                  <th className='border-r'>Product</th>
                  <th className='border-r'>Qty</th>
                  <th className='border-r'>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length != 0 &&
                  cartData.map(
                    (cd, i) => {
                      const prod = products.find(p => cd.pId == p._id);
                      return <tr key={i} className='border-b border-t'>
                        <td className='border-r'>{i + 1}</td>
                        <td className="px-2 py-3 border-r">
                          <img width={100}
                            src={`http://localhost:5000/images/product/${prod?.main_image}`} alt="" />
                          <div className='mt-2'>
                            Name: {prod.name}
                          </div>
                          <div className='mt-2'>
                            Price: $ {prod.final_price}
                          </div>
                        </td>
                        <td className="px-2 py-3 border-r">
                          <button
                            onClick={() => {
                              dispatcher(
                                changeQty(
                                  {
                                    pId: prod._id,
                                    new_qty: cd.qty - 1,
                                    price: prod.final_price
                                  }
                                )
                              )
                            }}
                            className='p-2 border mx-2'>-</button>
                          {cd.qty}
                          <button
                            onClick={() => {
                              dispatcher(
                                changeQty(
                                  {
                                    pId: prod._id,
                                    new_qty: cd.qty + 1,
                                    price: prod.final_price
                                  }
                                )
                              )
                            }}
                            className='p-2 border mx-2'>+</button>
                        </td>
                        <td className="px-2 py-3">
                          $ {
                            (cd.qty * prod.final_price).toFixed(0)
                          }
                        </td>
                        <td className='px-2 py-3 border-l'>
                          <IoMdClose fontSize={25} />
                        </td>
                      </tr>

                    }
                  )
                }
              </tbody>
            </table>
          </div>
          <div className='p-3 bg-blue-600 sticky bottom-0 w-full text-white text-center text-xl'>Proceed to Checkout
            ${cartTotal.toLocaleString()}</div>
        </aside>
      </div>

      {/* </div> */}

      <Container>
        <div className='mt-[25px] px-3 flex md:justify-center justify-between'>
          <img className='' src="/images/iShop_logo.png" width={100} alt="" />
          <IoMdMenu className='text-3xl md:hidden' onClick={() => setToggle(true)} />
        </div>

        {/* <ul className='md:flex hidden gap-7  justify-center mt-5 uppercase'>
          {
            [1, 2, 3]
          }
          {
            items.map(
              (item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                )
              }
            )
          } */}



        <ul className='md:flex hidden gap-7  justify-center mt-5 uppercase'>
          {
            items.map(
              (item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                )
              }
            )
          }
        </ul>

        {/* responsive menu */}

        <div onClick={() => setToggle(false)} className={`duration-100  md:hidden responsive-menu ${toggle == false ? 'left-[-100%]' : 'left-0'}`}>
          <ul className='flex flex-col items-center gap-7 justify-center mt-[100px] uppercase text-black font-bold'>
            {
              items.map(
                (item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.url}>{item.name}</Link>
                    </li>
                  )
                }
              )
            }
            <li>
              <IoMdClose onClick={() => setToggle(false)} />
            </li>
          </ul>

        </div>

        {/* ---------------------------- */}


      </Container>

    </>
  );
}

export default Header;