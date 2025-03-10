import { TFilterType, TItemTodo } from "@/types/types";
import { useEffect, useState } from "react";

export const useFilterData = (
  filter: TFilterType,
  data: TItemTodo[] | null
): [TItemTodo[] | null, number] => {
  const [filteredData, setFitleredData] = useState<null | TItemTodo[]>(null);
  const [itemsLeft, setItemsLeft] = useState<number>(0);

  useEffect(() => {
    if (data) {
      switch (filter) {
        case "all":
          setFitleredData(data);
          break;
        case "completed":
          setFitleredData(data.filter((item) => item.completed));
          break;
        case "active":
          setFitleredData(data.filter((item) => !item.completed));
          break;
      }
      setItemsLeft(data.filter((item) => !item.completed).length);
    }
  }, [data, filter]);

  return [filteredData, itemsLeft];
};
