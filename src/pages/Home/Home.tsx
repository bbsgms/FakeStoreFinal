import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IndividualCategory } from "../../components";
import { getProducts } from "../../api/api";
import { cartActions } from "../../store";
interface State {
  categories: [];
}
interface Category {
  name: string;
  cover: any;
  id: string;
}
const Home = () => {
  const CATEGORIES = useSelector((state: State) => state.categories);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
      {CATEGORIES.map((cat: Category, index) => (
        <IndividualCategory
          key={index}
          name={cat.name}
          cover={cat.cover}
          id={cat.id}
        ></IndividualCategory>
      ))}
    </section>
  );
};

export default Home;

