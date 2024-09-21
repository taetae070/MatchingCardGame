document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.startBtn');
    const yesBtn = document.querySelector('.yesBtn');
    const noBtn = document.querySelector('.noBtn');
    const screenTimer = document.getElementById('timer');
    let timerInterval;
    let elapsedTime;
    let timeLimit = 10; 
    screenTimer.textContent = '타이머: 00:00';

    function startQuestionTimer(timeOver, timeLimit) {
        const startTime = Date.now();
        timerInterval = setInterval(() => {
            const currentTime = Date.now();
            elapsedTime = ((currentTime - startTime) / 1000).toFixed(0); // 초 단위 계산
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = (elapsedTime % 60).toString().padStart(2, '0');
            screenTimer.textContent = `타이머: ${minutes}:${seconds}`;
            if (elapsedTime >= timeLimit) {
                timeOver(); 
            }
        }, 300); 
    }
    
     yesBtn.addEventListener('click', () => {
         alert('정답 입니다.')
         clearInterval(timerInterval);
         noBtn.disabled = true;
         startBtn.textContent = 'restart'; 
     })
     noBtn.addEventListener('click', () => {
         alert('틀렸습니다.')
         clearInterval(timerInterval);
         yesBtn.disabled = true;  
         startBtn.textContent = 'restart'; 
     })   

    const timeOver = () => {
        clearInterval(timerInterval);
        alert('타임오버!');
        startBtn.textContent = 'restart'; 
        yesBtn.disabled = true;  
        noBtn.disabled = true;
    };

    startBtn.addEventListener('click', () => {
        startQuestionTimer(timeOver, timeLimit); 
        yesBtn.disabled = false;  
        noBtn.disabled = false;
    });
});