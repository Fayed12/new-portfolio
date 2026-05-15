// axios
import axios from "axios";

const query = `query GetGithubDashboard($username: String!) {
  user(login: $username) {
    login
    name
    avatarUrl
    bio
    url
    followers {
      totalCount
    }
    following {
      totalCount
    }

    repositories(
      first: 100
      ownerAffiliations: OWNER
      privacy: PUBLIC
    ) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        description
        primaryLanguage {
          name
          color
        }
      }
    }

    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          id
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }

    contributionsCollection {
      contributionCalendar {
        totalContributions

        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }

      contributionYears

      commitContributionsByRepository {
        repository {
          name
        }
        contributions(first: 100) {
          totalCount
        }
      }

      contributionCalendar {
        totalContributions
      }
    }
  }
}`

async function githubFetch() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const res = await axios.post(
        "https://api.github.com/graphql",
        {
            query,
            variables: { username: "Fayed12" },
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const user = res.data.data.user;

    // total stars
    const totalStars = user.repositories.nodes.reduce(
        (acc, repo) => acc + repo.stargazerCount,
        0
    );

    // top language
    const languageMap = {};

    user.repositories.nodes.forEach((repo) => {
        const lang = repo.primaryLanguage?.name;

        if (lang) {
            languageMap[lang] =
                (languageMap[lang] || 0) + 1;
        }
    });

    const topLanguage = Object.entries(languageMap)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

    return {
        profile: {
            avatar: user.avatarUrl,
            username: user.login,
            bio: user.bio,
            githubUrl: user.url,
            name: user.name,
        },

        stats: {
            repos: user.repositories.totalCount,
            followers: user.followers.totalCount,
            following: user.following.totalCount,
            totalStars,
            totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
            topLanguage,
        },
        contributionGraph: user.contributionsCollection.contributionCalendar.weeks,

        pinnedRepos: user.pinnedItems.nodes,
    };
}

export default githubFetch