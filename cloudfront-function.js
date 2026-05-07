// Pages deleted from this site that Google still has indexed.
// 301 to a new home where one exists; 410 Gone tells Google to drop the URL fast.
var REDIRECTS_301 = {
    '/epstein-murders/Details/Barry_Seal/': 'https://intelligencemurders.com/intelligence-service-murders/Details/Barry_Seal/'
};
var GONE_410 = {};

function handler(event) {
    var request = event.request;
    var host = request.headers.host && request.headers.host.value;
    var uri = request.uri;

    var qs = '';
    if (request.querystring) {
        var parts = [];
        for (var key in request.querystring) {
            var v = request.querystring[key];
            if (v.value !== undefined) {
                parts.push(key + '=' + v.value);
            } else {
                parts.push(key);
            }
        }
        if (parts.length > 0) qs = '?' + parts.join('&');
    }

    var lastSeg = uri.substring(uri.lastIndexOf('/') + 1);
    var needsTrailingSlash = uri !== '/' && uri.charAt(uri.length - 1) !== '/' && lastSeg.indexOf('.') === -1;
    var canonicalUri = needsTrailingSlash ? uri + '/' : uri;

    if (host === 'www.intelligencemurders.com') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: 'https://intelligencemurders.com' + canonicalUri + qs },
                'cache-control': { value: 'max-age=3600' }
            }
        };
    }

    if (REDIRECTS_301[canonicalUri]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: REDIRECTS_301[canonicalUri] },
                'cache-control': { value: 'max-age=86400' }
            }
        };
    }

    if (GONE_410[canonicalUri]) {
        return {
            statusCode: 410,
            statusDescription: 'Gone',
            headers: {
                'content-type': { value: 'text/html; charset=utf-8' },
                'cache-control': { value: 'max-age=86400' }
            },
            body: '<!doctype html><title>410 Gone</title><h1>Gone</h1><p>This page has been permanently removed.</p>'
        };
    }

    if (needsTrailingSlash) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: uri + '/' + qs },
                'cache-control': { value: 'max-age=3600' }
            }
        };
    }

    return request;
}
