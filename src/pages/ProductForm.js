// components/ProductForm.js
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css'; import { useToasts } from 'react-toast-notifications';
import styles from '../styles/ProductForm.module.css';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ProductForm = () => {
    const { addToast } = useToasts();

    const formik = useFormik({
        initialValues: {
            Title: '',
            color: '',
            size: '',
            storage: '',
            selling_price: '',
            mrp: '',
            features: '',
            images: '',
            images1: '',
            images2: '',
            images3: '',
            images4: '',
            disp_order: '',
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
                let response = await fetch("/api/products", {
                    method: "POST",
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

        <>
            <nav className={`navbar navbar-expand-lg navbar-light bg-light px-5 ${styles.customNavbar}`}>
                <a className="navbar-brand" href="#">Admin</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" href="/Producttable">Product</Link>
                    <Link className="nav-item nav-link" href="/settings">Setting</Link>
                </div>
            </nav>
            <form onSubmit={formik.handleSubmit} className={`product-form mx-4 ${styles.customForm}`}>
                <h1 className={styles.formTitle}>Product Add</h1>
                <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="Title" className="form-label">Title:</label>
                    <input
                        id="Title"
                        className={`form-control ${styles.formControl}`}
                        name="Title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.Title}
                    />
                </div>
                <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="color" className="form-label">Color:</label>
                    <input
                        id="color"
                        name="color"
                        className={`form-control ${styles.formControl}`}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.color}
                    />
                </div>
                <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="size" className="form-label">Size:</label>
                    <input
                        id="size"
                        name="size"
                        className={`form-control ${styles.formControl}`}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.size}
                    />
                </div>
                <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="storage" className="form-label">Storage:</label>
                    <input
                        id="storage"
                        name="storage"
                        className={`form-control ${styles.formControl}`}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.storage}
                    />
                </div>
                <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="features" className="form-label">Features:</label>
                    <ReactQuill
                        id="features"
                        className={`form-control ${styles.formControl}`}
                        name="features"
                        value={formik.values.features}
                        onChange={(value) => formik.setFieldValue('features', value)}
                    />
                </div>
                <button type="submit" className={`btn btn-primary my-2 w-100 ${styles.submitButton}`}>Submit</button>
            </form>
        </>
    );
};

export default ProductForm;
