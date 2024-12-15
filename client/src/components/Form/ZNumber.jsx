/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const numberRegex = /^[0-9]+$/;
const fractionRegex = /^[0-9]*\.?[0-9]*$/;

const ZNumber = ({
  name,
  label,
  value,
  setPriceQuantityImage,
  defaultKey,
  refresh,
  placeholder,
  required
}) => {
  const { control, setValue, resetField } = useFormContext();


  // by default reset
  useEffect(() => {
    const singleProductFields = [
      "stock",
      "min_stock",
      "max_stock",
      "salePrice",
      "serialNo",
      "purchasePrice",
      "wholeSalePrice",
      "retailPrice",
    ];
  
    const productFields = [
      "variationStock",
      "variation_min_stock",
      "variation_max_stock",
      "variationSalePrice",
      "variationSerialNo",
      "variationPurchasePrice",
      "variationWholeSalePrice",
      "variationRetailPrice",
    ];
  
    const resetFields = (fields, key) => {
      fields.forEach((field) => {
        if (name === field && defaultKey === key) {
          resetField(name, { defaultValue: "" });
        }
      });
    };
  
    resetFields(singleProductFields, "singleProduct");
    resetFields(productFields, "product");
  }, [resetField]);
  


  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, setValue]);

 
useEffect(() => {
  if (defaultKey === "product") {
    const productFields = [
      "variationStock",
      "variation_min_stock",
      "variation_max_stock",
      "variationSalePrice",
      "variationSerialNo",
      "variationPurchasePrice",
      "variationWholeSalePrice",
      "variationRetailPrice",
    ];

    productFields.forEach((field) => resetField(field));
  }
}, [refresh]);

const handleKeyPress = (event) => {
  const regex = [
    "salePrice",
    "purchasePrice",
    "wholeSalePrice",
    "retailPrice",
    "variationSalePrice",
    "variationPurchasePrice",
    "variationWholeSalePrice",
    "variationRetailPrice",
  ].includes(name)
    ? fractionRegex
    : numberRegex;

  // Prevent multiple decimal points
  if (
    (event.key === "." || event.key === ",") &&
    event.currentTarget.value.includes(".")
  ) {
    event.preventDefault();
    return;
  }

  if (!regex.test(event.key)) {
    event.preventDefault();
  }
};


  
  useEffect(() => {
    if (setPriceQuantityImage) {
      const resetValues = (key, values) => {
        if (defaultKey === key) {
          setPriceQuantityImage((_prev) => ({ ...values }));
        }
      };
  
      resetValues("singleProduct", {
        // images: "",
        stock: "",
        min_stock: "",
        max_stock: "",
        salePrice: "",
        serialNo: "",
        purchasePrice: "",
        wholeSalePrice: "",
        retailPrice: "",
      });
  
      resetValues("product", {
        // image: "",
        variationStock: "",
        variation_min_stock: "",
        variation_max_stock: "",
        variationSalePrice: "",
        variationSerialNo: "",
        variationPurchasePrice: "",
        variationWholeSalePrice: "",
        variationRetailPrice: "",
      });
    }
  }, []);
  

  const handleChange = (val) => {
    if (defaultKey === "product" && setPriceQuantityImage) {
      setPriceQuantityImage((prev) => ({
        ...prev,
        [name]: Number(val),
      }));
    }
    if (defaultKey === "singleProduct" && setPriceQuantityImage) {
      setPriceQuantityImage((prev) => ({
        ...prev,
        [name]: Number(val),
      }));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        // // ...(required && { 
        //   required: `This ${label} field is required` 
        // // })
        // ,
        pattern: {
          value:
            [
              "salePrice",
              "purchasePrice",
              "wholeSalePrice",
              "retailPrice",
              "variationSalePrice",
              "variationPurchasePrice",
              "variationWholeSalePrice",
              "variationRetailPrice",
            ].includes(name)
              ? fractionRegex
              : numberRegex,
          message:
            [
              "salePrice",
              "purchasePrice",
              "wholeSalePrice",
              "retailPrice",
              "variationSalePrice",
              "variationPurchasePrice",
              "variationWholeSalePrice",
              "variationRetailPrice",
            ].includes(name)
              ? "Please enter a valid number, including fractions"
              : "Only digits 1 to 9 are allowed",
        },
        maxLength: {
          value: [
            "salePrice",
            "purchasePrice",
            "wholeSalePrice",
            "retailPrice",
            "variationSalePrice",
            "variationPurchasePrice",
            "variationWholeSalePrice",
            "variationRetailPrice",
          ].includes(name)
            ? 10
            : 5,
          message: `Maximum length is ${
            [
              "salePrice",
              "purchasePrice",
              "wholeSalePrice",
              "retailPrice",
              "variationSalePrice",
              "variationPurchasePrice",
              "variationWholeSalePrice",
              "variationRetailPrice",
            ].includes(name)
              ? 10
              : 5
          } digits`,
        },
      }}
      
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Input
            {...field}
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleChange(e.target.value);
            }}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
            maxLength={
              [
                "salePrice",
                "purchasePrice",
                "wholeSalePrice",
                "retailPrice",
                "variationSalePrice",
                "variationPurchasePrice",
                "variationWholeSalePrice",
                "variationRetailPrice",
              ].includes(name)
                ? 10
                : 5
            }
            
          />
        </Form.Item>
      )}
    />
  );
};

export default ZNumber;
