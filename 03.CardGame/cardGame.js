document.addEventListener('DOMContentLoaded', () => {
    // 카드 그림 배열 생성
    const cardImages = ['cardImgs/apple.png',
        'cardImgs/banana.png',
        'cardImgs/grapes.png',
        'cardImgs/watermelon.png',
        'cardImgs/strawberry.png',
        'cardImgs/cherries.png',
        'cardImgs/peach.png',
        'cardImgs/pineapple.png'];
    let cards = [...cardImages, ...cardImages];  

    //array.sort()는 배열의 요소들을 정렬할 때 사용하는 메서드
    function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    }
    shuffle(cards);

    // 게임보드에 카드 생성
    const gameBoard = document.querySelector('.gameBoard');
    let flippedCards = [];

    //flipped 클래스: 화면 로딩하자마자 디폴트 값 (카드 과일이미지는 안보이고 파란배경만 보이는 상태) 
    function createBoard() {
        //card: cards배열의 요소
        cards.forEach((cardImg) => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');            

            const cardInner = document.createElement('div');
            cardInner.classList.add('cardInner');
            
            const cardFront = document.createElement('div');
            cardFront.classList.add('cardFront');
            
            const cardBack = document.createElement('div');
            cardBack.classList.add('cardBack');

            const imgElement = document.createElement('img');
            imgElement.src = cardImg;
            imgElement.alt = 'Card Image';
            imgElement.classList.add('CardPngs');
           
            cardBack.appendChild(imgElement); 
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardContainer.appendChild(cardInner);
            gameBoard.appendChild(cardContainer);          
        });
        //카드 뒷면 3초 보이기
        const allBackImg = document.querySelectorAll('.cardBack'); 
        const allFrontImg = document.querySelectorAll('.cardFront'); 
        setTimeout(()=>{
            allBackImg.forEach((Back) => {
                Back.classList.add('flipped');
            })
            allFrontImg.forEach((Front) => {
                Front.classList.add('flipped');
            })
        },3000)
    }
    createBoard();

    

    const Fronts = document.querySelectorAll('.cardFront');
    const Backs = document.querySelectorAll('.cardBack');
    let filppedCards = [];  //클릭한 카드들의 이미지 경로 저장
    let flippedCardElements = []; // 클릭한 카드의 DOM 요소 저장

    /* handleCardClick 함수만들면서 소감
    겪었던 문제점 :카드 2개가 안 맞았을 때 초기화가 안되서 카드가 안뒤집어짐.
    원인: 카드를 뒤집어야하는데 나는 이미지 경로를 저장한 filppedCards배열만 사용했다. 카드 요소, 즉 DOM요소를 서로 비교할 수 있는 비교군 자체가 없어서 초기화가 안됐던 것이었다.
    해결방법: 클릭한 카드의 DOM 요소 저장해주는 flippedCardElements배열 추가함.

    새로 생긴 궁금증: 클릭한 요소를 넣은 배열이 flippedCardElements니까 이 배열을 굳이 안쓰고 handleCardClick함수에 전달해준 매개변수 Front, Back에 e.target을 사용해서 좀 더 간단하게 코드를 짤수 없을까?

    결론: 안된다.
    이유: e.target은 이벤트가 발생한 순간에만 사용할 수 있다. 클릭한 시점에는 e.target으로 클릭된 요소에 접근할 수 있지만, 그 이벤트가 끝나고 나면 e.target은 더 이상 유지되지 않는다. 따라서 setTimeout기능이 필요한 이 함수에는 적절하지 않다.
    */
   
    function handleCardClick(Front, Back){
        //과일이미지 보이게, 컬러배경 안보이게
        Front.classList.remove('flipped');
        Back.classList.remove('flipped');
        flippedCards.push(Back.querySelector('img').src); 
        flippedCardElements.push({ Front, Back });

        // console.log('flippedCardElements:',flippedCardElements);
        // console.log('flippedCards:',flippedCards);

        let matchedCards = 0;
        function handleCardMatch() {
            matchedCards += 2; 
            if (matchedCards === 16) {
                alert('게임 종료! 모두 맞췄습니다.');
            }
        }

        //1개만 선택했을 때
        if(flippedCardElements.length === 1){
            return;
        }
        //2개가 일치했을 때
        if (flippedCards[0] === flippedCards[1]){
            handleCardMatch();
            flippedCards = [];
            flippedCardElements = [];
            
            console.log(matchedCards);
        }
            
        //2개가 일치하지 않았을 때
        else if(flippedCards[0] !== flippedCards[1]){
            setTimeout(() => {
                flippedCardElements.forEach(card => {
                    card.Front.classList.add('flipped');  
                    card.Back.classList.add('flipped');   
                });
                flippedCards = [];
                flippedCardElements = [];
            }, 1000);
        }       
        
    }  

    Fronts.forEach((Front, index) => {
        const Back = Backs[index]; //클릭한 front카드의 인덱스와 동일한 인덱스를 가진 뒷면카드
        Front.addEventListener('click', () => {
            handleCardClick(Front, Back);
            const startTime = Date.now();
        });
    });

    
    

    // 게임 종료
    function endGame() {
    alert('게임 종료! 모두 맞췄습니다.');
    }






});