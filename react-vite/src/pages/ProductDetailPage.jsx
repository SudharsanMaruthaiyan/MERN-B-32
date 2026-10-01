import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RefreshCw,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Package,
  Tag,
  Award,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchProductDataById = async () => {
    try {
      setLoading(true);
      setError(null);
      const productRes = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );
      if (!productRes.ok) {
        throw new Error(
          `Failed to fetch product (Status: ${productRes.status})`,
        );
      }
      const data = await productRes.json();
      console.log("Product data:", data);
      setProductData(data);
      setSelectedImage(0);
    } catch (err) {
      console.log("Fetch Product data error", err);
      setError(
        err.message || "Something went wrong while fetching product details.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDataById();
    }
  }, [productId]);

  const handleQuantityChange = (type) => {
    if (type === "decrease") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else if (type === "increase") {
      const maxStock = productData?.stock || 99;
      setQuantity((prev) => (prev < maxStock ? prev + 1 : prev));
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton Breadcrumbs */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8 animate-pulse"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery Skeleton */}
            <div className="space-y-4">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error ||
              "We couldn't load the product information. Please check the product ID or try again."}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={fetchProductDataById}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <RefreshCw size={18} /> Retry
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pricing & savings
  const price = productData.price || 0;
  const discount = productData.discountPercentage || 0;
  const originalPrice =
    discount > 0 ? (price / (1 - discount / 100)).toFixed(2) : null;
  const totalAmount = (price * quantity).toFixed(2);
  const images =
    productData.images && productData.images.length > 0
      ? productData.images
      : [productData.thumbnail];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Navigation / Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 flex-wrap">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={16} /> Products
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="capitalize">
            {productData.category || "General"}
          </span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-xs">
            {productData.title}
          </span>
        </nav>

        {/* Main Product Showcase Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700/60 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-10">
            {/* Left Column: Image Gallery (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Featured Image Display */}
                <div className="relative group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800 rounded-2xl p-6 mb-4 flex items-center justify-center min-h-[380px] sm:min-h-[440px] border border-gray-100 dark:border-gray-700/40 overflow-hidden shadow-inner">
                  {/* Category / Discount Overlay Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {discount > 0 && (
                      <span className="px-3 py-1 bg-red-500 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1 animate-pulse">
                        <Sparkles size={12} /> {Math.round(discount)}% OFF
                      </span>
                    )}
                    {productData.brand && (
                      <span className="px-3 py-1 bg-blue-600 text-white font-medium text-xs rounded-full shadow-sm">
                        {productData.brand}
                      </span>
                    )}
                  </div>

                  {/* Quick Action Overlay Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 ${
                        isWishlisted
                          ? "bg-red-50 text-red-500 dark:bg-red-950/80"
                          : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500"
                      }`}
                      title={
                        isWishlisted
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"
                      }
                    >
                      <Heart
                        size={20}
                        className={
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-blue-600 shadow-md backdrop-blur-md transition-all duration-200 relative"
                      title="Share Product"
                    >
                      <Share2 size={20} />
                      {copiedLink && (
                        <span className="absolute right-0 top-11 bg-gray-900 text-white text-xs py-1 px-2.5 rounded shadow-lg whitespace-nowrap z-20">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Main Product Image */}
                  <img
                    src={images[selectedImage] || productData.thumbnail}
                    alt={productData.title}
                    className="max-h-96 w-full object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                </div>

                {/* Thumbnail Selector Strip */}
                {images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative rounded-xl overflow-hidden h-20 w-20 min-w-[80px] bg-gray-100 dark:bg-gray-900 border-2 transition-all p-1 ${
                          selectedImage === idx
                            ? "border-blue-600 ring-2 ring-blue-600/30 scale-105"
                            : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${productData.title} view ${idx + 1}`}
                          className="h-full w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Details & Purchase Actions (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Title & Category */}
                <div className="mb-2">
                  <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                    {productData.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
                    {productData.title}
                  </h1>
                </div>

                {/* Ratings & Availability */}
                <div className="flex items-center gap-4 flex-wrap mb-4">
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                      {productData.rating
                        ? productData.rating.toFixed(1)
                        : "N/A"}
                    </span>
                    <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      ({productData.reviews ? productData.reviews.length : 0}{" "}
                      reviews)
                    </span>
                  </div>

                  {/* Stock status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${productData.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                    ></span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {productData.stock > 0
                        ? productData.availabilityStatus ||
                          `${productData.stock} items in stock`
                        : "Out of Stock"}
                    </span>
                  </div>

                  {/* SKU */}
                  {productData.sku && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      SKU: {productData.sku}
                    </span>
                  )}
                </div>

                {/* Price Card */}
                <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                      ${price.toFixed(2)}
                    </span>
                    {originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${originalPrice}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2.5 py-1 rounded-md">
                        Save ${((originalPrice || price) - price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Inclusive of all taxes. Free delivery on qualified orders.
                  </p>
                </div>

                {/* Description Snippet */}
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  {productData.description}
                </p>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Select Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="px-3.5 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-bold text-gray-900 dark:text-white min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        className="px-3.5 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40"
                        disabled={quantity >= (productData.stock || 99)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total:{" "}
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">
                        ${totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                      addedToCart
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={20} /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} /> Add to Cart
                      </>
                    )}
                  </button>
                  <button className="flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2">
                    <Sparkles size={18} /> Buy Now
                  </button>
                </div>
              </div>

              {/* Guarantee / Shipping Trust Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
                  <Truck
                    size={22}
                    className="text-blue-600 dark:text-blue-400 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {productData.shippingInformation || "Fast Delivery"}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Doorstep shipping
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
                  <ShieldCheck
                    size={22}
                    className="text-emerald-600 dark:text-emerald-400 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {productData.warrantyInformation || "1 Year Warranty"}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Guaranteed quality
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
                  <RefreshCw
                    size={22}
                    className="text-purple-600 dark:text-purple-400 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {productData.returnPolicy || "Easy Returns"}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Hassle-free process
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40">
                  <Award
                    size={22}
                    className="text-amber-600 dark:text-amber-400 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Authentic Product
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      100% Original
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700/60 overflow-hidden mb-12">
          {/* Tab Header Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Package size={18} /> Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "reviews"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Star size={18} /> Customer Reviews (
              {productData.reviews ? productData.reviews.length : 0})
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`px-6 py-4 font-bold text-sm sm:text-base border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === "shipping"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Truck size={18} /> Shipping & Policy
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 lg:p-10">
            {/* TAB 1: Specifications */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Brand
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                      {productData.brand || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Category
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm capitalize">
                      {productData.category}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      SKU
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                      {productData.sku || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Weight
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                      {productData.weight ? `${productData.weight} g` : "N/A"}
                    </span>
                  </div>
                  {productData.dimensions && (
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Dimensions (W x H x D)
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                        {productData.dimensions.width} x{" "}
                        {productData.dimensions.height} x{" "}
                        {productData.dimensions.depth} cm
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Minimum Order
                    </span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                      {productData.minimumOrderQuantity || 1} unit(s)
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {productData.tags && productData.tags.length > 0 && (
                  <div className="pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {productData.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium flex items-center gap-1"
                        >
                          <Tag size={12} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Customer Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Rating Overview */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                  <div className="text-center sm:text-left">
                    <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
                      {productData.rating
                        ? productData.rating.toFixed(1)
                        : "0.0"}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1 my-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={
                            star <= Math.round(productData.rating || 0)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Based on{" "}
                      {productData.reviews ? productData.reviews.length : 0}{" "}
                      customer reviews
                    </p>
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                  {productData.reviews && productData.reviews.length > 0 ? (
                    productData.reviews.map((rev, index) => (
                      <div
                        key={index}
                        className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                              {rev.reviewerName
                                ? rev.reviewerName.charAt(0)
                                : "U"}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                                {rev.reviewerName || "Anonymous User"}
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                                  Verified Buyer
                                </span>
                              </h4>
                              <p className="text-[11px] text-gray-400">
                                {rev.date
                                  ? new Date(rev.date).toLocaleDateString()
                                  : "Recent"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={14}
                                className={
                                  s <= rev.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 pl-12">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No reviews yet for this product.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Shipping & Return Policy */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
                      <Truck size={24} />
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                        Shipping Information
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {productData.shippingInformation ||
                        "Fast & reliable shipping delivered straight to your door."}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-3 mb-3 text-emerald-600 dark:text-emerald-400">
                      <RefreshCw size={24} />
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                        Return Policy
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {productData.returnPolicy ||
                        "30-day money back guarantee with hassle-free returns."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
