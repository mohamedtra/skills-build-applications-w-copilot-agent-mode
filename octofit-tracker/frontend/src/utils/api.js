export const API_BASE_URL = (() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }

    return 'http://localhost:8000';
})();

export function buildApiUrl(resource) {
    const normalizedResource = String(resource).replace(/^\/+|\/+$/g, '');
    return `${API_BASE_URL}/api/${normalizedResource}/`;
}

export function normalizeRecords(payload) {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (!payload || typeof payload !== 'object') {
        return [];
    }

    const candidateKeys = ['results', 'data', 'items', 'records'];

    for (const key of candidateKeys) {
        if (Array.isArray(payload[key])) {
            return payload[key];
        }
    }

    return [];
}
