// src/Dashboard/Product.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";
import "../nav.css/Product.css";

const Product = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    supplier: "",
    stock: ""
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
      setFilteredProducts(parsedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      let filtered;
      switch (searchType) {
        case "name":
          filtered = products.filter(prod =>
            prod.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case "category":
          filtered = products.filter(prod =>
            prod.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case "supplier":
          filtered = products.filter(prod =>
            prod.supplier.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        default:
          filtered = products.filter(prod =>
            prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prod.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prod.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prod.price.toString().includes(searchTerm) ||
            prod.stock.toString().includes(searchTerm)
          );
      }
      setFilteredProducts(filtered);
    }
  }, [searchTerm, searchType, products]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm("");
  };

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      const updated = products.map(prod =>
        prod.id === editingProduct.id
          ? { ...formData, id: editingProduct.id }
          : prod
      );
      setProducts(updated);
      setEditingProduct(null);
    } else {
      const newProd = { ...formData, id: Date.now() };
      setProducts([...products, newProd]);
    }
    setFormData({ name: "", description: "", price: "", category: "", supplier: "", stock: "" });
    setOpenModal(false);
  };

  const handleEditProduct = (prod) => {
    setFormData(prod);
    setEditingProduct(prod);
    setOpenModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(prod => prod.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "", price: "", category: "", supplier: "", stock: "" });
    setEditingProduct(null);
    setOpenModal(false);
  };

  const categories = [...new Set(products.map(p => p.category))];
  const suppliers = [...new Set(products.map(p => p.supplier))];

  // Function to format price as Rs. with comma separators and 2 decimals
  const formatPrice = (value) => {
    if (!value) return "Rs. 0.00";
    return `Rs. ${parseFloat(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <h1 className="page-title">Products</h1>
          <div className="page-actions">
            <div className="search-container">
              <select
                className="search-type-select"
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                <option value="all">All Fields</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="supplier">Supplier</option>
              </select>
              {searchType === "category" ? (
                <select
                  className="search-input search-select"
                  value={searchTerm}
                  onChange={handleSearchChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              ) : searchType === "supplier" ? (
                <select
                  className="search-input search-select"
                  value={searchTerm}
                  onChange={handleSearchChange}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((sup, i) => (
                    <option key={i} value={sup}>{sup}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={`Search by ${searchType === "name" ? "Product Name" : "All Fields"}...`}
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              )}
            </div>
            <button className="add-button" onClick={() => setOpenModal(true)}>
              Add Product
            </button>
          </div>

          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{formatPrice(product.price)}</td>
                      <td>{product.category}</td>
                      <td>{product.supplier}</td>
                      <td
                        className={product.stock < 5 ? "low-stock" : "high-stock"}
                      >
                        {product.stock < 5
                          ? `Low Stock (${product.stock})`
                          : `In Stock (${product.stock})`}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-button" onClick={() => handleEditProduct(product)}>
                            Edit
                          </button>
                          <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-products">
                      {searchTerm
                        ? `No products found matching "${searchTerm}"`
                        : "No products found. Click 'Add Product' to get started."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {openModal && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="modal-title">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                <button className="close-button" onClick={handleCancel}>✖</button>
                <form className="modal-form" onSubmit={handleAddProduct}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="form-input"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="form-input"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    className="form-input"
                    step="0.01"
                    min="0"
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter Category"
                    className="form-input"
                    required
                  />
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Enter Supplier"
                    className="form-input"
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter Stock Quantity"
                    className="form-input"
                    min="0"
                    required
                  />
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
