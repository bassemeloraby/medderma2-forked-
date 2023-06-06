import axios from "axios";

const API_URL = "https://sore-lime-goat-tam.cyclic.app/api/companies";

const getCompanies = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const companiesService = {
  getCompanies
};

export default companiesService;
