export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // Replace
  formData.append('cloud_name', 'your_cloud_name');       // Replace

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return { success: true, url: data.secure_url };
  } catch (error) {
    console.error('Cloudinary upload failed', error);
    return { success: false, error };
  }
};
