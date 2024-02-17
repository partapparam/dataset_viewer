import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import apiService from "../services/apiService"
import { useNavigate } from "react-router"

const DatasetForm = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      file: "",
    },
  })
  const navigate = useNavigate()
  const onSubmit = async (data, event) => {
    event.preventDefault()
    try {
      const dataForm = new FormData()
      dataForm.append("name", data.name)
      dataForm.append("file", uploadedFile)
      //   console.log(dataForm.get("file"))
      //   console.log(dataForm.get("name"))

      await apiService.postDataset(dataForm)
      return navigate("/")
    } catch (err) {
      console.log(err)
    } finally {
      reset()
    }
  }
  // Once file is submitted, update the state
  const handleChange = (event) => {
    setUploadedFile(event.target.files[0])
  }

  return (
    <div className="p-10">
      <p className="text-4xl py-5">Submit Dataset File</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 text-left">
          <label htmlFor="name">Filename</label>
          <input
            type="text"
            required
            className="rounded-md border-2"
            {...register("name")}
          />
          <label
            htmlFor="file"
            className="basis-1/2 p-1 cursor-pointer text-black border-2 border-indigo-900 hover:bg-gray-200 bg-white transition-all rounded-sm"
          >
            <input
              type="file"
              {...register("file")}
              required
              id="file"
              accept=".csv, .json"
              onChange={handleChange}
            />
            <span>Add</span>
          </label>
          <input
            type="submit"
            className="rounded-sm bg-emerald-400 text-white 
              hover:bg-emerald-500 basis-1/2 p-1 disabled:bg-emerald-300 cursor-pointer disabled:cursor-not-allowed	"
          />
        </div>
      </form>
    </div>
  )
}

export default DatasetForm
