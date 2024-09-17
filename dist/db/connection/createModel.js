"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = createModel;
var connection_1 = require("../connection");
function createModel(dbName, modelName, schema) {
    var db = connection_1.databaseManager.getDatabaseConnection(dbName);
    return db.model(modelName, schema);
}
//# sourceMappingURL=createModel.js.map