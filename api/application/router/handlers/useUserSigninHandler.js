const useUserSigninHandler = (answer, userManager) => {
    return async (req, res) => {
        const {name, hash} = req.body;  
        if(name && hash) {
            const result = await userManager.userSignin(name, hash);
            if (isNaN(parseInt(result))) { 
                res.json(answer.good(result));
                return;
            } else {
                res.json(answer.bad(result));
                return;
            }
        }
        res.json(answer.bad(400));
        return;
    }
};

module.exports = useUserSigninHandler;