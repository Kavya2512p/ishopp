const { generateFileNames } = require("../helper");
const { ProductModel } = require("../models/ProductModel");
const  CategoryModel  = require("../models/CategoryModel");
const { unlink } = require('fs');

class ProductController {
    create(data, product_image) {
        // console.log(data);
        // console.log(product_image);
        // console.log(other_images);
        return new Promise(
            (res, rej) => {
                try {
                    // res.send("hello");
                    const mainImageName = generateFileNames(product_image.name);
                    const destination = "./public/images/product/" + mainImageName;
                    product_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                console.log(err.message);
                                rej({
                                    msg: "Unable to upload image",
                                    status: 0
                                })

                            } else {
                                const product = new ProductModel({
                                    name: data.name,
                                    slug: data.slug,
                                    description: data.description,
                                    original_price: data.original_price,
                                    discount_percentage: data.discount_percent,
                                    final_price: data.final_price,
                                    category_id: data.product_category,
                                    colors: JSON.parse(data.product_color),
                                    main_image: mainImageName

                                })
                                product.save()
                                    .then(
                                        () => {
                                            res({
                                                msg: "Product added",
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err.message);
                                            res({
                                                msg: "Unable to add product",
                                                status: 0
                                            })
                                        }
                                    )
                            }
                        }
                    )
                } catch (err) {
                    // console.log(err.message);
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    read(id,query) {
        return new Promise(
            async (res, rej) => {
                try {
                    let products;
                    if (id) {
                        products = await ProductModel.findById(id).populate(["category_id", "colors"]);
                    } else {
                        const filterquery = {};
                        if(query.color_id){
                            filterquery['colors'] = query.color_id;
                        }
                        if(query.category_slug){
                            const category = await CategoryModel.findOne({slug:query.category_slug});
                            if(category){
                                filterquery['category_id'] = category._id;
                            }
                        }
                        if(query.price_start && query.price_end){
                            filterquery['final_price'] = {
                                "$gte": query.price_start,
                                "$lte": query.price_end
                            }
                        }
                        console.log("filterquery",filterquery);
                        products = await ProductModel.find(filterquery).populate(["category_id", "colors"]);
                    }
                    res({
                        msg: "Products found",
                        status: 1,
                        products,
                        image_base_url: "/images/product"
                    })
                } catch (err) {

                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    updateStatus(data) {
        return new Promise(
            (res, rej) => {
                try {

                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    edit(id, data) {
        return new Promise(
            (res, rej) => {
                try {

                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    uploadOtherImages(pId, other_images) {
        return new Promise(
            async (res, rej) => {
                try {
                    // const names = [];
                    const product = await ProductModel.findById(pId);
                    const names = [];
                    const promises = [];
                    if (Array.isArray(other_images)) {
                        for (let image of other_images) {
                            const imageName = generateFileNames(image.name);
                            const destination = "./public/images/product/" + imageName;
                            // image.mv(destination, () => {
                            //     names.push(imageName);
                            // });
                            names.push(imageName);
                            promises.push(image.mv(destination));
                        }
                        await Promise.all(promises);
                        ProductModel.updateOne(
                            { _id: pId },
                            {
                                other_images: [
                                    ...product.other_images,
                                    ...names
                                ]
                            },
                            console.log("other", other_images)
                        ).then(
                            () => {
                                res({
                                    msg: "Images uploaded",
                                    status: 1
                                })
                            }
                        ).catch(
                            () => {

                            }
                        )

                    } else {
                        const imageName = generateFileNames(other_images.name);
                        const destination = "./public/images/product/" + imageName;
                        other_images.mv(
                            destination,
                            (err) => {

                                ProductModel.updateOne(
                                    { _id: pId },
                                    {
                                        other_images: [imageName,
                                            ...product.other_images,
                                            ...names
                                        ]
                                        
                                    })
                                    .then(
                                        () => {
                                            res(
                                                {
                                                    msg: "image upload",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err.message);
                                            
                                            rej(
                                                {
                                                    msg: "Unable to upload image ",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )

                            }
                        )
                    }
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    delete(id) {
        return new Promise(
            (res, rej) => {
                try {

                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    delImg(index, id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const product = await ProductModel.findById(id);
                    if (product) {
                        const images = [...product.other_images];
                        unlink(
                            "./public/images/product/" + images[index],
                            (err) => {
                                if (err) {
                                    rej({
                                        msg: "Unable to delete",
                                        status: 0
                                    })
                                } else {
                                    images.splice(index, 1);
                                    ProductModel.updateOne(
                                        { _id: id },
                                        { other_images: images }
                                    ).then(
                                        (success) => {
                                            res({
                                                msg: "Image deleted",
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        (error) => {
                                            rej({
                                                msg: "Unable to delete image",
                                                status: 0
                                            })
                                        }
                                    )
                                }
                            }
                        );
                    } else {
                        rej({
                            msg: 'Product not found',
                            status: 0
                        })
                    }
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: ' Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = ProductController;