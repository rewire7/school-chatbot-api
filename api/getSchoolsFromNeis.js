// ✅ getSchoolsFromNeis.js

export default async function handler(req, res) {
  const API_KEY = "c98ff808a2ed46859bcb7e096a3d076e"; // 너의 API 키
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
      팩스번호: school.FAXNO,
      홈페이지: school.HMPG_ADRES
    }));

    // ✅ 마크다운 표 만드는 함수
    function makeMarkdownTable(schoolList) {
      if (!schoolList || schoolList.length === 0) {
        return "❌ 학교 정보가 없어요!";
      }

      const headers = Object.keys(schoolList[0]);
      let markdown = `| ${headers.join(" | ")} |\n`;
      markdown += `| ${headers.map(() => "---").join(" | ")} |\n`;

      schoolList.forEach((school) => {
        const row = headers.map((key) => school[key] ?? "").join(" | ");
        markdown += `| ${row} |\n`;
      });

      return markdown;
    }

    // ✅ 마크다운으로 변환해서 응답
    const markdown = makeMarkdownTable(result);
    res.status(200).send(markdown);
  } catch (error) {
    res.status(500).json({ error: "데이터를 가져오는 중 오류가 발생했어요!" });
  }
}
