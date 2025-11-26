export function forceConvertDomain(url) {
    if (url) {
        const path = new URL(url).pathname;
        return `https://backend-secure.quyosh-panellari.uz${path}`;
        
    }
}
