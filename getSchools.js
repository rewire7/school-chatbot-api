// getSchools.js
import fs from 'fs';
import axios from 'axios';

const API_KEY = 'c98ff808a2ed46859bcb7e096a3d076e'; // 👉 본인 인증키

const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=1000`;

(async () => {
  try {
    const response = await axios.get(url);
    const rows = response.data.schoolInfo[1].row;

    // 학교 이름만 뽑기
    const schoolNames = rows.map(s => s.SCHUL_NM);

    // 👉 api/data/school.json 에 저장!
    fs.writeFileSync('./api/data/school.json', JSON.stringify(schoolNames, null, 2), 'utf8');
    console.log('✅ school.json 저장 완료!');
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
})();
