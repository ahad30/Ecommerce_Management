/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import { useAppSelector } from "../../Redux/hook";

const ZImageInput = ({ name, label, dragDrop }) => {
  const [imageList, setImageList] = useState([]);
  const { control, resetField } = useFormContext();
  // const { isAddModalOpen, isEditModalOpen } = useAppSelector(
  //   (state) => state.modal
  // );

  // useEffect(() => {
  //   if (!isAddModalOpen || !isEditModalOpen) {
  //     setImageList([]);
  //     resetField(name);
  //   }
  // }, [isAddModalOpen, isEditModalOpen]);

  const handleChange = (info) => {
    const file = info.file;
    console.log(file);
  };

  return (
    <Controller
      name={name}
      control={control}
      // rules={{
      //   required: "The field is required",
      // }}
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
              const url = URL.createObjectURL(file.originFileObj);
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
            }}
            maxCount={1}
            onChange={handleChange}
          >
          {dragDrop ? 
            <Button className="py-8" icon={<InboxOutlined className="text-blue-500 text-[24px]"/>}>
             Drag & Drop Upload
            </Button>
            :
            <Button icon={<UploadOutlined/>}>
              Upload
             </Button>
           }
          </Upload>
        </Form.Item>
      )}
    />
  );
};

export default ZImageInput;
