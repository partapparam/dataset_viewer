// Routes
import axios from "axios"

// define Axios Instance with the base URL for API
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
})

// fetch All Datasets
const getAllDatasets = async () => {
  return axiosInstance.get("/datasets")
}

// Get Dataset by Name
const getDatasetByName = async (name) => {
  return axiosInstance.get("/datasets/id", {
    params: { filename: name },
  })
}

// upload file and filename to API
const postDataset = async (formData) => {
  console.log(formData.entries())
  return axiosInstance.post("/dataset", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export default { getAllDatasets, getDatasetByName, postDataset }
