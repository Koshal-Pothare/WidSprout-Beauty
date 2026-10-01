import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCartOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { Search, Heart, X, ArrowRight, SlidersHorizontal, ChevronDown, Star, Leaf } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { getAllProducts } from "../services/ProductService.js";
import { addToCart as AddToCartAPI } from "../services/CartService.js";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getAllProducts();
      console.log("product response", response);
      setProduct(response);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  const Openproduct = (item) => {
    setSelectedProduct(item);
  };

  const Closeproduct = () => {
    setSelectedProduct(null);
  };

  const addToCart = async (item) => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId) {
      toast.error("Please Login");
      return;
    }

    if (role === "ADMIN") {
      toast.error("Admin cannot Add");
      return;
    }

    try {
      await AddToCartAPI({
        userId: Number(userId),
        productId: item.id,
        quantity: 1,
      });

      toast.success("Added to Cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      toast.error("Failed to Add Product to Cart");
      console.error(err);
    }
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();

    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const skinFilters = [
    {
      id: "all",
      name: "All Products",
      subtitle: "Explore all",
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=80",
      keywords: [],
    },
    {
      id: "oily",
      name: "Oily Skin",
      subtitle: "Balance & control",
      image:
        "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80",
      keywords: ["oily", "oil", "sebum", "mattifying", "shine", "pores"],
    },
    {
      id: "dry",
      name: "Dry Skin",
      subtitle: "Hydrate & nourish",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80",
      keywords: [
        "dry",
        "hydrating",
        "hydration",
        "moisture",
        "moisturizing",
        "nourish",
      ],
    },
    {
      id: "combination",
      name: "Combination",
      subtitle: "Balance your skin",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
      keywords: ["combination", "balance", "balanced", "t-zone"],
    },
    {
      id: "sensitive",
      name: "Sensitive Skin",
      subtitle: "Calm & soothe",
      image:
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=500&q=80",
      keywords: ["sensitive", "soothing", "calm", "gentle", "aloe"],
    },
    {
      id: "dull",
      name: "Dull Skin",
      subtitle: "Glow naturally",
      image:
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80",
      keywords: [
        "dull",
        "bright",
        "brightening",
        "glow",
        "vitamin c",
        "radiance",
      ],
    },
    {
      id: "acne",
      name: "Acne-Prone",
      subtitle: "Clarify & care",
      image:
        "https://images.unsplash.com/photo-1570554886111-e80fcca6a9f0?auto=format&fit=crop&w=500&q=80",
      keywords: [
        "acne",
        "pimple",
        "blemish",
        "breakout",
        "tea tree",
        "clarifying",
      ],
    },
  ];

  const categories = useMemo(() => {
    const products = product?.data || [];

    const uniqueCategories = [
      ...new Set(
        products
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [product]);

  const filteredProducts = useMemo(() => {
    let products = [...(product?.data || [])];

    if (selectedConcern !== "all") {
      const concern = skinFilters.find(
        (item) => item.id === selectedConcern
      );

      if (concern) {
        products = products.filter((item) => {
          const searchableText = `
            ${item.name || ""}
            ${item.category || ""}
            ${item.tags || ""}
            ${item.description || ""}
            ${item.ingredients || ""}
          `.toLowerCase();

          return concern.keywords.some((keyword) =>
            searchableText.includes(keyword.toLowerCase())
          );
        });
      }
    }

    if (selectedCategory !== "All") {
      products = products.filter(
        (item) =>
          item.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      products = products.filter((item) => {
        const searchableText = `
          ${item.name || ""}
          ${item.category || ""}
          ${item.tags || ""}
          ${item.description || ""}
          ${item.ingredients || ""}
        `.toLowerCase();

        return searchableText.includes(search);
      });
    }

    if (sortBy === "price-low") {
      products.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      products.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "name") {
      products.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    if (sortBy === "rating") {
      products.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    return products;
  }, [
    product,
    selectedConcern,
    selectedCategory,
    searchTerm,
    sortBy,
  ]);

  const selectedConcernData = skinFilters.find(
    (item) => item.id === selectedConcern
  );

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative w-full overflow-hidden bg-rose-50 pt-10">

        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl"></div>

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl"></div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-16">

          {/* HERO CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >

           
            <h1 className="font-serif text-5xl font-semibold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
              Find what your
              <span className="block text-amber-700">
                skin needs.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-700 md:text-lg">
              Explore our collection of thoughtfully selected skincare
              products and discover something that fits naturally into
              your daily routine.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">

              <button
                onClick={() =>
                  document
                    .getElementById("skin-concerns")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-3 rounded-lg border border-amber-700 bg-amber-700 px-7 py-3.5 text-sm font-semibold text-amber-100 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-amber-800"
              >
                Find Your Skin Match
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <SparklesIcon />
                Thoughtfully selected skincare
              </div>

            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-amber-200 pt-7">

              <div>
                <p className="font-serif text-2xl font-semibold text-amber-700">
                  100%
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Thoughtfully selected
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl font-semibold text-amber-700">
                  6+
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Skin concerns
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl font-semibold text-amber-700">
                  Natural
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Inspired skincare
                </p>
              </div>

            </div>

          </motion.div>

          {/* HERO IMAGE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl"
          >

            <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-white p-3 shadow-2xl">

              <div className="relative h-[400px] overflow-hidden rounded-2xl md:h-[500px]">

                <img
                  src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=85"
                  alt="Natural skincare"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6">

                  <div className="rounded-2xl border border-white/30 bg-white/20 p-5 backdrop-blur-md">

                    <p className="text-xs uppercase tracking-[0.25em] text-white">
                      WildSprout Beauty
                    </p>

                    <p className="mt-2 font-serif text-2xl text-white">
                      Good skin. Good vibes.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          SKIN CONCERN FILTERS
      ===================================================== */}

      <section
        id="skin-concerns"
        className="border-y border-amber-200 bg-white py-12 md:py-16"
      >

        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-8">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Find your match
            </p>

            <h2 className="font-serif text-3xl font-semibold text-gray-900 md:text-4xl">
              Shop by Skin Concern
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-700">
              Choose a skin concern to explore products that may fit
              your skincare routine.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">

            {skinFilters.map((filter, index) => (

              <motion.button
                key={filter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                onClick={() => setSelectedConcern(filter.id)}
                className={`group rounded-2xl border p-2 text-left transition-all duration-300 ${
                  selectedConcern === filter.id
                    ? "border-amber-700 bg-rose-50 shadow-lg"
                    : "border-amber-200 bg-white hover:-translate-y-1 hover:border-amber-700 hover:shadow-lg"
                }`}
              >

                <div className="relative h-28 overflow-hidden rounded-xl md:h-32">

                  <img
                    src={filter.image}
                    alt={filter.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {selectedConcern === filter.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-amber-700/20">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-amber-100 shadow-lg">
                        ✓
                      </div>

                    </div>
                  )}

                </div>

                <div className="px-1 pb-1 pt-3">

                  <p className="text-sm font-semibold text-gray-900">
                    {filter.name}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-600">
                    {filter.subtitle}
                  </p>

                </div>

              </motion.button>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}

      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-16">

        {/* HEADER */}

        <div className="flex flex-col gap-5 border-b border-amber-200 pb-7 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              WildSprout Collection
            </p>

            <h2 className="font-serif text-3xl font-semibold text-gray-900 md:text-4xl">
              {selectedConcern === "all"
                ? "All Products"
                : selectedConcernData?.name}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </p>

          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex w-fit items-center gap-2 rounded-lg border border-amber-700 bg-white px-5 py-2.5 text-sm font-medium text-amber-700 transition-all hover:bg-amber-700 hover:text-amber-100"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

        </div>

        {/* FILTER TOOLBAR */}

        <AnimatePresence>

          {showFilters && (

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >

              <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-amber-200 bg-rose-50 p-5 md:grid-cols-3">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="w-full rounded-lg border border-amber-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-500 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10"
                  />

                </div>

                {/* CATEGORY */}

                <div className="relative">

                  <select
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-amber-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-amber-700"
                  >

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}

                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                </div>

                {/* SORT */}

                <div className="relative">

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-amber-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-amber-700"
                  >

                    <option value="default">
                      Sort by
                    </option>

                    <option value="name">
                      Name
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="rating">
                      Highest Rated
                    </option>

                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* ACTIVE FILTERS */}

        {(selectedConcern !== "all" ||
          selectedCategory !== "All" ||
          searchTerm) && (

          <div className="mt-6 flex flex-wrap items-center gap-2">

            <span className="text-xs font-medium text-gray-600">
              Active filters:
            </span>

            {selectedConcern !== "all" && (

              <button
                onClick={() => setSelectedConcern("all")}
                className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700"
              >
                {selectedConcernData?.name}
                <X size={13} />
              </button>

            )}

            {selectedCategory !== "All" && (

              <button
                onClick={() => setSelectedCategory("All")}
                className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700"
              >
                {selectedCategory}
                <X size={13} />
              </button>

            )}

            {searchTerm && (

              <button
                onClick={() => setSearchTerm("")}
                className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-amber-700"
              >
                Search: {searchTerm}
                <X size={13} />
              </button>

            )}

            <button
              onClick={() => {
                setSelectedConcern("all");
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="text-xs font-semibold text-amber-700 underline underline-offset-2"
            >
              Clear all
            </button>

          </div>

        )}

        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}

        {filteredProducts.length > 0 ? (

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((item, index) => (

              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                }}
                whileHover={{ y: -5 }}
                onClick={() => Openproduct(item)}
                className="group w-full cursor-pointer overflow-hidden rounded-2xl border border-amber-700 bg-rose-50 p-3 shadow-lg transition-all duration-300 hover:shadow-2xl"
              >

                {/* PRODUCT IMAGE */}

                <div className="relative h-64 w-full overflow-hidden rounded-xl border border-amber-200">

                  <img
                    src={`http://localhost:8080/images/${item.image}`}
                    alt={item.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* CATEGORY */}

                  <div className="absolute left-3 top-3 rounded-full border border-amber-200 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 backdrop-blur-sm">
                    {item.category}
                  </div>

                  {/* WISHLIST */}

                  <button
                    onClick={(e) =>
                      toggleWishlist(e, item.id)
                    }
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-white/90 shadow-sm backdrop-blur-sm transition-all ${
                      wishlist.includes(item.id)
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >

                    <Heart
                      size={17}
                      fill={
                        wishlist.includes(item.id)
                          ? "currentColor"
                          : "none"
                      }
                    />

                  </button>

                </div>

                {/* PRODUCT DETAILS */}

                <div className="px-1 pb-1 pt-4">

                  <div className="mb-2 flex items-center gap-1">

                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-amber-700"
                    />

                    <span className="text-xs font-medium text-gray-600">
                      {item.rating || "4.5"}
                    </span>

                  </div>

                  <h3 className="line-clamp-1 font-serif text-xl font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-gray-700">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">

                    <p className="flex items-center font-semibold text-amber-700">
                      <MdCurrencyRupee size={17} />
                      {item.price}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-amber-700 bg-amber-700 px-4 py-2.5 text-xs font-semibold text-amber-100 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-800"
                    >
                      Add to Cart
                      <IoCartOutline size={17} />
                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        ) : (

          /* EMPTY STATE */

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-amber-200 bg-rose-50 px-6 text-center"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <Search size={25} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-gray-900">
              No products found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-700">
              We couldn't find products matching your current
              filters. Try another skin concern or clear the
              filters.
            </p>

            <button
              onClick={() => {
                setSelectedConcern("all");
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="mt-6 rounded-lg border border-amber-700 bg-amber-700 px-6 py-3 text-sm font-semibold text-amber-100 shadow-lg transition-all hover:bg-amber-800"
            >
              View All Products
            </button>

          </motion.div>

        )}

      </section>

      {/* =====================================================
          PRODUCT DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>

        {selectedProduct && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={Closeproduct}
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-amber-200 bg-white shadow-2xl"
            >

              {/* CLOSE BUTTON */}

              <button
                onClick={Closeproduct}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-gray-600 shadow-md transition-all hover:bg-amber-700 hover:text-amber-100"
              >
                <X size={19} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* MODAL IMAGE */}

                <div className="p-4 md:p-6">

                  <div className="relative h-[350px] overflow-hidden rounded-xl border border-amber-700 bg-rose-50 md:h-[550px]">

                    <img
                      src={`http://localhost:8080/images/${selectedProduct.image}`}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover object-center"
                    />

                    <div className="absolute left-4 top-4 rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-700 backdrop-blur-sm">
                      {selectedProduct.category}
                    </div>

                  </div>

                </div>

                {/* MODAL DETAILS */}

                <div className="flex flex-col justify-center px-6 pb-8 md:px-8 lg:py-10 lg:pr-12">

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                    WildSprout Beauty
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
                    {selectedProduct.name}
                  </h2>

                  {selectedProduct.tags && (
                    <p className="mt-3 text-sm font-semibold text-amber-700">
                      {selectedProduct.tags}
                    </p>
                  )}

                  {/* RATING */}

                  <div className="mt-5 flex items-center gap-2">

                    <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5">

                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-amber-700"
                      />

                      <span className="text-xs font-semibold text-amber-700">
                        {selectedProduct.rating || "4.5"}
                      </span>

                    </div>

                    <span className="text-xs text-gray-600">
                      Customer rating
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-6 text-sm leading-7 text-gray-700">
                    {selectedProduct.description}
                  </p>

                  {/* INGREDIENTS */}

                  {selectedProduct.ingredients && (

                    <div className="mt-6">

                      <p className="text-sm font-semibold text-gray-900">
                        Ingredients
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {selectedProduct.ingredients
                          .split(" ")
                          .map((ingredient, index) => (

                            <span
                              key={index}
                              className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1.5 text-[11px] font-medium text-amber-700"
                            >
                              {ingredient}
                            </span>

                          ))}

                      </div>

                    </div>

                  )}

                  {/* PRICE */}

                  <div className="mt-7 flex items-end justify-between border-t border-amber-200 pt-6">

                    <div>

                      <p className="text-xs text-gray-600">
                        Price
                      </p>

                      <p className="mt-1 flex items-center font-serif text-3xl font-semibold text-amber-700">

                        <MdCurrencyRupee size={25} />

                        {selectedProduct.price}

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-xs text-gray-600">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {selectedProduct.category}
                      </p>

                    </div>

                  </div>

                  {/* ADD TO CART */}

                  <button
                    onClick={() =>
                      addToCart(selectedProduct)
                    }
                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-amber-700 bg-amber-700 px-6 py-4 text-sm font-semibold text-amber-100 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-amber-800"
                  >
                    Add to Cart
                    <IoCartOutline size={21} />
                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* =====================================================
          TOAST
      ===================================================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

    </div>
  );
};

/* Small icon component */

const SparklesIcon = () => (
  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700">
    ✦
  </span>
);

export default AllProducts;