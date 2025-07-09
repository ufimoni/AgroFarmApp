// src/components/Settings/Settings.jsx
import React, { useState, useEffect } from 'react';
import styles from './../farmStyles/settings.module.scss';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { uploadProfileImage } from './../../../../api/profile';
import { uploadToCloudinary } from './../../../../hooks/uploadtoCloudinary.js';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Update body class and localStorage when theme changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return toast.error('Please select an image');

    toast.loading('Uploading image...');

    const uploadRes = await uploadToCloudinary(imageFile);

    if (!uploadRes.success) {
      toast.dismiss();
      toast.error('Image upload failed');
      return;
    }

    try {
      const response = await uploadProfileImage(uploadRes.url);

      toast.dismiss();

      if (response.success) {
        toast.success('Image uploaded successfully');
        setPreview(response.data.profile?.Image || response.data.user?.image);
      } else {
        toast.error(response.message || 'Upload failed');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Something went wrong');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out');
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`${styles.settingsContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <h3 className="mb-4">Settings</h3>

      {/* Upload Image Section */}
      <div className="mb-3">
        <label htmlFor="upload" className="form-label">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          id="upload"
          className="form-control"
          onChange={handleFileChange}
        />
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="Preview" className={styles.previewImage} />
          </div>
        )}
        <button className="btn btn-primary mt-2" onClick={handleImageUpload}>
          Upload Image
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      {/* Logout */}
      {/* <div className="mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Settings;
