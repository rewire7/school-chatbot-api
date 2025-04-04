import axios from 'axios';

export default async function handler(req, res) {
  const { name } = req.query;

  const API_KEY = 'c98ff808a2ed46859bcb7e096a3d076e';

  const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&SCHUL_NM=${encodeURIComponent(name)}`;
  console.log("요청 URL:", url);  // 디버깅용 로그

  try {
    const response = await axios.get(url);

    const school = response.data?.schoolInfo?.[1]?.row?.[0]; // <-- 안전하게 꺼내기

    if (school) {
      res.status(200).json({
        name: school.SCHUL_NM,
        address: school.ORG_RDNMA,
        type: school.FOND_SC_NM,
        kind: school.SCHUL_KND_SC_NM,
        tel: school.ORG_TELNO,
        homepage: school.HMPG_ADRES,
      });
    } else {
      res.status(404).json({ error: '학교 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
