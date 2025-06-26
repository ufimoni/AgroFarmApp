import React, { useState, useEffect } from 'react';
import { createFarm } from './../../../../api/farm';
import { getUserByRole  } from './../../../../api/user'; // new
import styles from './../ownerStyles/createFarm.module.scss';

function CreateFarm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    managers: [],
    farmers: []
  });

  const [managerList, setManagerList] = useState([]);
  const [farmerList, setFarmerList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const mgrs = await getUserByRole('manager');
      const frms = await getUserByRole('farmer');
      setManagerList(mgrs.data.users);
      setFarmerList(frms.data.users);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectMultiple = (e, field) => {
    const selected = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({
      ...prev,
      [field]: selected
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFarm(formData);
      alert('Farm created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating farm');
    }
  };

  return (
    <div className={`container mt-5 ${styles.createFarmWrapper}`}>
      <h1 className="text-center mb-4">Create a New Farm</h1>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Farm Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" name="location" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Size</label>
          <input type="text" name="size" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Assign Managers</label>
          <select multiple className="form-select" onChange={(e) => handleSelectMultiple(e, 'managers')}>
            {managerList.map(manager => (
              <option key={manager._id} value={manager._id}>
                {manager.name} ({manager.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Assign Farmers</label>
          <select multiple className="form-select" onChange={(e) => handleSelectMultiple(e, 'farmers')}>
            {farmerList.map(farmer => (
              <option key={farmer._id} value={farmer._id}>
                {farmer.name} ({farmer.email})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100 mt-3">
          Create Farm
        </button>
      </form>
    </div>
  );
}

export default CreateFarm;
