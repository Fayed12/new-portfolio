// axios
import axios from "axios";

async function githubFetch(query, variables = {}) {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const res = await axios.post(
        "https://api.github.com/graphql",
        {
            query,
            variables,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data.data;
}

export default githubFetch