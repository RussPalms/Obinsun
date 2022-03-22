export const idbKeyval = (() => {
  let dbInstance: any;

  function getDB() {
    if (dbInstance) return dbInstance;

    dbInstance = new Promise((resolve, reject) => {
      const openreq = indexedDB.open('svgo-keyval', 1);

      openreq.onerror = () => {
        reject(openreq.error);
      };

      openreq.onupgradeneeded = () => {
        // First time setup: create an empty object store
        openreq.result.createObjectStore('keyval');
      };

      openreq.onsuccess = () => {
        resolve(openreq.result);
      };
    });

    return dbInstance;
  }

  async function withStore(type: any, callback: any) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('keyval', type);
      transaction.oncomplete = () => resolve({} as any);
      transaction.onerror = () => reject(transaction.error);
      callback(transaction.objectStore('keyval'));
    });
  }

  return {
    async get(key: any) {
      let request: any;
      await withStore('readonly', (store: any) => {
        request = store.get(key);
      });
      return request.result;
    },
    set(key: any, value: any) {
      return withStore('readwrite', (store: any) => {
        store.put(value, key);
      });
    },
    delete(key: any) {
      return withStore('readwrite', (store: any) => {
        store.delete(key);
      });
    },
  };
})();
