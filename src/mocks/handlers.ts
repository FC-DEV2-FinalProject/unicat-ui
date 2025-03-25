import { rest } from 'msw';

const BASE_URL = 'https://api.unicat.day';

export const handlers = [
    // 토큰 리프레시 핸들러
    rest.post(`${BASE_URL}/auth/token/refresh`, (req, res, ctx) => {
        // 요청 헤더에서 토큰 확인
        const authHeader = req.headers.get('Authorization');
        console.log('MSW: Refresh Token Request with Authorization:', authHeader);

        if (!authHeader?.startsWith('Bearer ')) {
            return res(
                ctx.status(401),
                ctx.json({ message: 'Invalid token' })
            );
        }

        // 새로운 토큰 생성
        const newToken = 'eyJraWQiOiJyc2EtcHJvZC1rZXktaWQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1Iiwic3Vic2NyaXB0aW9uIjoiQkFTSUMiLCJleHAiOjE3NDM0OTMyNTgsImlhdCI6MTc0Mjg4ODQ1OCwiZW1haWwiOiJ3aHdqZGFuQGdtYWlsLmNvbSJ9.NEW_SIGNATURE';

        return res(
            ctx.status(200),
            ctx.set('Authorization', `Bearer ${newToken}`),
            ctx.json({
                message: 'Token refreshed successfully'
            })
        );
    }),
]; 