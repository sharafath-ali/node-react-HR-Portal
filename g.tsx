const handleFileUpload = async () => {
  if (!selectedFile) return;
  const formData = new FormData();

  formData.append("image", selectedFile);

  try {
    const response = await axios.put(
      `http://localhost:5000/image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);

    setImage(response.data.image);
  } catch (error) {
    console.log(error);
  }
};
