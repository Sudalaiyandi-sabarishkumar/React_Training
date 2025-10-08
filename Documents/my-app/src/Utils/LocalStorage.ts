export class LocalStorage {
    static setItem(key: string, value: unknown) {
      localStorage.setItem(key, JSON.stringify(value));
    }
   
    static getItem(key: string) {
      const data = localStorage.getItem(key);
      if (data && data !== "undefined") {
        try {
          return JSON.parse(data);
        } catch {
          return data ?? null;
        }
      }
      return null;
    }
   
    static removeItem(key: string) {
      localStorage.removeItem(key);
    }
   
    static clear() {
      localStorage.clear();
    }
  }