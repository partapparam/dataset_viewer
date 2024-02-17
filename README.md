<!-- ABOUT THE PROJECT -->

## About The Project

A WebApp to allow users to store and view their CSV datasets.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

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
- [Fast-CSV]([url](https://c2fo.github.io/fast-csv/))
- Cors


<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._


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

4. Copy `server/example.env` structure into `server/env`file
   ```
    PORT=5000
    URI=
    DBNAME=
   ```
5. `cd client` and Run `npm run dev`
6. In another tab, `cd server` and run `npm run dev`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap 
#### What I would work on if I had more time

- [ ] Add Tests for server and client
- [ ] Datasets Detail Page - it has duplicate data
- [ ] 
- [ ] 
- [ ] 
  - [ ] 
  - [ ] 

<p align="right">(<a href="#readme-top">back to top</a>)</p>
