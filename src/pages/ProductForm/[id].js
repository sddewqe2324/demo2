// components/ProductForm.js
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import Link from 'next/link';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ProductForm = () => {
    const router = useRouter();
    const [data1, setdata1] = useState({})

    const { addToast } = useToasts();
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            await fetch(`/api/products/${router.query.id}`, {
                method: "GET",
            }).then((re) => {
                setdata1(JSON?.parse(localStorage?.getItem("d1")))
            })
        } catch (error) {
        }
    };
    
    const formik = useFormik({
        initialValues: {
            Title: data1.Title,
            color: data1.color,
            size: data1.size,
            storage: data1.storage,
            selling_price: data1.selling_price,
            mrp: data1.mrp,
            features: data1.features,
            images: data1.images,
            images1: data1.images1,
            images2: data1.images2,
            images3: data1.images3,
            images4: data1.images4,
            disp_order: data1.disp_order,
        },
        onSubmit: async (values) => {
            try {
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                };

                // let bodyContent = JSON.stringify(values);
                let bodyContent = JSON.stringify({
                    "Title": values.Title,
                    "color": values.color,
                    "size": values.size,
                    "storage": values.storage,
                    "selling_price": values.selling_price,
                    "mrp": values.mrp,
                    "features": values.features,
                    "images": values.images,
                    "images1": values.images1,
                    "images2": values.images2,
                    "images3": values.images3,
                    "images4": values.images4,
                    "disp_order": values.disp_order,
                });
                let response = await fetch(`/api/products/${router.query.id}`, {
                    method: "PUT",
                    body: bodyContent,
                    headers: headersList
                });
                let data = await response.text();
                if (JSON.parse(data)['status'] === 1) {
                    addToast("Product submitted successfully", { appearance: 'success' });
                } else {
                    addToast('Error submitting product', { appearance: 'error' });
                }
            } catch (error) {
                addToast('Error submitting product', { appearance: 'error' });
            }

        },
    });
    return (
        <><nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <a className="navbar-brand" href="#">Admin</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" href="/Producttable">Product</Link>
                    <Link className="nav-item nav-link" href="/settings">setting</Link>
                </div>
            </div>
        </nav>
            <form onSubmit={formik.handleSubmit} className="product-form mx-4">
                <h1>Product Edit</h1>
                <div className="form-group">
                    <label htmlFor="Title">images:</label>
                    <input
                        id="images"
                        name="images"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        defaultValue={data1.images}
                    />
                </div>  <div className="form-group">
                    <label htmlFor="Title">images1:</label>
                    <input
                        id="images1"
                        name="images1"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        defaultValue={data1.images1}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Title">images2:</label>
                    <input
                        id="images2"
                        name="images2"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        defaultValue={data1.images2}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Title">images3:</label>
                    <input
                        id="images3"
                        name="images3"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        defaultValue={data1.images3}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Title">images4:</label>
                    <input
                        id="images4"
                        name="images4"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        defaultValue={data1.images4}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Title">Title:</label>
                    <input
                        id="Title"
                        className="form-control"
                        name="Title"
                        type="text"
                        onChange={formik.handleChange}
                        defaultValue={data1.Title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">color:</label>
                    <input
                        id="color"
                        name="color"
                        className="form-control"
                        type="text"
                        onChange={formik.handleChange}
                        defaultValue={data1.color}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <input
                        id="size"
                        name="size"
                        className="form-control"
                        type="text"
                        onChange={formik.handleChange}
                        defaultValue={data1.size}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="storage">Storage:</label>
                    <input
                        id="storage"
                        name="storage"
                        className="form-control"
                        type="text"
                        onChange={formik.handleChange}
                        defaultValue={data1.storage}
                    />
                </div><div className="form-group">
                    <label htmlFor="storage">selling_price:</label>
                    <input
                        id="selling_price"
                        className="form-control"
                        name="selling_price"
                        type="number"
                        onChange={formik.handleChange}
                        defaultValue={data1.selling_price}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="storage">mrp:</label>
                    <input
                        className="form-control"
                        id="mrp"
                        name="mrp"
                        type="number"
                        onChange={formik.handleChange}
                        defaultValue={data1.mrp}
                    />
                </div>

                {/* Add similar styling for other form fields */}

                <div className="form-group">
                    <label htmlFor="features">Features:</label>
                    <ReactQuill
                        id="features"
                        className="form-control"
                        name="features"
                        defaultValue={data1.features}
                        onChange={value => formik.setFieldValue('features', value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="disp_order">Display Order:</label>
                    <input
                        id="disp_order"
                        name="disp_order"
                        type="number"
                        className="form-control"
                        onChange={formik.handleChange}
                        defaultValue={data1.disp_order}
                    />
                </div>

                {/* Add code for handling image uploads */}

                <button type="submit" className="btn btn-primary my-2 w-100">Submit</button>
            </form>
        </>
    );
};

export default ProductForm;
