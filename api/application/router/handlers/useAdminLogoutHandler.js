const useAdminLogoutHandler = (answer, userManager) => {
    return async (req, res) => {
        const {name, token} = req.body;  
        if(name && token) {
            const result = await userManager.adminLogout(name, token);
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

module.exports = useAdminLogoutHandler;