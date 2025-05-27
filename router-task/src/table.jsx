import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Table (){
  const [editIndex,setEditIndex] = useState(null);
  const[editRowData,setEditRowData] = useState({});

  const navigate = useNavigate();

  const [users,setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers): [];

  });

const [errors, setErrors] = useState({});

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
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format'
      alert(errors.email)
    }
    if (!data.gender) {
      errors.gender = 'Gender is required'
      alert(errors.gender);
    }
    if (data.hobbies.length === 0){
        errors.hobbies = 'Select at least one hobby';
        alert(errors.hobbies)
      }
    if (!data.status) {
      errors.status = 'Status is required'
      alert(errors.status);
    }
    if (!data.description.trim()){ 
      errors.description = 'Description is required'
      alert(errors.description)
    }
    return errors;
  };
 


  const handleEditRow = (index)=> {
    setEditIndex(index);
    setEditRowData(users[index]);

  };

  const handleEditChange = (e) => {
    const {name,value} = e.target;
    if (name === "hobbies") {
      setEditRowData((prev)=> ({
      ...prev,
      hobbies:value.split(",").map(h=> h.trim())

      }));
    } else{
      setEditRowData((prev) => ({...prev,[name]:value}));
    }
  };

    const handleEditSubmit = (index) => {
  const validationErrors = validateForm(editRowData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const updatedUsers = [...users];
    updatedUsers[index] = editRowData;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditIndex(null);
    setEditRowData({});
    alert("User data updated successfully!");
  }
};

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditRowData({});
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };





  return (
    <div style={{ textAlign: 'center' }}>
      <h2>User List</h2>
     <button onClick={() => navigate('/')} className='edit'>Add User</button><br/><br/>
      {users.length > 0 ? (
        <table>
          <thead className='head'>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>Status</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='bodyy'>
            {users.map((user, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td><input type="text" name="firstName" value={editRowData.firstName} onChange={handleEditChange} />{errors.firstName && <p style={{color:'red'}}>{errors.firstName}</p>}</td>
                    <td><input type="text" name="lastName" value={editRowData.lastName} onChange={handleEditChange} />{errors.lastName && <p style={{color:'red'}}>{errors.lastName}</p>}</td>
                    <td><input type="text" name="email" value={editRowData.email} onChange={handleEditChange} />  {errors.email && <p style={{color:'red'}}>{errors.email}</p>}</td>
                    <td>
                      <label style={{display: "inline-flex", justifyContent:"center",alignContent:"center", alignItems:"center", margin:"16px"}}>
                        <input type="radio" name="gender" value="Male" checked={editRowData.gender === "Male"} onChange={handleEditChange}/> Male
                      </label>
                      <label style={{ marginLeft: "8px" }}>
                        <input type="radio" name="gender" value="Female" checked={editRowData.gender === "Female"} onChange={handleEditChange} /> Female
                      </label>
                      {errors.gender && <p style={{color:'red'}}>{errors.gender}</p>}
                      </td>

                    <td> {["Sports", "Reading", "Painting", "Travel"].map((hobby) => (
                      <label key={hobby} style={{ display: "inline-flex", alignItems: "center", marginRight: "10px" }}>
                        <input type="checkbox" name="hobbies" value={hobby} checked={editRowData.hobbies.includes(hobby)} onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          setEditRowData((prev) => ({
                          ...prev, hobbies: checked ? [...prev.hobbies, value] : prev.hobbies.filter((h) => h !== value),
                          }));
                        }}/>{hobby}
                      </label>
                    ))}
                    {errors.hobbies && <p style={{color:'red'}}>{errors.hobbies}</p>}
                    </td>
                    <td><select name="status" value={editRowData.status} onChange={handleEditChange}>
                          <option value="">Select</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          </select>{errors.status && <p style={{color:'red'}}>{errors.status}</p>}</td>
                    <td><input type="text" name="description" value={editRowData.description} onChange={handleEditChange} />{errors.description && <p style={{color:'red'}}>{errors.description}</p>}</td>
                    <td>
                      <button onClick={() => handleEditSubmit(index)} className='edit'>Update</button><> </>
                      <button onClick={handleCancelEdit} className='edit'>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.hobbies.join(", ")}</td>
                    <td>{user.status}</td>
                    <td>{user.description}</td>
                    <td>
                      <button onClick={() => handleEditRow(index)} className='edit'>Edit</button><> </>
                      <button onClick={() => handleDelete(index)} className='edit'>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users added yet.</p>
      )}
    </div>
  );
}
export default Table
