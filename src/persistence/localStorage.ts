export function loadFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
        try {
            const parsed = JSON.parse(data);
            return parsed;
        } catch (e) {
            console.error('Recovery from local storage failed');
            return;
        }
    }
}

export function saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}
