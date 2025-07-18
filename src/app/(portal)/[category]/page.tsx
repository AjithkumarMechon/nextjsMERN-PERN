"use client";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const category = params.category;

  return (
    <div>
      <h1>Category: {category}</h1>
    </div>
  );
};

export default CategoryPage;
