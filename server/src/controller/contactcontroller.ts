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

//function for addemployee= not done
const addEmployees = async (req: Request, res: Response) => {
  try {
    console.log("start.");
    console.log(req.body, "req body log");
    const newUser = {
      Id: req.body.Id,
      Name: req.body.first_name,
      email: req.body.email,
      //gender: req.body.gender,
      designation: req.body.designation,
      //department: req.body.department,
      //city: req.body.city,
      //dob: req.body.dob,
    };

    console.log("new user log", newUser);
    const response = await sp.web.lists.getByTitle("users").items.add({
      Name: newUser.Name,
      email: newUser.email,
      // gender: newUser.gender,
      designation: newUser.designation,
    }); //console.log(response)

    console.log(response.data.Id);
    console.log("logging response", response);
    const folderId = response.data.Id;
    const newFolderName = `${folderId}`;
    const documentLibraryName = `EmployeLibrary`;
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders
      .addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder ${newFolderName} created successfully.`);
      });
    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllEmployees, getSingleEmployee, deleteEmployee, addEmployees };
