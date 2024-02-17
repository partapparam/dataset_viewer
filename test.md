SOW- Data Dashboard
Objective:

Develop a simple data dashboard platform where users can upload, visualize, and analyze datasets. This exercise aims to evaluate your skills in creating a full-stack application with React and Node.js, emphasizing data handling and visualization.

Requirements:

Front-end (React):

- Dashboard Page: Display an overview of uploaded datasets. Include summary statistics (e.g., total number of datasets, average size of datasets) and a list of datasets with their names and upload dates.
- Upload Dataset Form: Implement a form to upload new datasets. The form should allow users to upload files (CSV, JSON) and enter a dataset name.
- Dataset Detail Page: Create a detail page for each dataset, accessible by clicking on a dataset in the list. This page should display basic information about the dataset (name, size, upload date) and include data visualization components (e.g., charts, tables) to represent the dataset contents.
- Data Visualization Components: Integrate data visualization libraries (e.g., Chart.js, D3.js) to create dynamic charts and graphs based on the dataset's content.

Back-end (Node.js):

REST API: Develop a RESTful API to handle dataset operations. The API should support the following endpoints:

- GET /datasets: Fetch a list of all datasets.
- POST /datasets: Upload a new dataset.
- GET /datasets/:id: Fetch details and contents of a specific dataset.
- Data Storage: Use a database (e.g., MongoDB, PostgreSQL) to store dataset metadata (name, size, upload date) and the datasets themselves (consider using GridFS for MongoDB if handling large files).
- File Processing: Implement functionality to parse uploaded files (CSV, JSON) and store their contents in a structured format in the database.
- Error Handling: Implement basic error handling for the API, returning appropriate responses for invalid requests or failed operations.
  Evaluation Criteria:

#### Functionality: The application should meet all the outlined requirements, with a focus on data upload, storage, and visualization functionalities.

- Code Quality: Code should be clean, well-organized, and properly commented.
- Data Handling: Demonstrates efficient and effective handling of data uploads, storage, and processing.
- Visualization: Effective use of data visualization components to represent dataset contents in a user-friendly manner.
- Scalability: Consideration for how the application's data handling and visualization features could be scaled or extended.
  Submission Guidelines:

- Provide a GitHub repository link containing the complete project code.
- Include a README file with instructions on how to set up and run the application, including any necessary database setup.
- Document any assumptions made during development and any libraries or frameworks used for data visualization.
