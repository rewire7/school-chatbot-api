export default async function handler(req, res) {
    const { keyword } = req.query;
  
    try {
      // school.json 파일 가져오기
      const response = await fetch('https://school-chatbot-api.vercel.app/data/school.json');
      const schoolList = await response.json();
  
      // schoolList는 [{ 학교명: "OO초등학교", ... }, ...] 형태니까
      // 학교명에 keyword가 포함된 학교만 골라오기
      const results = schoolList.filter(school =>
        school["학교명"] && school["학교명"].includes(keyword)
      );
  
      // 최대 10개만 응답으로 보내기
      res.status(200).json(results.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }
  
  
  