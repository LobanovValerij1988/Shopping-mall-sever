import {Request, Response} from "express";
import {getErrorObject} from "../../helpers/errorHelpers";
import {
  addNewProduct, deleteProduct,
  getFilteredProducts, getLowStockProductsWhichOrdered,
  getProductBy,
  getProductByID,
  updateProduct
} from "../../models/products.model";
import {IProduct} from "../../models/products.mongo";
import {getCategoryByID} from "../../models/categories.model";

interface IQuery{
  filtersCategory?: string[],
  searchText?: string,
}

export async function httpGetFilteredProducts(req:Request<{},{},{},IQuery>, res:Response) {
 try {
   return res.status(200).json(await getFilteredProducts(req.query.filtersCategory, req.query.searchText));
 }
 catch (err) {
   return res.status(500).json(getErrorObject(err));
 }
}

export async function httpGetProductByID(req:Request, res:Response) {
  try {
    const product = await getProductByID(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

export async function httpAddProduct(req:Request<{},{},IProduct>, res:Response) {
  try {
    const {name, quantity, price, category} = req.body;
    if(!name || !quantity || !price || !category) {
      return res.status(400).json({error: 'All fields are required'})
    }
    const duplicate = await getProductBy({name})
    if(duplicate){
      return res.status(409).json({error: 'Duplicate product name'})
    }
    const existingCategory =  await getCategoryByID(category as unknown as string);
    if(!existingCategory){
      return res.status(409).json({error: 'Category is not exist'})
    }
    const addedProduct = await addNewProduct(req.body);
    return res.status(201).json(addedProduct);
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}


export async function httpUpdateProduct(req:Request<{id:string},{},IProduct>, res:Response) {
  try {
    const id = req.params.id;
    const {name, quantity, price, category} = req.body;
    if(!name || !quantity || !price || !category) {
      return res.status(400).json({error: 'All fields are required'})
    }

    const product = await getProductByID(id);
    if(!product){
      return res.status(404).json({error: 'Product was not found'});
    }

    const duplicate = await getProductBy({name});

    if(duplicate && (duplicate?._id as string) !== id){
      return res.status(409).json({error: 'Duplicate product name'})
    }

    const categoryExist = await getCategoryByID(category as unknown as string);
    if(!categoryExist){
      return res.status(404).json({error: 'Category is not exist'});
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.category = category;

    const updatedProduct = await updateProduct(product);
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

export async function httpDeleteProduct(req:Request, res:Response) {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

//agregation

interface IQueryForGetLowStockProducts{
  lessThan: string;
}

export async function httpGetLowStockProducts(req:Request<{},{},{},IQueryForGetLowStockProducts>, res:Response) {
  try {
    const products = await getLowStockProductsWhichOrdered(+req.query.lessThan);
      return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}
