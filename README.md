
## Development

```
$ yarn run local
```

Testing API, Open http://localhost:8081/.
Add mock data to Firestore, Open http://localhost:4000/.


### Environment

|  Name  |  Description  |  Example  |
| ---- | ---- | ---- |
|  FIRESTORE_EMULATOR_HOST  |  Port number of Firebase local emulator |  8080  |
|  GCLOUD_PROJECT  |  Project ID of dev env Google Cloud Project |  posusume-dev  |
|  APP_FIREBASE_AUTH_TEST_USER_ID  |  Test User ID |  hogehoge  |
|  APP_GRAPHQL_SCEHMA_PATH  |  Sepcify GraphQL file path | /workspace/package/graphql/schemas |

### Serve
```
$ cd app/
$ yarn firebase
$ yarn dev
```

