/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Upload, Button } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

const ZMultipleImage = ({ name, label,dragDrop }) => {
  const { control, resetField } = useFormContext();

  const onChange = (fileList) => {
    const images = fileList.map((item) => item.originFileObj);
    // Additional logic can be added here if needed
    console.log(fileList);
  };

  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
    // Additional logic can be added here if needed
  };

  useEffect(() => {
    if (resetField) {
      resetField(name, { defaultValue: [] });
    }
  }, [resetField, name]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} // Ensuring the default value is an empty array
      rules={{
        required: "The field is required",
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload
            {...field}
            
            listType="picture"
            multiple
            beforeUpload={() => false} // Prevent auto-upload
            onChange={({ fileList }) => {
              field.onChange(fileList);
              onChange(fileList);
            }}
            onDrop={onDrop}
            fileList={field.value || []} // Ensure the fileList is an empty array by default
            maxCount={4}
          >
            {dragDrop ? 
            <Button icon={<InboxOutlined className="text-blue-500 text-[20px]"/>}>
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

export default ZMultipleImage;
