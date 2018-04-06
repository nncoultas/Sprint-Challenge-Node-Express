const express = require("express");

const router = express.Router();

const db = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  db
    .get()
    .then(action => {
      res.send(action);
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(action => {
      res.send(action);
    })
    .catch(error => {
      res.status(500).json({ message: "there is no action with this ID" });
    });
});

router.post("/", (req, res) => {
  const action = req.body;
  db
    .insert(action)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "there was an error when saving action" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let action;

  db
    .remove(id)
    .then(response => {
      res.status(200).send(action);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newAction = req.body;

  db
    .update(id, newAction)
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
