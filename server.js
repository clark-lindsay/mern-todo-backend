import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from'mongoose';
import { Todo } from './todo.model';

const app = express();
const PORT = 4000;
const todoRoutes = express.Router();

app.use(cors);
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

const databaseAddress = 'mongodb://127.0.0.1:27017/todos';
mongoose.connect(databaseAddress, {
    useNewUrlParser:true });

const connection = mongoose.connection;
connection.once(
'open',
() => {console.log('MongoDB database connection established succesfully!')}
);

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get((req, res) => {
    const id = req.params.id;
    Todo.findById(
        id, 
        (err, todo) => {res.json(todo);}
        ); // TODO: why no error handling?
});

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then((todo) => {
            res.status(200).json({'todo': 'todo added succesfully'});
        }).catch((err) => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send('data is not found');
        }
        else { // way to simplify this syntax with more modern JS syntax?
            todo.description = req.body.description;
            todo.responsible = req.body.description;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;

            todo.save()
                .then((todo) => {
                    res.json('Todo updated!');
                }).catch((err) => {
                    res.status(400).send('Update not possible');
                });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})