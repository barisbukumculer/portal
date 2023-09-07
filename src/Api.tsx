import axios from "axios";
import { IProducts, Product } from "./models/IProducts";
import { UserModel } from "./models/UserModel";
import { CartModel } from "./models/CartModel";
import { UserCartModel } from "./models/UserCartModel";

const baseURL = "https://dummyjson.com/";
const config = axios.create({
  baseURL: baseURL,
  timeout: 15000,
});

//Get All Products
export const getAllProducts = () => {
  return config.get<IProducts>("products");
};

//Single Product
export const getSingleProduct = (id: number) => {
  return config.get<Product>("products/" + id);
};

//Get All Products
export const get4RandomProducts = (limit: number, skip: number) => {
  const sendObj = {
    limit: limit,
    skip: skip,
  };
  return config.get<IProducts>("products", { params: sendObj });
};

//Get All Categories
export const getAllCategories = () => {
  return config.get<string[]>("products/categories");
};

//Single Category in Products
export const singleCategoryProducts=(categoryname:string)=>{
return config.get<IProducts>('products/category/'+categoryname)
}

//User Login
export const login=(username:string, password:string)=>{
  const sentObj={
    username:username,
    password: password
  }
  return config.post<UserModel>('auth/login', sentObj)
}

//Add Cart
export const addCart = ( userId: number, id: number ) => {
  const sendObj = {
      userId: userId,
      products: [
        {
          id: id,
          quantity: 1,
        }
      ]
  }
  return config.post<CartModel>('carts/add', sendObj)
}

// Get User Cart
export const userCart=(id:number)=>{
  return config.get<UserCartModel>('carts/user/'+id)
}

//Search Product
export const searchProduct=(q:string,limitCount:number,skip:number)=>{
  const sendObj={
    q: q,
    limit:limitCount,
    skip:limitCount*skip
  }
  return config.get<IProducts>("/products/search",{params:sendObj})
}