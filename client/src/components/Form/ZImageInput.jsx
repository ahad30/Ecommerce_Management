import { Button, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/Hook/Hook";

const ZImageInput = ({
  name,
  label,
  defaultValue,
  onRemove,
  onChange,
  defaultKey,
  setPriceQuantityImage,
  refresh,
}) => {
  console.log("Default Value in ZImageInput:", defaultValue);
  const [imageList, setImageList] = useState([]);
  const { control, resetField } = useFormContext();
  const { isAddModalOpen, isEditModalOpen, isVariantModalOpen } = useAppSelector(
    (state) => state.modal
  );

  // Reset imageList when modal is closed
  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen || !isVariantModalOpen) {
      // setImageList([]);
      resetField(name);
    }
  }, [isAddModalOpen, isEditModalOpen, isVariantModalOpen]);

  // Update imageList when defaultValue changes
  useEffect(() => {
    if (defaultValue && defaultValue[0]?.url) {
      setImageList([
        {
          uid: defaultValue[0].uid || "-1",
          name: defaultValue[0].name || "Previous Image",
          status: "done",
          url: defaultValue[0].url,
        },
      ]);
    } else {
      setImageList([]); // Clear imageList if defaultValue is empty
    }
  }, [defaultValue]);

  // Handle refresh (if needed)
  useEffect(() => {
    if (defaultKey === "product") {
      setImageList([]);
    }
  }, [refresh]);

  // Handle file change
  const handleChange = (info) => {
    const file = info.file;

    if (info.fileList.length > 0) {
      const newFileList = [
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        },
      ];
      setImageList(newFileList);

      // Call parent onChange handler if provided
      if (onChange) {
        onChange(file);
      }

      // Update price quantity image if needed
      if (setPriceQuantityImage && defaultKey === "product") {
        setPriceQuantityImage((prev) => ({
          ...prev,
          imageUrl: file,
        }));
      }
    } else {
      setImageList([]);

      // Call parent onChange handler if provided
      if (onChange) {
        onChange(null);
      }

      // Update price quantity image if needed
      if (setPriceQuantityImage && defaultKey === "product") {
        setPriceQuantityImage((prev) => ({
          ...prev,
          imageUrl: "",
        }));
      }
    }
  };

  // Handle file removal
  const handleRemove = () => {
    setImageList([]);

    // Call parent onRemove handler if provided
    if (onRemove) {
      onRemove();
    }

    // Call parent onChange handler if provided
    if (onChange) {
      onChange(null);
    }

    // Update price quantity image if needed
    if (setPriceQuantityImage && defaultKey === "product") {
      setPriceQuantityImage((prev) => ({
        ...prev,
        imageUrl: "",
      }));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload
            name="image"
            listType="picture"
            fileList={imageList}
            onPreview={(file) => {
              const url = file.url || URL.createObjectURL(file.originFileObj);
              window.open(url, "_blank");
            }}
            beforeUpload={(file) => {
              const newFileList = [
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  url: URL.createObjectURL(file),
                },
              ];
              setImageList(newFileList);
              onChange(file);

              if (defaultKey === "product" && setPriceQuantityImage) {
                setPriceQuantityImage((prev) => ({
                  ...prev,
                  imageUrl: file,
                }));
              }

              return false; // Prevent automatic upload
            }}
            onRemove={handleRemove}
            maxCount={1}
            onChange={handleChange}
            showUploadList={{
              showRemoveIcon: false,
              showPreviewIcon: true,
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;