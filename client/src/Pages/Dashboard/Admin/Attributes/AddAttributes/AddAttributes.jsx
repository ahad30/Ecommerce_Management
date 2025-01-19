import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../../../redux/Hook/Hook";
import { useAddAttributesMutation } from "../../../../../redux/Feature/Admin/attribute/attributesApi";
import { setIsAddModalOpen } from "../../../../../redux/Modal/ModalSlice";
import ZFormTwo from "../../../../../components/Form/ZFormTwo";
import ZInputTwo from "../../../../../components/Form/ZInputTwo";


const AddAttributes = () => {
  const dispatch = useAppDispatch();
  const [addonPages, setAddonPages] = useState([1]);
  const { isAddModalOpen } = useAppSelector((state) => state.modal);


  const [
    createAttribute,
    { isLoading, isError, isSuccess, error, data },
  ] = useAddAttributesMutation();



 
  useEffect(() => {
    if (!isAddModalOpen) {
      setAddonPages([1]);
    }
    // if(isSuccess){
    //   router.push("/Dashboard/Variation")
    // }
    
  }, [isAddModalOpen]);
  
  
  const handleSubmit = async (formData) => {
  // console.log(formData)
   createAttribute(formData)
  };
  
  
  const handleAddPage = () => {
    setAddonPages([...addonPages, addonPages.length + 1]);
  };

  const handleRemovePage = (pageValue) => {
    const updatedPages = addonPages.filter((item) => item !== pageValue);
    setAddonPages([...updatedPages]);
  };


  const handleInputChange = (index, value) => {
    const updatedPages = [...addonPages];
    updatedPages[index] = value;
    setAddonPages(updatedPages);
  };
  
  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  

  return (
    <div className="">
         <div>
        {/* <BreadCrumb /> */}
      </div>
      <ZFormTwo
        isLoading={isLoading }
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName={`Create`}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Attribute Name */}
          <ZInputTwo
            required
            name="name"
            type="text"
            label="Attribute Name"
            placeholder="Enter Attribute Name"
          />
          {/* Attribute Value */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Attribute Value</h4>
            <div className="max-h-[400px] overflow-y-scroll thin-scrollbar mb-5">
              {addonPages.map((page, index) => (
                <div
                  key={index}
                  className="flex  gap-4 items-center"
                >
                   <div className="w-[90%]">
                   <ZInputTwo
                      required={1}
                      name={`value.${index}`}
                      type="text"
                      label="Value Name"
                      placeholder="Enter Value Name"
                      onChange={(e) =>
                        handleInputChange(index, e.target.value)
                      }

                    />
                   </div>
                  <div className="">
                    {index === 0 && (
                      <button
                        type="button"
                        onClick={handleAddPage}
                        className="bg-blue-500 text-white py-1 mt-2 px-2 rounded"
                      >
                        <AiOutlinePlus size={15} />
                      </button>
                    )}
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePage(page)}
                        className="bg-red-500 text-white rounded px-2 py-1 mt-2 "
                      >
                        <AiOutlineMinus size={15} />
                      </button>
                      
                    )}
                  </div>
                </div>
                
              ))}
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end">
                   
                   <Button
                      htmlType="submit"
                      style={{ backgroundColor: "#162447", color: "white" }}
                    >
                      Submit
                    </Button>

                  </div> */}
      </ZFormTwo>
    </div>
  );
};

export default AddAttributes;
