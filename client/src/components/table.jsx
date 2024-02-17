import React from "react"
import { Link } from "react-router-dom"

/**
 * table Component for Homepage
 * @param datasets: Array
 * Map through all rows in the datasets array
 *
 */
const Table = ({ datasets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Filename</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Size</th>
            <th className="px-6 py-3">Date Uploaded </th>
          </tr>
        </thead>
        <tbody>
          {datasets &&
            datasets.map((row) => (
              <tr className="border" key={row._id}>
                <th className="px-6 py-4 underline text-blue-600">
                  <Link to={`/dataset/${row._id}/${row.filename}`}>
                    {row._id}
                  </Link>
                </th>
                <td className="px-6 py-4">{row.filename}</td>
                <td className="px-6 py-4">{row.metadata.mimetype}</td>
                {/* calculate size of file */}
                <td className="px-6 py-4">{row.length / (1024 * 1024)} mb</td>

                <td className="px-6 py-4">
                  {/* convert date for easier reading */}
                  {new Date(row.uploadDate).toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
