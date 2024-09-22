const useVoteCreateHandler = (answer, voteManager) => {
    return async (req, res) => {

        const {name, token, votes} = req.body;
        if(name && token && votes) {
            const result = await voteManager.createVote(name, token, votes);
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

module.exports = useVoteCreateHandler;