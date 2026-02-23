export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "replateo_unsigned");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dwz3sh3uc/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Upload failed");
  }

  return data.secure_url;
};