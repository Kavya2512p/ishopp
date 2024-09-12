import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/website/Container';
import { Context } from "../../Context/Main";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Product from '../../components/website/Product';

export default function Store() {
    const { category, color, fetchColor, fetchCategory, productImageBaseUrl, product, fetchProducts } = useContext(Context);
    const { category_slug } = useParams();
    const navigator =useNavigate();
    const [searchParams, setSeachParams] = useSearchParams();
    const [range, setRange] = useState({
        start: "",
        end: ""
    })

    const clearFilter = () => {
        setRange(
            {
                start: "",
                end: ""
            }
        )
        navigator("/store");
    }
    useEffect(
        () => {
            if (range.start != "" && range.end != "") {
                setSeachParams({
                    start: range.start,
                    end: range.end
                })
            }
        },
        [range]
    )

    useEffect(
        () => {
            fetchCategory();
            fetchColor();
            if (searchParams.get("start") && searchParams.get("end")) {
                setRange({
                    start: Number(searchParams.get("start")),
                    end: Number(searchParams.get("end"))
                })
            }
        }, []
    )
    useEffect(
        () => {
            fetchProducts(null, category_slug ?? null, range.start, range.end)
        }, [category_slug, range]
    )

    return (
        <Container className=" grid grid-cols-5">
            <div className=''>
                <CategoryFilter total_products={product?.length} product={product} category_slug={category_slug} data={category} />
                <PriceFilter clearFilter={clearFilter} range={range} setRange={setRange} />
                <ColorFilter color={color }/>
            </div>
            <div className='p-3 gap-3 col-span-4 py-5 grid grid-cols-3'>
                {
                    product.length != 0
                        ?
                        product.map(
                            (prod) => {
                                return <Product {...prod} key={prod._id} />
                            }
                        )
                        :
                        <h3 className='text-center my-3'> No product found</h3>

                }

            </div>
        </Container>
    )
}

const CategoryFilter = ({ data, category_slug, product }) => {
    // console.log("data", data);
    return <div className='bg-[#F6F7F8] p-3'>
            <h2 className='text-md font-bold'>Category</h2>
            <ul className='my-2'>
                <li className={`py-1 relative cursor-pointer ${category_slug == undefined && 'text-blue-500 font-bold'}`}>
                    <Link to={`/store`}>
                        All <span className='absolute right-[20px]'>({product.length})</span>
                    </Link>
                </li>
                {data.map(
                    (d) => <li key={d._id} className={`py-1 relative cursor-pointer ${category_slug == d.slug && 'text-blue-500 font-bold'}`}>
                        <Link to={`/store/${d.slug}`}>
                            {d.name} <span className='absolute right-[20px]'> ({d.productCount}) </span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
}

const PriceFilter = ({range, setRange, clearFilter}) => {
    return <div className='bg-[#F6F7F8] p-3 my-3'>
            <h2 className='text-md font-bold'>Price</h2>
            <div className='flex gap-2 mt-2 items-center'>
                <input onChange={(e) => setRange(
                    {
                        end: range.end,
                        start: e.target.value
                    }
                )} value={range.start} type="number" className='shadow px-3 py-1 w-[90px]'
                />
                to
                <input onChange={(e) => setRange(
                    {
                        start: range.start,
                        end: e.target.value
                    }
                )} value={range.end} type="number" className='shadow px-3 py-1 w-[90px]'
                />

            </div>
            <button onClick={clearFilter} className='p-2 mt-2 rounded bg-red-500 text-white '>Clear Fitler</button>
        </div>

}

const ColorFilter = ({color}) =>{
    // console.log(color);
    return <div className='bg-[#F6F7F8] p-3 my-3'>
            <h2 className='text-md font-bold'>Color</h2>
        {/* <ul>
        {
            color.map(
                (cl) => <li key = {cl._id}>{cl.name}</li>
            )
        }
    </ul> */}
    </div>

}
