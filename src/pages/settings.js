// components/ProductForm.js
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useToasts } from 'react-toast-notifications';

import styles from '../styles/ProductForm.module.css'; // Import your custom CSS file

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Settings = () => {
    const { addToast } = useToasts();
    const [products, setProducts] = useState({});
    const [products1, setProducts1] = useState("");
    console.log(products);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            };

            const response = await fetch('/api/upichange', {
                method: 'GET',
                headers: headersList,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.upi);
                setProducts({ upi: data.upi.upi, Bhim: data.upi.Bhim, Gpay: data.upi.Gpay, Paytm: data.upi.Paytm, Phonepe: data.upi.Phonepe, WPay: data.upi.WPay });
                setProducts1(data?.pixelId.FacebookPixel);
            } else {
            }
        } catch (error) {
        }
    };

    const formik = useFormik({
        initialValues: {
            upi: products.upi,
            Gpay: products.Gpay,
            Paytm: products.Paytm,
            Phonepe: products.Phonepe,
            WPay: products.WPay,
        },
        onSubmit: async (values) => {
            console.log("values", products);
            try {
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                };

                let bodyContent = JSON.stringify({
                    upi: products.upi,
                    Gpay: products.Gpay,
                    Paytm: products.Paytm,
                    Phonepe: products.Phonepe,
                    WPay: products.WPay,
                });

                let response = await fetch("/api/upichange", {
                    method: "POST",
                    body: bodyContent,
                    headers: headersList
                });

                let data = await response.json();
                if (data['status'] === 1) {
                    addToast("UPI submitted successfully", { appearance: 'success' });
                } else {
                    addToast('Error submitting UPI', { appearance: 'error' });
                }
            } catch (error) {
                addToast('Error submitting product', { appearance: 'error' });
            }
        },
    });

    const formik1 = useFormik({
        initialValues: {
            pixelId: products1,
        },
        onSubmit: async () => {
            try {
                let headersList = {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                };

                let bodyContent = JSON.stringify({
                    "pixelId": products1,
                });

                let response = await fetch("/api/facebookPixel", {
                    method: "POST",
                    body: bodyContent,
                    headers: headersList
                });

                let data = await response.json();
                if (data['status'] === 1) {
                    addToast("Pixel submitted successfully", { appearance: 'success' });
                } else {
                    addToast('Error submitting Pixel', { appearance: 'error' });
                }
            } catch (error) {
                addToast('Error submitting product', { appearance: 'error' });
            }
        },
    });

    console.log(products?.Gpay);

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
            <form onSubmit={formik.handleSubmit} className={`product-form mx-4 w-100 ${styles.customForm}`}>
                <h1 className={styles.formTitle}>UPI Add</h1>
                <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="upi" className="form-label">UPI:</label>
                    <input
                        id="upi"
                        name="upi"
                        type="text"
                        className={`form-control ${styles.formControl}`}
                        onChange={(e) => {
                            setProducts({ ...products, upi: e.target.value });
                        }}
                        defaultValue={products?.upi}
                    />
                </div>
                <div className={`container mt-5 ${styles.paymentMethodContainer}`}>
                    <h2 className={styles.paymentMethodTitle}>Select Payment Method</h2>

                    <div className={`form-check form-switch d-flex align-items-center  justify-content-between ${styles.paymentMethodSwitch}`}>
                        <input
                            className="form-check-input mx-1"
                            type="checkbox"
                            id="googlePaySwitch"
                            checked={products?.Gpay}
                            onChange={(e) => {
                                console.log(e.target.checked);
                                setProducts({ ...products, Gpay: e.target.checked });
                            }}
                        />
                        <label className="form-check-label" htmlFor="googlePaySwitch" style={{ fontSize: 14 }}><b>Google Pay</b></label>
                    </div>

                    <div className={`form-check form-switch d-flex align-items-center justify-content-between ${styles.paymentMethodSwitch}`}>
                        <input
                            className="form-check-input mx-1"
                            type="checkbox"
                            id="phonePaySwitch"
                            checked={products?.Phonepe}
                            onChange={(e) => {
                                console.log(e.target.checked);
                                setProducts({ ...products, Phonepe: e.target.checked });
                            }}
                        />
                        <label className="form-check-label" htmlFor="phonePaySwitch" style={{ fontSize: 14 }}><b>PhonePe</b></label>
                    </div>

                    <div className={`form-check form-switch d-flex align-items-center  justify-content-between ${styles.paymentMethodSwitch}`}>
                        <input
                            className="form-check-input mx-1"
                            type="checkbox"
                            id="paytmSwitch"
                            checked={products?.Paytm}
                            onChange={(e) => {
                                console.log(e.target.checked);
                                setProducts({ ...products, Paytm: e.target.checked });
                            }}
                        />
                        <label className="form-check-label" htmlFor="paytmSwitch" style={{ fontSize: 14 }}><b>Paytm</b></label>
                    </div>

                    <div className={`form-check form-switch d-flex align-items-center justify-content-between ${styles.paymentMethodSwitch}`}>
                        <input
                            className="form-check-input mx-1"
                            type="checkbox"
                            id="bhimUPIswitch"
                            checked={products?.Bhim}
                            onChange={(e) => {
                                console.log(e.target.checked);
                                setProducts({ ...products, Bhim: e.target.checked });
                            }}
                        />
                        <label className="form-check-label" htmlFor="bhimUPIswitch" style={{ fontSize: 14 }}><b>BHIM UPI</b></label>
                    </div>

                    <div className={`form-check form-switch d-flex align-items-center  justify-content-between ${styles.paymentMethodSwitch}`}>
                        <input
                            className="form-check-input mx-1"
                            type="checkbox"
                            id="wPaySwitch"
                            checked={products?.WPay}
                            onChange={(e) => {
                                console.log(e.target.checked);
                                setProducts({ ...products, WPay: e.target.checked });
                            }}
                        />
                        <label className="form-check-label" htmlFor="wPaySwitch" style={{ fontSize: 14 }}><b>W-Pay</b></label>
                    </div>
                </div>
                <button type="submit" className={`btn btn-primary my-2 w-100 ${styles.submitButton}`}>Submit</button>
            </form>

            <form onSubmit={formik1.handleSubmit} className={`product-form mx-4 mt-5 w-100 ${styles.pixelForm}`}>
                <h1 className={styles.formTitle}>Add Pixel</h1>
                <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="pixelId" className="form-label">Pixel ID:</label>
                    <textarea
                        id="pixelId"
                        name="pixelId"
                        type="text"
                        value={products1}
                        className={`form-control ${styles.formControl}`}
                        onChange={(e) => {
                            setProducts1(e.target.value);
                        }}
                        rows={5}
                    />
                </div>
                <button type="submit" className={`btn btn-primary my-2 w-100 ${styles.submitButton}`}>Submit</button>
            </form>
        </>
    );
};

export default Settings;
