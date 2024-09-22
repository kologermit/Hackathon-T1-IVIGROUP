const useVoteGetAdminVotesHandler = (answer, voteManager) => {
    return async (req, res) => {
        const {name, token, voteId, vote} = req.body;
        if(name && token) {
            const result = await voteManager.adminVotes(name, token);
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

module.exports = useVoteGetAdminVotesHandler;