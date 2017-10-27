# STARTER REACT

## Requirements

* node `^5.0.0` or greater
* yarn `^0.23.0` or npm `^3.0.0`

## Install dependencies

Install all dependencies listed in `package.json`

```
npm install
```

or 

```
yarn
```

## Build for development and start local server

To build the project in development configuration and start a local server

```
npm start
```

or 

```
yarn start
```

## Build for Staging

To build the project for Staging with minification, uglyfication, imagemin, ...

```
npm run build:staging
```

or

```
yarn build:staging
```

## Build for Production

To build the project for Production with minification, uglyfication, imagemin, ...

```
npm run build
```

or

```
yarn build
```

## Deploy build files for Staging on *ghpages* branch

To build the project for Staging and deploy it on the `ghpages` branch

```
npm run deploy:staging
```

or

```
yarn deploy:staging
```

## Deploy build files for Production on *ghpages* branch

To build the project for Production and deploy it on the `ghpages` branch

```
npm run deploy
```

or

```
yarn deploy
```


## Live Development

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`npm start` or `yarn start`). This feature is implemented with webpack's [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) capabilities, where code updates can be injected to the application while it's running, no full reload required. Here's how it works:

* For **JavaScript** modules, a code change will trigger the application to re-render from the top of the tree. **Global state is preserved (i.e. redux), but any local component state is reset**. This differs from React Hot Loader, but we've found that performing a full re-render helps avoid subtle bugs caused by RHL patching.

* For **Sass**, any change will update the styles in realtime, no additional configuration or reload needed.

### Redux DevTools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

## Routing
We use `react-router` [route definitions](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application.
