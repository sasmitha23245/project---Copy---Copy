// src/Dashboard/Employee.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";
import "../nav.css/Employees.css";

const Employee = () => {
  const [openModal, setOpenModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      const parsed = JSON.parse(savedEmployees);
      setEmployees(parsed);
      setFilteredEmployees(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredEmployees(employees);
      return;
    }
    let filtered;
    switch (searchType) {
      case "name":
        filtered = employees.filter(emp =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "department":
        filtered = employees.filter(emp =>
          emp.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "position":
        filtered = employees.filter(emp =>
          emp.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        filtered = employees.filter(emp =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.phone.includes(searchTerm)
        );
    }
    setFilteredEmployees(filtered);
  }, [searchTerm, searchType, employees]);

  const handleSearchChange = e => setSearchTerm(e.target.value);
  const handleSearchTypeChange = e => {
    setSearchType(e.target.value);
    setSearchTerm("");
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddEmployee = e => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id ? { ...formData, id: emp.id, joined: emp.joined } : emp
      ));
      setEditingEmployee(null);
    } else {
      setEmployees([...employees, { 
        ...formData, 
        id: Date.now(), 
        joined: new Date().toLocaleDateString("en-GB") 
      }]);
    }
    setFormData({ name: "", position: "", department: "", email: "", phone: "" });
    setOpenModal(false);
  };

  const handleEditEmployee = emp => {
    setFormData(emp);
    setEditingEmployee(emp);
    setOpenModal(true);
  };

  const handleDeleteEmployee = id => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", position: "", department: "", email: "", phone: "" });
    setEditingEmployee(null);
    setOpenModal(false);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <h1 className="page-title">Employees</h1>

          {/* Search + Add */}
          <div className="page-actions">
            <select
              className="search-type-select"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="all">All Fields</option>
              <option value="name">Name</option>
              <option value="department">Department</option>
              <option value="position">Position</option>
            </select>
            <input
              type="text"
              placeholder="Search by All Fields..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="add-button" onClick={() => setOpenModal(true)}>
              Add Employee
            </button>
          </div>

          {/* Employee Cards - UPDATED STRUCTURE */}
          <div className="employees-container">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <div key={employee.id} className="employee-card">
                  <h3 className="employee-name">{employee.name}</h3>
                  <div className="employee-details">
                    <div className="detail-row">
                      <span className="detail-label">Role</span>
                      <span className="detail-value">{employee.position}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Department</span>
                      <span className="detail-value">{employee.department}</span>
                    </div>
                  </div>
                  <div className="employee-contact">
                    <div className="contact-info">
                      <div className="contact-item">
                        <span className="contact-icon">✉</span>
                        <span className="contact-text">
                          <a href={`mailto:${employee.email}`}>{employee.email}</a>
                        </span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-icon">📞</span>
                        <span className="contact-text">{employee.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="employee-footer">
                    <span className="join-date">Joined {employee.joined}</span>
                    <div className="employee-actions">
                      <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                      <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-employees">
                No employees found. Click 'Add Employee' to get started.
              </p>
            )}
          </div>

          {/* Modal */}
          {openModal && (
  <div className="modal">
    <div className="modal-content">
      <h2 className="modal-title">{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
      <button className="close-button" onClick={handleCancel}>✖</button>
      <form onSubmit={handleAddEmployee} className="modal-form">
        <div className="form-row">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>
        
        <div className="form-row">
          <label className="form-label">Role</label>
          <input 
            type="text" 
            name="position" 
            value={formData.position} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>
        
        <div className="form-row">
          <label className="form-label">Department</label>
          <input 
            type="text" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>
        
        <div className="form-row">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>
        
        <div className="form-row">
          <label className="form-label">Phone</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="submit-button">
            {editingEmployee ? "Update Employee" : "Add Employee"}
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

export default Employee;