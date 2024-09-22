const useVoteToVoteHandler = (answer, voteManager) => {
    return async (req, res) => {
        const {name, token, voteId, vote} = req.body;
        if(name && token && voteId) {
            const result = await voteManager.vote(name, token, voteId, vote);
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

module.exports = useVoteToVoteHandler;