import { useEffect } from 'react';
import Content from './Production/Layout/Content';

export default function RequestPage() {
  //   useEffect(() => {
  const useRequest = (e) => {
    e.preventDefault();

    try {
      const fetchWithAutoRetry = (fetcher: any, maxRetryCount: number) => {
        return new Promise((resolve, reject) => {
          let retries = 0;
          const caller = () =>
            fetcher()
              .then((data: any) => {
                resolve(data);
              })
              .catch((error: any) => {
                // console.log('fetch error: ', error);
                if (retries < maxRetryCount) {
                  retries++;
                  console.log(retries);
                  caller();
                } else {
                  reject(error);
                }
              });
          retries = 1;
          caller();
        });
      };

      const fetchGithubProfile = async () => {
        // try {
        console.log('Fetching github profile . . .');
        const rawResponse = await fetch(
          'https://api.github.com/users/russpalms'
        );
        // .then((response) => response.json())
        // .catch((error) => console.log(error));
        const jsonResponse = await rawResponse.json();
        // .catch((error: any) => console.log(error));
        console.log(jsonResponse);
        return jsonResponse;
        // } catch (errors) {
        //   console.log(errors);
        // }
      };

      fetchWithAutoRetry(fetchGithubProfile, 5);
    } catch (error) {
      console.log('promise error: ', error);
    }
  };

  //   }, []);

  //   function fetchWithAutoRetry(fetcher, maxRetryCount) {
  //     return new Promise((resolve, reject) => {
  //       let retries = 0;
  //       const caller = () =>
  //         fetcher()
  //           .then((data) => {
  //             resolve(data);
  //           })
  //           .catch((error) => {
  //             if (retries < maxRetryCount) {
  //               retries++;
  //               caller();
  //             } else {
  //               reject(error);
  //             }
  //           });
  //       retries = 1;
  //       caller();
  //     });
  //   }

  //   useEffect(() => {
  //     const fetchSouravProfile = async () => {
  //       console.log('Fetching..');
  //       const rawResponse = await fetch(
  //         'https://api.github.com/users/sourav-singhhh'
  //       );
  //       const jsonResponse = await rawResponse.json();
  //       console.log(jsonResponse);
  //       return jsonResponse;
  //     };

  //     fetchWithAutoRetry(fetchSouravProfile, 5);
  //   }, [fetchWithAutoRetry]);

  return (
    <Content title="" description="">
      <button
        onClick={(e) => {
          useRequest(e);
        }}
      >
        Request Button
      </button>
    </Content>
  );
}

// export const getServerSideProps = async () => {
//   async function fetchWithAutoRetry(fetcher: any, maxRetryCount: number) {
//     return new Promise((resolve, reject) => {
//       let retries = 0;
//       const caller = () =>
//         fetcher()
//           .then((data: any) => {
//             resolve(data);
//           })
//           .catch((error: any) => {
//             // console.log('fetch error: ', error);
//             if (retries < maxRetryCount) {
//               retries++;
//               caller();
//             } else {
//               reject(error);
//             }
//           });
//       retries = 1;
//       caller();
//     });
//   }

//   const fetchGithubProfile = async () => {
//     console.log('Fetching github profile . . .');
//     const rawResponse = await fetch('https://api.github.com/users/russpalmss');
//     const jsonResponse = await rawResponse.json();
//     console.log(jsonResponse);
//     return jsonResponse;
//   };

//   fetchWithAutoRetry(fetchGithubProfile, 5);

//   return { props: {} };
// };
