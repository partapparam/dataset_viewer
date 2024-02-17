import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import DatasetDetail from "./components/datasetDetails"
import DatasetForm from "./components/datasetForm"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset/:id/:name" element={<DatasetDetail />} />
        <Route path="/add/dataset" element={<DatasetForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
