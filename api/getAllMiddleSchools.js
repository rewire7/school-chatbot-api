// 충청남도 중학교 목록을 반환하는 API

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    // 파일 경로를 정확히 지정
    const filePath = path.join(process.cwd(), 'public', 'data', 'school.json');

    // 파일 내용을 읽어와 JSON으로 파싱
    const fileContents = await fs.readFile(filePath, 'utf8');
    const schoolList = JSON.parse(fileContents);

    // 충청남도 + 중학교만 필터링
    const filtered = schoolList.filter(
      (school) =>
        school.주소.includes('충청남도') && school.학교종류 === '중학교'
    );

    // 결과 반환
    res.status(200).json(filtered);
  } catch (error) {
    // 에러가 나면 여기로 와서 로그 출력
    console.error('에러 발생:', error);
    res.status(500).json({ error: '서버 에러 발생: ' + error.message });
  }
}

  