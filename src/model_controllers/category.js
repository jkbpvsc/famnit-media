import { Category } from "../models/category";
import v4 from 'uuid/v4';

export async function getCategories () {
    return Category.findAll();
}

export async function getCategoryById (
    id
) {
    return Category.findByPk(id);
}

export async function getCategoryByParentCategoryId (
    parentCategoryId
) {
    return Category.findAll(
        { where: { parent_category_id: parentCategoryId }}
    );
}

export async function updateCategoryById (
    id,
    { description, name, slug, parent_category_id, icon_url }
) {
    await Category.update(
        { description, name, slug, parent_category_id, icon_url },
        { where: { id }},
    );
}

export async function createCategory (
    { description, name, slug, parent_category_id, icon_url }
) {
    await Category.create(
        { 
            id: v4(),
            description,
            name,
            slug,
            parent_category_id,
            icon_url,
        },
    );
}

export async function deleteCategoryById (
    id,
) {
    await Category.destroy(
        { where: { id } }
    );
}