const fetchData = React.useCallback(async () => {
  try {
    const response = await axios.get(`http://localhost:5000/files/${id}`);

    const files = response.data.files;

    console.log(response);

    console.log(typeof files);

    setFiles(files);
  } catch (error) {
    console.error(error);
  }
}, [id]);

React.useEffect(() => {
  fetchData();
}, []);
