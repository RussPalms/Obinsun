export default async function fetchWithAutoRetry(fetcher, maxRetryCount) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const caller = () =>
      fetcher()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (retries < maxRetryCount) {
            retries++;
            caller();
          } else {
            reject(error);
          }
        });
    retries = 1;
    caller();
  });
}

const fetchGithubProfile = async () => {
  const rawResponse = await fetch('https://github.com/users/russpalms');
  const jsonResponse = await rawResponse.json();
  console.log(jsonResponse);
  return jsonResponse;
};

fetchWithAutoRetry(fetchGithubProfile, 5);
