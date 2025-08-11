
import { useEffect, useState } from "react";
import { fetchRepos } from "../../context/api";
import toast from "react-hot-toast";

const RepoListComponent = ({ token, onRepoSelect }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRepo = async (token) => {
    try {
      const data = await fetchRepos(token);
      if (data && Array.isArray(data)) { //
        setRepos(data);
      } else {
        setRepos([]);
      }
    } catch (error) {
      toast.error("Error fetching repositories. Please try again.");
      setRepos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchRepo(token);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your GitHub Repositories</h2>
      {repos.length === 0 ? (
        <p className="text-gray-500">No repositories found.</p>
      ) : (
        <ul className="space-y-2">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="cursor-pointer hover:underline"
              onClick={() => onRepoSelect?.(repo)} // safe optional chaining
            >
              {repo.full_name || repo.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoListComponent;
