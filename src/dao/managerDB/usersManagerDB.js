
import { usersModel } from "../models/users.model.js";
class UsersManagerDB {


    async findById(id) {

        const response = await  usersModel.findById(id);
        return response;

    };

    async findByEmail(email) {

        const response = await  usersModel.findOne({email})
        
        return response;

    };

    async createOne(obj) {

        const response = await usersModel.create(obj);
        return response;

    };


}

export { UsersManagerDB  };