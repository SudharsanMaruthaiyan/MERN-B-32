import React, { useEffect, useState } from "react";

const useFetchProductData = () => {
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const product = await res.json();
      setProductData(product.products);
      setIsLoading(false);
    } catch (error) {
      console.log("Fetchdata error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ProductData, isLoading };
};

export default useFetchProductData;
