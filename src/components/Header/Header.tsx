import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IonIcon, IonSearchbar } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
interface State {
  categories: [];
  cartItems: [];
  itemsInCart: number;
  products: [];
}
interface Category {
  name: string;
  id: string;
}
interface Product {
  category: string;
  image: any;
  title: string;
  price: number;
}
const Header: React.FC = () => {
  const pathname = useLocation();
  const [visibleProducts, setVisibleProduct] = useState<any>([]);
  const [seachBarEmpty, setSearchBarEmpty] = useState(true);
  const categories = useSelector((state: State) => state.categories);
  const itemsInCart = useSelector((state: State) => state.itemsInCart);
  const PRODUCTS = useSelector((state: State) => state.products);

  const PRODUCT_LINKS = PRODUCTS.map((product: Product) => {
    return { category: product.category, title: product.title };
  });
  const searchProductHandler = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchBarEmpty(!value);
    const match = PRODUCT_LINKS.filter((product) =>
      product.title.toLowerCase().includes(value)
    );
    setVisibleProduct(match);
  };

  useEffect(() => {
    setSearchBarEmpty(true);
  }, [pathname]);
  return (
    <header className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 py-6 items-center gap-y-2">
        <Link to="/">
          <h2 className="text-2xl font-bold">Gumista Fake Store</h2>
        </Link>
        <IonSearchbar
          placeholder="Search products..."
          className="row-start-2 col-span-2 md:col-auto md:row-start-auto"
          onInput={searchProductHandler}
          onIonClear={() => setSearchBarEmpty(true)}
        ></IonSearchbar>
        <Link to="cart" className="justify-self-end relative">
          <IonIcon icon={cartOutline} className="h-12 w-12"></IonIcon>
          {itemsInCart !== 0 && (
            <p className="bg-black-50 rounded-full absolute h-6 w-6 top-[-4px] right-0 text-center text-white">
              {itemsInCart}
            </p>
          )}
        </Link>
      </div>
      <ul className="text-grey-100 flex flex-wrap justify-center gap-4 md:gap-8 text-base">
        {categories.map((category: Category, i) => {
          const link = category.name.split(" ").join("_");
          const title = category.name.toUpperCase();
          return (
            <li key={i}>
              <Link to={`category/${link}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
      {!seachBarEmpty && (
        <SearchOptions
          visibleProducts={visibleProducts}
          setSearchBarEmpty={setSearchBarEmpty}
        />
      )}
    </header>
  );
};
export default Header;

interface SearchOptionsProps {
  visibleProducts: [];
  setSearchBarEmpty: (arg: boolean) => void;
}
const SearchOptions = (props: SearchOptionsProps) => {
  const { visibleProducts, setSearchBarEmpty } = props;
  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          setSearchBarEmpty(true);
        }}
      ></div>
      <ul
        className=" flex flex-col gap-2 w-11/12 md:w-1/2 h-fit bg-[#f0f8ff] shadow-search z-10 fixed top-[180px] left-[50%] translate-x-[-50%] overflow-scroll py-4 px-4"
        onClick={() => {
          setSearchBarEmpty(true);
        }}
      >
        {visibleProducts.map((link: any) => {
          const category = link.category.split(" ").join("_");
          const title = link.title.split(" ").join("+");
          return (
            <li key={link.title}>
              <Link to={`category/${category}/${title}`}>{link.title}</Link>
            </li>
          );
        })}
        {visibleProducts.length === 0 && (
          <li>Oops! No item match your search.. </li>
        )}
      </ul>
    </>
  );
};