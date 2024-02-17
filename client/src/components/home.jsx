import React, { useEffect, useState } from "react"
import apiService from "../services/apiService"
import Table from "./table"
import { Link } from "react-router-dom"

const Home = () => {
  const [datasets, setDatasets] = useState([])

  /**
   * Fetch AllDatasets from API
   */
  const getData = async () => {
    try {
      const results = await apiService.getAllDatasets()
      setDatasets(results.data.data)
    } catch (err) {
      console.log("there was an err", err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="bg-slate-100 p-10">
      <div className="flex justify-between">
        <p>Uploaded Datasets - Count: {datasets.length}</p>
        <button className="bg-blue-400 text-white px-4 py-2">
          <Link to="/add/dataset">Add Dataset</Link>
        </button>
      </div>
      <div>{datasets && <Table datasets={datasets} />}</div>
    </div>
  )
}

export default Home
