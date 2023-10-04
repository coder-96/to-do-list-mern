const express = require('express');
const app = express();

// serve up production assets
app.use(express.static('client/build'));

const cors = require("cors");

app.use(express.json());
app.use(cors());

// To connect with the mongoDB database
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoDB");

const noteSchema = new mongoose.Schema({
    todo: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false
    }
});
const Note = mongoose.model("Note", noteSchema);

app.post("/create", (req, res) => {
    const note = new Note({
        todo: req.body.todo,
    });
    note.save();
    console.log("saved");
});

app.get("/get", function (req, res) {
    Note.find()
        .then((result) => {
            res.json(result);
            console.log("Found");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.put("/update/:id", (req, res) => {
    const {id} = req.params;
    Note.findByIdAndUpdate({_id: id}, {done: true})
        .then((result) => {
            res.json(result);
            console.log("Updated");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    Note.findByIdAndDelete({_id: id})
        .then((result) => {
            res.json(result);
            console.log("Deleted");
        })
        .catch((err) => {
            console.log(err);
        });
});

// if not in production use the port 5000
const PORT = process.env.PORT || 5000;
console.log("server started on port:", PORT);
app.listen(PORT);

// "proxy": "http://localhost:5000",