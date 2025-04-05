// getAllMiddleSchools.js
import fs from 'fs';         // 파일을 저장하려면 필요해요!
import axios from 'axios';   // 인터넷에서 정보 가져오는 친구!

// 🔑 API 인증키 넣기 (꼭 본인 키로 바꾸세요!)
const API_KEY = 'c98ff808a2ed46859bcb7e096a3d076e';

// API 주소 만들기 (충남 중학교만 찾기!)
const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=1000&ATPT_OFCDC_SC_CODE=F10&SCHUL_KND_SC_NM=${encodeURIComponent('중학교')}`;

// 🧠 컴퓨터야! 이 코드 실행해줘!
(async () => {
  try {
    const response = await axios.get(url);            // 정보 가져오기
    const rows = response.data.schoolInfo[1].row;     // 학교 목록만 골라내기

    // 🏫 학교들 정리하기!
    const schoolList = rows.map((s, idx) => ({
      번호: idx + 1,
      학교명: s.SCHUL_NM,
      주소: s.ORG_RDNMA,
      우편번호: s.ORG_RDNZC,
      전화번호: s.ORG_TELNO,
      홈페이지: s.HMPG_ADRES || '없음',
    }));

    // 💾 정리된 걸 파일로 저장!
    fs.writeFileSync('./public/data/school.json', JSON.stringify(schoolList, null, 2), 'utf8');
    console.log('✅ 충남 중학교 리스트 저장 완료!');
  } catch (error) {
    console.error('❌ 에러 발생:', error.message);
  }
})();
