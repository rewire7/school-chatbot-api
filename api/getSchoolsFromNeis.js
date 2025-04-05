// 파일: /api/getSchoolsFromNeis.js

export default async function handler(req, res) {
  const { region = "T10", schoolType = "중학교" } = req.query;

  const API_KEY = "c98ff808a2ed46859bcb7e096a3d076e"; // 네 API 키로 바꿔줘!
  const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=1000&ATPT_OFCDC_SC_CODE=${region}&SCHUL_KND_SC_NM=${encodeURIComponent(schoolType)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rows = data.schoolInfo?.[1]?.row || [];

    // ✅ 주소에 '세종'이 포함된 학교 제외
    const filtered = rows.filter(school => !school.ORG_RDNMA.includes("세종"));

    const result = filtered.map((school) => ({
      학교명: school.SCHUL_NM,
      주소: school.ORG_RDNMA,
      우편번호: school.ORG_RDNZIP,
      전화번호: school.ORG_TELNO,
      홈페이지: school.HMPG_ADRES
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "데이터를 불러오는 데 실패했어요." });
  }
}
