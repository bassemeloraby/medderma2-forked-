import axios from "axios";

const API_URL = "https://sore-lime-goat-tam.cyclic.app/api/companies";

// get all companies
const getCompanies = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};
// add one company
const addCompany = async (companyName) => {
  const response = await axios.post(API_URL, companyName);

  return response.data;
};

//Delete Company
const deleteCompanies = async (_id) => {
  const response = await axios.delete(API_URL + "/" + _id);

  return response.data;
};

const updateCompanies = async ({ id, companyName }) => {
  const response = await axios.patch(API_URL + "/" + id, { companyName });
  return response.data;
};

const companiesService = {
  getCompanies,
  addCompany,
  deleteCompanies,
  updateCompanies,
};

export default companiesService;
