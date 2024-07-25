import {Request, Response} from "express";
import {
  addNewCategory, deleteCategory,
  getAllCategories,
  getCategoryBy,
  getCategoryByID, totalProductQuantityByCategory,
  updateCategory
} from "../../models/categories.model";
import {getErrorObject} from "../../helpers/errorHelpers";
import {ICategory} from "../../models/categories.mongo";
import {getProductBy} from "../../models/products.model";


 export async function httpGetAllCategories(req:Request, res:Response) {
 try {
   res.status(200).json(await getAllCategories());
 }
 catch (err) {
   return res.status(500).json(getErrorObject(err));
 }
}

export async function httpGetCategoryByID(req:Request, res:Response) {
  try {
    const category = await getCategoryByID(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: "category not found",
      });
    } else {
      return res.status(200).json(category);
    }
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

export async function httpAddCategory(req:Request<{},{},ICategory>, res:Response) {
  try {
    const  category = req.body ;
    if (!category || !category.name) {
      return res.status(400).json({message: 'name are required'})
    }
    const duplicate = await getCategoryBy(category)
    if (duplicate) {
      return res.status(409).json({message: 'Duplicate category name'})
    }
    const addedCategory = await addNewCategory(category);
    return res.status(201).json(addedCategory);
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

export async function httpUpdateCategory(req:Request<{id:string},{},ICategory,{},{}>, res:Response) {
  try {
      const id = req.params.id;
      const  categoryCreated= req.body ;

      if (!categoryCreated || !categoryCreated.name ) {
        return res.status(400).json({message: 'name are required'})
      }

      const category = await getCategoryByID(id);
      if(!category){
        return res.status(404).json({message: 'Category was not found'});
      }

      const duplicate = await getCategoryBy(categoryCreated);

      if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate category name'})
      }
      category.name = categoryCreated.name;
      const updatedCategory = await updateCategory(category);
      return res.status(200).json(updatedCategory);
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

export async function httpDeleteCategory(req:Request, res:Response) {
  try {
    const productConectedExist =  await getProductBy({category: req.params.id});
    if(productConectedExist){
      return res.status(404).json({error: "there is connected product" });
    }
    const category = await deleteCategory(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: "category not found",
      });
    } else {
      return res.status(200).json(category);
    }
  } catch (err) {
    return res.status(400).json(getErrorObject(err));
  }
}

export async function httpTotalProductQuantityByCategory(req:Request, res:Response) {
  try {
    return res.status(200).json(await totalProductQuantityByCategory());
  } catch (err) {
    return res.status(500).json(getErrorObject(err));
  }
}

