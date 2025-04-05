// 자동완성 기능을 위한 API예요.
// 브라우저에서 /api/autocomplete?keyword=서울 이렇게 검색하면
// 학교 이름 중 "서울"이 들어간 것만 골라서 보여줘요.

export default async function handler(req, res) {
    const { keyword } = req.query; // 주소창에 keyword=서울 처럼 입력된 값 가져오기
  
    try {
      // public/data/school.json 파일에서 데이터 불러오기
      const response = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/data/school.json`);
      const schoolList = await response.json();
  
      // keyword가 포함된 학교만 찾기
      const results = schoolList.filter(name => name.includes(keyword));
  
      // 최대 10개만 보내주기
      res.status(200).json(results.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: '서버 에러 발생: ' + error.message });
    }
  }