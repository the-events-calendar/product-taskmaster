# Product Taskmaster

This is a collection of The Events Calendar product Gulp tasks

## Installing in a plugin

This repository is meant to be installed via `yarn`. To enable
that in a repository, simply run the following command:

```
yarn add --save-dev @the-events-calendar/product-taskmaster@^2.0.0
```

or add the following to the `package.json` in the `devDependencies` section:

```
"product-taskmaster": "@the-events-calendar/product-taskmaster@^2.0.0",
```

### GlotPress

In order to leverage the GlotPress task, the following example info from the-events-calendar
should be added into the `package.json` as well:

```
"_domainPath": "lang",
"_textDomain": "the-events-calendar",
"_glotPressUrl": "https://translate.wordpress.org",
"_glotPressSlug": "wp-plugins/the-events-calendar/stable",
"_glotPressFileFormat": "%textdomain%-%wp_locale%.%format%",
"_glotPressFormats": [
	"po",
	"mo"
],
"_glotPressFilter": {
	"translation_sets": false,
	"minimum_percentage": 30,
	"waiting_strings": false
},
```

## Gulp tasks

### Main tasks

These are the big tasks that you'll most likely be running.

#### default

The `default` task is what you get when you run `gulp`. It compresses
the JS and CSS files using the `compress-css` and `compress-js` tasks.

```
gulp
```

#### package

This task is used to package our plugins and relies on the
`package-whitelist.json` file containing data and GlotPress properties
within `package.json`.

```
gulp package --branch <branch-you-want-to-package>
```

#### watch

This task watches for changes in CSS and JS files, compresses those
files, and then communicates the files to livereload.

```
gulp watch
```

### Minor tasks

These tasks are run from within the main tasks, but they _can_ be run on
their own!

#### compress-css

This task uses `gulp-cssnano` to compress CSS files and name the files
with a `.min.css` extension.

```
gulp compress-css
```

#### compress-js

This task uses `gulp-uglify` to compress JS files and name the files
with a `.min.js` extension.

```
gulp compress-js
```

#### glotpress

This task pulls language files from the provided GlotPress URLs in `package.json` and places them in
the `lang/` directory.

```
gulp glotpress
```

#### pull

This task pulls and submodule updates the repo using the branch provided by `--branch`.

```
gulp pull --branch <branch-you-want-to-pull>
```

#### zip

This task packages the files indicated by `package-safelist.json` into
a zip file that it places one directory above the plugin's base
directory.

**Note:**  `package-whitelist.json` has been deprecated if you have one please rename it to `package-safelist.json`.


```
gulp zip
```
