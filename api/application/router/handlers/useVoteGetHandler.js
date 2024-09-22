const useVoteGetHandler = (answer, voteManager) => {
    return async (req, res) => {

        const {name, token, voteId} = req.body;
        if(name && token && voteId) {
            const result = await voteManager.getVote(name, token, voteId);
            if (isNaN(parseInt(result))) { 
                res.json(answer.good(result));
                return;
            } else {
                res.json(answer.bad(result));
                return;
            }
        }
        res.json(answer.bad(400));
        return ;
    }
};

module.exports = useVoteGetHandler;