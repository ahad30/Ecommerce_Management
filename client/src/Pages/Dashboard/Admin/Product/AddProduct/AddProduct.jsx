"use client";
import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { toast } from "sonner";
import { useGetAttributesQuery } from "../../../../../redux/Feature/Admin/attribute/attributesApi";
import { useGetBrandQuery } from "../../../../../redux/Feature/Admin/brand/brandApi";
import { useAddProductMutation } from "../../../../../redux/Feature/Admin/product/productApi";
import { useGetCategoryQuery } from "../../../../../redux/Feature/Admin/category/categoryApi";
import { useNavigate } from "react-router-dom";
import { VariantProductTable } from "../../../../../components/VariantProductTable";
import ZFormTwo from "../../../../../components/Form/ZFormTwo";
import ZInputTwo from "../../../../../components/Form/ZInputTwo";
import ZSelect from "../../../../../components/Form/ZSelect";
import ZInputTextArea from "../../../../../components/Form/ZInputTextArea";
import { variantExists } from "../../../../../components/helper/SameVariantExist";
import BreadCrumb from "../../../../../components/BreadCrumb/BreadCrumb";
import ZNumber from "../../../../../components/Form/ZNumber";
import ZRadio from "../../../../../components/Form/ZRadio";

function generateUniqueId(length = 2) {
  const chars = "123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return parseInt(result, 10);
}

