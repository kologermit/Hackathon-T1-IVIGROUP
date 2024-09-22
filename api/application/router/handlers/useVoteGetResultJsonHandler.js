const useVoteGetResultJsonHandler = (answer, voteManager) => {
    return async (req, res) => {
        const {name, hash} = req.headers;
        
        const result = await userManager.getVoteResultJson(login, password, rnd);
        if (isNaN(parseInt(result))) res.json(answer.good(result));
        else res.json(answer.bad(result));
    }
};

module.exports = useVoteGetResultJsonHandler;