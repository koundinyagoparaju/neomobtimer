

export function saveState(state) {
    hasLocalStorage() && localStorage.setItem('state', JSON.stringify(state));
}

export function getState() {
    return hasLocalStorage() && JSON.parse(localStorage.getItem('state'));
}

export function hasState() {
    return hasLocalStorage() && localStorage.getItem('state') !== null;
}

function hasLocalStorage() {
    return typeof window !== "undefined";
}