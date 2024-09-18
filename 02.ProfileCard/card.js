document.addEventListener('DOMContentLoaded', () => {
    const profileData = {
        person1: {
            imgSrc: './profileImgs/1.png',
            name: 'aaabbbcccdddeeefff',
            description: 'I like apples',
          },
        person2: {
            imgSrc: './profileImgs/2.png',
            name: 'bbb',
            description: 'I like bananas bananas bananas bananas bananas bananas bananas',
          },
        person3: {
            imgSrc: './profileImgs/3.png',
            name: 'ccc',
            description: 'I like cinnamon cinnamon cinnamon cinnamon cinnamon cinnamon cinnamon',
          },
        person4: {
            imgSrc: '',
            name: 'ddd',
            description: 'I like dandelions',
          },
    }

    //profile list 만들기
    function createProfileLi() {
        const profileUl = document.getElementById('profileUl');

        //for...in: 객체의 열거 가능한 모든 속성을 반복하는 루프
        for( const key in profileData){
            const person = profileData[key];

            const li = document.createElement('li');
            const article = document.createElement('article');
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.classList.add('profileImg');
            const figcaption = document.createElement('figcaption');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            
            //체크박스
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add('imgWrapper');
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox'; 
            checkBox.classList.add('profileCheckbox'); 

            // 데이터 삽입
            img.src = person.imgSrc;
            img.alt = `Profile picture of ${person.name}`;
            h2.textContent = person.name;
            p.textContent = person.description;

            // 전체 구성
            figcaption.appendChild(h2);
            figcaption.appendChild(p);
            imgWrapper.appendChild(img);
            imgWrapper.appendChild(checkBox);
            figure.appendChild(imgWrapper);
            figure.appendChild(figcaption);
            article.appendChild(figure);
            li.appendChild(article);
            profileUl.appendChild(li);    
            
            //대체 이미지
            img.onerror = function () {
            this.onerror = null;
            this.src = './profileImgs/base.png';
            };
        }      
    }   
     createProfileLi();


    //checkBox click event
    const checkBoxs = document.querySelectorAll('.profileCheckbox');
    checkBoxs.forEach((box) =>{
        box.addEventListener('click', (e) => {
            const theProfile = box.closest('li');
            const theImg = theProfile.querySelector('.profileImg');
            theImg.classList.toggle('show');
        })
    });

    //프로필 이미지 확대 이벤트
    const profileUl = document.getElementById('profileUl');

    profileUl.addEventListener('click', (e) => {
        const profileLi = e.target.closest('li');
        const theCheckBox = profileLi.querySelector('.profileCheckbox');
        const theImg = profileLi.querySelector('img');

        //이미지 확대조건: 체크박스 체크
        if(theCheckBox.checked){
            e.target.classList.toggle('enlarged');
        }else if(!e.target.classList.contains('enlarged')){
            alert('프로필 사진을 확대하려면 먼저 체크를 해주세요')
        }

        //기본 프로필: 확대이벤트 비활성화
        // theImg와 src가 모두 정의된 경우에만 처리
        if (theImg && theImg.src) {  
            const baseImg = theImg.src.includes('base.png'); 
            if (baseImg) {
                theImg.classList.add('baseImg'); 
            }
        } else {
            console.log('이미지 요소 또는 src를 찾을 수 없습니다.');
        }
    
        if(e.target.classList.contains('baseImg') ){
            e.target.classList.remove('enlarged');
        }
    })
});