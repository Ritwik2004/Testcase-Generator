import axios from "axios"
import { fetchfiles, fetchRepo, login_callbackUrl, login_redirectUrl } from "../constant.js"

const login = async (req, res) => {
    const redirectURL = `${login_redirectUrl}=${process.env.GITHUB_CLIENT_ID}&scope=repo`
    res.redirect(redirectURL)
}

const callback = async (req, res) => {
    const code = req.query.code;
    // console.log("com1")
    try {
        // console.log("com2")
        const response = await axios.post(
            login_callbackUrl,
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        )
    // console.log("com3")
        const accessToken = response.data.access_token;
        res.redirect(`${process.env.FRONTEND_URL}?token=${accessToken}`)
    } catch (error) {
        console.log("Error exchinging code for token : ", error.response?.data || error.message)
        res.json({ success: false, message: "Faild to get accesstoken" })
    }
}

const accessRepository = async (req, res) => {
    // console.log("accrep1");
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.json({ success: false, error: "No GitHub token" });
    }
    // console.log("accrep2");
    try {
        // console.log("token : ", token)
        const response = await axios.get(process.env.FETCH_REPO_URL || "https://api.github.com/user/repos", {
            headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("response : ",response.data)
        res.json({ success: true, message: response.data });
    } catch (error) {
        console.log("error : ", error.response?.data || error.message);
        res.json({ success: false, error: error.response?.data || error.message });
    }
};

const accessFiles = async (req,res)=>{
    const {woner,repo} = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.json({success : false, message : "No github token"})
    try {
        const response = await axios.get(`${fetchfiles}/${woner}/${repo}/contents`,
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        res.json({success : true, message : response.data})
    } catch (error) {
        console.log("error : ",error.message)
        res.json({success : false, message : error.message})
    }
}

export {
    login,
    callback,
    accessRepository,
    accessFiles
}