class Repository {
    constructor(connection, factory) {
        this.connection = connection;
        this.Factory = factory;
    }


    async all() {
        let data = await this.connection('todos').select();
        return  this.Factory.make(data)
    }

    async create(data) {
        return  await this.connection('todos').insert({
            name : data.name,
            done : false
        }).then(result => result[0])
    }
    async getById(id) {
        let data = await  this.connection('todos').where({id : id}).then(result => result[0]);

        if(data) {
            return  this.Factory.makeItem(data)
        } else {
            return  null
        }
    }

    async update(id, data) {
        return  await this.connection('todos').where({id : id}).update({done : data.done, name :data.name})
    }


    async del(id) {
        return await this.connection('todos').where({id :  id}).del();
    }
}

module.exports = Repository;