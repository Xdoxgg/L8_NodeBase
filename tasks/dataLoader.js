// dataLoader.js
async function loadData(url) {
    const result = {
        data: [],
        isLoading: true,
        error: null,
    };

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        result.data = json;
    } catch (err) {
        result.error = err;
    } finally {
        result.isLoading = false;
    }

    return result;
}

module.exports = { loadData };
