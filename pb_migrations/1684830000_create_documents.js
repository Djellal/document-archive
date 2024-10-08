/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "documents",
    "created": "2023-05-23 10:00:00.000Z",
    "updated": "2023-05-23 10:00:00.000Z",
    "name": "documents",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "category",
        "name": "category",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "code",
        "name": "code",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": "^[A-Za-z0-9]+$"
        }
      },
      {
        "system": false,
        "id": "archiveDate",
        "name": "archiveDate",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "description",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "files",
        "name": "files",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 99,
          "maxSize": 5242880,
          "mimeTypes": ["application/pdf", "image/*"],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "relatedDocument",
        "name": "relatedDocument",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "documents",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["code"]
        }
      }
    ],
    "indexes": ["CREATE UNIQUE INDEX idx_unique_code ON documents (code)"],
    "listRule": "@request.auth.id != ''",
    "viewRule": "@request.auth.id != ''",
    "createRule": "@request.auth.role = 'administrator' || @request.auth.role = 'editor'",
    "updateRule": "@request.auth.role = 'administrator' || @request.auth.role = 'editor'",
    "deleteRule": "@request.auth.role = 'administrator'",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("documents");

  return dao.deleteCollection(collection);
})