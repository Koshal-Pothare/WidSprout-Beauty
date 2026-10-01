import React, { useEffect } from 'react'



import { addProduct, updateProduct } from "../services/ProductService"

import { useState } from 'react'


import { toast } from 'react-toastify'


const AddProduct = ({ onClose, existingProduct, isEdit }) => {

  const [product, setProduct] = useState({
    name: "",
    description: "",
    ingredients: "",
    rating: "",
    price: "",
    category: ""
  })

  const [image, setImage] = useState(null);
  const [isloading, setIsLoading] = useState(false);


useEffect(() => {
  if (isEdit && existingProduct) {
    const { image, id, ...rest } = existingProduct;
    setProduct(rest);
    setImage(null);
  }
}, [isEdit, existingProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("ingredients", product.ingredients);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("rating", product.rating);

      if (image) {
        formData.append("imageFile", image);   // selectedFile comes from <input type="file" />
      }

      if (isEdit) {
        await updateProduct(existingProduct.id, formData);
        toast.success("Product Updated Succesfully");
      } else {
        await addProduct(formData);
        toast.success("Product added Succesfully")
      }
    
      onClose();


    } catch (err) {
    
      toast.error( isEdit ? "Failed to Update Product":"Failed to Add product");
    } finally {
      setIsLoading(false);

    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blurred Background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></div>

      {/* Modal Box */}
      <div className="relative z-10 w-[420px] bg-white rounded-2xl shadow-2xl p-8 border border-amber-800">
        <h3 className="text-xl font-semibold mb-3">
          Add New Product
        </h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name='name'
            type="text"
            placeholder="Product Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={product.name} onChange={handleChange}
          />

          <input
            name='price'
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={product.price} onChange={handleChange}
          />

          <textarea
            name='description'
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={product.description} onChange={handleChange}
          ></textarea>

          <input
            name='ingredients'
            type="text"
            placeholder="Ingredients"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={product.ingredients} onChange={handleChange}
          />

          <input
            name='category'
            type="text"
            placeholder="category"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={product.category} onChange={handleChange}
          />

          <input
            type="file"
            className="w-full px-4 py-2 border rounded-lg" onChange={handleImageChange}
          />

          <input
            name='rating'
            type="number"
            placeholder="Rating"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={product.rating} onChange={handleChange}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isloading}
              className="flex-1 py-3 bg-[#8B5E34] text-white rounded-lg hover:bg-[#6f4a29]"
            >
              {isloading ? (isEdit? "Updating Product...":"Adding...") :( isEdit? "Edit Product ": "Add Product")}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-lg hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black"
        >
          ✕
        </button>
      </div>



    </div>


  )
}

export default AddProduct;