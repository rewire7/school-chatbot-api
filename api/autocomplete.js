export default async function handler(req, res) {
    const { keyword } = req.query;
  
    try {
      const response = await fetch(`https://school-chatbot-api.vercel.app/data/school.json`);
      const schoolList = await response.json();
  
      // 학교명 문자열 배열이라면 이렇게!
      const results = schoolList.filter(name => name.includes(keyword));
  
      res.status(200).json(results.slice(0, 10)); // 10개만 보내기
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }
  
  