# Manage Film Application

<img src=“https://github.com/zoomi-raja/assesment-film-app/blob/main/screen1.png”>

## Assessment Test solution

Each entity of application lies in its separate codebase. docker is used to spin up everything all together

- Backend (film-api)
- Frontend (frontend)

**Minor detail why i went with following architecture**

- Based on the initial interview, It was asked to used nest.js framework.

- Typescript is only used in backed just to save time for configuration on frontend

- As this is a single page application it did not feel useful to use .next js which is built on top of react to compensate SEO by server side rendering.

- `docker-compose up` to run container in docker env other wise run yarn install in each folder

- `yarn typeorm migration:run` to seed data

### Backend ([/api](https://github.com/zoomi-raja/assesment-film-app/tree/main/film-api))

`Folder Structure and Important files`

```

film-api
│── src
│    └── config
│    └── exceptions
│    └── filters
│    └── migrations
│    └── modules
│    └── utilities
│── docker-comose.yml
└── postman-collection
```

`Each module has following structure`

```

modules
│── controller
└── dto // for proper request validation
└── models // data binding with storage
└── service // main business logic
└── module.ts
```

Each function in application is precise and short for the purpose of readbilty and extenstion.

- test case will make sure full application is properly configured and in working condtion `yarn run test` to execute test.

- Enough custom exceptions to keep uniformity in response of api in case of error.

### FrontEnd ([Film](https://github.com/zoomi-raja/assesment-film-app/tree/main/frontend))

- Images upload functionlity will improve over all app experince

`Folder Structure and Important files`

```

frontend
│── src
│    └── components
│    └── context
│    └── screens
│    └── utilities
│    └── config.js
│── docker-comose.yml
└── postman-collection
```
