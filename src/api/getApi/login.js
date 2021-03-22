const baseUrl =
    process.env.NODE_ENV === "development" ? "/serverApi" : myConfig.serverApi;
const login = {
    loginState: {
        method: "get",
        url: baseUrl + "/service-wutanyuan/api/loginInfo"
    }
};

export default login;
