import axios from "axios";
import toast from "react-hot-toast"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/auth",
});

export const fetchRepos = async (token) => {
  try {
    const { data } = await API.get("/github/repos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.success) {
      return data.message;
    }
    else {
      toast.error("unable to fetchingx")
    }
  } catch (error) {
    toast.error(error.message + "Please refresh the page and check internet connection.")
  }
};

export const fetchFiles = async (owner, repo, token, path = "") => {
  const url = path
    ? `/github/files/${owner}/${repo}?path=${path}`
    : `/github/files/${owner}/${repo}`;
  const { data } = await API.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (data.success) {
    return data.message;
  }
  else {
    toast.error("Unable to fetch the files.")
  }
};

export const generateCode = async (files, username) => {
  const { data } = await API.post("/ai/generate-code", { files, username });
  if (data.success) {
    getHistory(username)
    return data.message;
  }
  else {
    toast.error("Unable to generate testcase.")
  }
};

export const getHistory = async (username) => {
    try {
      const { data } = await API.post("/user/history", { username });
      if (data.success) {
        return data.message;
      } else {
        toast.error(data.message || "History fetching is incomplete");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

export {API}