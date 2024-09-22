const useVoteGetResultExcelHandler = (answer, voteManager) => {
    return async (req, res) => {
        const {name, token, voteId} = req.body;
        if(name && token && voteId) {
            const result = await voteManager.getVoteResultExcel(name, token, voteId);
            if (isNaN(parseInt(result))) { 
                res.sendFile(__dirname, 'data.json');
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

module.exports = useVoteGetResultExcelHandler;