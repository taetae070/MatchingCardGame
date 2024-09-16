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

            //대체 이미지
            img.onerror = function () {
                this.src = './profileImgs/alt.png'; 
              };

            // 전체 구성하기
            figcaption.appendChild(h2);
            figcaption.appendChild(p);
            imgWrapper.appendChild(img);
            imgWrapper.appendChild(checkBox);
            figure.appendChild(imgWrapper);
            figure.appendChild(figcaption);
            article.appendChild(figure);
            li.appendChild(article);
            profileUl.appendChild(li);
            // checkBox.appendChild(img);
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

    //체크박스를 체크해야 이미지 확대
    if(theCheckBox.checked){
        e.target.classList.toggle('enlarged');
        //이미지 확대한 상태에서 체크해제하면 alert은 뜨지 않음
    }else if(!e.target.classList.contains('enlarged')){
        alert('프로필 사진을 확대하려면 먼저 체크를 해주세요')
    }
  })

    
   
    






});