const AddProduct = () => {
  // attribute State - 1 from db
  const [attributeValue, setAttributeValue] = useState([]);

  // selected attribute State - 2
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  // attribute options for selected options state-3
  const [attributeOptions, setAttributeOptions] = useState([]);
  //  product type state - 4
  const [typeProduct, setProductType] = useState("");
  // selectedAttribute UnderTheValue - 5
  const [selectedAttributeUnderTheValue, setSelectedAttributeUnderTheValue] =
    useState([]);
  // per sku - 6
  const [perSku, setPerSku] = useState([]);
  //  skus - 7
  const [skus, setSkus] = useState([]);

  //  refresh state for variant
  const [refresh, setRefresh] = useState(false);

  // image file , price , quantity - 8 for vairant product
  const [priceQuantityImage, setPriceQuantityImage] = useState({
    // productImage:"",
    stock: "",
    min_stock: "",
    max_stock: "",
    salePrice: "",
    serialNo: "",
    purchasePrice: "",
    wholeSalePrice: "",
    retailPrice: "",
    qrCode: "",
  });

  // single -----> image file , price , quantity - 9
  const [singlePriceQuantityImage, singleSetPriceQuantityImage] = useState({
    // images:"",
    // salePrice: "",
    // serialNo: "",
    productInitialQty: "",
    productMinQty: "",
    productMaxQty: "",
    productPurchasePrice: "",
    productWholeSalesPrice: "",
    productRetailPrice: "",
  });

  const navigate = useNavigate();

  const { data: eData, isLoading: eLoading } = useGetCategoryQuery();
  const { data: bData, isLoading: bLoading } = useGetBrandQuery();
  const { data: attributeWithValue, isLoading: attributeIsLoading } =
    useGetAttributesQuery();
  const [
    createProduct,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useAddProductMutation();

  //  console.log(attributeWithValue);



  const categoryData = eData?.data?.map((eCategory) => ({
    label: eCategory.categoryName,
    value: eCategory.id,
  }));

  const brandData = bData?.data?.map((brand) => ({
    label: brand.brandName,
    value: brand.brandID,
  }));


  useEffect(() => {
    if (
      Array.isArray(attributeWithValue?.data) &&
      attributeWithValue?.data?.length > 0
    ) {
      const attributeOptions = attributeWithValue?.data?.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setAttributeOptions([...attributeOptions]);
      setAttributeValue([...attributeWithValue.data]);
    }
  }, [attributeWithValue, attributeWithValue?.data]);

  useEffect(() => {
    if (selectedAttribute) {
      const arr = [];
      for (let index = 0; index < selectedAttribute.length; index++) {
        const element = selectedAttribute[index];
        const findTheAttributeWithValue = attributeValue?.find(
          (item) => item.name == element
        );

        if (findTheAttributeWithValue) {
          arr.push({ ...findTheAttributeWithValue });
        }
      }
      setSelectedAttributeUnderTheValue([...(arr || [])]);
    }
  }, [selectedAttribute.length, selectedAttribute, attributeValue]);

  useEffect(() => {
    setSkus([]);
  }, [typeProduct]);

  useEffect(() => {
    if (CIsSuccess) {
      navigate("/products");
    }
  }, [CIsSuccess]);

  const handleAddPerSkuInSkus = () => {

    const attributes = {};
    const valuesName = [];

    if (perSku.length === 0) {
      toast.error("Select minimum an attribute value", {
        id: 2,
        duration: 1000,
        position: "top-right",
      });
    }
    if (priceQuantityImage.stock === "") {
      toast.error("Enter variation stock", { id: 1 });
    }
    if (priceQuantityImage.min_stock === "") {
      toast.error("Enter minimum variation stock", { id: 2 });
    }
    if (priceQuantityImage.max_stock === "") {
      toast.error("Enter maximum variation stock", { id: 3 });
    }
    if (priceQuantityImage.salePrice === "") {
      toast.error("Enter variation sale price", { id: 4 });
    }
    if (priceQuantityImage.serialNo === "") {
      toast.error("Enter variation serial number", { id: 5 });
    }
    if (priceQuantityImage.purchasePrice === "") {
      toast.error("Enter variation purchase price", { id: 6 });
    }
    if (priceQuantityImage.wholeSalePrice === "") {
      toast.error("Enter variation wholesale price", { id: 7 });
    }
    if (priceQuantityImage.retailPrice === "") {
      toast.error("Enter variation retail price", { id: 8 });
    }
    if (priceQuantityImage.qrCode === "") {
      toast.error("Enter variation qr Code", { id: 9 });
    }

    if (
      perSku.length > 0 &&
      priceQuantityImage.stock &&
      priceQuantityImage.min_stock &&
      priceQuantityImage.max_stock &&
      priceQuantityImage.salePrice &&
      priceQuantityImage.serialNo &&
      priceQuantityImage.purchasePrice &&
      priceQuantityImage.wholeSalePrice &&
      priceQuantityImage.retailPrice &&
      priceQuantityImage.qrCode
    ) {
      perSku.forEach((element) => {
        const proPertyKey = element.split("-")[0];
        const proPertyValue = element.split("-")[1];
        valuesName.push(proPertyValue);
        attributes[proPertyKey] = proPertyValue;
     
      });

      const sku = {
        variationId:generateUniqueId(),
        sku: `${valuesName.join("-")}`,
        stock: priceQuantityImage.stock,
        min_stock: priceQuantityImage.min_stock,
        max_stock: priceQuantityImage.max_stock,
        salePrice: priceQuantityImage.salePrice,
        serialNo: priceQuantityImage.serialNo,
        purchasePrice: priceQuantityImage.purchasePrice,
        wholeSalePrice: priceQuantityImage.wholeSalePrice,
        retailPrice: priceQuantityImage.retailPrice,
        qrCode: priceQuantityImage.qrCode,
        attributes,
      };

      console.log(sku);
      if (skus.length === 0) {
        setSkus([...skus, { ...sku }]);
        handleRefreshVariantState();
      }
      else if (skus.length > 0) {
        const skusAttributes = skus.map((sku) => sku.attributes);
        const exist = variantExists(skusAttributes, sku.attributes);
        if (!exist) {
          setSkus([...skus, { ...sku }]);
          handleRefreshVariantState();
        } else {
          toast.error("Already exists the variant of the product", {
            duration: 2000,
          });
        }
      }

    }
  };

  const handleRefreshVariantState = () => {
    setPerSku([]);
    setPriceQuantityImage({
      stock: "",
      min_stock: "",
      max_stock: "",
      salePrice: "",
      serialNo: "",
      purchasePrice: "",
      wholeSalePrice: "",
      retailPrice: "",
      qrCode: "",
    });
    setRefresh(!refresh);
  };

  const handleSubmit = (data) => {
    const modifiedData = {
      productType: Number(data.productType),
      branchIDs: data.branchIDs,
      brandID: data.brandID,
      businessID: data.businessID,
      erpCategoryID: data.erpCategoryID,
      isActive: data.isActive,
      notAvailableBranchIDs: data.notAvailableBranchIDs,
      productDescription: data.productDescription,
      productSubtitle: data.productSubtitle,
      productTitle: data.productTitle,
    };

    // Check if product is single
    if (modifiedData.productType === 1) {
      // Validation for single product fields
      if (data.sku === "") {
        toast.error("Single product sku is required", {
          id: 10,
          duration: 2000,
          position: "top-right",
        });
      }

      // if (data.salePrice === "") {
      //   toast.error("Single product sale price required", {
      //     id: 10,
      //     duration: 1000,
      //     position: "top-right",
      //   });
      // }

      if (data.productInitialQty === "") {
        toast.error("Single product stock required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.productMinQty === "") {
        toast.error("Single product min stock required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.productMaxQty === "") {
        toast.error("Single product max stock required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }
      // if (data.serialNo === "") {
      //   toast.error("Single product serial number required", {
      //     id: 3,
      //     duration: 1000,
      //     position: "top-right",
      //   });
      // }
      if (data.productPurchasePrice === "") {
        toast.error("Single product purchase price required", {
          id: 4,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.productWholeSalesPrice === "") {
        toast.error("Single product wholesale price required", {
          id: 5,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.productRetailPrice === "") {
        toast.error("Single product retail price required", {
          id: 6,
          duration: 1000,
          position: "top-right",
        });
      }

      // Only proceed if all required fields are filled
      if (
        // data.salePrice &&
        data.productInitialQty &&
        // data.serialNo &&
        data.productPurchasePrice &&
        data.productWholeSalesPrice &&
        data.productRetailPrice &&
        data.productMinQty &&
        data.productMaxQty &&
        data?.sku
      ) {
        const singleProductData = {
          ...modifiedData,
          sku: data?.sku,
          // salePrice: data.salePrice,
          // serialNo: data.serialNo,
          productInitialQty: data.productInitialQty, 
          productMinQty: data.productMinQty,
          productMaxQty: data.productMaxQty,
          productPurchasePrice: data.productPurchasePrice,
          productWholeSalesPrice: data.productWholeSalesPrice,
          productRetailPrice: data.productRetailPrice,
          productVariant: [],
        };

        console.log(singleProductData);
        // createProduct(singleProductData);
      }
    }
    // Check if the product is a variant product
    else if (modifiedData.productType === 0) {
      if (skus.length > 0) {
        const variantProductData = {
          ...modifiedData,
           sku: "",
          variants: skus.map((sku, index) => ({
            key: index,
            attributes: sku.attributes,
            sku: sku.sku,
            // variationId: sku?.variationId,
            stock: sku.stock,
            min_stock: sku.min_stock,
            max_stock: sku.max_stock,
            salePrice: sku.salePrice,
            serialNo: sku.serialNo,
            purchasePrice: sku.purchasePrice,
            wholeSalePrice: sku.wholeSalePrice,
            retailPrice: sku?.retailPrice,
            qrCode: sku?.qrCode,
          })),
        };
        console.log(variantProductData);
        // createProduct(variantProductData);
      } else {
        toast.error("Missing variant attribute", {
          id: 1,
          duration: 1000,
          position: "top-right",
        });
      }
    }
  };

  if (eLoading || bLoading || attributeIsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          <Spin size="large" />
        </p>
      </div>
    );
  }

  return (
    <div className="">
    
        <BreadCrumb />
      <ZFormTwo
        isLoading={CIsloading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={CError}
        submit={handleSubmit}
        formType="create"
        data={data}
        buttonName="Submit"
      >

          <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-10">
              <ZInputTwo
                name="name"
                type="text"
                label="Product Name"
                placeholder="Enter product title"
              />
              <ZInputTwo
                name="productSubtitle"
                type="text"
                label="Subtitle"
                placeholder="Enter product subtitle"
              />

              {typeProduct == 1 && (
                <ZInputTwo
                  name="sku"
                  type="text"
                  label="SKU"
                  placeholder="Enter SKU"
                  required
                />
              )}
              <ZSelect
                name="categoryId"
                isLoading={eLoading}
                label="Product Category"
                options={categoryData}
                placeholder="Select category"
              />

              <ZSelect
                name="brandId"
                isLoading={bLoading}
                label="Product Brand"
                options={brandData}
                placeholder="Select brand"
              />

          

              <div className="lg:col-span-2">
                <ZInputTextArea
                  name="description"
                  type="text"
                  label="Description"
                  placeholder="Enter product description"
                />
              </div>

             

           

              {/* <ZImageInput
                label="Product Image"
                name="productImage"
              ></ZImageInput> */}

              <ZSelect
                name="status"
                label="Status"
                options={[
                  { label: "Active", value: true },
                  { label: "Inactive", value: false },
                ]}
                placeholder="Select status"
              />
              <ZSelect
                name="topSale"
                label="Top Sale"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                placeholder="Select status"
              />
              <ZSelect
                name="newArrival"
                label="New Arrival"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                placeholder="Select status"
              />
              <ZSelect
                name="availability"
                label="Availability"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                placeholder="Select status"
              />

              <div className="mt-7 lg:col-span-2">
                <h5 className="text-xl  pb-2 mb-2  ">Type of products</h5>
                <ZRadio
                  options={[
                    {
                      name: "Without Variant",
                      value: "1",
                    },
                    {
                      name: "With Variant",
                      value: "0",
                    },
                  ]}
                  name={"productType"}
                  label={"Product type"}
                  setProductType={setProductType}
                ></ZRadio>
              </div>

              {/* single Product type start */}

              {typeProduct === "1" && (
                <>
                  <ZNumber
                    name="productInitialQty"
                    label="Stock Quantity"
                    placeholder="Enter Stock Quantity"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />

                  <ZNumber
                    name="productMinQty"
                    label="Minimum Stock"
                    placeholder="Enter Minimum Stock"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="productMaxQty"
                    label="Maximum Stock"
                    placeholder="Enter Maximum Stock"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  {/* <ZNumber
                    name="salePrice"
                    label="Sale Price"
                    placeholder="Enter Sale Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />

                  <ZNumber
                    name="serialNo"
                    label="Serial No"
                    placeholder="Enter Serial No"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  /> */}

                  <ZNumber
                    name="productPurchasePrice"
                    label="Purchase Price"
                    placeholder="Enter Purchase Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="productWholeSalesPrice"
                    label="Wholesale Price"
                    placeholder="Enter Wholesale Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="productRetailPrice"
                    label="Retail Price"
                    placeholder="Enter Retail Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                </>
              )}
            </div>

            {/* variant Product type start */}
            {typeProduct === "0" && (
              <div className="mb-3">
                {/* per sku  */}

                {/* multiple attribute */}
                <ZSelect
                  setSelectedAttributes={setSelectedAttribute}
                  options={attributeOptions}
                  isLoading={attributeIsLoading}
                  mode={"multiple"}
                  label={"Select Variations"}
                  name={"attribute-selected"}
                  defaultKey="product"
                  placeholder={"Select Variant Name"}
                  refresh={refresh}
                ></ZSelect>

                {/* selected attribute underTheValue */}
                <div className="border border-gray-400 p-3">
                  {/* attribute value */}
                  <div className="mt-12 grid lg:grid-cols-5 gap-5">
                    {selectedAttributeUnderTheValue.map((item) => {
                      return (
                        <ZSelect
                          key={item?.id}
                          options={item?.value?.map((option) => ({
                            value: `${item?.name}-${option?.name}`,
                            label: option?.name,
                          }))}
                          isLoading={attributeIsLoading}
                          mode={undefined}
                          label={`${item.name} value`}
                          name={`${item.name}`}
                          setPerSku={setPerSku}
                          defaultKey="product"
                          selectedAttribute={selectedAttribute}
                          refresh={refresh}
                          placeholder={`Select ${item.name} value`}
                        ></ZSelect>
                      );
                    })}
                  </div>
                  {/* image, quantity, price*/}
                  <div className="grid grid-cols-1 items-center gap-x-2 lg:grid-cols-3">
                    <>
                      <ZNumber
                        name="stock"
                        label="Stock Quantity"
                        placeholder="Enter Stock Quantity"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />

                      <ZNumber
                        name="min_stock"
                        label="Minimum Stock"
                        placeholder="Enter Minimum Stock"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="max_stock"
                        label="Maximum Stock"
                        placeholder="Enter Maximum Stock"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="salePrice"
                        label="Sale Price"
                        placeholder="Enter Sale Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />

                      <ZNumber
                        name="serialNo"
                        label="Serial No"
                        placeholder="Enter Serial No"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="qrCode"
                        label="Qr Code No"
                        placeholder="Enter Qr code"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="purchasePrice"
                        label="Purchase Price"
                        placeholder="Enter Purchase Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="wholeSalePrice"
                        type="number"
                        label="Wholesale Price"
                        placeholder="Enter Wholesale Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="retailPrice"
                        type="number"
                        label="Retail Price"
                        placeholder="Enter Retail Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                    </>
                  </div>

                  {/* button */}
                  <div className="flex justify-end">
                    <Button
                      htmlType="button"
                      onClick={() => handleAddPerSkuInSkus()}
                      style={{ backgroundColor: "#162447", color: "white" }}
                    >
                      + Add Variant
                    </Button>
                  </div>
                </div>
                {/* per sku end */}
              </div>
            )}

          
          </>
      </ZFormTwo>
      <VariantProductTable skus={skus} setSkus={setSkus}></VariantProductTable>
    </div>
  );
};

export default AddProduct;
