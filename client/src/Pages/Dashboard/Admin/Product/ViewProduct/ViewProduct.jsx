"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductsByIdQuery } from '@/redux/Feature/Admin/product/productApi';
import { Table } from 'antd';
import Skeleton from '@/components/Skeleton/Skeleton';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';

const ViewProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const { data, isLoading, error } = useGetProductsByIdQuery(productId);

  if (isLoading) {
    return <div><Skeleton/></div>;
  }

  if (error) {
    return <div>Error loading product details.</div>;
  }

  const product = data?.data; // Assuming `data` contains the product details

  const columns = [
    {
      title: 'Variant SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Sale Price',
      dataIndex: 'salePrice',
      key: 'salePrice',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: 'Retail Price',
      dataIndex: 'retailPrice',
      key: 'retailPrice',
    },
    {
      title: 'Warranty',
      dataIndex: 'is_warranty',
      key: 'is_warranty',
      render: (is_warranty) => (is_warranty ? 'Yes' : 'No'),
    },
    {
      title: 'Guaranty',
      dataIndex: 'is_guaranty',
      key: 'is_guaranty',
      render: (is_guaranty) => (is_guaranty ? 'Yes' : 'No'),
    },
    {
      title: 'Attributes',
      dataIndex: 'attribute_combination',
      key: 'attribute_combination',
      render: (attributes) =>
        attributes?.map((attr) => (
          <div key={attr.attributeCombinationID}>
            <strong>{attr.attributeName}:</strong> {attr.attributeValue}
          </div>
        )),
    },
  ];

  return (
    <section>
      <BreadCrumb/>

      <div className="mt-7 mb-4 space-y-5">
        <h2 className="text-lg font-semibold mb-4 underline">Product Information</h2>
        <p><strong>Title:</strong> {product.productTitle}</p>
        <p><strong>Subtitle:</strong> {product.productSubtitle}</p>
        <p><strong>Description:</strong> {product.productDescription}</p>
        <p><strong>Type:</strong> {product.productType === "0" ? "Variant Product" : "Single Product"}</p>
       { product.productType === "1" && 
        <div>

        <p><strong>Initial Quantity:</strong> {product.productInitialQty}</p>
        <p><strong>Purchase Price:</strong> {product.productPurchasePrice}</p>
        <p><strong>Retail Price:</strong> {product.productRetailPrice}</p>
        <p><strong>Whole Sales Price:</strong> {product.productWholeSalesPrice}</p>
        <p><strong>Minimum Quantity:</strong> {product.productMinQty}</p>
        <p><strong>Maximum Quantity:</strong> {product.productMaxQty}</p>
        </div>
       }
      </div>
    {  product.productType === "0" && 
        <div>
        <h2 className="text-lg font-semibold mb-2 underline">Product Variants</h2>
        <Table
          className="overflow-x-scroll"
          columns={columns}
          dataSource={product.productVariant}
          pagination={true}
          bordered={true}
          rowKey="productVariantID"
        />
      </div>
    }
    </section>
  );
};

export default ViewProduct;
