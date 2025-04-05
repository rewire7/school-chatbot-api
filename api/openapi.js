// 📁 api/openapi.js
export default function handler(req, res) {
    res.setHeader('Content-Type', 'application/json'); // ✅ GPT가 좋아하는 타입!
    res.status(200).json({
      openapi: "3.1.0",
      info: {
        title: "학교 리스트 API",
        version: "1.0.0",
        description: "지역별 + 학교급에 따른 학교 리스트를 마크다운 표로 반환합니다."
      },
      servers: [
        {
          url: "https://school-chatbot-api.vercel.app"
        }
      ],
      paths: {
        "/api/getSchoolsFromNeis": {
          get: {
            operationId: "getSchoolsByRegionAndType",
            summary: "지역과 학교급으로 학교 목록 가져오기",
            description: "입력된 교육청 지역코드와 학교급(초등학교, 중학교, 고등학교)에 따라 학교 정보를 마크다운 표로 반환합니다.",
            parameters: [
              {
                name: "region",
                in: "query",
                description: "교육청 코드 (예: T10 = 충남, P10 = 서울)",
                required: false,
                schema: {
                  type: "string",
                  example: "T10"
                }
              },
              {
                name: "schoolType",
                in: "query",
                description: "학교급 (초등학교 | 중학교 | 고등학교)",
                required: false,
                schema: {
                  type: "string",
                  example: "중학교"
                }
              }
            ],
            responses: {
              "200": {
                description: "마크다운 형식의 학교 목록",
                content: {
                  "text/plain": {
                    schema: {
                      type: "string",
                      example: "| 학교명 | 주소 | 전화번호 | 홈페이지 |\n|--------|--------|------------|-----------|"
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  