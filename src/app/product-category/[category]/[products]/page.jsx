"use client";
import { details_icons, sofasetDetails } from "@/app/data";
import { addToCart } from "@/app/Features/cartslice";
import { addTofavorite } from "@/app/Features/favoriteslice";
import {
  setselectedProduct,
  setviewProductCategory,
} from "@/app/Features/slice";
import FAQs from "@/components/FAQs";
import ProductView2 from "@/components/ProductView2";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEye, FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ params }) => {
  const { category, products } = params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("heee", product);
  const router = useRouter();
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(product) {
    setIsOpen(true);
    dispatch(setviewProductCategory([product]));
  }

  function handleSelectedProduct(product) {
    dispatch(setselectedProduct([product]));
    const productName = product.Title;
    // const proName = product.productName;
    router.push(`/product-details/${productName}`);
  }

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        productName:  product.productName ||product.Title,
        price: product.Price || product.productPrice,
        image: product.image.name,
      })
    );
  };

  const handleAddToFavorite = (product) => {
    dispatch(
      addTofavorite({
        id: product.id,
        productName: product.productName,
        price: product.productPrice,
        image: product.image.name,
      })
    );
  };
  useEffect(() => {
    async function getProducts() {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product-categories/?filters[category][$eq]=${category}&filters[product][$eq]=${products}&populate=*`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setProduct(data.data);
        console.log("Porduct data fetched here", data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="">
      <nav>
        <ul className="lg:flex lg:mt-10 lg:gap-2 text-sm lg:px-40 hidden">
          <Link href="/">
            <li>Home/</li>
          </Link>

          {product.map((link, i) => (
            <div key={i} className="flex">
              {i === 0 && <li className="text-gray-700">{link.category}/</li>}
              {i === 0 && <li className="text-gray-500">{link.Title}</li>}
            </div>
          ))}
        </ul>
      </nav>
      <div>
        <div className="bg-[#FFF5EE] -mt-4">
        {loading && <LoadingAnimation />}

        {/* No Products */}
        {!loading && product.length === 0 && <p>No Products Found</p>}

        {!loading && product.length > 0 && (
          <>
            {product.map((item, a) => (
              <div className="lg:mt-8 lg:px-40  ">
                {a === 0 && (
                  <h1 className="lg:text-3xl text-xl  max-sm:p-4 font-semibold max-sm:mt-20">
                    {item.Title}
                  </h1>
                )}

                <div className="max-sm:flex flex-wrap max-sm:pl-4 text-justify max-sm:pr-4 ">
                  <p className="lg:text-sm lg:mt-6">{item.paragraph}</p>
                </div>
              </div>
            ))}

            <div className="lg:mt-10 relative lg:ml-40">
              <div className="hidden  lg:grid lg:grid-cols-4 lg:gap-y-8 lg:pr-24">
                {product.map((item, a) => (
                  <div key={a} className="group">
                    {/* Image */}
                    <div
                      className="border border-transparent w-[250px] h-[250px] group-hover:border-[#906642] hover:border-b-0 transition duration-300 ease-in-out relative "
                      onClick={() => handleSelectedProduct(item)}
                    >
                      <Image
                        src={"/" + item.image?.name}
                        alt={item.Title}
                        width={550}
                        height={250}
                        className="object-cover w-full h-full"
                      />

                      {/* Hover Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Button 1: Category */}
                        <button
                          className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                            toast.success(
                              `${
                                item.productName ||item.Title
                              } ${""}was added to shoppping cart`,
                              {
                                hideProgressBar: true,
                                icon: ({ theme, type }) => (
                                  <img
                                    src="/shopping-cart2.png"
                                    className="text-white"
                                  />
                                ),
                                style: {
                                  backgroundColor: "green",
                                  color: "#f7fafc",
                                },
                                className: "w-[690px]  ",
                                position: "top-center",
                              }
                            );
                          }}
                        >
                          <MdOutlineShoppingCartCheckout />
                        </button>
                        {/* Button 2: View */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(item);
                          }}
                          className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                        >
                          <FaEye />
                        </button>
                        {/* Button 3: Like */}
                        <button
                          className="bg-white text-[#906642] p-2 rounded-full shadow-md hover:bg-[#906642] hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToFavorite(item);
                            toast.success("product added");
                          }}
                        >
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                    {/* Title Description */}
                    <div className="border border-transparent bg-white w-[250px] h-[93px] border-t-0 flex flex-col justify-center group-hover:border-[#906642]">
                      <h3 className="text-sm ml-2">{item.productName}</h3>
                      <p className="text-red-600 font-semibold text-[14px] ml-2 mt-2">
                        Rs {item.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* small device */}
              <div className="grid grid-cols-2 gap-2 md:gap-6 lg:hidden max-sm:mt-10 ">
                {product.map((item, a) => (
                  <div
                    key={a}
                    className="group w-[172px] p-2 rounded-lg shadow-md border border-gray-200 ml-2 bg-white"
                  >
                    {/* Image */}
                    <div className="relative border-b border-transparent  group-hover:border-[#906642] transition duration-300 ease-in-out w-[160px] h-[160px] "
                   onClick={() => handleSelectedProduct(item)}
                    
                    >
                      <Image
                        src={"/" + item.image?.name}
                        alt={item.Title}
                        width={138}
                        height={131}
                        className="object-cover w-full h-full rounded-t-lg"
                      />

                      <div
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavorite(item);
                          toast.success("product added");
                        }}
                      >
                        <CiHeart />
                      </div>
                    </div>

                    <div className="flex flex-col items-start mt-2 w-[160px] h-[90px] bg-white">
                      <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                        {item.productName}
                      </h3>
                      <p className="text-red-600 font-semibold text-md mt-1">
                        Rs {item.productPrice}
                      </p>
                    </div>

                    <div className="flex justify-center  ">
                      <Button
                        className="w-36 text-sm bg-[#3a1910] text-white font-semibold rounded-md py-1 hover:bg-[#906642] transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                          toast.success(
                            `${item.productName} ${""}was added to shoppping cart`,
                            {
                              hideProgressBar: true,
                              icon: ({ theme, type }) => (
                                <img
                                  src="/shopping-cart2.png"
                                  className="text-white"
                                />
                              ),
                              style: {
                                backgroundColor: "green",
                                color: "#f7fafc",
                              },
                              className: "w-[370px]",
                              position: "top-center",
                            }
                          );
                        }}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <ProductView2 isOpen={isOpen} closeModal={closeModal} />
            </div>
          </>
        )}</div>
        <ToastContainer />
      </div>
      <FAQs />
    </div>
  );
};

export default ProductPage;
