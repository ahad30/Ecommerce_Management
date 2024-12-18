import { TOptions } from "../types/options.types";

export const OptionsGenerator = (arr: TOptions[] | undefined) => {
  if (Array.isArray(arr)) {
    const options = arr?.map((item: TOptions) => ({
      value: item?.name,
      label: item?.name,
    }));
    return options;
  } else {
    return [];
  }
};
