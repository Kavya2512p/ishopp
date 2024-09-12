import axios from 'axios';
import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Context = createContext();

export default function Main(props) {
  
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [categoryImageBaseUrl, setCatImgUrl] = useState("");
  const [product, setProduct] = useState([]);
  const [productImageBaseUrl, setProdImgUrl] = useState("");

  const notify = (msg, status) => toast(msg, { type: status ? 'success' : "warning" });

  const API_BASE_URL = 'http://localhost:5000'
  const CATEGORY_URL = '/category';
  const PRODUCT_URL = '/product';
  const COLOR_URL = '/color';

  const fetchColor = (id = null ) => {
    let API = API_BASE_URL + PRODUCT_URL;
    if (id) {
      API += `/${id}`;
    }
    axios.get(API)
      .then(
        (success) => {
          // console.log(success.data);
          if (success.data.status == 1) {
            setColor(success.data.colors);

          } else {
            setColor([]);
          }
        }
      )
      .catch(
        (error) => {
          // console.log(error.message);
          setProduct([]);
        }
      )
  }

  const fetchProducts = (id = null, category_slug= null, price_start = null, price_end = null, color_id= null  ) => {
    const query = new URLSearchParams();
    if(category_slug != null ) query.append("category_slug", category_slug);
    // if(price_start != null ) query.append("price_start", price_start);
    // if(price_end != null ) query.append("price_end", price_end);
    // console.log(query.toString());
    
    if(color_id != null)  query.append("color_id", color_id);
    if (
      (price_start != null && price_start != "")
      &&
      (price_end != null && price_end != "")
    ) {
      query.append("price_start", price_start);
      query.append("price_end", price_end);
    }
    
    let API = API_BASE_URL + PRODUCT_URL;
    if (id) {
      API += `/${id}`;
    }
    API += `?${query}`;
    axios.get(API)
      .then(
        (success) => {
          // console.log(success.data);
          if (success.data.status == 1) {
            setProduct(success.data.products);
            // console.log(success.data.products);
            setProdImgUrl(success.data.image_base_url);
          } else {
            setProduct([]);
          }
        }
      )
      .catch(
        (error) => {
          // console.log(error.message);
          setProduct([]);
        }
      )
  }

  const fetchCategory = (id = null) => {
    let API = API_BASE_URL + CATEGORY_URL;
    //localhost:5000/category
    if (id) {
      API += `/${id}`;
      //localhost:5000/category/we234324343232
    }
    // console.log("Fetch Category");
    axios.get(API)
      .then(
        (success) => {
          // console.log(success.data);
          if (success.data.status == 1) {
            setCategory(success.data.category);
            setCatImgUrl(success.data.image_base_url);
          } else {
            setCategory([]);
          }
        }
      )
      .catch(
        (error) => {
          // console.log(error)
          setCategory([]);
        }
      )
  }


  return (
    <Context.Provider value={{
      fetchProducts, color, fetchColor, product, productImageBaseUrl, API_BASE_URL,
      categoryImageBaseUrl, category, fetchCategory, notify, CATEGORY_URL, PRODUCT_URL
    }}>
      <ToastContainer />
      {props.children}
    </Context.Provider>
  )
}

export { Context };