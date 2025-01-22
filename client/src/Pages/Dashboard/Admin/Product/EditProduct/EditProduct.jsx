"use client";
import React, { useEffect, useState } from "react";
import {
  useGetProductsByIdQuery,
  useUpdateProductMutation,
} from "@/redux/Feature/Admin/product/productApi";
import { useRouter, useSearchParams } from "next/navigation";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZNumber from "@/components/Form/ZNumber";
import ZSelect from "@/components/Form/ZSelect";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { Button, Spin } from "antd";
import { VariantProductTable } from "@/components/VariantProductTable";
import { useGetErpCategoryQuery } from "@/redux/Feature/Admin/erpcategory/erpcategory";
import { useGetBrandQuery } from "@/redux/Feature/Admin/brand/brandApi";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import { useGetAttributesQuery } from "@/redux/Feature/Admin/product/attributesApi";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { toast } from "sonner";
import { useAddProductVariationApiMutation } from "@/redux/Feature/Admin/product/productVariationApi";

function generateUniqueId(length = 2) {
  const chars = "123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return parseInt(result, 10);
}

const EditProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [updateProductData, setUpdateProductData] = useState({});
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

  

  const { data: eData, isLoading: eLoading } = useGetErpCategoryQuery();
  const { data: bData, isLoading: bLoading } = useGetBrandQuery();
  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const {
    data: allBranchData,
    error,
    isLoading: branchIsLoading,
  } = useGetBranchesQuery();
  const { data: attributeWithValue, isLoading: attributeIsLoading } =
    useGetAttributesQuery();
  const {
    data: productData,
    isLoading, 
    isSuccess
  } = useGetProductsByIdQuery(productId);
  const [
    updateProduct,
    {
      data: pData,
      isSuccess: pIsSuccess,
      isLoading: pIsLoading,
      isError: pIsError,
      error: pError,
    },
  ] = useUpdateProductMutation();
  const [addVariation, { isLoading: addVariationLoading }] = useAddProductVariationApiMutation();

