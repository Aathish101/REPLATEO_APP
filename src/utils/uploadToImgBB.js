export const uploadToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = "6b8d2784ce08a48d0b5a3e35beaf0fa9";

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  // ✅ USE THIS
  return data.data.display_url;
};
