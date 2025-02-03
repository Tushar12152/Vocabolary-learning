import axios from "axios";

const uploadImageToCloudinary = async (file: File) => {
  const cloudName = "deagggkjd"; // Replace with your Cloudinary Cloud Name
  const uploadPreset = "imagebb"; // Replace with your Upload Preset (from Cloudinary settings)

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

export default uploadImageToCloudinary;
