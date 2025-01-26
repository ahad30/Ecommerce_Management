import { CiEdit, CiTrash } from "react-icons/ci";
import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../redux/Hook/Hook";
import { setIsVariantModalOpen } from "../redux/Modal/ModalSlice";

export const VariantProductTable = ({ skus, setSkus }) => {
  const dispatch = useAppDispatch();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { isVariantModalOpen } = useAppSelector((state) => state.modal);
  const pathname = window.location.pathname;

  const handleDeleteTheVariant = async (id) => {
    try {
      const filterTheVariant = skus.filter((item) => item.variationId !== id);
      setSkus([...filterTheVariant]);

      // if (id && pathname !== "/admin/add-product") {
      //   await deleteVariation(id).unwrap();
      //   toast.success("Variant deleted successfully");
      // }
    } catch (error) {
      toast.error("Failed to delete variant");
      console.error(error);
    }
  };

  const handleEditVariant = (variant) => {
    setSelectedVariant(variant);
    dispatch(setIsVariantModalOpen());
  };

  const handleCancel = () => {
    dispatch(setIsVariantModalOpen());
  };

  return (
    <>
      {skus.length > 0 && (
        <div>
          <h1 className="text-center lg:text-xl mt-9 mb-5 font-bold">
            Check your added Variant of The Product
          </h1>
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table className="w-full text-center table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Serial
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Attributes Value
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                       Price
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Stock
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {skus.map((item, index) => (
                  <tr key={item?.variationId} className="">
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.sku}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.price}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.stock}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditVariant(item)}
                          className={`cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md ${
                            pathname === "/admin/add-product" ? "hidden" : ""
                          }`}
                        >
                          <CiEdit size={20} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteTheVariant(item.variationId)
                          }
                          className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-md"
                        >
                          <CiTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* <Modal
        centered
        open={isVariantModalOpen}
        width={700}
        onCancel={handleCancel}
        closeIcon={<IoMdClose  style={{ fontSize: '24px', color: 'white' , backgroundColor:"red", padding:"2px" ,borderRadius:"100%"}} />}
        okButtonProps={{ style: { display: "none" , color:"white" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <EditVariation
          selectedVariant={selectedVariant}
          setSkus={setSkus}
          skus={skus}
        />
      </Modal> */}
    </>
  );
};
