<!-- ABOUT THE PROJECT -->

## About The Project

A WebApp to allow users to store and view their CSV datasets.

### Built With

##### Client

- React
- react-router
- react-hook-form
- D3
- TailwindCSS

##### Server

- Node/Express
- Multer
- MongoDB
- [Fast-CSV](<[url](https://c2fo.github.io/fast-csv/)>)
- Cors

### Assumptions

- I was confused as to why we would store the CSV file and the contents in a database
  - The file is stored in GridFS and a collection was created for each file submitted
- No validation is done for duplicate file uploads from the user, I assume they will only submit a file once.

- Column Headers
  - CSV Parser is set up to remove any columns that do not have a Header
- I built this to handle any CSV file upload
  - This made implementing D3 more complicated.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/partapparam/dataset_viewer
   ```
2. Install Server NPM packages
   ```sh
   cd server
   npm install
   ```
3. Install Client NPM packages

```sh
  cd client
  npm install
```

4. Create MongoDB Cluster and get URI for Node.js Driver. [Getting started with MongoDB](https://www.mongodb.com/docs/drivers/node/v4.1/quick-start/)

5. Copy `server/example.env` structure into `server/env`file

```
  PORT=5000
  URI=
  DBNAME=
  BUCKET=
```

6. `cd client` and Run `npm run dev`
7. In another tab, `cd server` and run `npm run dev`

<!-- ROADMAP -->

## Roadmap

#### What I would work on if I had more time

- [ ] Add Tests for server and client
- [ ] Code cleansing
  - [x] `fileRouter` functions are long, they need to be separated into smaller functions
  - [ ] Detail Page table view should be a separate component
- [x] Saving the content of the file is causing an error due to the CSV stream not returning rows.
- [ ] Datasets Detail Page
  - [ ] Dataset rows are duplicated and added to the table
    - [ ] State Management libraries such as Redux should eliminate this
  - [ ] Add in charts and visualizations with D3
- [ ] Dataset Form Submission
  - [x] Add functionality to upload JSON files.
  - [ ] Add validation checks
  - [ ] Loading Component to give user feedback and prevent double clicks
- [ ] Upload CSV/JSON files to an S3 bucket
- [ ] Add PropTypes for Client
- [ ] Add types for server functions
- [ ] Leverage a tool like Prefect to track new file uploads, pull content, and insert into DB (Mongo or Postgres)
