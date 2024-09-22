const express = require('express');
const router = express.Router();
const Answer = require('./Answer');

const useAdminSigninHandler = require('./handlers/useAdminSigninHandler');
const useAdminLoginHandler = require('./handlers/useAdminLoginHandler');
const useAdminLogoutHandler = require('./handlers/useAdminLogoutHandler');
const useAdminMeHandler = require('./handlers/useAdminMeHandler');
const useAdminSetConfig = require('./handlers/useAdminSetConfig');

const useUserSigninHandler= require('./handlers/useUserSigninHandler');
const useUserLoginHandler= require('./handlers/useUserLoginHandler');
const useUserLogoutHandler= require('./handlers/useUserLogoutHandler');
const useUserMeHandler= require('./handlers/useUserMeHandler');

const useVoteCreateHandler= require('./handlers/useVoteCreateHandler');
const useVoteGetResultHandler= require('./handlers/useVoteGetResultHandler');
const useVoteToVoteHandler= require('./handlers/useVoteToVoteHandler');
const useVoteGetResultExcelHandler= require('./handlers/useVoteGetResultExcelHandler');
const useVoteGetResultJsonHandler = require('./handlers/useVoteGetResultJsonHandler');
const useVoteGetHandler = require('./handlers/useVoteGetHandler');
const useVoteGetAdminVotesHandler = require('./handlers/useVoteGetAdminVotesHandler');
const useVoteGetConfigHandler = require('./handlers/useVoteGetConfigHandler');


const urlencodedParser = express.urlencoded({extended: false});

function Router(userManager, voteManager) {
    const answer = new Answer;

    // Админ
    router.post('/admin/signin/', urlencodedParser, useAdminSigninHandler(answer, userManager));
    router.post('/admin/login/', urlencodedParser, useAdminLoginHandler(answer, userManager));
    router.post('/admin/logout/', urlencodedParser, useAdminLogoutHandler(answer, userManager));
    router.post('/admin/me/', urlencodedParser, useAdminMeHandler(answer, userManager));
    router.post('/admin/setConfig/', urlencodedParser, useAdminSetConfig(answer, userManager))
    // Юзер
    router.post('/user/signin/', urlencodedParser, useUserSigninHandler(answer, userManager)); 
    router.post('/user/login/', urlencodedParser, useUserLoginHandler(answer, userManager));
    router.post('/user/logout/', urlencodedParser, useUserLogoutHandler(answer, userManager));
    router.post('/user/me/', urlencodedParser, useUserMeHandler(answer, userManager));
    // Голосование
    router.post('/vote/create/', urlencodedParser, useVoteCreateHandler(answer, voteManager));
    router.post('/vote/get/', urlencodedParser, useVoteGetHandler(answer, voteManager));
    router.post('/vote/getResult/', urlencodedParser, useVoteGetResultHandler(answer, voteManager));
    router.post('/vote/toVote/', urlencodedParser, useVoteToVoteHandler(answer, voteManager));
    router.post('/vote/getResultExcel/', urlencodedParser, useVoteGetResultExcelHandler(answer, voteManager));
    router.post('/vote/getResultJson/', urlencodedParser, useVoteGetResultJsonHandler(answer, voteManager));
    router.post('/vote/adminVotes/', urlencodedParser, useVoteGetAdminVotesHandler(answer, voteManager));
    router.post('/vote/getConfig/', urlencodedParser, useVoteGetConfigHandler(answer, voteManager));
    

    router.all('/*', (req, res) => {
        res.send('Ты попал не туда!'); 
    });

    return router;
}

module.exports = Router;