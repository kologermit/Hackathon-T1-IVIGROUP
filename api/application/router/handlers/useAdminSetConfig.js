
const useAdminSetConfig = (answer, userManager) => {
    return async (req, res) => {
        const {name, token, config} = req.body;  
        if (!name || !token || !config) {
            res.json(answer.bad(400));
        }
        const result = await userManager.adminSetConfig(name, token, config);
        if (isNaN(parseInt(result))) { 
            res.json(answer.good(result));
            return;
        }
        res.json(answer.bad(result));
    }
};

module.exports = useAdminSetConfig;