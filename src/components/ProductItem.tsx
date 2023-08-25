import React from 'react'
import { Product } from '../models/IProducts'
import { useNavigate } from 'react-router-dom'

function ProductItem( props: {item:Product, index:number } ) {

  const navigate=useNavigate()
  const gotoURL=(id:number)=>{
    navigate('/detail/'+id)
    window.location.reload()
  }
  return (
   <>
    <div
        className="mb-2 col-sx-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
    >
      <div onClick={()=> gotoURL(props.item.id) } className="card" role="button"   >
        <img
           
          style={{height:250, objectFit:"scale-down"}}
          src={props.item.images[0]}
          className="card-img-top"
          title={props.item.title}
          alt={props.item.title}
        ></img>
        <div className="card-body"  >
          <h5 className="card-title" style={{height:45}}>{props.item.title}</h5>
          <span className="badge text-bg-secondary float-end mt-1" style={{}}> {props.item.brand}</span>
         <p className="card-text">{props.item.category}</p>
            <span className="badge text-bg-success fs-6 p-2 float-end">Price: {props.item.price}$</span>
        </div>
      </div>
    </div>
   </>
  )
}

export default ProductItem