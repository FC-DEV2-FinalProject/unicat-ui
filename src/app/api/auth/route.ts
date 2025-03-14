import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    console.log('Attempting to connect to backend...');
    const cert = fs.readFileSync(path.join(process.cwd(), '.cert', 'unicat.day.crt.sample'));
    const key = fs.readFileSync(path.join(process.cwd(), '.cert', 'private_key.sample'));

    const response = await axios.get(`${process.env.API_URL}/oauth-links`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      httpsAgent: new https.Agent({
        cert: cert,
        key: key,
        servername: 'unicat.day',
        rejectUnauthorized: false
      })
    });

    console.log('Backend response received:', response.data);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.log('Detailed connection error:', {
      error,
      message: error instanceof Error ? error.message : '알 수 없는 오류',
      response: error instanceof Error && 'response' in error ? (error as { response?: { data: unknown } }).response?.data : null,
      config: error instanceof Error && 'config' in error ? (error as { config?: unknown }).config : null
    });

    if (error instanceof Error) {
      console.error('Detailed API Error:', {
        message: error.message,
        response: error instanceof Error && 'response' in error ? error.response : null
      });

      if ('response' in error && error.response) {
        const axiosError = error as { response: { data: unknown; status: number } };
        return NextResponse.json(
          axiosError.response.data,
          { status: axiosError.response.status }
        );
      }
    }

    return NextResponse.json(
      { error: '서버 연결 중 오류가 발생했습니다.', details: error instanceof Error ? error.message : '알 수 없는 오류' },
      { status: 500 }
    );
  }
} 