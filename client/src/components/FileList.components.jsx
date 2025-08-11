
import React, { useEffect, useState } from "react";
import { fetchFiles, generateCode } from "../../context/api";

const allowedExtensions = [".js", ".jsx", ".py", ".java", ".c", ".cpp"]; // filter if needed

const FileListComponent = ({ owner, repo, token, generatedTestCases }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState(""); // track folder navigation
  const [loading, setLoading] = useState(false)

  // Fetch files whenever repo or path changes
  useEffect(() => {
    if (owner && repo && token) {
      fetchFiles(owner, repo, token, currentPath)
        .then(setFiles)
        .catch(console.error);
    }
  }, [owner, repo, token, currentPath]);

  // Toggle file selection
  const toggleFile = (file) => {
    setSelectedFiles((prev) =>
      prev.find((f) => f.path === file.path)
        ? prev.filter((f) => f.path !== file.path)
        : [...prev, file]
    );
  };

  // Handle "Go Back" button
  const goBack = () => {
    if (!currentPath) return;
    const parts = currentPath.split("/");
    parts.pop();
    setCurrentPath(parts.join("/"));
  };


  const handleGenerateCode = async () => {
    setLoading(true);

    const filePromises = selectedFiles.map(async (file) => {
      // Use GitHub API to get file content (base64 encoded)
      const res = await fetch(file.url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // GitHub returns content in base64 → decode it
      const content = atob(data.content.replace(/\n/g, ""));

      return { filename: file.name, content };
    });

    const filesWithContent = await Promise.all(filePromises);

    // Now send files to backend
    const data = await generateCode(filesWithContent, owner);
    generatedTestCases(data);
    setLoading(false);
  };


  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select Files</h2>

      {currentPath && (
        <button
          onClick={goBack}
          className="mb-3 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⬅ Back
        </button>
      )}

      <ul className="space-y-3">
        {files.map((file) => (
          <li key={file.path} className="flex items-center gap-3">
            {file.type === "file" ? (
              <>
                <input
                  type="checkbox"
                  checked={selectedFiles.some((f) => f.path === file.path)}
                  onChange={() => toggleFile(file)}
                />
                <span className="p-2 bg-white shadow rounded-md w-full">
                  {file.name}
                </span>
              </>
            ) : (
              <button
                className="p-2 bg-gray-100 shadow rounded-md w-full text-left hover:bg-gray-200"
                onClick={() => setCurrentPath(file.path)}
              >
                📂 {file.name}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
  disabled={loading}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
  onClick={handleGenerateCode}
>
  {loading && (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  )}
  {loading ? "Generating..." : "Generate Testcase"}
</button>

    </div>
  );
};

export default FileListComponent;
