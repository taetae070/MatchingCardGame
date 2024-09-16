document.addEventListener('DOMContentLoaded', () => {
    const profileData = {
        person1: {
            imgSrc: '/02.ProfileCard/profileImgs/1',
            name: 'aaa',
            description: 'I like apples',
          },
        person2: {
            imgSrc: '/02.ProfileCard/profileImgs/2',
            name: 'bbb',
            description: 'I like bananas',
          },
        person3: {
            imgSrc: '/02.ProfileCard/profileImgs/3',
            name: 'ccc',
            description: 'I like cinnamon',
          },
        person4: {
            imgSrc: '/02.ProfileCard/profileImgs/4',
            name: 'ddd',
            description: 'I like dandelions',
          },
    }

    function createProfileLi() {
        const profileUl = document.getElementById('profileUl');

        //for...in: 객체의 열거 가능한 모든 속성을 반복하는 루프
        for( const key in profileData){
            const person = profileData[key];

            const li = document.createElement('li');
            const article = document.createElement('article');
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');

            // 데이터 삽입
            img.src = person.imgSrc;
            img.alt = `Profile picture of ${person.name}`;
            h2.textContent = person.name;
            p.textContent = person.description;

            // 전체 구성하기
            figcaption.appendChild(h2);
            figcaption.appendChild(p);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            article.appendChild(figure);
            li.appendChild(article);
            profileUl.appendChild(li);
        }
  }
        

    
   
    






});