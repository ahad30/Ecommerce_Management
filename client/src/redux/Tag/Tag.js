export const tags = [
 
  // Admin
  {
    name: 'Category', 
    tag: 'sys-categories', 
  },
 
  {
    name: 'Addons',
    tag: 'erp-addon',
  },
  {
    name: 'Module',
    tag: 'erp-module',
  },
  {
    name: 'ErpCategory',
    tag: 'erp-category',
  },
  {
    name: 'Brand',
    tag: 'brands',
  },
  {
    name: 'Product',
    tag: 'products',
  },
  {
    name: 'ProductType',
    tag: 'productTypes',
  },
  {
    name: 'ProductUnit',
    tag: 'productUnits',
  },
  {
    name: 'ProductVariationApi',
    tag: 'productVariationApi',
  },

  {
    name: 'ErpBusinesses',
    tag: 'erp-businesses',
  },

  {
    name: 'User',
    tag: 'users'
  },
  {
    name: 'Branch',
    tag: 'branches'
  },
  {
    name: 'Address',
    tag: 'addresses'
  },

  // User
  {
    name: 'Customer',
    tag: 'customers'
  },
  {
    name: 'Supplier',
    tag: 'suppliers'
  },

  {
    name: 'Warehouses',
    tag: 'warehouses'
  },
  {
    name: 'Attributes',
    tag: 'attributes'
  },

];

export const getTagsByModuleName = (moduleName) => {
  return tags
    .filter(tag => tag.name.toLowerCase() === moduleName.toLowerCase())
    .map(tag => tag.tag);
};