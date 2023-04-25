const folderName = `${id}`;

const documentLibraryName = `EmployeLibrary`;

const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);

const folder = await documentLibrary.rootFolder.folders.getByName(

    folderName

);

await folder.delete();
