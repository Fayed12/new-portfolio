// local
import styles from "./home.module.css"
import githubFetch from "../../../services/getGitHubData"
import { useEffect, useState } from "react"

const query = `
  query($username: String!) {
    user(login: $username) {

      login
      name

      followers {
        totalCount
      }

      following {
        totalCount
      }

      repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: STARGAZERS, direction: DESC }) {
        totalCount

        nodes {
          name
          description
          url

          stargazerCount
          forkCount

          createdAt
          updatedAt

          primaryLanguage {
            name
            color
          }

          languages(first: 5) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export default function Home() {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                const data = await githubFetch(query, {
                    username: "Fayed12"
                })
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])

    console.log(data)

    return (
        <main className={styles.main}>
            <h1>Home</h1>
        </main>
    )
}