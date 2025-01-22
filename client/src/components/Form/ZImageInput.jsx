import { Button, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/Hook/Hook";

const ZImageInput = ({ name, label, dragDrop, defaultValue, onRemove }) => {
  const [imageList, setImageList] = useState([]);
  const { control, resetField } = useFormContext();
  const { isAddModalOpen, isEditModalOpen } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      setImageList([]);
      resetField(name);
    }
  }, [isAddModalOpen, isEditModalOpen]);

  useEffect(() => {
    if (defaultValue && defaultValue[0]?.url) {
      setImageList([
        {
          uid: defaultValue[0].uid,
          name: defaultValue[0].name,
          status: "done",
          url: defaultValue[0].url,
        },
      ]);
    }
  }, [defaultValue]);

  const handleChange = (info) => {
    const file = info.file;
    console.log(file);
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
            listType="picture-card"
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
              return false; // Prevent automatic upload
            }}
            onRemove={() => {
              setImageList([]);
              onChange(null);
              if (onRemove) onRemove(); // Call the onRemove callback if provided
            }}
            maxCount={1}
            onChange={handleChange}
          >
            {imageList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;
