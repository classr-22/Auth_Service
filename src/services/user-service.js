const UserRepository = require('../repository/user-repository');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig');

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch)
            {
                console.log("password doesn't match");
                throw {error: 'incorrect password'}
            }

            const newToken = this.createToken({email: user.email,id: user.id});
            return newToken;

        } catch (error) {
            console.log("something went wrong in sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const result = await this.verifyToken(token);
            if(!result){
                throw {error:'Invalid token'}
            }
            const respo = await this.userRepository.getById(result.id);
            if(!respo){
                throw {error:'No user with corresponding token exists'}
            }
            return respo.id;
        } catch (error) {
            console.log("something went wrong in auth process");
            throw error;
        }

    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;   
        }
    }

}

module.exports = UserService;