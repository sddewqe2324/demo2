import React, { useEffect, useState } from 'react'
import { items } from "../../../public/Items.json";
import { Carousel } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaShare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import Layout from '@/componets/Layout';

function Productdetails() {
    const initialTime = 900; // 10 minutes in seconds
    const [time, setTime] = useState(initialTime);
    const [size, setsize] = useState(6);
    useEffect(() => {
        const timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
            } else {
                setTime((prevTime) => prevTime - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [time]);
    const router = useRouter();
    const [data1, setdata1] = useState({})
    const { bootstrap } = items;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            setdata1(JSON?.parse(localStorage?.getItem("d1")))
        } catch (error) {
        }
    };
    const handleBuy = () => {
        localStorage.setItem("data", JSON.stringify(data1))
        router.push("/address");
    };
    const percentageOff = ((data1?.mrp - data1?.selling_price) / data1?.mrp) * 100;
    return (
      <Layout data={''}>
        <div>
            <div className="_38U37R" style={{
                backgroundColor: "#2874f0",
            }}>
                <div
                    className="container-fluid py-2 header-container"
                    style={{ backgroundColor: "rgb(40, 116, 240)" }}
                >
                    <div className="row header">
                        <div className="col-1">
                            <div className="menu-icon" id="back_btn">
                                <svg
                                    width={19}
                                    height={16}
                                    viewBox="0 0 19 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                        router.push("/");
                                    }}
                                >
                                    <path
                                        d="M17.556 7.847H1M7.45 1L1 7.877l6.45 6.817"
                                        stroke="#FFF"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>{" "}
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="menu-logo mx-2">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAABwCAMAAAC0NjyXAAADAFBMVEUAAAD//////////////////////////////////////K//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6AD////////////////////////////////////////////////////////////////////////////+4Qb/////////////////5QL/////////////////5gD/5wD/////////////////////////////////////5gD/////////////5gD/////////////5QD/////5AH/5wD/////////6QD/////5QD/6wD/5QD/5gD/5gD/5gD/6gD/////6AD/5AL/3gD/5wD/5QD/5gD/5gD/////5gD/////5gH/4QT/////5gD1sCv/5wD/5QD/4wP/////5wH/6AD/5gD/5gD/5QD/5QD/////6gD/5gD/5AD/6AD2rDD/5QD/5QD/6AD/5gH/7AD/5wD/6wD/4wD/7AD/6wD+4AT/6gD/5wD/5gD1tSb81g7/5QD/6AD0qjD0qTD/8wD/5gD2syr0tCb/6QD/6QD0qy/91g7/7wH/5gD/6wD/9gDzrC3/8QD2tCj/7gD2siv5wh33uSTzqy35xxj1riz/8AD7zxH5wxz/9AHzqjH95Ab93Q32uCX/9QD/9AD1syn1sir6yRj4yhn4uSX5xRz/+QD71Q32uyH/9wD/////5QD/7QD/6gD/7wD/6QH/6AD/5wD/8gDzqjD/7AD/+gD/9AD/9wD/8QD/0Rf5vSL+3Qj//QD9sTL+vSj7zxL+2A77rjP8tS75yBj/4gTypzH/yR74whylRiG6AAAA4nRSTlMA/fgcDO90Beb0ASoOIOvhOQLwpSwJ9sIYEPKJ2LCeNiQTMIzKxVIe7XLo49GsqI76yLZsKBLau6KbmEcaFvz73GRUJg/TlTQKB86A3oNp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"
                                    className="_31Y9yB"
                                    style={{ width: 85 }}
                                />
                            </div>
                        </div>
                        <div className="col-6" />
                        <div className="col-1">
                            <div className="menu-icon">
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g fill="#FFF" fillRule="evenodd">
                                        <path d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203" />
                                        <path d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467" />
                                    </g>
                                </svg>{" "}
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="menu-icon">
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 15 15"
                                    xmlns="external452e452e452e452e.html?link=http://www.w3.org/2000/svg"
                                >
                                    <g fill="#fff" fillRule="evenodd">
                                        <path d="m5.189 13.04c0 .996-.791 1.804-1.767 1.804-.976 0-1.767-.808-1.767-1.804 0-.996.791-1.804 1.767-1.804.976 0 1.767.808 1.767 1.804" />
                                        <path d="m14.912 2.259h-14.298l2.247 6.917c.042.129.16.216.293.216h8.06c-.064.69-.629 1.841-1.702 1.841h-6.04l1.072 1.991h5.611c1.881 0 2.938-2.278 3.657-4.719.888-3.01 1.219-6.245 1.106-6.245" />
                                        <path d="m.615 2.259l-.592-1.828c-.08-.207.069-.431.287-.431h1.482c.126 0 .24.079.287.198l.682 2.061c0 0-.63 1.642-1.942.066" />
                                        <path d="m2.262.756c0 0 .498 1.503 2.234 1.503l-1.736.749-1.104-.749.607-1.503" />
                                        <path d="m13.424 13.325c0 .837-.664 1.516-1.484 1.516-.82 0-1.484-.679-1.484-1.516 0-.837.664-1.516 1.484-1.516.82 0 1.484.679 1.484 1.516" />
                                    </g>
                                </svg>{" "}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="_1fhgRH mb-5">
                <div className="container p-1 card">
                    <div className="container-fluid px-0 product-slider">
                        <div className="love-icon text-center" >
                            <AiFillLike style={{
                                fontSize: "28px",
                                margin: "-14px",
                                color: "#bbb1b1"
                            }} className='d-block' />
                        </div>
                        <div className="share-icon  text-center" >
                            <FaShare style={{
                                fontSize: "28px",
                                margin: "-14px",
                                color: "#bbb1b1"
                            }} className='d-block ' />
                        </div>
                        <div id="sliderX" className="carousel slide" data-ride="carousel">
                            {/* <ol className="carousel-indicators">
                                    <li
                                        data-bs-target="#sliderX"
                                        data-bs-slide-to={0}
                                        className="active"
                                    />
                                </ol> */}
                            <div className="carousel-inner">
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    {[...Array(5)].map((_, index) => {
                                        let a = index
                                        console.log("sdd", a);
                                        return (<Carousel.Item key={index} interval={4000}>
                                            <img src={data1["images" + a]} alt="slides" className='img-fluid'
                                                loading="lazy"
                                                style={{ maxWidth: 700, margin: "auto", display: "block" }} />
                                        </Carousel.Item>)
                                    }
                                    )}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid pb-3  card">
                    <div className="product-title">
                        Select Size
                    </div>
                    <div className='d-flex mt-3'>
                        {[...Array(6)].map((_, index) => {
                            let a = index + 6
                            return (
                                <div className={`px-3 py-2 ${a !== size ? 'bg-light text-dark' : 'bg-dark text-light'} mx-2`} style={{
                                    boxShadow: "rgba(5, 5, 5, 0.2) 0px 2px 8px 0px", borderRadius: "4px"
                                }} onClick={() => {
                                    setsize(a)
                                }}>{a}</div>
                            )
                        }
                        )}
                    </div>
                    <div className="product-title">
                        {data1?.Title}
                    </div>
                    <div className="product-price d-flex my-2">
                        <span className="discount">{percentageOff.toFixed(2)}% off</span>
                        <span className="mrp">₹{data1?.mrp}</span>
                        <span className="price"> ₹{data1?.selling_price}</span>
                    </div>
                    <div className="aMaAEs">
                        <div className="_3Zuayz">
                            <div className="_3_L3jD">
                                <div className="gUuXy- _16VRIQ _1eJXd3">
                                    <span className="_2_R_DZ">
                                        <span>120 ratings and 5 reviews</span>
                                    </span>
                                    <span
                                        id="productRating_LSTETHFZZUWAC8X2PGQZ7T8VQ_ETHFZZUWAC8X2PGQ_"
                                        className="_1lRcqv"
                                    >
                                        <div className="_3LWZlK _3uSWvT">
                                            <img
                                                src="data:image/png;base64,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"
                                                className="_1wB99o _19cuvx"
                                                width={75}
                                            />
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <span className="b7864- _2Z07dN">
                                {/* <img
                                    height={21}
                                    src={require("./fa_62673a.png")}
                                    className="jMnjzX pZkvcx"
                                /> */}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-3 offerend-container  my-1 card">
                    <h4 className="m-0">
                        {" "}
                        Offer ends in{" "}
                        <span className="offer-timer" id="offerend-time">
                            {Math.floor(time / 60)}min {time % 60}sec
                        </span>
                    </h4>
                </div>
                <div className="container-fluid p-3 mb-1 card">
                    <img
                        className="my-2"
                        src="/uploads/pay-latter.png"
                        alt="pay-latter"
                    />
                </div>
                <div className="container-fluid px-2 py-3 row feature-container product-extra ">
                    <div className="col-4 featured-item d-flex align-items-center flex-column bd-highlight px-1">
                        <img
                            className="featured-img mb-3"
                            src="data:image/png;base64,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"
                        />
                        <span className="feature-title"> 7 days Replacement </span>
                    </div>
                    <div className="col-4 featured-item d-flex align-items-center flex-column bd-highlight px-1">
                        <img
                            className="featured-img mb-3"
                            src="data:image/png;base64,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"
                        />
                        <span className="feature-title"> No Cash On Delivery </span>
                    </div>
                    <div className="col-4 featured-item d-flex align-items-center flex-column bd-highlight px-1">
                        <img
                            className="featured-img mb-3 mt-1"
                            src="data:image/png;base64,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"
                        />
                        <span className="feature-title"> Plus (F-Assured) </span>
                    </div>
                </div>
                <div className="container-fluid product-detail px-3 py-3 mb-4 card">
                    <h1>Product details</h1>
                    <div className="product-details">
                        <form action="address.php" method="post" id="priceForm">
                            <div className="">
                            <img
                                    src={"/uploads/Screenshot 2024-02-02 221041.png"}
                                    width={100}
                                    className="pay-logo"
                                    alt="button"
                                />
                            </div>
                            <div className="">
                            <img
                                    src={"/uploads/Screenshot 2024-02-02 221112.png"}
                                    width={100}
                                    className="pay-logo"
                                    alt="button"
                                />
                            </div>
                            <div className="">
                                <img
                                    src={"/uploads/Screenshot 2024-02-02 220907.png"}
                                    width={100}
                                    className="pay-logo"
                                    alt="button"
                                />
                            </div>
                            <div className="">
                            <img
                                    src={"/uploads/Screenshot 2024-02-02 220946.png"}
                                    width={100}
                                    className="pay-logo"
                                    alt="button"
                                />
                            </div>
                            <div className="">
                            <img
                                    src={"/uploads/Screenshot 2024-02-02 221011.png"}
                                    width={100}
                                    className="pay-logo"
                                    alt="button"
                                />
                            </div>
                            <div className="pdes1 mb-5">
                                <h4 className="txt-product-detail">Product Details</h4>
                                <p className="txt-product-detail">
                                    Skechers Max Cushioning Elite� design for exceptional comfort and support
                                    Skechers Slip-ins� molded heel panel for an easy hands-free fit Skechers
                                    Air-Cooled Goga Mat� breathable insole with high-rebound cushioning
                                    Lightweight, responsive ULTRA GO� cushioning platform Ortholite� comfort
                                    foam insole layer adds long-term cushioning and high-level breathability
                                    with 5% recycled rubber content Design Details Natural Rocker Technology
                                    for a smooth heel to toe transition Knitted upper with a slip-on style
                                    Flexible traction outsole 2-inch height Skechers� logo detail
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="button-container flex">
                    <button
                        className="buynow-button buynow-button-white product-page-buy"
                        onClick={handleBuy}
                    >
                        Add to Cart
                    </button>
                    <button className="buynow-button product-page-buy"
                        onClick={handleBuy}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
      </Layout>
    )
}

export default Productdetails
