import React, { useState } from "react";
import ZFormTwo from "../../../../components/Form/ZFormTwo";
import ZInputTwo from "../../../../components/Form/ZInputTwo";
import { useAppDispatch } from "../../../../redux/Hook/Hook";
import { setIsEditModalOpen } from "../../../../redux/Modal/ModalSlice";
import ZSelect from "../../../../components/Form/ZSelect";
import ZImageInput from "../../../../components/Form/ZImageInput";
import axios from "axios"; // Ensure axios is imported
import { toast } from "sonner";
import { useUpdateSliderMutation } from "../../../../redux/Feature/Admin/slider/sliderApi";

const EditSlider = ({ selectedSlider }) => {
  console.log(selectedSlider)
  const dispatch = useAppDispatch();
  const [updateSlider, { isLoading: SIsLoading, isError: SIsError, error: SError, isSuccess: SIsSuccess, data }] = useUpdateSliderMutation();
  
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      let imageUrl = selectedSlider?.imageUrl;

      if (formData.imageUrl && !isImageRemoved) {
        const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
        
        const imageFile = new FormData();
        imageFile.append('image', formData.imageUrl);
        
        const res = await axios.post(image_hosting_api, imageFile);

        if (res?.data?.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      if (isImageRemoved) {
        imageUrl = ""; // Set imageUrl to empty string if the image was removed
      }

      const sliderData = {
        title: formData?.title,
        description: formData?.description,
        imageUrl: imageUrl,
        linkUrl: formData?.linkUrl,
        isActive: formData?.isActive,
        // createdById: "64b8c4c8d4a7f3d9e0e6e1d4"
      };

      updateSlider({ id: selectedSlider.id, data: sliderData });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error updating slider. Please try again.');
    }
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={SIsLoading}
        isSuccess={SIsSuccess}
        isError={SIsError}
        error={SError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}  
        formType="edit"  
        data={data}
        buttonName="Update"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            value={selectedSlider?.title}
            name="title"
            type="text"
            label="Title"
            placeholder={"Enter the title"}
            required
          />

          <ZInputTwo
            value={selectedSlider?.description}
            name="description"
            type="text"
            label="Description"
            placeholder={"Enter the description"}
            required
          />

          <ZImageInput
            name="imageUrl"
            label="Slider Image"
            onRemove={() => setIsImageRemoved(true)} // Set image removal state
            defaultValue={selectedSlider?.imageUrl ? [
              {
                uid: '-1',
                name: 'Current Image',
                status: 'done',
                url: selectedSlider?.imageUrl,
              },
            ] : []}
          />

          <ZInputTwo
            value={selectedSlider?.linkUrl}
            name="linkUrl"
            type="text"
            label="Link URL"
            placeholder={"Enter the link URL"}
            
          />

          <ZSelect
            name="isActive"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            placeholder="Select status"
            value={selectedSlider?.isActive}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditSlider;