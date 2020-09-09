const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('../../db');

const isValid = (validCallback, req) => {
    if (validCallback.length === 0) {
        return true;
    }
    const result = validCallback(req);
    return typeof result !== 'string';
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
        var instance = req.body;
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
        const result = deleteFromDatabasebyId(this.DB_NAME, id);
        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send();
        }
    }

    deleteAll(req, res, next) {
        const result = deleteAllFromDatabase(this.DB_NAME);
        if (result) {
            return res.status(204).send();
        } else {
            return res.status(404).send();
        }
    }

    createOne(req, res, next) {
        const newEntry = this.validator.length === 0 ? this.validator() : this.validator(req);
        if (typeof newEntry !== 'string') {
            const result = addToDatabase(this.DB_NAME, newEntry)
            return res.status(201).send(result);
        } else {
            return res.status(400).send(newEntry);
        }
    }
};

module.exports = Handler;