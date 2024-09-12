const { generateFileNames } = require('../helper');
const CategoryModel = require('../models/CategoryModel');
const { ProductModel } = require('../models/ProductModel');
const { unlink, stat, unlinkSync } = require('fs');

class CategoryController {
    read(id) {
        return new Promise(
            async (res, rej) => {
                let category;
                if (id) {
                    category = await CategoryModel.findById(id);
                    // return res(
                    //     {
                    //         msg: "Category found",
                    //         category,
                    //         image_base_url: "/images/category",
                    //         status: 1
                    //     }
                    // )
                } else {
                    const data = await CategoryModel.find().sort({ createdAt: -1 });
                    category = [];

                    const promises = data.map(
                        async (d) => {
                            const productCount = await ProductModel.find({ category_id: d._id }).countDocuments()
                            category.push(
                                {
                                    ...d.toJSON(),
                                    productCount
                                }
                            )
                        }
                    );
                    console.log(promises);
                    await Promise.all(promises);
                }
                return res(
                    {
                        msg: "Category found",
                        category,
                        image_base_url: "/images/category",
                        status: 1
                    }
                )

            }
        )
    }
    create(data, image) {

        console.log(data)
        return new Promise(
            (res, rej) => {
                try {
                    const fileName = generateFileNames(image.name);
                    const destination = "./public/images/category/" + fileName;
                    image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                rej({
                                    msg: "unable to upload image",
                                    status: 0
                                })
                            }
                            else {
                                const category = new CategoryModel({
                                    name: data.name,
                                    slug: data.slug,
                                    image_name: fileName
                                })
                                category.save()
                                    .then(
                                        () => {
                                            res(
                                                {
                                                    msg: "Category created",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (err) => {
                                            console.log(err.message);

                                            rej(
                                                {
                                                    msg: "Unable to create category ",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                            }
                        }
                    )
                } catch (error) {
                    // console.log(error.message);
                    rej({
                        msg: "internal server error",
                        status: 0
                    })
                    //exception handling  -> runtime error

                }


            }
        )
    }
    update(id, data, category_image) {
        return new Promise(
            async (res, rej) => {
                try {
                    const category = await CategoryModel.findById(id);
                    if (category) {
                        if (category_image) {
                            //image hai
                            const fileName = generateFileNames(category_image.name)
                            const destination = "./public/images/category/" + fileName;
                            category_image.mv(
                                destination,
                                (err) => {
                                    if (err) {
                                        rej({
                                            msg: 'Unable to update / upload new image',
                                            status: 0
                                        })
                                    } else {
                                        CategoryModel.updateOne(
                                            { _id: id },
                                            {
                                                name: data.name,
                                                slug: data.slug,
                                                image_name: fileName
                                            }
                                        ).then(
                                            () => {
                                                unlinkSync(
                                                    `./public/images/category/${category.image_name}`
                                                );
                                                res({
                                                    msg: " Category  updated",
                                                    status: 1
                                                })
                                            }
                                        ).catch(
                                            () => {
                                                res({
                                                    msg: "Unable to update Category",
                                                    status: 0
                                                })
                                            }
                                        )
                                    }
                                }
                            )
                        }
                        else {
                            //iamge nahi hai
                            CategoryModel.updateOne(
                                { _id: id },
                                {
                                    name: data.name,
                                    slug: data.slug
                                }
                            ).then(
                                () => {
                                    res({
                                        msg: "category updated",
                                        status: 1
                                    })
                                }
                            ).catch(
                                () => {
                                    rej({
                                        msg: "unable to update category",
                                        status: 0
                                    })
                                }
                            )
                        }
                    }
                    else {
                        rej({
                            msg: 'Invalid category id',
                            status: 0
                        })
                    }
                } catch (err) {
                    rej({
                        msg: 'Internal Server Error',
                        status: 0
                    })
                }
            }
        )
    }

    changeStatus(id, new_status) {
        return new Promise(
            (res, rej) => {
                try {
                    CategoryModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            status: new_status
                        }
                    ).then(
                        (success) => {
                            res({
                                msg: "Status changed successfully",
                                status: 1
                            })
                        }
                    ).catch(
                        (error) => {
                            rej({
                                msg: "Unable to change the status",
                                status: 0
                            })
                        }
                    )
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    delete(id, image_name) {
        return new Promise(
            (res, rej) => {
                try {
                    CategoryModel.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                unlink(
                                    "./public/images/category/" + image_name,
                                    (err) => {
                                        if (err) {
                                            res({
                                                msg: "Data deleted but image not!",
                                                status: 0
                                            })
                                        } else {
                                            res({
                                                msg: "Data deleted",
                                                status: 1
                                            })
                                        }
                                    }
                                )
                                // res({
                                //     msg:"Data deleted",
                                //     status:1
                                // })
                            }
                        ).catch(
                            (error) => {
                                res({
                                    msg: "Unable to delete data",
                                    status: 0
                                })
                            }
                        )
                }
                catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }

            }
        )

    }
}

module.exports = CategoryController;
