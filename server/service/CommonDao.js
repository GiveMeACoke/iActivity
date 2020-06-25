const models = require('../models/index')
class CommonDao {
    //根据表明获取对应id字段名
    static change(modelName){
        switch (modelName) {
            case "categories":
                return "category_id"
                break;
            case "organizations":
                return "organization_id"
                break;
            case "roles":
                return "role_id"
        }
    }

    static async getList(modelName) {
        //找到对应的模型
        let model = models[modelName]
        return await model.findAll()
    }

    static async getById(modelName,id){
        let model = models[modelName]
        return await model.findByPk(id)
    }

    static async add(modelName, newObj) {
        console.log(modelName, newObj)
        let model = models[modelName]
        return await model.create(newObj)
    }

    static async update(modelName, id, newValue) {
        let model = models[modelName]
        //转换成对应的id字段名
        let _id = this.change(modelName)
        let where = {}
        where[_id] = id
        return await model.update(newValue, {
            where: where
        })
    }

    static async delete(modelName, id) {
        //找到对应的模型
        let model = models[modelName]
        // 转换成对应的id字段名
        let _id = this.change(modelName)
        console.log(_id)
        let where = {}
        where[_id] = id
        return await model.destroy({where})
    }

    
}



module.exports = CommonDao