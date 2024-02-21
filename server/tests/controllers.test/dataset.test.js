const {
  _parseJSONFile,
  _getDataTypesForObject,
  _parseDataFromCSVBuffer,
} = require("../../controllers/dataset")

const testJson = [
  {
    name: "server",
    version: "1.0.0",
    description: "This is the description",
    number: 1,
  },
]

const testDatatypes = {
  name: "string",
  version: "string",
  description: "string",
  number: "number",
}

const csvString =
  "Name,Location,Phone\r\nParam,Seattle,12343534515\r\nNatlie,Philly,1252134454513\r\nKai,LA,15345263461"

const parsedCSV = [
  { Name: "Param", Location: "Seattle", Phone: "12343534515" },
  { Name: "Natlie", Location: "Philly", Phone: "1252134454513" },
  { Name: "Kai", Location: "LA", Phone: "15345263461" },
]

test("Parses JSON File Buffer into JSON", () => {
  const jsonString = JSON.stringify(testJson)
  const bufferString = Buffer.from(jsonString)
  expect(_parseJSONFile(bufferString)).toStrictEqual(testJson)
})

test("Returns datatypes for Object Values", async () => {
  const data = await _getDataTypesForObject(testJson[0])
  expect(data).toStrictEqual(testDatatypes)
})

test("Parses CSV String and returns Object with Key/Value pairs", async () => {
  const data = await _parseDataFromCSVBuffer(csvString)
  expect(data).toStrictEqual(parsedCSV)
})
