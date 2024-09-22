
const useVoteGetConfig = (answer, voteManager) => {
    return async (req, res) => {
        const {name, token, voteId} = req.body;  
        if (!name || !token || !voteId) {
            res.json(answer.bad(400));
        }
        console.log(1)
        const result = await voteManager.getVoteConfig(name, token, voteId);
        if (isNaN(parseInt(result))) { 
            res.json(answer.good(result));
            return;
        }
        res.json(answer.bad(result));
    }
};

module.exports = useVoteGetConfig;