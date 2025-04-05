export default async function handler(req, res) {
    const { keyword } = req.query;
  
    try {
      // school.json의 절대 경로를 가져와서 fetch
      const response = await fetch('https://school-chatbot-api.vercel.app/public/data/school.json');
      const schoolList = await response.json();
  
      // 혹시 schoolList가 배열이 아닐 경우 예외 처리
      if (!Array.isArray(schoolList)) {
        throw new Error('schoolList가 배열이 아님');
      }
  
      // 자동완성: 키워드를 포함하는 이름 필터링
      const results = schoolList.filter(name =>
        typeof name === 'string' && name.includes(keyword)
      );
  
      res.status(200).json(results.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }
  
  