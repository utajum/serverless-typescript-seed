import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import "mobx-react-lite/batchingForReactDom"

import { createMuiTheme } from "@material-ui/core/styles"
import { blueGrey } from "@material-ui/core/colors"
import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"

// import Amplify, {Auth, Logger} from 'aws-amplify'
import Amplify, { Auth } from "aws-amplify"
import config from "./config"
import { appState } from "./models/state"

import LogRocket from "logrocket"
if (config.logRocket.appId) {
  LogRocket.init(config.logRocket.appId)
}

if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  Amplify.Logger.LOG_LEVEL = "DEBUG"
}

// const logger = new Logger('foo', 'VERBOSE')

// logger.info('info bar')
// logger.debug('debug bar')
// logger.warn('warn bar')
// logger.error('error bar')

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "notes",
        region: config.apiGateway.REGION,
        endpoint: config.apiGateway.URL,
        // endpoint: "https://yc609d159e.execute-api.ap-southeast-1.amazonaws.com/dev",
        // region: "ap-southeast-1"
      },
    ],
  },
})

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    type: "light",
  },
})

// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// )

// We want an async function to run before any routes or rendering.
// The async action is an AWS Amplify session lookup.
// We want to complete this lookup before any routes load as the private routes will check for an amplify session.
// Wrapping the ReactDOM.render() in this async function is the only way I found so far to achieve this.
// If we don't do this here, on a page refresh a signed in user will be redirected to sign in if they reload on a private route.
// This is because the routes load before the async session lookup finishes.
async function onLoad() {
  try {
    const currentSession = await Auth.currentSession()
    const groups = currentSession.getIdToken().payload["cognito:groups"]
    if (groups) {
      appState.setGroup(groups[0])
    }
  } catch (e) {
    // user has no current session
    // if (e !== 'No current user') {
    // alert(e)
    // }
  }

  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
}

onLoad()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
