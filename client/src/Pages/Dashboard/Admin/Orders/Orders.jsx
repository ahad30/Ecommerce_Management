import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Tooltip } from "antd";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import DashboardTable from "../../../../components/Table/DashboardTable";
import ButtonWithModal from "../../../../components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen, setIsViewModalOpen } from "../../../../redux/Modal/ModalSlice";
import EditModal from "../../../../components/Modal/EditModal";
import DeleteModal from "../../../../components/Modal/DeleteModal";
import { useAppDispatch, useAppSelector } from "../../../../redux/Hook/Hook";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../../../../redux/Feature/Admin/order/orderApi";
import ViewModal from "../../../../components/Modal/ViewModal";
import EditOrders from "./EditOrders";
import ViewOrders from "./ViewOrders";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: ordersIsLoading } = useGetOrdersQuery();
  const { isEditModalOpen, isViewModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [deleteOrder, { isLoading: dOIsLoading, isError, isSuccess, data: dOData, error: dOError }] = useDeleteOrderMutation();

  const ordersData = data?.data?.map((order, index) => ({
    key: index + 1,
    id: order?.id,
    name: order?.name,
    email: order?.email,
    phone: order?.phone,
    orderTotal: order?.orderTotal,
    paymentStatus: order?.paymentStatus,
    orderStatus: order?.orderStatus,
    transactionId: order?.transactionId,
    shippingAddress: order?.shippingAddress,
    billingAddress: order?.billingAddress,
    orderItems: order?.orderItems,
    deliveryFee: order?.deliveryFee,
    taxAmount: order?.taxAmount
  }));

  const handleEditOrder = (orderData) => {
    setSelectedOrder(orderData);
    dispatch(setIsEditModalOpen());
  };

  const handleViewOrder = (orderData) => {
    setSelectedOrder(orderData);
    dispatch(setIsViewModalOpen());
  };

  const handleDeleteOrderPrompt = (orderData) => {
    setSelectedOrder(orderData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteOrder = () => {
    deleteOrder(selectedOrder?.id);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Order Total",
      dataIndex: "orderTotal",
      key: "orderTotal",
      render: (orderTotal) => (
        <Tag color="cyan">${orderTotal}</Tag>
      )
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <Tag 
        color={
          status === "pending" ? "blue" :
          status === "processing" ? "orange" :
          status === "shipped" ? "purple" :
          status === "delivered" ? "green" :
          status === "cancelled" ? "red" :
          "default"
        }
      >
        {status}
      </Tag>
      
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleViewOrder(record)}>
            <Tooltip title="View" placement="top">
              <AiFillEye className="text-blue-500" size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleEditOrder(record)}>
            <Tooltip title="Edit" placement="top">
              <AiFillEdit className="text-green-500" size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDeleteOrderPrompt(record)}>
            <Tooltip title="Delete" placement="top">
              <AiFillDelete className="text-red-500" size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <BreadCrumb />
      </div>

      <DashboardTable columns={columns} data={ordersData} loading={ordersIsLoading} />

      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Order">
        <EditOrders selectedOrder={selectedOrder} />
      </EditModal>
      
      <ViewModal width={600} isViewModalOpen={isViewModalOpen} title="View Order">
        <ViewOrders selectedOrder={selectedOrder} />
      </ViewModal>
      
      <DeleteModal
        data={dOData}
        error={dOError}
        isLoading={dOIsLoading}
        isSuccess={isSuccess}
        title="Delete Order"
        onDelete={handleDeleteOrder}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description="Deleting this order will remove all associated details permanently."
      ></DeleteModal>
    </>
  );
};

export default Orders;
