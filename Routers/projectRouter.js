const express = require("express");

const router = express.Router();

const db = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  db
    .get()
    .then(project => {
      res.send(project);
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => {
      res.send(project);
    })
    .catch(error => {
      res.status(500).json({ message: "there is no project with this ID" });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  db
    .getProjectActions(id)
    .then(project => {
      res.send(project);
    })
    .catch(error => {
      res.status(500).json({ message: "can't find actions for this post" });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  db
    .insert(project)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "there was an error when saving project" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let project;

  db
    .remove(id)
    .then(response => {
      res.status(200).send(project);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newProject = req.body;

  db
    .update(id, newProject)
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
