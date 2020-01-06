import * as model from '../model_controllers/category'

export async function getCategories (
    _,
    res,
) {
    const data = await model.getCategories();
    res.json(data).send()
}

export async function getCategoryById (
    req,
    res,
) {
    const id = req.params.id;
    const data = await model.getCategoryById(id);

    res.json(data).send();
}

export async function createCategory (
    req,
    res,
) {
    const {
        description,
        name,
        slug,
        parent_category_id,
        icon_url
    } = req.body;

    await model.createCategory(
        { name, slug, description, parent_category_id, icon_url }
    );

    res.code(200).send();
}

export async function getSubcategories (
    req,
    res,
) {
    const id = req.params.id;
    const data = await model.getCategoryByParentCategoryId(id);

    res.json(data).send();
}

export async function updateCategoryById (
    req,
    res,
) {
    const id = req.params.id;
    const {
        description,
        name,
        slug,
        parent_category_id,
        icon_url,
    } = req.body;

    model.updateCategoryById(
        id,
        { description, name, slug, parent_category_id, icon_url },
    );

    res.code(200).json();
}

export async function deleteCategory (
    req,
    res,
  ) {
    const id = req.params.id;
    await model.deleteCategoryById(id);
  
    res.code(200).send();
  }