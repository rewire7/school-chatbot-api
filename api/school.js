// 파일: /api/school.js
import axios from "axios";

const API_KEY = "91464e07fb874c39b7a28ff2356d16b1"; // 너의 학교알리미 인증키
const API_URL = "http://www.schoolinfo.go.kr/openApi.do";

export default async function handler(req, res) {
  const { name = "", year = "2023", level = "03" } = req.query;
  // name = 학교명, year = 공시연도, level = 02:초등, 03:중등, 04:고등

  try {
    // 1️⃣ 학교 기본 정보 가져오기
    const baseInfoRes = await axios.get(API_URL, {
      params: {
        apiKey: API_KEY,
        apiType: "0",
        schulKndCode: level,
        pbanYr: year,
        schulNm: name,
        returnType: "json",
      },
    });

    const school = baseInfoRes.data?.schoolInfo?.[1]?.row?.[0];
    if (!school) {
      return res.status(404).json({ message: "학교 정보를 찾을 수 없습니다." });
    }

    // 2️⃣ 데이터 가공 및 응답
    const result = {
      학교명: school.schoolName,
      주소: school.orgRdnma,
      우편번호: school.orgRdnzip,
      전화번호: school.orgTelno,
      팩스번호: school.orgFaxno,
      홈페이지: school.homepage,
      설립일자: school.fondYmd,
      설립형태: school.fondType,
      관할청: school.eduOfficeName,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("에러:", error);
    res.status(500).json({ error: "학교 정보를 불러오는 데 실패했어요." });
  }
}

