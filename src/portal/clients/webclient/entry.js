"use strict"
window.APP_CONFIG    = require("./config.js");
var Renderer = require("./ui/renderer.js");
var IndexPage  = require("./ui/IndexPage.js");
var renderer = new Renderer(document.createElement("div"));
renderer.render(new IndexPage());