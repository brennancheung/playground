# Purpose

This repo is meant as a playground for developing new components, ideas, and various utilities.

It's not meant to be a product, just a dumping ground for misc useful code.

# Steps for creating a new Firebase React repo

1.  `npx create-reate-app <projectName>`
2.  `eslint --init` (StandardJS code standard, yes to installing packages)
3.  Delete the `package-lock.json` (`eslint` will only use `npm` instead of `yarn`) and run `yarn` again.
3.  Copy over and tweak `.eslintrc` from previous project.
4.  `eslint --fix src` to automatically clean up the React scaffolded code as much as possible.  (`eslint` should be installed globally as well)
5.  Manually clean up rest of lint errors.  You can check with `eslint src`.
6.  Create the project Firebase (enable Hosting, Firestore, and Google Auth).
7.  Install the `firebase-tools` `npm` package globally.
8.  `firebase login` (only needed if you haven't logged in previously from another project)
9.  `firebase init` to associate the repo with the firebase project (use `build` instead of `public`, yes to SPA rewrite).
10. Copy over the Firebase settings from the console into `firebaseConfig.js` (might need to fix the linting)
11. Install the following npm packages: `@material-ui/core @material-ui/icons firebase` and as dev dependencies `babel-plugin-transform-imports react-app-rewired customize-cra`.
12. Optimize `@material-ui` imports by copying over `.babelrc.js` from a previous project.  See Material-UI guide on minimizing bundle size if you are curious.
13. Change `react-scripts start` to `react-app-rewired start` in `package.json`
14. `find node_modules/* | wc -l`.  Gasp.  Shock.  Horror.  Move on with business as usual.
15. Copy over the standard set of `hooks` and `common` components from another repo (might want to make this a package in the future).
16. You are now ready to start adding actual functionality.

# To deploy

1.  `yarn build`
2.  `firebase deploy`

