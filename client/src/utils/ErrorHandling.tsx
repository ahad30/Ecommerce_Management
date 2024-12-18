import { useEffect, useState } from "react";

export type TError = {
  [key: string]: string[];
} | undefined;
const ErrorHandling = (
  errors: TError,
  isAddModalOpen: boolean,
  isEditModalOpen: boolean
) => {
  const [error, setError] = useState<string[]>([]);
  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen) {
      setError([]);
    }
  }, [isAddModalOpen, isEditModalOpen]);
  useEffect(() => {
    if (errors) {
      const arr: string[] = [];
      for (const key in errors) {
        if (Array.isArray(errors[key])) {
          errors[key].forEach((err) => arr.push(err));
        }
      }
      setError([...arr]);
    }
  }, [errors]);
  return error;
};

export default ErrorHandling;
