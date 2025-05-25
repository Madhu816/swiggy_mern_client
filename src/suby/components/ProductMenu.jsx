import React from 'react'
import { useState, useEffect } from 'react'
import { API_URL } from '../api';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';

const ProductMenu = () => {
  const [products, setProducts] = useState([]);

  const { firmId,firmname } = useParams();


  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.product);
      // console.log("ccccccccccccc", newProductData.product)


    } catch (error) {
      console.log("Failed to fetch data:", error);
      alert("Failed to fetch the data");

    }
  }
  useEffect(() => {
    productHandler();

  }, []);
  return (
    <>
    <TopBar/>
    <div>
      <section className='productSection'>
      <h1  className="productMenuFirmName " style={{textAlign:'center'}}>{firmname.toUpperCase()} HOTEL  </h1>
        {products.map((item) => {
          return (
            <div className='productBox'>
              <div>
              <div><strong>{item.productName}</strong></div>
              <div>₹{item.price}</div>
              <div>{item.description}</div>
              </div>

              <div className="productGroup">
                <img src={`${API_URL}/uploads/${item.image}`} alt={item.product} />
                <div className='addbtn'>ADD</div>
              </div>

            </div>
          )
        })}
      </section>
    </div>
    </>
  )
}

export default ProductMenu

