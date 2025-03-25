(async () => {
    const https = await import("https");
    const { parse } = await import("url");
    const next = await import("next");
    const { Buffer } = await import("buffer");
    const dev = process.env.NODE_ENV !== "production";
    const app = next.default({ dev }); // next는 ESM 모듈이므로 `.default` 필요
    const handle = app.getRequestHandler();
    function getHttpsOptions() {
        const certBase64 = process.env.CERT_BASE64;
        const keyBase64 = process.env.KEY_BASE64;
        if (!certBase64 || !keyBase64) {
            console.error(":x: 인증서 환경 변수가 설정되지 않았습니다.");
            process.exit(1);
        }
        return {
            cert: Buffer.from(certBase64, "base64"),
            key: Buffer.from(keyBase64, "base64"),
        };
    }
    app.prepare().then(() => {
        const httpsOptions = getHttpsOptions();
        https.createServer(httpsOptions, (req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        }).listen(443, () => {
            console.log(":로켓: HTTPS Next.js 개발 서버 실행: https://unicat.day");
            console.log(":로켓: 접속 안되면 thisisunsafe 엔터");
            console.log(":로켓: 로컬은 : https://localhost:443");
        });
    });
})();