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

    if (host === 'www.intelligencemurders.com') {
        var target = uri + (needsTrailingSlash ? '/' : '');
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: 'https://intelligencemurders.com' + target + qs },
                'cache-control': { value: 'max-age=3600' }
            }
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
