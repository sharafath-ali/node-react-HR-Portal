import { Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";

//function for getAllEmployees =done

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const response = await sp.web.lists.getByTitle("users").items.getAll();
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//function for getSingleEmployee =done

const getSingleEmployee = async (req: Request, res: Response) => {
  console.log("log", req.params);
  const Id = req.params.id;
  console.log(Id, "iddddddddd");
  if (!Number.isInteger(Number(Id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const response = await sp.web.lists
      .getByTitle("users")
      .items.getById(Number(Id))
      .get();
    console.log(response);

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
    {
      /*let id: number = Number.parseInt(req.params.id);
  try {
    const response = await sp.web.lists.getByTitle("users").items.getById(id)();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }*/
    }
  }
};

// function for delete =done
const deleteEmployee = async (req: Request, res: Response) => {
  console.log("delete employee");
  let id: number = Number.parseInt(req.params.id);
  console.log("id", id);
  try {
    let user = await sp.web.lists.getByTitle("users").items.getById(id);
    if (!user) {
      throw new Error("User not found");
    } else {
      await sp.web.lists.getByTitle("users").items.getById(id).delete();

      res.send({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: `Internal Server Error` });
  }
};

//function for addemployee= done
const addEmployees = async (req: Request, res: Response) => {
  const {first_name,last_name,email,designation} = req.body;
  
    console.log("start.");
    console.log(req.body, "req body log");
    const newUser= {
      first_name: first_name,
      last_name: last_name,
      email: email,
      designation:designation
    };

    console.log("new user log", newUser);
    const response = (await sp.web.lists.getByTitle("users").items.add(newUser))?.data?.ID; 
    // console.log(response.data.Id);
    // console.log("logging response", response);

    const documentLibraryName = "EmployeeLibrary";
    const folderName = response;
    const newFolderName = `${folderName}`;
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder ${newFolderName} created successfully.`);
      })
    .catch((error:any)=> {
    console.log(`Error creating folder: ${error}`);
  });
  res.status(200).json({
    success: true,
    message: "New Employee added succesfuly",
    id:response
  });
};




//function for Update= done




const Update=async (req: Request, res: Response) => {
  let id: number = Number.parseInt(req.params.id);

  const {first_name,last_name,email,designation} = req.body;

  

  try {
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID provided",
      });

      return;
    }

    const updateEmploy = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      designation:designation
    };

    const response= await sp.web.lists.getByTitle("users").items.getById(id).update(updateEmploy);
    console.log(response)

    res.status(200).json({
      success: true,
      message: " Succesfully Updated Employee Details",
      response,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error " });
  }
};


//Upload  Done
const uploadImage= async (req: Request, res: Response) =>  {

  let image = (req?.files as any)?.image;

  console.log("req?.files=>",req?.files)
 
  const id:number= Number.parseInt(req.params.id);
 /////////////////////////////////////////////////////////////////
  if (!image) {
    console.error('No file selected');
    return res.status(400).json({
      success: false,
      message: 'No file selected',
    });
  }

  const documentLibraryName = `EmployeeLibrary/${id}`;
  const fileNamePath = `profilepic.jpg`;

  let result: any;
  if (image?.size <= 10485760) {
    // small upload
    console.log('Starting small file upload');
    result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, image.data, { Overwrite: true });
  } else {
    // large upload
    console.log('Starting large file upload');
    result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, image, ()=> {
      console.log(`progress`);
    }, true);
  }

  console.log('Server relative URL:', result?.data?.ServerRelativeUrl);
  const url = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}` 
  
  const list = sp.web.lists.getByTitle("users");

  try {
    await list.items.getById(id).update({
      Image_url: url,
    });

    console.log('File upload successful');
    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
    });
  } catch (error) {
    console.error('Error while updating employee item:', error);
    res.status(500).json({
      success: false,
      message: 'Error while updating employee item',
    });
  }}
      

//documents 
const uploadDocument = async (req: Request, res: Response) => {
  let file = (req?.files as any)?.file;

  let id: number = Number.parseInt(req.params.id);

  console.log("imagetype", file);

  if (!file) {
    console.error("No file selected");

    return res.status(400).json({
      success: false,

      message: "No file selected",
    });
  }

  const documentLibraryName = `EmployeLibrary/${id}`;

  const fileNamePath = file.name;

  let result: any;

  if (file?.size <= 10485760) {
    // small upload

    console.log("Starting small file upload");

    result = await sp.web

      .getFolderByServerRelativePath(documentLibraryName)

      .files.addUsingPath(fileNamePath, file.data, { Overwrite: true });
  } else {
    // large upload

    console.log("Starting large file upload");

    result = await sp.web

      .getFolderByServerRelativePath(documentLibraryName)

      .files.addChunked(
        fileNamePath,

        file,

        () => {
          console.log(`Upload progress: `);
        },

        true
      );
  }

  res.status(200).json({
    success: true,

    message: "Document Uploaded succesfullly",
  });
};



// get file by id
const getFilesInDirectory = async (req: Request, res: Response) => {
  let id: number = Number.parseInt(req.params.id);

  console.log("files listn");
  const documentLibraryName = `EmployeeLibrary/${id}`;

  try {
    const folder = await sp.web

      .getFolderByServerRelativePath(documentLibraryName)

      .files.get();


    console.log(documentLibraryName);

    const files = folder.map((file: any) => {
      return file;
    });

    res.status(200).json({
      success: true,

      message: "Retrieved files in directory",

      files,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,

      message: "Error retrieving files in directory",
    });
  }
};


export { getAllEmployees, getSingleEmployee, deleteEmployee, addEmployees ,Update,uploadImage,uploadDocument,getFilesInDirectory};