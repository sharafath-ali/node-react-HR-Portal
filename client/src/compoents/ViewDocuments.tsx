import * as React from 'react';
import qs from "qs";

import SearchIcon from "@mui/icons-material/Search";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import img from '../assets/hr-connect-logo.png'
import './ViewDocuments.css'
import axios from 'axios';
import Loader from '../LoaderComponent/loader';
export interface IViewDocumentsProps {
  
}
interface Document {
  id: number;
  Name: string;
  url: string;
  ServerRelativeUrl: string;

}

export default function ViewDocuments (props: IViewDocumentsProps) {
    const navigate=useNavigate()
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [files, setFiles] = React.useState<Document[]>([]);
    const [search, setSearch] = React.useState("");
    const { id } = useParams<{ id: string }>();
    const [loading,setloading]=React.useState<any>(true);//loader
    
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      } else {
        setSelectedFile(null);
      }
    };


    const handleUploadClick = async () => {
      if (!selectedFile) return;
  
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
  
        const response = await axios.put(
          `http://localhost:5000/get/document/${id}`,
          formData
        );
  
        console.log(response.data)
        setSelectedFile(null);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };



    const fetchData = React.useCallback(async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get/files/${id}`);
  
        const files = response.data.files;
    
        console.log(response);
    
        console.log(typeof files);
    
        setFiles(files);
        setloading(false)
      } catch (error) {
        console.error(error);
      }
    }, [id]);


    
    
    React.useEffect(() => {
      fetchData();
    }, []);

    const handleDownload = async (serverRelativePath?: string) => {
      try {
        if (!serverRelativePath) {
          throw new Error("serverRelativePath parameter is required");
        }
        const response = await axios.get(
          "http://localhost:5000/get/document/download",
          {
            params: { serverRelativePath },
            paramsSerializer: (params) => {
              return qs.stringify(params, { encode: false });
            },
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data]);
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.setAttribute(
          "download",
          serverRelativePath.split("/").pop() || ""
        );
        document.body.appendChild(downloadLink);
        downloadLink.click();
      } catch (error) {
        console.error(error);
      }
    };
  
    const filteredFiles = files.filter(file =>
      file.Name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredFiles)
  return (
    <>
    <div>
    <Navbar className="MainNavbar" expand="lg">
    <Container className="NavContainer" fluid>
      <img className="NavLogo" src={img} onClick={() => navigate("/")} />
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
      </Navbar.Collapse>
      <div className="round-corner search-container ">
              <SearchIcon className="search-icon" />
              <input
                type="search"
                placeholder="Search..."
                className="me-2 seach-bar"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
      </div>
    </Container>
  </Navbar>
  {/*nav end*/}
   {/*upload*/}
   {loading?(<Loader/>):(
   <><div className="container">
            <h1 className="form-head-text text-center m-5">Upload Employee Files</h1>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">File Upload</h5>
                    </div>
                    <div className="card-body">
                      <div>
                        <div className="f">
                          <label htmlFor="imageUpload">Select an File:</label>
                          <input type="file" className="form-control-file" id="upload-file" accept="image/*" onChange={handleFileSelect} />
                        </div>
                        <div className="f">
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleUploadClick} disabled={!selectedFile}>Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><div>
              <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Folder Name</th>
                          <th>File Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFiles.map((file, key) => (
                          <tr>
                            <td data-label="#">{key + 1}</td>
                            <td data-label="Folder Path">{file.ServerRelativeUrl}</td>
                            <td data-label="File Name">{file.Name}</td>
                            <td data-label="Action"><a href="#" className="download-button" onClick={() => handleDownload(file.ServerRelativeUrl)}>Download</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div></>)}
</div>
</>
  )
        }
