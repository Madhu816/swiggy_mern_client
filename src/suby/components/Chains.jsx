import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { MagnifyingGlass } from 'react-loader-spinner'




function Chains() {
  const [venderData, setVenderData] = useState([]);
  const [scrollSection,setScrollSection]=useState(0);
  const [loading,setLoading]=useState();
  const venderFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vender/allvenders`);
      const newData = await response.json();
      // console.log("Fetched vendor data:", newData);
      setVenderData(newData.vender);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch data:", error);
      alert("Failed to fetch the data");
      setLoading(true);
    }
  };

  useEffect(() => {
    venderFirmHandler();
  }, []);

  const handleSection=(direction)=>{
    const gallery=document.getElementById("chainGallery");
    const scrollAmount=500;
    if(direction==="left"){
      gallery.scrollTo({
        left:gallery.scrollLeft -scrollAmount,
        behavior:'smooth'
      })
    }else if(direction==="right"){
      gallery.scrollTo({
       left:gallery.scrollLeft +scrollAmount,
        behavior:"smooth"
      })
    } 

  }
  return (
    <>
    {/* load-spinner take from npm load spinner */}
    <div className='loadingSection'>
    {loading && 
    <>Loading the Images..just wait..few seconds..
    <MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
    </>}
    </div>
    <div className="btnSection">
      <button onClick={()=>handleSection("left")}><HiOutlineArrowSmLeft className='btnIcons'/></button>
      <button onClick={()=>handleSection("right")}><HiOutlineArrowSmRight className='btnIcons'/></button>
    </div>
    <h2>Top Restarents in Hyderabad</h2>
    <section className="chainSection" id="chainGallery" onScroll={(event)=>setScrollSection(event.target.scrollLeft)}>
      {venderData.map((venders, index) => (
        <div className="venderBox" key={index}>
          {Array.isArray(venders.firm) ? (
            venders.firm.map((item, i) => (
              <div className="firmCard" key={i}>
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  alt={item.firmname}
                />
              </div>
            ))
          ) : (
            <div>No firm data</div>
          )}
        </div>
      ))}
    </section>
    </>
  );
}

export default Chains;
