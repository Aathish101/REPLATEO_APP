export const uploadToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = "YOUR_IMGBB_KEY";

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error("ImgBB upload failed");
  }

  return data.data.url; // ✅ USE url NOT display_url
};