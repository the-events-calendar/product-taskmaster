# Product Taskmaster

This is a collection of The Events Calendar product Gulp tasks

## Installing in a plugin

This repository is meant to be installed via `npm install`. To enable
that in a repository, simply run the following command:

```
npm install --save-dev @the-events-calendar/product-taskmaster@^1.2.1
```

or add the following to the `package.json` in the `devDependencies` section:

```
"product-taskmaster": "@the-events-calendar/product-taskmaster@^1.2.1",
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

#### postcss

This task uses PostCSS to build the `.pcss` files into CSS files.

```
gulp postcss
```

The command also takes a `--preserve` flag to set whether to preserve custom
properties or not. By default, they are preserved. To remove custom properties,
do the following:

```
gulp postcss --preserve false
```

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

#### stylelint

This task runs stylelint on the `pcss` files using our stylelint configuration. In the root directory,
add in the `.stylelintrc` file:

```
{
    "extends": "@the-events-calendar/product-taskmaster/config/stylelint"
}
```

To run stylelint, you'll need to provide a `--filePath` flag to tell gulp where to look.
An example might look like:

```
gulp stylelint --filePath 'src/resources/postcss/**/*.pcss'
```

You can also provide multiple file paths by doing the following:

```
gulp stylelint --filePath 'src/resources/postcss/base/**/*.pcss' --filePath 'src/resources/postcss/components/**/*.pcss'
```

#### eslint

This task runs ESLint on the JavaScript files using our ESLint configurations.
First, install ESLint as a devDependency in the working repository.

```
npm install --save-dev eslint
```

Next, add an 
`.eslintrc` file in the working repository and extend one of the configurations.
A relative path from the `.eslintrc` file is required as Product Taskmaster is not
a standard ESLint configuration package:

```
{
    "extends": "./node_modules/@the-events-calendar/product-taskmaster/config/eslint.es6.js"
}
```

To run ESLint, you'll need to provide a `--filePath` flag to tell gulp where to look.
An example might look like:

```
gulp eslint --filePath 'src/resources/js/views/**/*.js'
```

You can also provide multiple file paths by doing the following:

```
gulp eslint --filePath 'src/resources/js/views/**/*.js' --filePath 'src/modules/**/*.js'
```

If you are extending the `eslint.es6.js` or `eslint.react.js` configuration,
you must have a `.babelrc` file defined in the working repository, as ESLint uses
the `.babelrc` file to parse the code.
