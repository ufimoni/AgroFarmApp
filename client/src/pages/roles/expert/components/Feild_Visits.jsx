// src/pages/FeildVisits.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from './../../../../hooks/uploadtoCloudinary';
import styles from './../expertStyles/fieldvisits.module.scss'; // create this SCSS

function FieldVisits() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [visitImages, setVisitImages] = useState([]); // array of { url, status }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async (status = 'Visited') => {
    if (!imageFile) return toast.error('Please select an image');

    toast.loading('Uploading...');
    const result = await uploadToCloudinary(imageFile);

    toast.dismiss();

    if (result.success) {
      toast.success('Image uploaded');
      setVisitImages([...visitImages, { url: result.url, status }]);
      setImageFile(null);
      setPreviewUrl(null);
    } else {
      toast.error('Upload failed');
    }
  };

  return (
    <div className={`container ${styles.fieldVisitsContainer}`}>
      <h2 className="my-4">Field Visits</h2>

      {/* Upload Section */}
      <div className="mb-4">
        <label htmlFor="upload" className="form-label">Upload Field Visit Image</label>
        <input
          type="file"
          accept="image/*"
          id="upload"
          className="form-control"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div className="mt-3">
            <img src={previewUrl} alt="Preview" className={styles.previewImage} />
            <div className="mt-2 d-flex gap-2">
              <button className="btn btn-success" onClick={() => handleUpload('Visited')}>
                Mark as Visited
              </button>
              <button className="btn btn-secondary" onClick={() => handleUpload('Not Visited')}>
                Mark as Not Visited
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Display Uploaded Images */}
      <div className="row">
        {visitImages.length === 0 && <p>No images uploaded yet.</p>}
        {visitImages.map((img, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className={`card ${styles.visitCard}`}>
              <img src={img.url} alt={`Visit ${idx + 1}`} className="card-img-top" />
              <div className="card-body text-center">
                <span className={`badge ${img.status === 'Visited' ? 'bg-success' : 'bg-secondary'}`}>
                  {img.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldVisits;
