/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // config.baseUrl = "http://local-app.rudijs.com";
  config.baseUrl = "http://localhost:3000"

  if (process.env.STAGE === "dev") {
    config.baseUrl = "https://dev-app.rudijs.com"
  }

  if (process.env.STAGE === "prod") {
    config.baseUrl = "https://app.rudijs.com"
  }

  config.viewportHeight = 900
  config.viewportWidth = 400

  if (process.env.BREAKPOINT === "desktop") {
    config.viewportHeight = 720
    config.viewportWidth = 1280
  }

  return config
}
