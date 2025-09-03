// src/Dashboard/RawMaterials.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";
import "../nav.css/RawMaterials.css";

const RawMaterials = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [filteredRawMaterials, setFilteredRawMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all"); // "all", "name", "category", "supplier"
  const [editingRawMaterial, setEditingRawMaterial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    supplier: "",
    grams: ""
  });

  // Load rawMaterials from localStorage on component mount
  useEffect(() => {
    const savedRawMaterials = localStorage.getItem("rawMaterials");
    if (savedRawMaterials) {
      const parsedRawMaterials = JSON.parse(savedRawMaterials);
      setRawMaterials(parsedRawMaterials);
      setFilteredRawMaterials(parsedRawMaterials);
    }
  }, []);

  // Save rawMaterials to localStorage whenever rawMaterials change
  useEffect(() => {
    localStorage.setItem("rawMaterials", JSON.stringify(rawMaterials));
  }, [rawMaterials]);

  // Filter rawMaterials based on search term and type
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRawMaterials(rawMaterials);
    } else {
      let filtered;
      switch (searchType) {
        case "name":
          filtered = rawMaterials.filter(rawMaterial =>
            rawMaterial.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case "category":
          filtered = rawMaterials.filter(rawMaterial =>
            rawMaterial.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case "supplier":
          filtered = rawMaterials.filter(rawMaterial =>
            rawMaterial.supplier.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        default: // "all"
          filtered = rawMaterials.filter(rawMaterial =>
            rawMaterial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rawMaterial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rawMaterial.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rawMaterial.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rawMaterial.grams.toString().includes(searchTerm)
          );
      }
      setFilteredRawMaterials(filtered);
    }
  }, [searchTerm, searchType, rawMaterials]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm(""); // Clear search term when changing search type
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRawMaterial = (e) => {
    e.preventDefault();

    if (editingRawMaterial) {
      // Update existing rawMaterial
      const updatedRawMaterials = rawMaterials.map(rawMaterial =>
        rawMaterial.id === editingRawMaterial.id
          ? { ...formData, id: editingRawMaterial.id }
          : rawMaterial
      );
      setRawMaterials(updatedRawMaterials);
      setEditingRawMaterial(null);
    } else {
      // Add new rawMaterial
      const newRawMaterial = {
        ...formData,
        id: Date.now(), // Simple ID generation
      };
      setRawMaterials([...rawMaterials, newRawMaterial]);
    }

    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
      category: "",
      supplier: "",
      grams: ""
    });
    setOpenModal(false);
  };

  const handleEditRawMaterial = (rawMaterial) => {
    setFormData(rawMaterial);
    setEditingRawMaterial(rawMaterial);
    setOpenModal(true);
  };

  const handleDeleteRawMaterial = (rawMaterialId) => {
    if (window.confirm("Are you sure you want to delete this raw material?")) {
      const updatedRawMaterials = rawMaterials.filter(rawMaterial => rawMaterial.id !== rawMaterialId);
      setRawMaterials(updatedRawMaterials);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      supplier: "",
      grams: ""
    });
    setEditingRawMaterial(null);
    setOpenModal(false);
  };

  // Get unique categories and suppliers for dropdown suggestions
  const categories = [...new Set(rawMaterials.map(rawMaterial => rawMaterial.category))];
  const suppliers = [...new Set(rawMaterials.map(rawMaterial => rawMaterial.supplier))];

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h1 className="page-title">Raw Materials</h1>

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
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              ) : searchType === "supplier" ? (
                <select
                  className="search-input search-select"
                  value={searchTerm}
                  onChange={handleSearchChange}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier, index) => (
                    <option key={index} value={supplier}>{supplier}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={`Search by ${searchType === "name" ? "Raw Material Name" : "All Fields"}...`}
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              )}
            </div>

            <button
              className="add-button"
              onClick={() => setOpenModal(true)}
            >
              Add Raw Material
            </button>
          </div>

          {/* Raw Materials Table */}
          <div className="raw-materials-table-container">
            <table className="raw-materials-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Grams</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRawMaterials.length > 0 ? (
                  filteredRawMaterials.map((rawMaterial) => (
                    <tr key={rawMaterial.id}>
                      <td>{rawMaterial.name}</td>
                      <td>{rawMaterial.description}</td>
                      <td>{rawMaterial.category}</td>
                      <td>{rawMaterial.supplier}</td>
                      <td className={
                        rawMaterial.grams == 0 ? "low-stock" :
                        rawMaterial.grams < 500 ? "medium-stock" : "high-stock"
                      }>
                        {parseFloat(rawMaterial.grams).toFixed(3)} g
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => handleEditRawMaterial(rawMaterial)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteRawMaterial(rawMaterial.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-raw-materials">
                      {searchTerm ?
                        `No raw materials found matching "${searchTerm}"` :
                        "No raw materials found. Click 'Add Raw Material' to get started."
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {openModal && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="modal-title">
                  {editingRawMaterial ? "Edit Raw Material" : "Add Raw Material"}
                </h2>
                <button
                  className="close-button"
                  onClick={handleCancel}
                >
                  ✖
                </button>

                <form className="modal-form" onSubmit={handleAddRawMaterial}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Raw Material Name"
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
                    name="grams"
                    value={formData.grams}
                    onChange={handleChange}
                    placeholder="Enter Weight in Grams"
                    className="form-input"
                    step="0.001"
                    min="0"
                    required
                  />

                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      {editingRawMaterial ? "Update Raw Material" : "Add Raw Material"}
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={handleCancel}
                    >
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

export default RawMaterials;
