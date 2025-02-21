const BASE_URL = "https://test-xs-api.memolabs.net/v1"

export const TEST_ORIGIN = "https://testxspace.memolabs.net/"


export const API_URL = {
    // Login
    "Challenge": BASE_URL + "/challenge",
    "Login": BASE_URL + "/login",
    "Refresh": BASE_URL + "/refresh",
 
    // NFT
    "NFT_DATA_INFO": BASE_URL + "/nft/data/info",
    "NFT_DATA_MINT": BASE_URL + "/nft/data/mint",
    "NFT_LIST": BASE_URL + "/nft/list",
    "NFT_TWEET_INFO": BASE_URL + "/nft/tweet/info",
    "NFT_TWEET_MINT": BASE_URL + "/nft/tweet/mint",

    // Point
    "POINT_CHARGE": BASE_URL + "/point/charge",
    "POINT_HISTORY": BASE_URL + "/point/history",

    // Rank
    "PROJECT_LIST": BASE_URL + "/project/list",
    "PROJECT_RANK": BASE_URL + "/project/rank",

    // Refer
    "REFER_BIND": BASE_URL + "/refer/bind",
    "REFER_INFO": BASE_URL + "/refer/info",

    // User
    "USER_INFO": BASE_URL + "/user/info",
} 