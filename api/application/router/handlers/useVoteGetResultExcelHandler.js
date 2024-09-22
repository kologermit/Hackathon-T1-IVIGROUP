const useVoteGetResultExcelHandler = (answer, voteManager) => {
    return async (req, res) => {
        const {} = req.headers;
        
        const result = await userManager.getVoteResultExcel(login, password, rnd);
        if (isNaN(parseInt(result))) res.json(answer.good(result));
        else res.json(answer.bad(result));
    }
};

module.exports = useVoteGetResultExcelHandler;