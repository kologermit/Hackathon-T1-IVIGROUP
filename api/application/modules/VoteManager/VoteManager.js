const { query } = require('express');

class VoteManager {
    constructor(db, authHandler){
        this.db = db;
        this.authHandler = authHandler
        this.crypto = require('crypto');
        this.uuid = require('uuid');
    }

    async createVote(name, token, votes){
        const user = await this.db.getUserByName(name)
        if (user) {
            const auth = await this.authHandler.authRequest(user.id, token);
            if(auth.status === 200) { 
                if(user.admin === 1) {
                    const voteID = await this.db.addVote(votes.description, user.id);
                    const questions_desc = votes.questions_desc;
                    questions_desc.forEach(async(obj) => {
                        await this.db.addServiceQuestion(obj.description, voteID, obj.q1, obj.q2, obj.q3)
                    });
                    return {
                        status: 200,
                        voteId: voteID,
                    }
                }
                return 400;
            }
            return 402;
        }         
        return 400;
    }

    async getVote(name, token, voteId){
        const user = await this.db.getUserByName(name)
        if (user) {
            const auth = await this.authHandler.authRequest(user.id, token);
            if(auth.status === 200) { 
                if(user.admin === 1) {
                    const vote = await this.db.getVoteById(voteId);
                    const vote_question = await this.db.getVoteQuestionByVoteId(voteId);
                    return {
                        status: 200,
                        vote: {
                            description: vote.description,
                            questions_desc: vote_question
                        },
                    }
                }
            }
            return 402;
        }         
        return 400;
    }

    async getVoteResult(name, token, voteId){
        const user = await this.db.getUserByName(name)
        if (user) {
            const auth = await this.authHandler.authRequest(user.id, token);
            let userRes = []
            if(auth.status === 200) { 
                if(user.admin === 1) {
                    const users = await this.db.findUsersByQuestions(voteId, user.id);
                    console.log(users)
                    users.forEach(async (obj) => {
                        let resp = await this.db.getResponceByUserAndVoteId(voteId, obj.id)
                        userRes.push({
                            userId: user.id,
                            name: user.name,
                            responce: resp
                        })
                    })
                    const votes = await this.db.getResponceByUserAndVoteId(voteId, user.id);
                    console.log(votes)
                    return {
                        status: 200,
                        usersResp: userRes
                    }
                }
                return 403;
            }
            return 402;
        }         
        return 400;
    }

    async vote(name, token, voteId, vote){
        const user = await this.db.getUserByName(name)
        if (user) {
            const auth = await this.authHandler.authRequest(user.id, token);
            if(auth.status === 200) { 
                if(user.admin === 0) {
                    const question_ids = await this.db.getQuestionsIdByVoteId(voteId)
                    vote.forEach(async(obj, index) => {
                        let qid = question_ids[index].id
                        await this.db.insertUserResponceOnQuestions(voteId, qid, obj.q1, obj.q2, obj.q3, user.id)
                    })
                    return {
                        status: 200,
                    }
                }
                return 403;
            }
            return 402;
        }         
        return 400;
    }

    async adminVotes(name, token){
        const user = await this.db.getUserByName(name)
        if (user) {
            const auth = await this.authHandler.authRequest(user.id, token);
            if(auth.status === 200) { 
                if(user.admin === 1) {
                    const adminVotes = await this.db.getAdminVotes(user.id);
                    return {
                        status: 200,
                        votes: adminVotes
                    }
                }
                return 403;
            }
            return 402;
        }         
        return 400;
    }

    async getVoteResultExcel(name, hash){
        
        return 0;
    }

    async getVoteResultJson(name, hash){
        
        return 0;
    }
}

module.exports = VoteManager;