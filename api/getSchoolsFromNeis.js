// api/getSchoolsFromNeis.js
export default async function handler(req, res) {
  const API_KEY = "c98ff808a2ed46859bcb7e096a3d076e"; // 네 인증키 넣기
  const regionCode = "I10"; // 충청남도 교육청 코드
  const schoolType = "중학교"; // 중학교

  const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SCHUL_KND_SC_NM=${schoolType}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const rows = data.schoolInfo?.[1]?.row || [];

    const result = rows.map((school) => ({
      학교명: school.SCHUL_NM,
      주소: school.ORG_RDNMA,
      우편번호: school.ORG_RDNZIP,
      전화번호: school.ORG_TELNO,
      홈페이지: school.HMPG_ADRES,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "데이터를 가져오는 중 오류가 발생했어요!" });
  }
}

