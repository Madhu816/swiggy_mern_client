import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { Link } from 'react-router-dom';

const FirmCollection = () => {
    const [firmData, setFirmData] = useState([]);
    const [selectRegion, setSelectRegion] = useState("All");
    const [activebtn, setActiveBtn] = useState("all");

    const Firmhandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vender/allvenders`);
            const newData = await response.json();
            // console.log("Fetched vendor data:", newData);
            setFirmData(newData.vender);
        } catch (error) {
            console.log("Failed to fetch data:", error);
            alert("Failed to fetch the data");
        }
    };

    useEffect(() => {
        Firmhandler();
    }, []);

    const handleFilterClick = (region, cateory) => {
        setSelectRegion(region);
        setActiveBtn(cateory);
    };

    return (
        <>
            <h2>Restaurants with online food delivery in Hyderabad</h2>
            <div className="filterButton">
                <button onClick={() => handleFilterClick("All", "all")} className={activebtn === "all" ? "activeButton" : ""}>All</button>
                <button onClick={() => handleFilterClick("South-Indian", "south-indian")} className={activebtn === "south-indian" ? "activeButton" : ""}>South-Indian</button>
                <button onClick={() => handleFilterClick("North-Indian", "north-indian")} className={activebtn === "north-indian" ? "activeButton" : ""}>North-Indian</button>
                <button onClick={() => handleFilterClick("Chines", "chines")} className={activebtn === "chines" ? "activeButton" : ""}>Chinese</button>
                <button onClick={() => handleFilterClick("Bakery", "bakery")} className={activebtn === "bakery" ? "activeButton" : ""}>Bakery</button>
            </div>

            <section className='firmSection'>
                {firmData.map((vender, index) => (
                    vender.firm && vender.firm.length > 0 &&
                    vender.firm.filter(item =>
                        selectRegion === "All" ||
                        item.region.map(r => r.toLowerCase()).includes(selectRegion.toLowerCase())
                    )
                        .map((item, i) => (
                            <Link to={`/products/${item._id}/${item.firmname}`} className='link' key={`${index}-${i}`}>
                                <div className="firmGroup">
                                    <div className="firmImageContainer">
                                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmname} />
                                        <div className="firmOffer">{item.offer}</div>
                                    </div>
                                    <div className='firmDetails'>
                                        <strong>{item.firmname}</strong><br />
                                        <div className='firmArea'>{item.region.join(", ")}</div>
                                        <div className='firmArea'>{item.area}</div><br />
                                    </div>
                                </div>
                            </Link>
                        ))
                ))}
            </section>
        </>
    );
};

export default FirmCollection;
