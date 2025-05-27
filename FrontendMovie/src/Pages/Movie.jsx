import React, { useEffect, useState } from 'react'
import "./style.css"

const Movie = () => {
 
 const [product,setProduct] = useState([])
 const [error, setError] = useState("")


 async function DisplayProduct(){
    try {
        const response = await fetch(`http://localhost:8002/api/movie/get`,{
          method:"GET",
          headers:{
              "Content-Type": "application/json"
          }
        })
        const result = await response.json()

        if(response.status !== 200){
          setError(result.msg || "fetched data failed.");
            return;
        }

        
      // Access the 'AllProducts' array from the response
      if (Array.isArray(result.AllProducts)) {
        setProduct(result.AllProducts);
      } else {
        setError('Fetched data is not in the expected format.');
      }

     

      // setProduct(result);  // Storing fetched products
      console.log(result.AllProducts);
        
          
    } catch (error) {
      alert(`Error in fetching data: ${error.message}`);
    }
    
 }

 useEffect(()=>{
  DisplayProduct()
 },[])


  return (
    <>
    <h3>All Products...</h3>

    <div className="product_container">
    {product.length === 0 ? (
      <p>No products available</p>  
    ) : (
      product.map((item, ind) => (
        <div key={ind} className='product_box'>
        <h2>{item.name}</h2>
        <img src={item.imageUrl} alt={item.name} style={{ width: '200px', height: 'auto' }} />
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <button className="add_to_cart_btn">Add to Cart</button>
      </div>
      ))
    )}

    </div>
    
  </>
  )
}

export default Movie