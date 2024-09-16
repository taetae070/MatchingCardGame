const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const cors = require('cors'); 

app.get('/', (req, res) => {
res.send('Hello World!'); 
});

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27018/mydatabase')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));


// Mongoose 스키마 정의
const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  // 모델 생성
  const Assignment = mongoose.model('Assignment', assignmentSchema, 'assignments');

  // Assignment 데이터를 가져오는 API
  app.get('/assignments', async (req, res) => {
    try {
      const assignments = await Assignment.find();
      console.log(assignments);  // 가져온 데이터를 콘솔에 출력
      res.json(assignments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// 미들웨어 설정
app.use(express.json()); //클라이언트에서 JSON 형식의 데이터를 보낼 때 이를 파싱
app.use(express.urlencoded({extended:false})); //URL-encoded 데이터를 파싱 (주로 HTML 폼 데이터를 처리할 때 사용, 파싱:데이터를 변환하는 과정)
app.use(cors()); //CORS 설정을 활성화하여, 외부에서 서버에 접근할 수 있도록 허용

// 서버 실행
app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});
