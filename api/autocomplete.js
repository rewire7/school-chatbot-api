export default async function handler(req, res) {
    const { keyword } = req.query;
  
    try {
      // JSON 파일을 fetch로 읽어오기 (주소로 접근)
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
  
      const response = await fetch(`${baseUrl}/data/school.json`);
      const schoolList = await response.json();
  
      const results = schoolList.filter(name => name.includes(keyword));
      res.status(200).json(results.slice(0, 10)); // 최대 10개만
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }
  