console.log(productData?.data)
  useEffect(() => {
    const product = productData?.data;
    if (isSuccess &&  product) {
      setUpdateProductData(product);
      setProductType(product.productType);
      if (product.productType === "0") {
        setSkus(
          product.productVariant.map((variant) => ({
            variationId: variant.productVariantID,
            sku: variant.sku,
            stock: variant.stock,
            min_stock: variant.min_stock,
            max_stock: variant.max_stock,
            salePrice: variant.salePrice,
            serialNo: variant.serialNo,
            purchasePrice: variant.purchasePrice,
            wholeSalePrice: variant.wholeSalePrice,
            retailPrice: variant.retailPrice,
            qrCode: variant.qrCode,
            attributes: variant.attribute_combination,
          }))
        );
      }
    }
  }, [isSuccess , productData?.data]);


  useEffect(() => {
    if (
      Array.isArray(attributeWithValue?.data) &&
      attributeWithValue?.data?.length > 0
    ) {
      const attributeOptions = attributeWithValue?.data?.map((item) => ({
        label: item.attributeName,
        value: item.attributeName,
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
          (item) => item.attributeName == element
        );

        if (findTheAttributeWithValue) {
          arr.push({ ...findTheAttributeWithValue });
        }
      }
      setSelectedAttributeUnderTheValue([...(arr || [])]);
    }
  }, [selectedAttribute.length, selectedAttribute, attributeValue]);

  // useEffect(() => {
  //   setSkus([]);
  // }, [typeProduct]);



  const handleAddVariant = async () => {
    const attributes = [];
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
        const [attributeName, attributeValue] = element.split("-");
        valuesName.push(attributeValue);
        attributes.push({ attributeName, attributeValue });
      });

      const sku = {
        variationId: generateUniqueId(),
        sku: `${valuesName.join("-")}`,
        stock: priceQuantityImage.stock,
        min_stock: priceQuantityImage.min_stock,
        max_stock: priceQuantityImage.max_stock,
        salePrice: priceQuantityImage.salePrice,
        serialNo: String(priceQuantityImage.serialNo),
        purchasePrice: priceQuantityImage.purchasePrice,
        wholeSalePrice: priceQuantityImage.wholeSalePrice,
        retailPrice: priceQuantityImage.retailPrice,
        qrCode: String(priceQuantityImage.qrCode),
        attributes,
      };

      if (skus.length === 0) {
        try {
          const response = await addVariation({
            productID: productId,
            sku: sku.sku,
            stock: Number(sku.stock),
            min_stock: Number(sku.min_stock),
            max_stock: Number(sku.max_stock),
            salePrice: Number(sku.salePrice),
            serialNo: String(sku.serialNo),
            purchasePrice: Number(sku.purchasePrice),
            wholeSalePrice: Number(sku.wholeSalePrice),
            retailPrice: Number(sku.retailPrice),
            qrCode: sku.qrCode,
            
          }).unwrap();

          if (response) {
            setSkus([...skus, { ...sku, variationId: response.data.id }]);
            handleRefreshVariantState();
            toast.success("Variant added successfully");
          }
        } catch (error) {
          toast.error(error?.data?.message || "Failed to add variant");
          console.error(error);
        }
      } else if (skus.length > 0) {
        const isDuplicate = skus.some(
          (existingSku) => existingSku.sku === sku.sku
        );
        if (isDuplicate) {
          toast.error("This variant has already been added.", { id: 9 });
        } else {
          try {
            const response = await addVariation({
              productID: productId,
              sku: sku.sku,
              stock: Number(sku.stock),
              min_stock: Number(sku.min_stock),
              max_stock: Number(sku.max_stock),
              salePrice: Number(sku.salePrice),
              serialNo: String(sku.serialNo),
              purchasePrice: Number(sku.purchasePrice),
              wholeSalePrice: Number(sku.wholeSalePrice),
              retailPrice: Number(sku.retailPrice),
              qrCode: sku.qrCode
            }).unwrap();

            if (response) {
              setSkus([...skus, { ...sku, variationId: response.data.id }]);
              handleRefreshVariantState();
              toast.success("Variant added successfully");
            }
          } catch (error) {
            toast.error(error?.data?.message || "Failed to add variant");
            console.error(error);
          }
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

  const handleSubmit = async (values) => {
    try {
      const formData = {
        productTitle: values.productTitle,
        productSubtitle: values.productSubtitle,
        productDescription: values.productDescription,
        businessID: values.businessID,
        branchIDs: values.branchIDs,
        notAvailableBranchIDs: values.notAvailableBranchIDs,
        brandID: values.brandID,
        erpCategoryID: values.erpCategoryID,
        isActive: values.isActive,
        productType: typeProduct,
      };
                         
      // For single product
      if (typeProduct === "1") {
        formData.sku = values.sku;
        formData.productInitialQty = Number(values.productInitialQty);
        formData.productMinQty = Number(values.productMinQty);
        formData.productMaxQty = Number(values.productMaxQty);
        formData.productPurchasePrice = Number(values.productPurchasePrice);
        formData.productWholeSalesPrice = Number(values.productWholeSalesPrice);
        formData.productRetailPrice = Number(values.productRetailPrice);
        formData.productVariant = [];
      }
      // For variant product
      else if (typeProduct === "0") {
        // if (skus.length === 0) {
        //   toast.error("At least one variant is required");
        //   return;
        // }

        formData.productVariant = skus.map(sku => ({
          productVariantID: sku.variationId || null,
          sku: sku.sku,
          stock: Number(sku.stock),
          min_stock: Number(sku.min_stock),
          max_stock: Number(sku.max_stock),
          salePrice: Number(sku.salePrice),
          serialNo: sku.serialNo,
          purchasePrice: Number(sku.purchasePrice),
          wholeSalePrice: Number(sku.wholeSalePrice),
          retailPrice: Number(sku.retailPrice),
          qrCode: sku.qrCode,
          attribute_combination: sku.attributes
        }));
      }

      console.log(formData);

      const response = await updateProduct({
        id: productId,
        data: formData
      }).unwrap();

      if (response) {
        router.push("/Dashboard/Product");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };



  if(isLoading){
    return <div className="min-h-screen flex justify-center items-center">
      <p>
        <Spin size="large" />
      </p>
    
    </div>
  }
  return (
    <div>
      <BreadCrumb/>
      <p className="text-2xl font-bold text-center mt-5 mb-5">Type: {typeProduct === "0" ? "Variant" : "Single"}</p>
      <ZFormTwo
        isLoading={pIsLoading}
        isSuccess={pIsSuccess}
        isError={pIsError}
        error={pError}
        submit={handleSubmit}
        formType="create"
        data={pData}
        buttonName="Submit"
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="productTitle"
            type="text"
            label="Product Title"
            placeholder="Enter product title"
            value={updateProductData?.productTitle}
          />
          <ZInputTwo
            name="productSubtitle"
            type="text"
            label="Subtitle"
            placeholder="Enter product subtitle"
            value={updateProductData?.productSubtitle}
          />

          {typeProduct == 1 && (
            <ZInputTwo
              name="sku"
              type="text"
              label="SKU"
              placeholder="Enter SKU"
              required
              value={updateProductData?.sku}  
            />
          )}
          <ZSelect
            name="erpCategoryID"
            isLoading={eLoading}
            label="Product Category"
            options={
              eData?.data?.map((eCategory) => ({
                label: eCategory.erpCategoryName,
                value: eCategory.erpCategoryID,
              }))
            }
            placeholder="Select category"
            value={Number(updateProductData?.erpCategoryID)}
          />

          <ZSelect
            name="brandID"
            isLoading={bLoading}
            label="Product Brand"
            options={
              bData?.data?.map((brand) => ({
                label: brand.brandName,
                value: brand.brandID,
              }))
            }
            placeholder="Select brand"
            value={Number(updateProductData?.brandID)}
          />

          <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={
              businessData?.data?.map((business) => ({
                label: business.businessName,
                value: business.businessID,
              }))
            }
            isLoading={businessLoading}
            value={Number(updateProductData?.businessID)} 
          />

          <ZSelect
            name="branchIDs"
            mode={"multiple"}
            label="Branch Name"
            placeholder="Select Available Branch"
            options={
              allBranchData?.data?.map((branch) => ({
                label: branch.branchName,
                value: branch.branchID,
              }))
            }
            isLoading={branchIsLoading}
            value={updateProductData?.branchIDs ? JSON.parse(updateProductData.branchIDs) : []}
          />

          <div className="lg:col-span-2">
            <ZInputTextArea
              name="productDescription"
              type="text"
              label="Description"
              placeholder="Enter product description"
              value={updateProductData?.productDescription}
            />
          </div>

          <ZSelect
            name="notAvailableBranchIDs"
            mode={"multiple"}
            label="Not available Branch Name"
            placeholder="Select Not Available Branch"
            options={
              allBranchData?.data?.map((branch) => ({
                label: branch.branchName,
                value: branch.branchID,
              }))
            }
            isLoading={branchIsLoading}
            value={updateProductData?.notAvailableBranchIDs ? JSON.parse(updateProductData.notAvailableBranchIDs) : []}  

          />

          {/* <ZInputTwo
                name="expiryDate"
                type="date"
                label="Expiry Date"
                placeholder="Enter Expiry Date"
              />

              <ZImageInput
                label="Product Image"
                name="productImage"
              ></ZImageInput> */}

          <ZSelect
            name="isActive"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            placeholder="Select status"
            value={updateProductData?.isActive}
          />

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
                value={productData?.data?.productInitialQty}
              />

              <ZNumber
                name="productMinQty"
                label="Minimum Stock"
                placeholder="Enter Minimum Stock"
                refresh={refresh}
                defaultKey="singleProduct"
                setPriceQuantityImage={singleSetPriceQuantityImage}
                value={productData?.data?.productMinQty}
                
              />
              <ZNumber
                name="productMaxQty"
                label="Maximum Stock"
                placeholder="Enter Maximum Stock"
                refresh={refresh}
                defaultKey="singleProduct"
                setPriceQuantityImage={singleSetPriceQuantityImage}
                value={productData?.data?.productMaxQty}
                
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
                value={productData?.data?.productPurchasePrice}

              />
              <ZNumber
                name="productWholeSalesPrice"
                label="Wholesale Price"
                placeholder="Enter Wholesale Price"
                refresh={refresh}
                defaultKey="singleProduct"
                setPriceQuantityImage={singleSetPriceQuantityImage}
                value={productData?.data?.productWholeSalesPrice}

              />
              <ZNumber
                name="productRetailPrice"
                label="Retail Price"
                placeholder="Enter Retail Price"
                refresh={refresh}
                defaultKey="singleProduct"
                setPriceQuantityImage={singleSetPriceQuantityImage}
                value={productData?.data?.productRetailPrice}

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
                          options={item?.values?.map((option) => ({
                            value: `${item?.attributeName}-${option?.attributeValue}`,
                            label: option?.attributeValue,
                          }))}
                          isLoading={attributeIsLoading}
                          mode={undefined}
                          label={`${item.attributeName} value`}
                          name={`${item.attributeName}`}
                          setPerSku={setPerSku}
                          defaultKey="product"
                          selectedAttribute={selectedAttribute}
                          refresh={refresh}
                          placeholder={`Select ${item.attributeName} value`}
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
                      onClick={() => handleAddVariant()}
                      style={{ backgroundColor: "#162447", color: "white" }}
                    >
                      + Add Variant
                    </Button>
                  </div>
                </div>
                {/* per sku end */}
              </div>
            )}
      </ZFormTwo>
      <VariantProductTable skus={skus} setSkus={setSkus}></VariantProductTable>
    </div>
  );
};

export default EditProduct;
