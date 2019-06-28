const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const Router = require('koa-router');
const _ = require('lodash');

require('dotenv').config();
const dbConfig = require('./knexfile');

const knex = require('knex')(dbConfig[process.env.DB_NODE_ENV]);

const Repository = require('./repository');
const Factory = require('./factory');

const factory = new Factory();
const repository = new Repository(knex, factory);


let router= new Router();


app.use(koaBody({
    multipart : true
}));

router.get('/todos', async (context,  next) => {
    context.body = await repository.all()
});


router.get('/todos/:id', async (context,  next) => {
    let data = await repository.getById(context.params.id);

    if(!data) {
        context.status = 404;
        return  context.body = {
            message : "ID_NOT_FOUND"
        }
    }

    context.body =  data
});


router.post('/todos', async (context, next) => {

    if(!context.request.body.name) {
        context.status = 400;
        return  context.body = {
            message : "NAME_MUST_NOT_NULL"
        }
    }

    let id = await repository.create({
        name : context.request.body.name
    });

    context.status = 201;
    context.body = await repository.getById(id)
});

router.put('/todos/:id', async (context,  next) => {

    let data = await repository.getById(context.params.id);

    if(!data) {
        context.status = 404;
        return  context.body = {
            message : "ID_NOT_FOUND"
        }
    }

    await repository.update(data.id, {done : context.request.body.done, name : context.request.body.name});


    context.body = await repository.getById(context.params.id)
});

router.del('/todos/:id', async (context,  next) => {
    let data = await repository.del(context.params.id);

    if(data) {
        return context.body = {
            status : "DELETE_SUCCESS"
        }
    } else {
        context.status = 404;
        return  context.body = {
            message : 'ID_NOT_FOUND'
        }
    }
});


app.use(router.routes());


app.listen(process.env.PORT || 3000);
