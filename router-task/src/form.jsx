import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    hobbies: [],
    status: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "hobbies") {
      setFormData(prev => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter(h => h !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstName.trim()) {
      errors.firstName = 'First Name is required';
      alert(errors.firstName);
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'Last Name is required';
      alert(errors.lastName);
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
      alert(errors.email);
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format';

    }
    if (!data.gender) {
      errors.gender = 'Gender is required';
      alert(errors.gender);
    }
    if (data.hobbies.length === 0) {
      errors.hobbies = 'Select at least one hobby';
      alert(errors.hobbies);
    }
    if (!data.status) {
      errors.status = 'Status is required';
      alert(errors.status); 
    }
    if (!data.description.trim()) {
      errors.description = 'Description is required';
      alert(errors.description);
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = [...users, formData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      navigate('/table');
    }
  };

  return (
    <div className='deva'>
      <h1 className='header'>User Form</h1><br /><br />
      <form onSubmit={handleSubmit}>
        <label>First Name: </label>
        <input
          className="sponge"
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
        />
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
        <br /><br />

        <label>Last Name: </label>
        <input
          className="sponge"
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
        />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        <br /><br />

        <label>Email: </label>
        <input
          className="sponge"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <br /><br />

        <label>Gender: </label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === 'Male'}
          onChange={handleChange}
        /> Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === 'Female'}
          onChange={handleChange}
        /> Female
        {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        <br /><br />

        <label>Hobbies: </label>
        <input
          type="checkbox"
          name="hobbies"
          value="Sports"
          checked={formData.hobbies.includes('Sports')}
          onChange={handleChange}
        /> Sports
        <input
          type="checkbox"
          name="hobbies"
          value="Reading"
          checked={formData.hobbies.includes('Reading')}
          onChange={handleChange}
        /> Reading
        <input
          type="checkbox"
          name="hobbies"
          value="Painting"
          checked={formData.hobbies.includes('Painting')}
          onChange={handleChange}
        /> Painting
        <input
          type="checkbox"
          name="hobbies"
          value="Travel"
          checked={formData.hobbies.includes('Travel')}
          onChange={handleChange}
        /> Travel
        {errors.hobbies && <p style={{ color: "red" }}>{errors.hobbies}</p>}
        <br /><br />

        <label>Status: </label>
        <select
          style={{ textAlign: "center" }}
          className="sponge"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value=''>Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
        <br /><br />

        <label>Description: </label><br />
        <textarea
          className="sponge1"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        {errors.description && <p style={{ color: "red"}}>{errors.description}</p>}
        <br /><br />

        <button className="style" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;