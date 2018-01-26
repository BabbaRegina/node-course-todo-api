const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'Fist test todo',
        completed: true,
        competedAt: 333
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Third test todo'
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST/ todos', () => {
    it('should create a new todos', (done) => {
        var text = 'Test todo';
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should not create todo', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET/ todos', (done) => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            }).end(done);
    });


});

describe('GET /todos/:id', (done) => {
    it('should get todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return a 404 if id not found', (done) => {
        var newId = new ObjectID();
        request(app)
            .get(`/todos/${newId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is not valid', (done) => {
        var newId = '123123123';
        request(app)
            .get(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', (done) => {
    it('should delete todo by id', (done) => {
        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(todos[1]._id.toHexString());
            }).end((err,resp) =>{
                if(err){
                    return done(err);
                }
                // query db findById toNotExist
                Todo.findById(todos[1]._id.toHexString()).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if id not found', (done) => {
        var newId = new ObjectID();
        request(app)
            .delete(`/todos/${newId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is not valid', (done) => {
        var newId = '123123123';
        request(app)
            .delete(`/todos/${newId}`) 
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', (done) => {
    it('should update todo by id', (done) => {
        var text = 'TEST update';
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send({
                "completed" : false,
                "text": text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.competedAt).toNotExist();
                expect(res.body.todo.completed).toBe(false);
            }).end((err,resp) =>{
                if(err){
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should update todo by id in true', (done) => {
        var text = 'TEST update in TRUE';
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .send({
                "completed" : true,
                "text": text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.competedAt).toBeA("number");
                expect(res.body.todo.completed).toBe(true);
            }).end((err,resp) =>{
                if(err){
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if id not found', (done) => {
        var newId = new ObjectID();
        request(app)
            .patch(`/todos/${newId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is not valid', (done) => {
        var newId = '123123123';
        request(app)
            .patch(`/todos/${newId}`) 
            .expect(404)
            .end(done);
    });
});

