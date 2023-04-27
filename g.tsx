let isError = false;

if (Name.trim() === "") {
  setNameError("Name is required");
  isError = true;
}

if (email.trim() === "") {
  setEmailError("Email is required");
  isError = true;

} else if (!/\S+@\S+\.\S+/.test(email)) {
  setEmailError("Email is invalid");
  isError = true;
}

if (gender.trim() === "") {
  setGenderError("Gender is required");
  isError = true;
}

if (designation.trim() === "") {
  setDesignationError("Designation is required");
  isError = true;
}

if (!DOB) {
  setDOBError("Please enter a valid date of birth.");
  return;
}

if (!country) {
  setCountryError(country ? "" : "Please select a country.");
}

if (!place) {
  setPlaceError(place ? "" : "enter a place.");
}

if (!address) {
  setAddressError(address ? "" : "enter address .");
}

if (!education) {
  setEducationError(education ? "" : "please select a education.");
}