export function setStorage(key, value) {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
export function getStorage(key) {
  if (key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
