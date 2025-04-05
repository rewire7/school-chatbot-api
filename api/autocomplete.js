export default async function handler(req, res) {
    const { keyword } = req.query;
  
    try {
      // Vercel에서는 환경 변수 대신 절대 경로 사용
      const response = await fetch(`https://school-chatbot-api.vercel.app/data/school.json`);
      const schoolList = await response.json();
  
      const results = schoolList.filter(name => name.includes(keyword));
      res.status(200).json(results.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }
   
  