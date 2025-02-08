import { Modal } from "antd";
import { useAppDispatch } from "../../redux/Hook/Hook";
import { setIsViewModalOpen } from "../../redux/Modal/ModalSlice";


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
        style={``}
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
