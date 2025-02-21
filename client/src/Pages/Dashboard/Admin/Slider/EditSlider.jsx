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
  const dispatch = useAppDispatch();
  const [updateSlider, { isLoading: SIsLoading, isError: SIsError, error: SError, isSuccess: SIsSuccess }] = useUpdateSliderMutation();
  
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      let imageUrl = selectedSlider?.imageUrl;

      // Handle image removal
      if (isImageRemoved) {
        imageUrl = ""; // Clear the image URL if removed
        console.log('Image removed'); // Debugging
      }

      // Handle new image upload (only if a new image is provided and not removed)
      if (formData?.imageUrl && !isImageRemoved) {
        const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
        
        const imageFile = new FormData();
        imageFile.append('image', formData.imageUrl);
        
        const res = await axios.post(image_hosting_api, imageFile);

        if (res?.data?.success) {
          imageUrl = res.data.data.display_url;
          console.log('New image uploaded:', imageUrl); // Debugging
        } else {
          throw new Error('Image upload failed');
        }
      }

      // Prepare slider data for the API
      const sliderData = {
        title: formData?.title,
        description: formData?.description,
        imageUrl: imageUrl,
        linkUrl: formData?.linkUrl,
        isActive: formData?.isActive,
      };

      console.log('Updating slider with data:', sliderData); // Debugging

      // Call the updateSlider mutation
      await updateSlider({ id: selectedSlider.id, data: sliderData }).unwrap();

      // Show success message and close the modal
      toast.success("Slider Updated Successfully");
      handleCloseAndOpen();
    } catch (error) {
      console.error('Error updating slider:', error);
      toast.error(error.message || 'Error updating slider. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen()); // Close the edit modal
  };

  return (
    <div className="">
      <ZFormTwo
        isError={SIsError}
        error={SError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}  
        formType="edit"  
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
            onChange={() => setIsImageRemoved(false)} // Reset isImageRemoved when a new image is selected
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
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditSlider;