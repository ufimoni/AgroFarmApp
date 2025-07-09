import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { createFarm } from './../../../../api/farm';
import { getUserByRole } from './../../../../api/user';
import styles from './../ownerStyles/createFarm.module.scss';

function CreateFarm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    managers: [],  // array of user _id strings
    farmers: []    // array of user _id strings
  });

  const [managerOptions, setManagerOptions] = useState([]);
  const [farmerOptions, setFarmerOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const managersRes = await getUserByRole('farm-manager');
        const farmersRes = await getUserByRole('farmer');

        const managers = managersRes.data?.users || [];
        const farmers = farmersRes.data?.users || [];

        console.log('Raw Managers:', managers);
        console.log('Raw Farmers:', farmers);

        const mappedManagers = managers.map(user => ({
          value: user._id,
          label: `${user.firstname || user.name || 'NoName'} (${user.email})`
        }));

        const mappedFarmers = farmers.map(user => ({
          value: user._id,
          label: `${user.firstname || user.name || 'NoName'} (${user.email})`
        }));

        console.log('Mapped Manager Options:', mappedManagers);
        console.log('Mapped Farmer Options:', mappedFarmers);

        setManagerOptions(mappedManagers);
        setFarmerOptions(mappedFarmers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Handle regular text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Select (multi) changes
  const handleSelectChange = (selectedOptions, field) => {
    const ids = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prev => ({ ...prev, [field]: ids }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting farm with data:', formData);  // Check what you send

    try {
      await createFarm(formData);
      alert('Farm created successfully!');
      setFormData({
        name: '',
        location: '',
        size: '',
        managers: [],
        farmers: []
      });
    } catch (error) {
      console.error('Error creating farm:', error);
      alert('Failed to create farm');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading users...</p>;
  }

  return (
    <div className={`container mt-5 ${styles.createFarmWrapper}`}>
      <h1 className="text-center mb-4">Create a New Farm</h1>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <InputField
          label="Farm Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
        />
        <SelectField
          label="Assign Farm Managers"
          options={managerOptions}
          onChange={selected => handleSelectChange(selected, 'managers')}
          value={managerOptions.filter(opt => formData.managers.includes(opt.value))}
        />
        <SelectField
          label="Assign Farmers"
          options={farmerOptions}
          onChange={selected => handleSelectChange(selected, 'farmers')}
          value={farmerOptions.filter(opt => formData.farmers.includes(opt.value))}
        />
        <button type="submit" className="btn btn-success w-100 mt-3">
          Create Farm
        </button>
      </form>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      className="form-control"
      onChange={onChange}
      required={required}
    />
  </div>
);

const SelectField = ({ label, options, onChange, value }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <Select
      options={options}
      isMulti
      onChange={onChange}
      value={value}
      placeholder={`Search ${label.toLowerCase()}`}
      closeMenuOnSelect={false}
    />
  </div>
);

export default CreateFarm;
