# Manage Film Application

## Assessment Test solution

Each entity of application lies in its separate codebase

- Backend (film-api)
- Frontend (frontend)

**Minor detail why i went with following architecture**

- Based on the initial interview, It was asked to used nest.js framework.

- Typescript is only used in backed just to save time for configuration on frontend

- As this is a single page application it did not feel useful to use .next js which is built on top of react to compensate SEO by server side rendering.

### Backend ([/api](https://github.com/zoomi-raja/assesment-film-app/tree/main/film-api))

`Folder Structure and Important files`

```

film-api
│── src
│    └── config
│    └── exceptions
│    └── filters
│    └── migrations
│    └── utilities
│── docker-comose.yml
└── postman-collection
```

Each function in application is precise and short for the purpose of readbilty and extenstion.

- test case will make sure full application is properly configured and in working condtion `yarn run test` to execute test.

- Enough custom exceptions to keep uniformity in response of api in case of error.
