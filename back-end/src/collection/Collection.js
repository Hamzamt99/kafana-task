'use strict'

class Collection {
    constructor(model) {
        this.model= model;
    }

    async read(id) {
        let column = null;
        if (id) {
             column = await this.model.findOne({ where: { id } })
             return column
        }else{
             column = await this.model.findAll();
             return column
        }
    }

    async create(obj){
        try{
            const created = await this.model.create(obj);
            return created;
        } catch (e){
            console.log(`error while adding a new record ${this.model}`)
            return e;
        }
    }

    async update(id,obj){
        try{
            const update = await this.model.update(obj ,{where: {id}})
            const newUpdate = await this.read(id)
            return newUpdate;
        } catch (error){ 
            console.log(`error while updating the record ${this.model}`)
            return error;
        }
    }

    async delete(id){
        try{
            const deleted = await this.model.destroy({where:{id}})
            return deleted;
        }catch (error){
            console.log(`error while deleting the record ${this.model}`)
            return error;
        }
    } 

    async authorBooks(id,model){
        const authorBooks = await this.model.findOne({
            where: {id},
            include:model
        });
        return authorBooks;
    }
}

module.exports = Collection;