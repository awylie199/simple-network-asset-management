# Simple Asset Management System

The simple asset management app allows users to view and create assets.

Assets are expected to have a name, description, latitude and longitude.

**To run the app you must create a '.env' file from '.env.example'.**

## Technology

### Frontend

The app is built on the frontend with [React](https://reactjs.org/) and [Redux](https://redux.js.org/introduction) state management.

Although React (and particularly Redux) are unnecessary for such a simple app,
it should allow the app to grow. It also aligns with the other technology used
in the company, and interns should be familiar with it. Alternatively, the new
React context API could be used.

Styling is done with [Styled Components](https://www.styled-components.com/) and with support for SCSS files.

The basic styling of the site is done with [Spectre.css](https://picturepan2.github.io/spectre/).

The frontend is compiled using webpack to support React and modern JS syntax.

```shell
yarn start # To build the app, and start the node server
yarn start:watch # To build the app and watch for changes
yarn build # To build the app only
```

### Backend

The backend is Node, running an Express server. All assets are written to a JSON file.

Node is a great fit for React. It allows interns to use the same programming language
(Javascript), and will support more advanced React features, such as Server Side Rendering (SSR).

It also limits the dependencies required on the server.

```shell
yarn start # To build the app, and start the node server
yarn start:server # To start the node server only
```

### Testing and Linting

Unit testing is BDD, done with the Mocha test runner, Chai assertions, Sinon mocking,
Enzyme and Instanbul test coverage reports.

Test files are placed in the same folder as the file to be tested, and the file
must end with the extension '*.spec.js'.

Code quality is linted by Eslint and Stylelint.

```shell
yarn test # For a one time test run and test report
yarn test:watch # To continually run tests

yarn lint # To lint all js files
yarn lint:fix # To lint and attempt to fix all js files
```

## Folder Structure

All client side files are kept in the 'client' folder.

All server side files are kept in the 'server' folder. Public assets are served
from the 'server/public' and 'dist' folders. The 'dist' folder is temporary and
emptied when the app is built.

A .env file is required to set the NODE_ENV and PORT environment variables.

### Client Folder Structure

Connected container components are located within the 'client/container' folder.

All unconnected components are located within the 'client/component' folder.

Ideally the decoupling of components in this fashion separates concerns and
allows greater reuse of components, and unconnected components are easier to test.

Redux reducers are within the 'client/reducer' folder.

Reducer constants are within the 'client/constant' folder.

Redux middleware is within the 'client/middleware' folder.

## Software Design Principles

The app uses a High Order Component (HOC) approach based on the [container
design pattern](https://reactpatterns.com/#container-component).

## Suggested Improvements

Numerous improvements are available, even for such a small app, such as:

- Authorization on the API (e.g. NONCEs or a Cookie, served on the initial page render)
- Map display for assets (based on location)
- HTTPS
- Extract styles into stylesheet using [mini css webpack plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- Better logging on client and server side
- Hot Module Reloading (for improved development speed)
- Server Side Rendering (for quicker first bite)
- Windows Support (e.g. 'crossenv') so package.json scripts are cross platform
- Error handling for fetching assets
- Optimistic UI (so that changes are made instantly, and reversed if there's an error)
- Locking of assets JSON file to prevent overwrites, or using a database
- Better sanitisation and validation of data input (e.g. check JSON, lat and lng)
- Improved interface for selecting latitude and longitude (e.g. use reverse geocoding API)
- Breakup server file to smaller components
