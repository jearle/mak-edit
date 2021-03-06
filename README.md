# Mak Edit

A simple embeddable widget for writing markdown documents
with a live preview for the ouput html.

## Installation

Clone the repo

```bash
git clone git@github.com:jearle/mak-edit.git
```

Install the bower depencies

```bash
bower install
```

Install the node depenencies

```bash
npm install
```

Build the application

```bash
grunt browserify
```

Fire up the server

```bash
grunt devserver
```

Now navigation to `http://localhost:8888` in your browser
and you should see the application.

## Development

All you need to do is run grunt in order for the `app/` directory
to be monitored for changes.  When a file changes, the application
will be automatically built with Browserify.

```bash
grunt
```
