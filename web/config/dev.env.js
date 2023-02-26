'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "'development'",
  BASE_API: "'http://localhost:8502/'",
  WS_URL: "'ws://localhost:8502/ws'",
  isDev: true
})
