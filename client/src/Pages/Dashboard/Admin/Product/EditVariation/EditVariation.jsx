import React, { useState, useEffect } from "react";
import { useUpdateProductVariationApiMutation } from "@/redux/Feature/Admin/product/productVariationApi";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZNumber from "@/components/Form/ZNumber";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsVariantModalOpen } from "@/redux/Modal/ModalSlice";
import ZInputTwo from "@/components/Form/ZInputTwo";

const EditVariation = ({ selectedVariant, setSkus, skus }) => {
  const dispatch = useAppDispatch();
  const [updateVariation, { isLoading, data, isSuccess, isError, error }] =
    useUpdateProductVariationApiMutation();

  const handleSubmit = async (values) => {
    try {
      const formData = {
        sku: values.sku,
        stock: Number(values.stock),
        min_stock: Number(values.min_stock),
        max_stock: Number(values.max_stock),
        salePrice: Number(values.salePrice),
        serialNo: values.serialNo,
        purchasePrice: Number(values.purchasePrice),
        wholeSalePrice: Number(values.wholeSalePrice),
        retailPrice: Number(values.retailPrice),
        qrCode: values.qrCode,
      };

      const response = await updateVariation({
        id: selectedVariant.variationId,
        data: formData,
      }).unwrap();

      if (response) {
        const updatedSkus = skus.map((sku) =>
          sku.variationId === selectedVariant.variationId
            ? { ...sku, ...formData }
            : sku
        );
        setSkus(updatedSkus);
      }
    } catch (err) {
      toast.error("Failed to update variant");
      console.error(err);
    }
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsVariantModalOpen());
  };

  console.log(selectedVariant);
  return (
    <ZFormTwo
      submit={handleSubmit}
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      isError={isError}
      error={error}
      formType="edit"
      closeModal={handleCloseAndOpen}
      buttonName="Update Variant"
    >
      <div className="grid grid-cols-2 gap-4">
        <ZInputTwo
          readOnly={true}
          name="sku"
          label="SKU"
          placeholder="Enter SKU"
          value={selectedVariant?.sku}
        />
        <ZNumber
          name="stock"
          label="Stock Quantity"
          placeholder="Enter Stock Quantity"
          value={selectedVariant?.stock}
        />
        <ZNumber
          name="min_stock"
          label="Minimum Stock"
          placeholder="Enter Minimum Stock"
          value={selectedVariant?.min_stock}
        />
        <ZNumber
          name="max_stock"
          label="Maximum Stock"
          placeholder="Enter Maximum Stock"
          value={selectedVariant?.max_stock}
        />
        <ZNumber
          name="salePrice"
          label="Sale Price"
          placeholder="Enter Sale Price"
          value={selectedVariant?.salePrice}
        />
        <ZNumber
          name="serialNo"
          label="Serial No"
          placeholder="Enter Serial No"
          value={selectedVariant?.serialNo}
        />
        <ZNumber
          name="qrCode"
          label="QR Code"
          placeholder="Enter QR Code"
          value={selectedVariant?.qrCode}
        />
        <ZNumber
          name="purchasePrice"
          label="Purchase Price"
          placeholder="Enter Purchase Price"
          value={selectedVariant?.purchasePrice}
        />
        <ZNumber
          name="wholeSalePrice"
          label="Wholesale Price"
          placeholder="Enter Wholesale Price"
          value={selectedVariant?.wholeSalePrice}
        />
        <ZNumber
          name="retailPrice"
          label="Retail Price"
          placeholder="Enter Retail Price"
          value={selectedVariant?.retailPrice}
        />
      </div>
    </ZFormTwo>
  );
};

export default EditVariation;
