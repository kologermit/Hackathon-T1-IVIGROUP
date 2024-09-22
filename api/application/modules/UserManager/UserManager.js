class UserManager {
    constructor(db, authHandler){
        this.db = db;
        this.authHandler = authHandler;
        this.crypto = require('crypto');
        this.uuid = require('uuid');
    }

    async adminSignin(name, hash){
        const user = await this.db.checkUserByName(name) 
        if(user.length === 0){
            await this.db.addAdmin(name, hash);
            const user = await this.db.getUserByName(name);
            console.log(user.id)
            const auth = await this.authHandler.signinRequest(user.id, hash);
            return {
                status: 200,
                token: auth.data.token,
                name: name,
                admin: user.admin
            }
        }
        return 400;
    }

    async adminLogin(name, hash){
        const user = await this.db.getUserByName(name)         
        if(hash === user.hash) {
            const auth = await this.authHandler.signinRequest(user.id, hash);
            return {
                status: 200,
                token: auth.data.token,
                name: name,
                admin: user.admin
            }
        }
        return 400;
    }

    async adminLogout(name, token){
        const user = await this.db.getUserByName(name)         
        const auth = await this.authHandler.authRequest(user.id, token);
        if(auth.status === 200) {
            await this.authHandler.logoutRequest();
            return {
                status: 200,
            }
        }
        return 400;
    }

    async adminInfo(name, hash){
        const user = await this.db.getUserByName(name)         
        const auth = await this.authHandler.authRequest(user.id, token);
        if(auth.status === 200) {
            await this.authHandler.logoutRequest();
            return {
                status: 200,
                name: user.name,
                token: auth.token,
                admin: user.admin
            }
        }
        return 400
    }

    async userSignin(name, hash){
        const user = await this.db.checkUserByName(name) 
        if(user.length === 0){
            await this.db.addUser(name, hash);
            const user = await this.db.getUserByName(name);
            const auth = await this.authHandler.signinRequest(user.id, hash);
            return {
                status: 200,
                token: auth.data.token,
                name: name
            }
        }
        return 400;
    }
    
    async userLogin(name, hash){
        const user = await this.db.getUserByName(name)         
        if(hash === user.hash) {
            const auth = await this.authHandler.signinRequest(user.id, hash);
            return {
                status: 200,
                token: auth.data.token,
                name: name,
                admin: user.admin
            }
        }
        return 400;
    }

    async userLogout(name, hash){
        const user = await this.db.getUserByName(name)         
        const auth = await this.authHandler.authRequest(user.id, token);
        if(auth.status === 200) {
            await this.authHandler.logoutRequest();
            return {
                status: 200,
            }
        }
        return 400;
    }

    async userInfo(name, hash){
        const user = await this.db.getUserByName(name)         
        const auth = await this.authHandler.authRequest(user.id, token);
        if(auth.status === 200) {
            await this.authHandler.logoutRequest();
            return {
                status: 200,
                name: user.name,
                token: auth.token,
                admin: user.admin
            }
        }
        return 400
    }
}

module.exports = UserManager;