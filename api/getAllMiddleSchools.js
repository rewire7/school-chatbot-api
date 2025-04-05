// API가 실행되면 중학교만 뽑아서 보여주는 코드야
export default function handler(req, res) {
    // 파일을 읽기 위한 준비
    const fs = require('fs');
    const path = require('path');
  
    // school.json 파일의 위치를 알려줘
    const filePath = path.join(process.cwd(), 'public', 'data', 'school.json');
  
    // JSON 파일을 열어서 데이터를 불러와
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
    // 주소에 '충청남도'가 들어있고, 학교종류가 '중학교'인 것만 골라줘
    const filtered = jsonData.filter(school =>
      school.주소.includes('충청남도') && school.학교종류 === '중학교'
    );
  
    // 결과를 JSON으로 보여줘
    res.status(200).json(filtered);
  }
  