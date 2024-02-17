import React from "react"
import apiService from "../services/apiService"
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"

/**
 *
 * Dataset Detail Page
 * TODO: add more visuals
 * Issues: Current data table is full of duplicates
 */
const DatasetDetail = () => {
  const [dataset, setDataset] = useState()
  const [headers, setHeaders] = useState([])
  // Get ID, NAME from react router params
  const { id, name } = useParams()
  const ref = useRef()

  const getData = async () => {
    try {
      const results = await apiService.getDatasetByName(name)
      // d3.autotype: given an object, infers the types of values on the object and coerces them accordingly
      const parsedData = d3.csvParse(results.data, d3.autoType)
      setHeaders(parsedData.columns)
      const data = []
      for (const key in parsedData) {
        if (Array.isArray(parsedData[key]) === false) {
          data.push(parsedData[key])
        }
      }
      setDataset(data)
    } catch (err) {
      console.log("there was an err", err)
    }
  }

  // create table from D3 data
  // ref.current will give use access to DOM component
  const table = d3
    .select(ref.current)
    .append("table")
    .attr("class", "data-table")
  // Append headers from CSV string received from API
  const header = table.append("thead").append("tr")
  header
    .selectAll("th")
    .data(headers)
    .enter()
    .append("th")
    .text((d) => d)
  // Append the rows from our CSV string.
  const body = table.append("tbody")
  body
    .selectAll("tr")
    .data(dataset)
    .enter()
    .append("tr")
    .selectAll("td")
    .data((d) => {
      return Object.values(d)
    })
    .enter()
    .append("td")
    .text((d) => d)

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div>
        <p className="text-5xl">
          {id}: {name} Detail Page
        </p>
        <div className="p-10" ref={ref} />
      </div>
    </>
  )
}

export default DatasetDetail
