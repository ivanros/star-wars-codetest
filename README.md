**Introduction**

Welcome to the world of Star Wars, where you will find an infinite number of galaxies, planets and the most colorful beings. Enter an endless amount of valuable information about the habitat that awaits you in your next home or just gossip about the different visitors staying there.

[Click here](https://www.youtube.com/watch?v=tGsKzZtRwxw) to enter the atmosphere before launching it

**How to launch**

After entering the project through any terminal, execute the following commands

```
yarn install #or npm install
yarn dev #or npm run dev
```

To run the test suite

```
yarn test #or npm test
```

To run pre-commit hook manually (you should have pre-commit installed)

```
pre-commit install -f
pre-commit run --all-files
```

To run the project in a Dockerized way (you should have Docker installed and daemon started)

```
docker build -t start-wars-codetest .
docker run -d -p 3000:3000 start-wars-codetest
```

Then go to `localhost:3000` and you will see the deployed app

## Project structure

Within the download you'll find the following directories and files following the `kebab-case` pattern:

```
star-wars-codetest
    ├── public
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── constants
    │   ├── data
    │   ├── models
    │   ├── pages
    │   │   └── api
    │   ├── redux
    │   ├── utils
    │   ├── apollo-client.ts
    │   └── global.css
    ├── .eslintrc
    ├── .pre-commit-config.yaml
    ├── .prettierrc
    ├── Dockerfile
    ├── jest.config.ts
    ├── LICENSE
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.json
    └── tsconfig.test.json
```

The GraphQL client has been developed in the API part of Next.js as it is easier to communicate with this intermediate layer that can return custom responses to avoid exposing server errors that are of no interest to the client side. In addition, we avoid future CORS problems and can make use of HTTP header handling and authorization tokens.

## Accessibility

DOM code is full of roles and aria-labels so you will have no problem using the app with any voice recognition device or assistant such as Alexa, Siri or Google Assistant.

## Responsive Design

Includes some breakpoints to provide adaptative user interfaces, so you should try to see this amazing application in your mobile phone!

## Technology stack

- [Next.js](https://nextjs.org/) as the React framework builded in [Typescript](https://www.typescriptlang.org/) syntax
- [Redux](https://es.redux.js.org/) with RTK toolkit as the state management system
- [Tailwind](https://tailwindcss.com/) as the CSS framework
- [GraphQL](https://graphql.org/) as the query language for the API
- [Jest](https://jestjs.io/es-ES/) and [Testing Library](https://testing-library.com/) as the UT and IT Testing framework
- [ESLint](https://eslint.org/) as linter and [Prettier](https://prettier.io/) as code formatter
