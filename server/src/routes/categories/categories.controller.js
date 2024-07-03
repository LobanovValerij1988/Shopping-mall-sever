const {
  getAllCategories,
  getCategoryBy,
  addNewCategory,
  updateCategory,
  getCategoryByID,
  deleteCategory,
  totalProductQuantityByCategory,
} = require("../../models/categories.model");
const {getProductBy} = require("../../models/products.model");

async function httpGetAllCategories(req, res) {
 try {
   res.status(200).json(await getAllCategories());
 }
 catch (err) {
   return res.status(500).json({
     error: err.message,
   });
 }
}

async function httpGetCategoryByID(req, res) {
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
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpAddCategory(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({message: 'name are required'})
    }
    const duplicate = await getCategoryBy({name})
    if (duplicate) {
      return res.status(409).json({message: 'Duplicate category name'})
    }
    const addedCategory = await addNewCategory(req.body);
    return res.status(201).json(addedCategory);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpUpdateCategory(req, res) {
  try {
      const id = req.params.id;
      const {name} = req.body;

      if (!name ) {
        return res.status(400).json({message: 'name are required'})
      }

      const category = await getCategoryByID(id);
      if(!category){
        return res.status(404).json({message: 'Category was not found'});
      }

      const duplicate = await getCategoryBy({name});

      if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate category name'})
      }
      category.name = name;
      const updatedCategory = await updateCategory(category);
      return res.status(200).json(updatedCategory);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpDeleteCategory(req, res) {
  try {
    productConectedExist =  await getProductBy({category: req.params.id});
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
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpTotalProductQuantityByCategory(req, res) {
  try {
    return res.status(200).json(await totalProductQuantityByCategory());
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  httpGetAllCategories,
  httpGetCategoryByID,
  httpDeleteCategory,
  httpUpdateCategory,
  httpAddCategory,
  httpTotalProductQuantityByCategory,
};
