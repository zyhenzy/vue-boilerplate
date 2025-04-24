
import CryptoJS from 'crypto-js'

const AUTH_KEY = 'Authorization';

function assemble (httpMethod, requestUrl, apiKey, apiSecret, body, apiKeyKey) {
    if (!httpMethod) {
        throw new Error('httpMethod is empty.');
    }
    if (!requestUrl) {
        throw new Error('requestUrl is empty.');
    }
    if (!apiKey) {
        throw new Error('apiKey is empty.');
    }
    if (!apiSecret) {
        throw new Error('apiSecret is empty.');
    }

    const httpRequestUrl = requestUrl.replace('ws://', 'http://').replace('wss://', 'https://');
    const url = new URL(httpRequestUrl);
    const dateStr = new Date().toUTCString();
    const sha = getSignature(url.hostname, dateStr, getRequestLine(httpMethod, url.pathname), apiSecret);

    let digest = null;
    if (body) {
        digest = signBody(body);
    }
    apiKeyKey = !apiKeyKey ? 'hmac api_key' : apiKeyKey;
    const authorization = apiKeyKey + '="' + apiKey + '", algorithm="hmac-sha256", headers="host date request-line' + (!digest ? '' : ' digest') + '", signature="' + sha + '"';
    const authorizationData = {};
    authorizationData.date = dateStr;
    authorizationData.host = url.hostname;
    authorizationData.authorization = authorization;
    authorizationData.digest = digest;
    return authorizationData;
}

function signBody (body) {
    if (!body) {
        throw new Error('body is empty.');
    }
    const sha256 = CryptoJS.SHA256(body);
    return CryptoJS.enc.Base64.stringify(sha256);
}

function getRequestLine (method, path) {
    return method.toUpperCase() + ' ' + path + ' HTTP/1.1';
}

function getSignature (host, date, requestLine, apiSecret) {
    if (!host) {
        throw new Error('host is empty.');
    }

    if (!date) {
        throw new Error('date is empty.')
    }

    if (!requestLine) {
        throw new Error('requestLine is empty.')
    }
    if (!apiSecret) {
        throw new Error('apiSecret is empty.')
    }

    const str = 'host: ' + host + '\n' + 'date: ' + date + '\n' + requestLine;
    const hmacHasher = CryptoJS.HmacSHA256(str, apiSecret);
    return CryptoJS.enc.Base64.stringify(hmacHasher);
}

export function generateAuthUrl (apiKey, apiSecret, url, body, apiKeyKey) {
    if (!apiKey) {
        throw new Error('apiKey is empty.');
    }
    if (!apiSecret) {
        throw new Error('apiSecret is empty.');
    }
    if (!url) {
        throw new Error('url is empty.');
    }

    var authorizationData = assemble('GET', url, apiKey, apiSecret, body, apiKeyKey);
    var authBase = window.btoa(authorizationData.authorization);
    authBase = url + '?' + AUTH_KEY.toLowerCase() + '=' + encodeURIComponent(authBase) + '&host=' + encodeURIComponent(authorizationData.host) + '&date=' + encodeURIComponent(authorizationData.date);
    return authBase;
}
