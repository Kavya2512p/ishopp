import React, { useEffect, useRef, useState } from 'react'
import { BiCategory } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../reducers/Admin';


export default function Sidebar() {
  const [isActive, setIsActive] = useState(true);
  const history = useLocation();
  const timeoutRef = useRef(null);
  const admin = useSelector(store => store.admin);
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  // const AUTO_LOGOUT_TIME = 0.5 * 60 * 1000; // 2 minutes in milliseconds


  // useEffect(() => {
  //   console.log('hii');
  //   const handleActivity = () => {
  //     setIsActive(true);
  //   };

  //   const resetTimeout = () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //     timeoutRef.current = setTimeout(() => {
  //       handleLogout();  //dispatcher(logout());
  //       console.log('hii timeout');
  //     }, AUTO_LOGOUT_TIME);
  //   };

  //   const handleLogout = () => {
  //     console.log('logout handler called');

  //     // clear user session data or tokens
  //     dispatcher(logout());
  //     //Redirect to login page
  //     navigator("/admin/login");
  //     // history.push('/login');
  //   };

  //   window.addEventListener('mousemove', handleActivity);
  //   window.addEventListener('keydown', handleActivity);
  //   window.addEventListener('click', handleActivity);
  
  
  //   if (isActive) {
  //     setIsActive(false);
  //     resetTimeout();
  //   }
  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //     window.removeEventListener('mousemove', handleActivity);
  //     window.removeEventListener('keydown', handleActivity);
  //     window.removeEventListener('click', handleActivity);
  //   };
  // // }
  // }, [isActive, history]
  // );



useEffect(
  () => {
    const lsAdmin = localStorage.getItem("admin");
    const lsToken = localStorage.getItem("token");
    console.log(lsToken);
    if (lsAdmin) {
      dispatcher(
        login({ admin: JSON.parse(lsAdmin), token: lsToken }));
    }

  }, []
)

useEffect(
  () => {
    const lsAdmin = localStorage.getItem("admin");
    if (admin.data == null && lsAdmin == undefined) {
      navigator("/admin/login");
    }
  }, [admin.data]
)

const menu = [
  {
    group_name: "Settings",
    items: [
      {
        name: "Dashboard",
        icon: <AiFillDashboard />,
        url: "/admin",
        display: true
      },
      {
        name: "Account settings",
        icon: <AiFillDashboard />,
        url: "/admin/account-setting",
        display: true
      }
    ]

  },
  {
    group_name: "Dynamic data",
    items: [

      {
        name: "Category",
        icon: <BiCategory />,
        url: "/admin/category",
        display: true
      },
      {
        name: "Product",
        icon: <BiCategory />,
        url: "/admin/product",
        display: true
      },
      {
        name: "Color",
        icon: <AiOutlineProduct />,
        url: "/admin/color",
        display: true
      },
      {
        name: "Accessories",
        icon: <AiOutlineProduct />,
        url: "/admin/accessories",
        display: true
      }
    ]
  },
  {
    group_name: "User",
    items: [
      {
        name: "User",
        icon: <FaRegUserCircle />,
        url: "/admin/users",
        display: true
      },
      {
        name: "Admins",
        icon: <FaRegUserCircle />,
        url: "/admin/list-admins",
        display: admin?.data?.admin_type
      }
    ]
  }

  ,
  {
    group_name: "Order",
    items: [
      {
        name: "Orders",
        icon: <FaRegUserCircle />,
        url: "/admin/orders",
        display: true
      },
      {
        name: "Transactions",
        icon: <GrTransaction />,
        url: "/admin/transaction",
        display: true
      }
    ]
  }


]

return (
  <div className=' bg-[#323a49] min-h-[100vh]'>
    <div className='text-2xl text-center my-3 text-white font-bold'>
      Admin Panel
    </div>
    <hr />
    <ul>
      {
        menu.map(
          (g, i) => {
            return <React.Fragment key={i}>
              <b className='px-3 uppercase test-sm text-gray-100 block my-2'>{g.group_name}</b>
              {
                g.items.map(
                  (m, i) => {
                    return <li key={i} style={{
                      display: m.display == true ? 'block' : 'none'
                    }} className='group hover:bg-gray-900 mb-3 px-5 py-2 text-white'>
                      <Link to={m.url} className='flex text-[18px] items-center gap-2'>
                        {m.icon} <span className='duration-100 group-hover:ml-2'>{m.name}</span>

                      </Link>
                    </li>
                  }
                )
              }

              <hr className='border-gray-500' />
            </React.Fragment>
          }
        )
      }
      <hr />
      <li onClick={() => dispatcher(logout())} className='cursor-pointer group hover:bg-gray-900 mb-3 px-5 py-2 text-white'>
        Logout
      </li>
    </ul>
  </div>
)
}
