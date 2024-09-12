// import axios from "axios";

const generateSlug = (title) =>{
    //Kitchen Accessories => "kitchen-accessories"
    // const slug =title.trim().toLowerCase().split(" ").join("-");

    const titleArr = title.trim().split(" "); //string to array
    console.log(titleArr);
    const fA= titleArr.filter(i=> i != "");
    const slug =fA.join("-").toLowerCase();  // array  to  string
    return slug;
}


export { generateSlug };