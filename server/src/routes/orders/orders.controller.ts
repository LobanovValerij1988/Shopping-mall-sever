import {Request, Response} from "express";
import {
  addNewOrder,
  bestSellingProducts,
  getAllOrders,
  getOrderByID,
  totalRevenueByDateRange
} from "../../models/orders.model";
import {getErrorObject} from "../../helpers/errorHelpers";
import {RequestCustom} from "../../services/verifyJWT";
import {getUserBy} from "../../models/users.model";
import {IProduct} from "../../models/products.mongo";
import {getProductByID, updateProduct} from "../../models/products.model";
import {Types} from "mongoose";


export async function httpGetAllOrders(req:Request, res:Response) {
  try {
    res.status(200).json(await getAllOrders());
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

export async function httpGetOrderByID(req:Request, res:Response) {
  try {
    const order = await getOrderByID(req.params.id);
    if (!order) {
      return res.status(404).json({
        error: "order not found",
      });
    } else {
      return res.status(200).json(order);
    }
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

interface IAddOrder {
    products: { _id:string, quantity:number } []
}

 export async function httpAddOrder(req:Request<{},{},IAddOrder>, res:Response) {
  try {
    const {products:orderedProducts}  = req.body;
    const userName = (req as RequestCustom).nickName;
    if(!Array.isArray(orderedProducts) || !orderedProducts.length){
      return res.status(400).json({
        error: "products field can not be empty",
      });
    }
    const savingProducts: Omit<IProduct, "category" >[] = [];
    const user = await getUserBy({nickName: userName});
    for (const orderedProduct of orderedProducts) {

      const productInDB = await getProductByID(orderedProduct._id);
      if(!productInDB){
        return;
      }
      // subtract ordered product quantity from quatity in the store
       productInDB.quantity = productInDB.quantity - orderedProduct.quantity
       if(productInDB.quantity < 0){
          return res.status(400).json({
            error: "not enough product on the store",
          });
      }
      await updateProduct(productInDB );

      savingProducts.push({
        name: productInDB.name,
        price: productInDB.price,
        quantity: orderedProduct.quantity,
      });
    }
    const addedOrder = await addNewOrder({
      user: user!._id as Types.ObjectId ,
      products: savingProducts,
    });

    return res.status(201).json(addedOrder);
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

//aggregate
 export async function httpBestSellingProducts(req:Request, res:Response) {
  try {

    return res.status(200).json(await bestSellingProducts());
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

interface IQuery{
    startDate?: string,
    endDate?: string,
}

 export async function httpTotalRevenueByDateRange(req:Request<{},{},{},IQuery>, res:Response) {
  try {
      if(!req.query.startDate || !req.query.endDate){
          return res.status(404).json({
              error: "startDate and endDate are required",
          });
      }
    return res
      .status(200)
      .json(await totalRevenueByDateRange(req.query.startDate, req.query.endDate));
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}
