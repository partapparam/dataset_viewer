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
  - No validation is done for duplicate files, this will be an issue in production mode
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
  # initialize Tailwind
  npx tailwindcss init -p
```

4. Create MongoDB Cluster and get URI for Node.js Driver. [Get started](<[url](https://www.mongodb.com/docs/drivers/node/v4.1/quick-start/)>)
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
  - [ ] `fileRouter` functions are long, they need to be separated into smaller functions
- [ ] Datasets Detail Page
  - [ ] Dataset rows are duplicated and added to the table
  - [ ] Add in charts and visualizations with D3
- [ ] Dataset Form Submission
  - [ ] Add functionality to upload JSON files.
  - [ ] Add validation checks
  - [ ] Loading Component to give user feedback and prevent double clicks
- [ ] Upload CSV/JSON files to an S3 bucket
- [ ] Add PropTypes for Client
- [ ] Add types for server functions
- [ ] Leverage a tool like Prefect to track new file uploads, pull content, and insert into DB (Mongo or Postgres)
