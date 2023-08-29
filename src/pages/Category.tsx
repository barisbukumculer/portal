import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { firstUpper } from '../util'
import { singleCategoryProducts } from '../Api'
import { IProducts } from '../models/IProducts'
import ProductItem from '../components/ProductItem'

function Category() {
    const [proObj, setProObj] = useState<IProducts>();
    const {categoryname}=useParams()
    const navigate=useNavigate()
    useEffect(() => {
     singleCategoryProducts(categoryname!).then(res=>{
        const dt=res.data
        if(dt){
           if(dt.products.length===0){
            navigate("/")
           }else{
            setProObj(dt)
           }
        }
     })
    }, [])
    
  return (
   <>
   <Navbar/>
   <h2>{firstUpper(categoryname!)}</h2>
   <div className="row mt-2"  >
      {proObj &&
        proObj.products.map((item, index) => (
         <ProductItem item={item} index={index} key={index}/>
        ))}
        </div>
   </>
  )
}

export default Category