export default async function handler(req, res) {
    const { keyword } = req.query;
  
    try {
      const response = await fetch(`https://school-chatbot-api.vercel.app/public/data/school.json`);
      const schoolList = await response.json();
  
      const results = schoolList
        .map(item => typeof item === 'string' ? item : item.name)
        .filter(name => typeof name === 'string' && name.includes(keyword));
  
      res.status(200).json(results.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }
    
  