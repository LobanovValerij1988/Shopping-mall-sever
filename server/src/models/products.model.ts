import {IProduct, products} from "./products.mongo";
import {ICategory} from "./categories.mongo";
import {HydratedDocument} from "mongoose";

export async function getFilteredProducts(filtersCategory: string[], searchText: string) {
    searchText= searchText === undefined ? "" : searchText;
    let filteredProducts;
    if(filtersCategory) {
        filteredProducts = products.find({category:{$in:filtersCategory}}, {});
    }
    else{
        filteredProducts = products.find({}, {});
    }
     return filteredProducts.find({name:{$regex:new RegExp("^"+ searchText, 'i')}}).populate<{ category: ICategory }>({
         path: "category",
         select: "name",
     }).lean().exec();

}

export function getProductBy (productField:{name?: string}) {
    return products.findOne(productField);
}

export function getProductByID(productID:string) {
  return products
    .findById(productID, {})
    .populate<{ category: ICategory }>({
      path: "category",
      select: "name",
    })
}

export async function addNewProduct(product: Omit<IProduct,"_id">) {
  const savedProduct = await products.create(product);
   return  getProductByID(savedProduct._id.toString());
}

export async function updateProduct(updatedProduct:HydratedDocument<IProduct>) {
    await updatedProduct.save();
    return  getProductByID(updatedProduct._id.toString());
}

export function deleteProduct(productID: string) {
    return  products.findByIdAndDelete(productID);
}

// aggregate
export function getLowStockProductsWhichOrdered(quantityLimit: number) {
  return  products.aggregate([
    //find products which quantity less than quantity limit
    { $match: { quantity: { $lt: quantityLimit } } },
    // find is this product were ordered
    {
      $lookup: {
        from: "orders",
        localField: "name",
        foreignField: "products.name",
        as: "productDetails",
      },
    },
    // if productDetails is empty so this product wasn't ordered
    { $match: { productDetails: { $ne: [] } } },
    // and delete this field
    { $unset: ["productDetails","__v"] },
  ]);
}