// local
import GitHubContext from "../context/createGitHubData";

// react
import { useContext } from "react";

// create hook
const useGitHubData = () => {
    const { profileData, isLoading } = useContext(GitHubContext);

    return { profileData, isLoading };
};

export default useGitHubData;