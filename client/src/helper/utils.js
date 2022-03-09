export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

export function storeValue(key, value) {
  sessionStorage.setItem(key, value);
}

export function getValue(key) {
  return sessionStorage.getItem(key);
}

export function removeValue(key) {
  sessionStorage.removeItem(key);
}

export function clearSession() {
  sessionStorage.clear();
}

export function uidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "_" + S4() + "_" + S4() + "_" + S4() + "_" + S4() + S4();
}

export const getTime = () =>
  new Date().toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
