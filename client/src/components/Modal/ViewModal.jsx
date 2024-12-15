import { Modal } from "antd";
import { setIsViewModalOpen } from "@/redux/Modal/ModalSlice";
import { useAppDispatch } from "@/redux/Hook/Hook";


const ViewModal = ({ children, isViewModalOpen, title, width }) => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsViewModalOpen());
  };
  return (
    <>
      <Modal
        title={title}
        centered
        open={isViewModalOpen}
        width={width ? width : 500}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">{children}</div>
      </Modal>
    </>
  );
};

export default ViewModal;
