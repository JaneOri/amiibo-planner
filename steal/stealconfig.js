steal.config({
  paths: {
    // look in the root project folder for any import paths to js modules
    "*": "/*.js",

    // identify modules the app uses and their remote paths
    "jquery": "https://code.jquery.com/jquery-3.3.1.min.js",
    "lodash": "https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js",

    // specify that these custom steal plugin modules are found here in the steal folder instead of root:
    "txt": "./txt.js",
    "md": "./md.js",
    // ..and their dependencies are specified:
    "marked": "https://cdn.jsdelivr.net/npm/marked@0.3.17/lib/marked.min.js",

    // identify remote steal plugin modules:
    "steal-less": "https://cdn.jsdelivr.net/npm/steal-less@1.2.2/less.min.js",
    // ..and their dependencies are specified:
    "$css": "https://cdn.jsdelivr.net/npm/steal-css@1.3.2/css.min.js",
    "less/dist/less": "https://cdn.jsdelivr.net/npm/less@2.5.3/dist/less.min.js",
    "less-engine": "https://cdn.jsdelivr.net/npm/steal-less@1.2.2/less-engine.js"
  },
  // define module as already loaded in the page
  // useful in cases when normal import doesn't work (easily) but the script tag does
  instantiated: {
    "can": { 'default': window.can, __useDefault: true }
  }
})
