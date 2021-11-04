const express = require("express");
const router = express();
const auth = require("../Middleware/auth");
const db = require("../firebase");

//Add the todo list to the database
router.get("/getToDo", auth, async (req, res) => {
  await db
    .collection("todos")
    .where("postedBy", "==", req.user.email)
    .get()
    .then((response) => {
      const getToDos = [];

      response.docs.map((todo) => {
        const todoitem = todo.data();
        todoitem.id = todo.id;
        getToDos.push(todoitem);
      });
      res.send(getToDos);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Add the to do to the database
router.post("/addToDo", auth, async (req, res) => {
  const { todo } = req.body;

  await db
    .collection("todos")
    .add({
      work: todo,
      postedBy: req.user.email,
      postedById: req.user.id,
    })
    .then((response) => {
      db.collection("todos")
        .doc(`${response.id}`)
        .get()
        .then((item) => {
          const todoitem = item.data();
          todoitem.id = item.id;
          res.send(todoitem);
        })
        .catch((err) => {
          res.send(err);
        })
        .catch((err) => {
          res.send(err);
        });
    });
});

//Delete the todos from the list and also complete the todos.
router.delete("/deleteTodo/:id", (req, res) => {
  const { id } = req.params;
  db.collection("todos")
    .doc(`${id}`)
    .delete()
    .then(() => {
      res.send("Sucessfully Deleted Todos");
    })
    .catch(() => {
      res.send("Error deleting todos!");
    });
});

module.exports = router;
