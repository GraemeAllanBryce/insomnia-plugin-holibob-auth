const crypto = require("crypto");

const generateHashSignature = ({
    algorithm = "sha1",
    secret,
    date,
    apiKey,
    method,
    path,
    body,
}) => {
    const hmac = crypto.createHmac(algorithm, secret);

    hmac.update(date);
    hmac.update(apiKey);
    hmac.update(method);
    hmac.update(path);
    hmac.update(body);

    const hash = hmac.digest("base64");

    return hash;
};

module.exports = (context) => {
    const request = context.request;

    const apiKey = request.getEnvironmentVariable("holibobApiKey");
    const secret = request.getEnvironmentVariable("holibobSecret");

    if (secret === undefined || apiKey === undefined) {
        return;
    }

    const doc = document.createElement("a");
    doc.href = request.getUrl();

    const date = new Date().toISOString();
    const method = request.getMethod();
    const path = doc.pathname;
    const body = request.getBodyText();

    const hash = generateHashSignature({
        secret,
        date,
        apiKey,
        method,
        path,
        body,
    });

    request.setHeader("x-api-key", apiKey);
    request.setHeader("x-holibob-date", date);
    request.setHeader("x-holibob-signature", hash);
};
