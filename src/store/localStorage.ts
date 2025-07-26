export function saveData<T>(key: string, data: T): void {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
}

export function loadData<T>(key: string): T | null {
  try {
    const json = localStorage.getItem(key);
    if (!json) return null;
    return JSON.parse(json) as T;
  } catch (error) {
    console.error("Ошибка чтения из localStorage:", error);
    return null;
  }
}

export function removeData(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Ошибка удаления из localStorage:", error);
  }
}
