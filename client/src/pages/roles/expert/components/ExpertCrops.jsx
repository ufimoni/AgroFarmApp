import React, { useRef, useState, useEffect } from 'react';
import { createCrop } from './../../../../api/crop';
import { getAllFarms } from './../../../../api/farm';
import style from './../expertStyles/expertCrops.module.scss';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from './../../../../redux/loaderSlice';
import imageCompression from 'browser-image-compression'; // ✅ added compression

function ExpertCrops() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    image: null,
    video: null,
    farm: '',
  });

  const [farms, setFarms] = useState([]);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await getAllFarms();
      if (response.success) {
        setFarms(response.farms);
      } else {
        toast.error(response.message || 'Could not fetch farms');
      }
    };
    fetchFarms();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.farm) {
      toast.error('Please fill all required fields (name, type, farm).');
      return;
    }

    try {
      dispatch(showLoader());

      let imageUrl = '';
      let videoFile = formData.video;

      // ✅ Compress and upload image to Cloudinary
      if (formData.image) {
        const compressedImage = await imageCompression(formData.image, {
          maxSizeMB: 1, // reduce to ~1MB
          maxWidthOrHeight: 1024, // resize large dimensions
          useWebWorker: true,
        });

        const imageData = new FormData();
        imageData.append('file', compressedImage);
        imageData.append('upload_preset', 'agrofarm_upload');
        imageData.append('cloud_name', 'dl88tovtn');

        const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dl88tovtn/image/upload', {
          method: 'POST',
          body: imageData,
        });

        const cloudData = await cloudRes.json();
        console.log('Cloudinary Response:', cloudData.secure_url);

        if (cloudData.secure_url) {
          imageUrl = cloudData.secure_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const payload = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        farm: formData.farm,
        image: imageUrl,
        video: videoFile,
      };

      const response = await createCrop(payload);
      dispatch(hideLoader());

      if (response.success) {
        toast.success(response.message || 'Crop uploaded successfully!');
        setFormData({
          name: '',
          type: '',
          description: '',
          image: null,
          video: null,
          farm: '',
        });
        formRef.current.reset();
      } else {
        toast.error(response.message || 'Failed to upload crop.');
      }
    } catch (error) {
      dispatch(hideLoader());
      console.error('Upload failed:', error);
      toast.error('Something went wrong during upload.');
    }
  };

  return (
    <div className={style.wrapper}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">Upload New Crop</h4>
                <form onSubmit={handleSubmit} ref={formRef}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Crop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">Crop Type</label>
                    <select
                      className="form-select"
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Cereal">Cereal</option>
                      <option value="Legume">Legume</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Fruits">Fruits</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="farm" className="form-label">Select Farm</label>
                    <select
                      className="form-select"
                      id="farm"
                      name="farm"
                      value={formData.farm}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Farm</option>
                      {farms.map((farm) => (
                        <option key={farm._id} value={farm._id}>
                          {farm.name} - {farm.location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image (optional)</label>
                    <input
                      className="form-control"
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="video" className="form-label">Upload Video (optional)</label>
                    <input
                      className="form-control"
                      type="file"
                      id="video"
                      name="video"
                      accept="video/*"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Create Crop
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertCrops;
