"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Alert, Button, Image, Modal, Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteProductMutation, useGetProductsQuery } from "@/redux/Feature/Admin/product/productApi";
import EditProduct from "./EditProduct/page";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Product = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProductsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedProduct, setSelectedProduct] = useState({});
  const [deleteProduct, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError }] = useDeleteProductMutation();
  const router = useRouter();
  // console.log(data)

  const productData = data?.data?.map((product, index) => ({
      key: index,
      id: product?.productID,
      category: product?.erpCategoryID,
      title: product?.productTitle,
      subtitle: product?.productSubtitle,
      description: product?.description,
      sku: product?.sku,
      brand: product?.brandID,
      business:product?.businessID,
      type: product?.productType,
      status: product?.isActive,
      variant: product?.productVariant
  }));

  // console.log(productData);
  const handledl = (productData) => {
    setSelectedProduct(productData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteProduct = () => {
    deleteProduct(selectedProduct?.id);
  };

  const handleEditProduct = (id) => {
     router.push(`/Dashboard/Product/EditProduct?id=${id}`);
  };

  const handleViewProduct = (id) => {
    router.push(`/Dashboard/Product/ViewProduct?id=${id}`);
  };



  // Define table columns
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "productID",
    //   key: "productID",
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Type",
      render: (values, record) => (
        <div className="flex justify-center">
          <Alert message={`${record.type === "0" ? "Variant Product" : "Single Product"}`} type="info" />
        </div>
      ),
    },
    // {
    //   title: "SKU",
    //   render: (values, record) => (
    //     <div className="flex gap-2 flex-col items-center">
    //       {record.variant?.length > 0 ? (
    //         record?.variant?.map((item, index) => (
    //           <Alert 
    //             key={index} 
    //             message={`${item?.sku || 'N/A'}`} 
    //             type="info" 
    //           />
    //         ))
    //       ) : (
    //         <Alert 
    //           message={` ${record.sku || 'N/A'}`} 
    //           type="info" 
    //         />
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: "Variant",
      dataIndex: "variant",
      render: (values) => (
        <div className="flex justify-center">
          <Alert message={`Total Variant : ${values?.length || 0}`} type="info" />
        </div>
      ),
    },
    
    // {
    //   title: "Category",
    //   dataIndex: "erpCategoryID",
    //   key: "erpCategoryID",
    // },
    // {
    //   title: "Brand",
    //   dataIndex: "brandID",
    //   key: "brandID",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === true ? 'green' : 'red'}>
          {status === true ? "Active" : "Inactive"}
          </Tag> 
      ),
    },,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
           <a onClick={() => handleViewProduct(record.id)}>
          <Tooltip title="Click here to view product details" placement="top">
          
          <FaEye size={25}/>
                  </Tooltip>
          </a>
          <a onClick={() => handleEditProduct(record.id)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handledl(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

 
//  if( data?.data?.length === 0){
//   return <div className="text-red-600 font-bold text-center">No Product Found</div>
//  }

 if (error) return <p>Error loading products</p>;


  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Product" path={"/Dashboard/Product/AddProduct"} />
      </div>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Product">
        <EditProduct selectedProduct={selectedProduct} />
      </EditModal>

      {/* Product Table */}
      <DashboardTable columns={columns} data={productData} loading={isLoading} />

      {/* Delete Modal */}
      <DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Product"
        onDelete={handleDeleteProduct}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this product will remove all corresponding data."}
      />
    </>
  );
};

export default Product;
