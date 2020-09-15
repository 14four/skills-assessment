# Skills Assesment

This project uses NVM, Node 12.16.1 and Gulp. It uses SCSS, HTML and JS. It uses Browser Sync to serve the project locally.

## Installation

After cloning the repo run the following commands to setup the project.

```
nvm install # Only needed if you don't already have 12.16.1
nvm use
npm i
```

## Running the Project

There are three commands setup in the package.json. To review the project you will want `npm run start` described in the [Serve](#Serve) section.

### Development

Run `npm run dev` to start the dev environment. This will build and watch the SCSS and JS and copy the HTML file into the `./build` directory.

### Build

Run `npm run build` to compile the SCSS, JS and copy the HTML into the build directory. You can open the html file there or you can run the next command to start a local server for it.

### Serve

Run `npm start` to compile the SCSS JS and copy the HTML into the build directory. This will automatically start a dev server and should open it up in the browser. The dev server uses `0.0.0.0` which can be access locally through `localhost` and the automatically selected port (i.e. `localhost:3000`). It can also be accessed through the IP of your current machine and the port from any other machine in your local network (i.e. `192.168.86.111:3000`).
