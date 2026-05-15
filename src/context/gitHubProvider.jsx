// local
import GitHubContext from "./createGitHubData";
import githubFetch from "../services/getGitHubData";

// react
import { useState, useEffect } from "react";

// create provider
const GitHubProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // fetch github data on mount
    useEffect(() => {
        const func = async () => {
            setIsLoading(true);
            try {
                const data = await githubFetch();
                setProfileData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        func();
    }, []);

    return (
        <GitHubContext.Provider value={{ profileData, isLoading }}>
            {children}
        </GitHubContext.Provider>
    );
};

export default GitHubProvider;