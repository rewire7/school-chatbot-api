// 파일 경로와 파일 읽기 도구 불러오기
import path from 'path';
import { promises as fs } from 'fs';

// 이건 우리가 만든 API 함수야!
export default async function handler(req, res) {
  try {
    // school.json 파일 경로를 찾아서
    const filePath = path.join(process.cwd(), 'public', 'data', 'school.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const schoolList = JSON.parse(fileContents); // 읽은 내용을 JSON으로 바꿔줘

    // 여기서 조건을 넣어 필터링해!
    const filtered = schoolList.filter(
      (school) =>
        (school.주소.includes('충청남도') || school.주소.includes('충남')) &&
        school.학교종류.includes('중')
    );

    // 필터된 결과를 JSON으로 보내줘
    res.status(200).json(filtered);
  } catch (error) {
    // 에러가 나면 사용자에게 알려줘
    console.error('에러 발생:', error);
    res.status(500).json({ error: '서버 에러 발생: ' + error.message });
  }
}
