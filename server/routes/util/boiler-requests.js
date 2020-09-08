const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('../db.js');

class Handler {
    constructor(db, id) {
        this.DB_NAME = db,
            this.ID_NAME = id
    }

    getAll(req, res, next) {
        const result = getAllFromDatabase(this.DB_NAME);
        if (result) {
            return res.send(result);
        } else {
            return res.status(400).send();
        }
    }

    getOne(req, res, next) {
        const id = req.params[this.ID_NAME];
        const result = getFromDatabaseById(this.DB_NAME, id);
        if (result) {
            return res.send(result);
        } else {
            return res.status(404).send();
        }
    }

    updateOne(req, res, next) {
        var instance = req.query;
        instance['id'] = req.params[this.ID_NAME];
        const result = updateInstanceInDatabase(this.DB_NAME, instance);
        if (result) {
            return res.send(result);
        } else {
            return res.status(404).send();
        }
    }

    deleteOne(req, res, next) {
        const id = req.params[this.ID_NAME];
        const result = deleteFromDatabasebyId(this.DB_NAME, this.ID_NAME);
        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send();
        }
    }

    deleteAll(req, res, next) {
        const result = deleteAllFromDatabase(DB_NAME);
        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send();
        }
    }

    createOne(validCallback, req, res, next) {
        if (validCallback.length === 0) {
            const newEntry = validCallback()
        } else {
            const newEntry = validCallback(req);
        }
        if (!typeof newEntry === 'string') {
            return res.status(201).send(addToDatabase(this.DB_NAME, newEntry));
        } else {
            return res.status(400).send(newEntry);
        }
    }
};

export default Handler;