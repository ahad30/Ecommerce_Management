import React, { useState } from "react";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteUserMutation, useGetUsersQuery } from "../../../../redux/Feature/Admin/usersmanagement/userApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/Hook/Hook";
import ButtonWithModal from "../../../../components/Button/ButtonWithModal";
import AddModal from "../../../../components/Modal/AddModal";
import EditModal from "../../../../components/Modal/EditModal";
import DeleteModal from "../../../../components/Modal/DeleteModal";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import DashboardTable from "../../../../components/Table/DashboardTable";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "../../../../redux/Modal/ModalSlice";
// import AddUser from "./AddUser/AddUser";
// import EditUser from "./EditUser/EditUser";


const Customers = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedUser, setSelectedUser] = useState({});
  const { data, error, isLoading: uLoading, isSuccess } = useGetUsersQuery();
  const [deleteUser, { isLoading: dCIsloading, isError, isSuccess: uIsSuccess, data: dUdata, error: dError }] = useDeleteUserMutation();

const userData = data?.data?.map((user, index) => ({
  id: user?.id,
  email: user?.email,
  phone: user?.phone,
  name: user?.name,
  role: user?.role
}));

// console.log(userData)

  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteUser = (userData) => {
    setSelectedUser(userData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDelete = () => {
    deleteUser(selectedUser?.id);
  };


const columns = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => handleEditUser(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDeleteUser(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
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

      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add User" />
      </div>

      <DashboardTable columns={columns} data={userData} loading={uLoading} />

      <AddModal isAddModalOpen={isAddModalOpen} title="Create User">
        {/* <AddUser /> */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit User">
        {/* <EditUser selectedUser={selectedUser} /> */}
      </EditModal>

      {/* Delete User Modal */}
      <DeleteModal
        data={dUdata}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={uIsSuccess}
        title="Delete User"
        onDelete={handleDelete}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this user will remove all associated data."}
      ></DeleteModal>
    </>
  );
};

export default Customers;
