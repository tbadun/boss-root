const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('../../db');

const isValid = (validCallback, req) => {
    if (validCallback.length === 0) {
        return true;
    }
    return typeof validCallback(req) !== 'string';
}

class Handler {
    constructor(db, id, fxn) {
        this.DB_NAME = db,
            this.ID_NAME = id,
            this.validator = fxn
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
        if (!isValid(this.validator, req)) {
            return res.status(404).send();
        }
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

    createOne(req, res, next) {
        if (this.validator.length === 0) {
            const newEntry = this.validator()
        } else {
            const newEntry = this.validator(req);
        }
        if (!typeof newEntry === 'string') {
            return res.status(201).send(addToDatabase(this.DB_NAME, newEntry));
        } else {
            return res.status(400).send(newEntry);
        }
    }
};

module.exports = Handler;