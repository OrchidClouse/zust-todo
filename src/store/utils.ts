export const addToLocalStorage = (key: string, value: any) => {
	const serializedValue = JSON.stringify(value);
	localStorage.setItem(key, serializedValue);
}