import axios from "axios";

const getRepoCommits = async function(repository) {
  const repositoryName = repository.split("/");
  const repoOwner = repositoryName[3];
  const repoName = repositoryName[4].substring(0, repositoryName[4].length - 4);

  try {
    const { data } = await axios(
      `https://api.github.com/repos/${repoOwner}/${repoName}/commits`
    );

    if (data) return data;
    return "Error";
  } catch (error) {
    console.log("Error: ", error); //this can be changed for a logger tool or throw an exception
  }
};

export { getRepoCommits };
