![build status](https://github.com/dpurrington/easypark/actions/workflows/firebase-hosting-merge.yml/badge.svg)

- [Production Application](https://easypark-5e3b6.web.app/)
- [Production CD jobs](https://github.com/dpurrington/easypark/actions/workflows/firebase-hosting-merge.yml)
- [Pull request jobs](https://github.com/dpurrington/easypark/actions/workflows/firebase-hosting-pull-request.yml)

# Approach

## Infrastructure as Code

_See also: [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code) and [continuous delivery](https://continuousdelivery.com/)_

As I looked at and learned about [Firebase](https://firebase.google.com/), it did not take me long to find the [Firebase CLI](https://firebase.google.com/docs/cli). I intended to use the CLI and CI/CD, which would allow me to create repeatable and testable infrastructure. Much of the infrastructure configuration and choices for Firebase use configuration files in the project. This makes it easy to move infra changes through the PR process (code review, test deployments, etc).

The Firebase CLI has scaffolding to setup [Github Actions](https://github.com/features/actions) scripts, which makes PR and branch merch CI/CD really simple. It also takes care of setting up permission grants between Github and Google.

## React Bootstrapping

My most recent experience with React used [Next.js](https://nextjs.org/). I was not sure how this would play with GCP, considering I only wanted SPA and was probably not going to tackle server-side functions in this amount of time. I made several attempts to use the Firebase CLI with a Next.js app. Unfortunately, [support in the CLI is experimental](https://firebase.google.com/docs/hosting/frameworks/nextjs) and I was not able to get it working.

I settled on [create-react-app](https://create-react-app.dev/), which I've used in the past and I felt was stripped down enough to work well for a single page app. There was good documentation for this with the Firebase CLI, and it ended up working well.

## Dev tools

Much of this comes from [create-react-app](https://create-react-app.dev/), which is part of why I wanted to use it to begin with.

- Linter -- [eslint](https://eslint.org/), with the rules that come out of the box with CRA. A linter is really important with dynamic languages because it keeps things looking consistent, and it also helps coach people out of approaches that don't work well, or are not idiomatic.
- Typescript -- this was a requirement.
- Packaging -- babel and webpack
- VSCode
  - ESLint extension
  - ESLint with autofix on save
  - Vim
- React Developer Tools browser extension
- Firefox Developer Tools
- Node Version Manager

# Design and Implementation

## Third party libraries

- [UUID](https://github.com/uuidjs/uuid) for session ids. I needed a solution for unique ids for sessions in order for React/Material UI to deal properly with updates. There is probably a way to leverage Firebase for this purpose (incorporating the key for the session), and would likely remove this in the future.
- [Firebase SDK](https://firebase.google.com/docs/firestore/client/libraries) -- for interactions with Firebase.
- [react-router](https://reactrouter.com/en/main) -- for routing within the SPA
- [Material UI](https://mui.com/) -- most UI components come from here
  - DataGrid
  - Button
  - Input
  - Snackbar
  - BottomNavigation

## Code organization

_Much of the layout is prescribed by `create-react-app`._

- Configuration -- _root_ directory
- Application code
  - [`./src/`](./src) -- core React application code
  - [`./src/routes`](./src/routes) -- route controllers
  - [`./src/data`](./src/data) -- data store interactions and data object creation
  - [`./src/components`](./src/components) -- React components
- Static files (e.g., `favicon.ico`) -- [`./public`](./public) directory

## Various implementation choices

- Using the Snackbar component from MUI for the notices on write actions.
- Using the observer pattern with the SessionsList component to receive updates as they happen.
- Using the BottomNavigation component from MUI
- Using the DataGrid component from MUI for displaying the list of sessions, and enabling export.
- There's really only one domain object at this point (Sessions) and I put it into the data folder. At some point it may make sense to introduce [a domain model](https://martinfowler.com/bliki/DomainDrivenDesign.html) separate from the data access code. At this point, it would be a lot of extra code (factories, repos, etc.) without value, I think.
- There are "open secrets" in the `firebase.js` file. They're really not secrets, but more configuration values. Moreover, anything ending up on the client side can be reverse engineered anyway. Tjhe protections need to come from elsewhere (Firebase security rules and authentication).
- There is a requirement that the dates be sensible, that the end date does not come before the start date. I also needed to make sure that any client (browser) clock skew didn't affect the data quality. And there is the requirement for "don't make me think." There's really no reason for the user to be entering dates in the first place. During write operations, I use the [`serverTimestamp`](https://firebase.google.com/docs/reference/kotlin/com/google/firebase/firestore/ServerTimestamp) for both date values, which causes Firebase itself to create the values. Doing so ensures their semantic correctness, their accuracy, and the usability need.

# CI/CD

The project is using Github Actions for CI/CD (scripts are in [`./.github/workflows`](./.github/workflows)

- Pull requests are validated and deployed to non-production environments. Note, however, they still use the production datastore. In the future, I would like to vary the database used by the environment (dev/test/prod)
- Merges to the `main` branch are automatically deployed to [the production URL](https://easypark-5e3b6.web.app/).

# Things Left to Do

## Product

1. **UI Polish** -- The UI is functional but needs polish through styling. I'm sure I've done some things that are better done via CSS.
1. **Indexes** -- The datastore will likely need indexes for queries. We should load test the application to see how it behaves when there is a significant amount of data in the `sessions` collection.
1. **Protection of the data store from malicious actors.** There is nothing to prevent a malicious actor from injecting invalid or malicious data into the data store. A backend REST write service, along with proper security rules, would address this vulnerability.
1. **Feature segmentation & access to sensitive data** Average users shouldn't be able to see everyone's sessions. This can be addressed through authentication (via Google) and authorization (through data security rules).
1. **Protection from race conditions** -- the write operations should use transactions to ensure data doesn't change out from under them.
1. **Validation of data objects** -- It was suggested in the assignment that it might be good to validate the data objects. Validators such as [class-validator](https://github.com/typestack/class-validator) and [joi](https://joi.dev/) allow you to validate json input, and are most useful when protecting the application from data introduced externally, where we do not control the input. The cost of these validators is that you need to write schema files (or use class attributes, but that means you have to have classes) to describe the data rules. In our application here, all the data objects are created by our code, and so my recommendation is that we ensure they are always correct through our test automation. But this opinion is not strongly-held. If we do add it, we would do so in the REST serviced discussed above.

## Process

1. **Instrumentation and [service level objectives](https://sre.google/sre-book/service-level-objectives/)** -- We need to measure performance and customer satisfaction so that we can know how our product performs, and if we are meeting the SLOs.
1. **CI/CD improvements** -- We need to create different environments for testing purposes. PRs should not use the production database.
1. **Test automation** To get our delivery speed to a good place, and to ensure quality remains high ([DORA metrics](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance)), we need to automate as much of our testing as possible.
1. **Load testing** -- We need to see where things start to break down, based on transaction frequency, data size. We will need to get specific about the requirements (the load it should be able to handle) as well as specifics on latency (service level objectives).
1. **Indexes** -- The datastore will likely need indexes for queries. We should load test the application to see how it behaves when there is a significant amount of data in the `sessions` collection.
