![build status](https://github.com/dpurrington/easypark/actions/workflows/firebase-hosting-merge.yml/badge.svg)

_Note: For security reasons, database access is currently disabled._

- [Production Application](https://easypark-5e3b6.web.app/)
- [Production CD jobs](https://github.com/dpurrington/easypark/actions/workflows/firebase-hosting-merge.yml)
- [Pull request jobs](https://github.com/dpurrington/easypark/actions/workflows/firebase-hosting-pull-request.yml)

# Approach

## Infrastructure as Code

_See also: [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code) and [continuous delivery](https://continuousdelivery.com/)_

This project uses [Firebase CLI](https://firebase.google.com/docs/cli) for CI/CD, which would enables repeatable and testable infrastructure. Much of the infrastructure configuration and choices for Firebase use configuration files in the project. This makes it easy to move infra changes through the PR process (code review, test deployments, etc).

The Firebase CLI has scaffolding to setup [Github Actions](https://github.com/features/actions) scripts, which makes PR and branch merch CI/CD really simple. It also takes care of setting up permission grants between Github and Google.

## Dev tools

Much of this comes from [create-react-app](https://create-react-app.dev/).

- Linter -- [eslint](https://eslint.org/), with the rules that come out of the box with CRA. A linter is really important with dynamic languages because it keeps things looking consistent, and it also helps coach people out of approaches that don't work well, or are not idiomatic.
- Typescript
- Packaging -- babel and webpack
- VSCode
- React Developer Tools browser extension
- Firefox Developer Tools
- Node Version Manager

# Design and Implementation

## Third party libraries

- [UUID](https://github.com/uuidjs/uuid) for session ids, so React can deal properly with updates.
- [Firebase SDK](https://firebase.google.com/docs/firestore/client/libraries) -- for interactions with the Realtime Database.
- [react-router](https://reactrouter.com/en/main) -- for routing within the SPA
- [Material UI](https://mui.com/) -- providing controls (especially the [DataGrid](https://mui.com/x/react-data-grid/))

## Code organization

Much of the layout is prescribed by `create-react-app`.

- Configuration -- _root_ directory
- Application code -- `src` directory
  - [`./src/`](./src) -- core React application code
  - [`src/routes`](./src/routes) -- route controllers
  - [`src/data`](./src/data) -- data store interactions and data object creation
  - [`src/components`](./src/components) -- React components
- Static files (e.g., `favicon.ico`) -- [`pub`](./pub) directory

## Various implementation choices

- Using the Snackbar component from MUI for the notices on write actions.
- Using the observer pattern with the SessionsList component to receive updates as they happen.
- Using the BottomNavigation component from MUI
- Using the DataGrid component from MUI for displaying the list of sessions, and enabling export.
- There's really only one domain object at this point (Sessions) and I put it into the data folder. At some point it may make sense to introduce a domain model separate from the data access code. At this point, it would be a lot of extra code (factories, repos, etc.) without value, I think.
- There are "open secrets" in the `firebase.js` file. They're really not secrets, but more configuration values. Moreover, anything ending up on the client side can be reverse engineered anyway. The protections need to come from elsewhere (Firebase security rules and authentication).
- There is a requirement that the dates be sensible, that the end date does not come before the start date. I also needed to make sure that any client clock skew didn't affect the data quality. And there is the requirement for "dont' make me think." There's really no reason for the user to be entering dates anyway. I use the `serverTimestamp` for both date values, which ensures their semantic correctness, their accuracy, and the usability need.

# CI/CD

The project is using Github Actions for CI/CD (scripts are in [`./.github/workflows`](./.github/workflows)

- Pull requests are validated and deployed to non-production environments. However, they still use the production datastore.
- Merges to the `main` branch are automatically deployed to [the production URL](https://easypark-5e3b6.web.app/).

# Things Left to Do

1. **Protection of the data store from malicious actors.** There is nothing to prevent a malicious actor from injecting invalid or malicious data into the data store. A backend REST write service, along with proper security rules, would address this vulnerability.
1. **Feature segmentation & access to sensitive data** Average users shouldn't be able to see everyone's sessions. This can be addressed through authentication (via Google) and authorization (through data security rules).
1. **Protection from race conditions** -- the write operations should use transactions to ensure data doesn't change out from under them.
1. **Test automation** To get our delivery speed to a good place, and to ensure quality remains high (DORA metrics), we need to automate as much of our testing as possible.
1. **Validation of data objects** -- It was suggested in the assignment that it might be good to validate the data objects. Validators such as [class-validator](https://github.com/typestack/class-validator) and [joi](https://joi.dev/) allow you to validate json input, and are most useful when protecting the application from data introduced externally, where we do not control the input. The cost of these validators is that you need to write schema files (or use class attributes, but that means you have to have classes) to describe the data rules. In our application here, all the data objects are created by our code, and so we can ensure they are always correct through our test automation.
1. **UI Polish** -- The UI is functional but needs polish through styling. I'm sure I've done some things that are better done via CSS.
1. **Indexes** -- The datastore will likely need indexes for queries. We should load test the application to see how it behaves when there is a significant amount of data in the `sessions` collection.
