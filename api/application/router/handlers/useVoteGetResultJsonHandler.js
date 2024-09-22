const useVoteGetResultJsonHandler = (answer, voteManager) => {
    return async (req, res) => {
        const {name, token, voteId} = req.body;
        if(name && token && voteId) {
            const result = await voteManager.getVoteResultJson(name, token, voteId);

            if (isNaN(parseInt(result))) { 
                res.download(result);
                // res.json(answer.good({
                //     status: 200
                // }))
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

module.exports = useVoteGetResultJsonHandler;