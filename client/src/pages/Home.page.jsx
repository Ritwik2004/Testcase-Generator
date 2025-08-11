
import React, { useState } from "react";
import NavbarComponent from "../components/Navbar.components";
import RepoListComponent from "../components/RepoList.components";
import FileListComponent from "../components/FileList.components";
import CodeGeneratorComponent from "../components/CodeGenerator.components";
import HistoryComponent from "../components/History.components";
import { useEffect } from "react";

const HomePage = () => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("")
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [genCode, setGenerageCode] = useState("");


  return (
    // <div className="h-screen w-full flex flex-col">
    //   <NavbarComponent onToken={setToken} onUsername={setUserName} />

    //   {token ? (
    //     <div className="flex flex-grow overflow-hidden p-5 gap-5">
    //       {/* Left Side (Repos + Files) */}
    //       <div className="w-1/3 h-full flex flex-col gap-5">
    //         <div className="bg-white rounded-xl shadow p-4 overflow-y-auto flex-1">
    //           <RepoListComponent token={token} />
    //         </div>
    //         {selectedRepo && (
    //           <div className="bg-white rounded-xl shadow p-4 overflow-y-auto flex-1">
    //             <FileListComponent
    //               owner={selectedRepo.owner.login}
    //               repo={selectedRepo.name}
    //               token={token}
    //               onSelectFiles={setSelectedFiles}
    //               generatedTestCases={setGenerageCode}
    //             />
    //           </div>
    //         )}
    //       </div>

    //       {/* Right Side */}
    //       <div className="w-2/3 h-full flex flex-col gap-5">
    //         <div className="flex-1 bg-white rounded-xl shadow p-6 overflow-y-auto border border-gray-200">
    //           {/* <CodeGeneratorComponent repo={selectedRepo} files={selectedFiles} /> */}
    //           <CodeGeneratorComponent genCode={genCode} />
    //         </div>
    //         <div className="flex-1 bg-white rounded-xl shadow p-6 overflow-y-auto border border-gray-200">
    //           <HistoryComponent owner={userName} />
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="flex flex-1 items-center justify-center text-gray-500">
    //       Please login with GitHub to continue.
    //     </div>
    //   )}
    // </div>

    <div className="h-screen w-full flex flex-col">
  <NavbarComponent onToken={setToken} onUsername={setUserName} />

  {token ? (
    <div className="flex flex-col md:flex-row flex-grow overflow-hidden p-2 md:p-5 gap-2 md:gap-5">
      {/* Left Side */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full flex flex-col gap-2 md:gap-5">
        <div className="bg-white rounded-xl shadow p-4 overflow-y-auto flex-1">
          <RepoListComponent token={token} onRepoSelect={setSelectedRepo} />
        </div>
        {selectedRepo && (
          <div className="bg-white rounded-xl shadow p-4 overflow-y-auto flex-1">
            <FileListComponent
              owner={selectedRepo.owner.login}
              repo={selectedRepo.name}
              token={token}
              onSelectFiles={setSelectedFiles}
              generatedTestCases={setGenerageCode}
            />
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full flex flex-col gap-2 md:gap-5">
        <div className="flex-1 bg-white rounded-xl shadow p-4 md:p-6 overflow-y-auto border border-gray-200">
          <CodeGeneratorComponent genCode={genCode} />
        </div>
        <div className="flex-1 bg-white rounded-xl shadow p-4 md:p-6 overflow-y-auto border border-gray-200">
          <HistoryComponent owner={userName} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-1 items-center justify-center text-gray-500 text-center p-4">
      Please login with GitHub to continue.
    </div>
  )}
</div>


  );
};

export default HomePage;
