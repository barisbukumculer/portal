import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getCustomer } from "../util";
import { useNavigate } from "react-router-dom";
import { userCart } from "../Api";
import { UserCartModel } from "../models/UserCartModel";

function Cart() {
  const navigate = useNavigate();
  const [cartInfo, setCartInfo] = useState<UserCartModel>();
  useEffect(() => {
    pullCart();
  }, []);

  const pullCart = () => {
    const customer = getCustomer();
    if (customer !== null) {
      userCart(customer!.id).then((res) => {
        const dt = res.data;
        if (dt) {
          setCartInfo(dt);
        }
      });
    } else {
      navigate("/login");
    }
  };
  const deleteProduct = (pid: number) => {
    console.log(pid);
    pullCart();
  };

  return (
    <>
      <Header />
      {cartInfo && (
        <>
          <h2>Product List</h2>
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">-%</th>
                <th scope="col">Discounted Price</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartInfo.carts[0].products.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.price}$</td>
                  <td>{item.quantity}</td>
                  <td>{item.total}$</td>
                  <td>{item.discountPercentage}</td>
                  <td>{item.discountedPrice}$</td>
                  <td>
                    <i
                      role="button"
                      onClick={() => deleteProduct(item.id)}
                      className="bi bi-trash3 text-danger"
                    ></i>
                  </td>
                </tr>
              ))}

              <tr className="customRow">
                <td colSpan={5}></td>
                <th>Total</th>
                <th>{cartInfo.carts[0].total}$</th>
              </tr>

              <tr className="customRow noBorder">
                <td className="" colSpan={5}></td>
                <th>Discounted Total</th>
                <th>{cartInfo.carts[0].discountedTotal}$</th>
              </tr>
              <tr className="customRow noBorder">
                <td className="" colSpan={5}></td>
                <th>Total Products</th>
                <th>{cartInfo.carts[0].totalProducts}</th>
              </tr>
              <tr className="customRow noBorder">
                <td className="" colSpan={5}></td>
                <th>Total Quantity</th>
                <th>{cartInfo.carts[0].totalQuantity}</th>
              </tr>
              <tr className="customRow noBorder">
                <td colSpan={5}></td>
                <th></th>
                <th>
                  {" "}
                  <button className="btn btn-success ">
                    <i className="bi bi-credit-card mr3"> Payment</i>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Cart;
