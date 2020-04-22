export default {
  s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME",
  },
  apiGateway: {
    REGION: process.env.REACT_APP_AWS_APP_COGNITO_REGION,
    URL: process.env.REACT_APP_AWS_APP_SERVICE_ENDPOINT,
  },
  cognito: {
    REGION: process.env.REACT_APP_AWS_APP_COGNITO_REGION,
    USER_POOL_ID: process.env.REACT_APP_AWS_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_AWS_APP_COGNITO_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_AWS_APP_COGNITO_IDENTITY_POOL_ID,
  },
  googleAnalytics: {
    trackingId: process.env.REACT_APP_AWS_APP_GOOGLE_TRACKING_ID,
  },
  logRocket: {
    appId: process.env.REACT_APP_LOGROCKET_ID,
  },
}
