document.addEventListener("DOMContentLoaded", () => {
  //menuListData: 추후 백엔드 API 연동을 통해 교체
  const menuListData = {
    dropDown1: ['item A', 'item B', 'item C', 'item D'],
    dropDown2: ['item 1', 'item 2', 'item 3', 'item 4']  
  }
  const dropDowns = document.querySelectorAll('.dropDownWrapper');
   
  // li 만들기: 메뉴 항목 변경 시, 쉽게 적용할 수 있게 html 직접작성대신 스크립트로 작성
    dropDowns.forEach((dropDown, index) => {
      const menuUl = dropDown.querySelector('ul')
      const menuItems = index === 0 ? menuListData.dropDown1 : menuListData.dropDown2; 

      menuItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item; 
        menuUl.appendChild(li);
      });  
    });


  //드롭다운 클릭 이벤트
  const menuNav = document.querySelector('nav'); 
  
  menuNav.addEventListener('click', (e) => {
    if (e.target.matches('.menuBtn')) { // 버튼 클릭 시만 동작
      const menuUL = e.target.closest('.dropDownWrapper').querySelector('ul');
      menuUL.classList.toggle('show'); 
      e.stopPropagation();
    }
  });
    

  //버튼 이름바꾸기 클릭 이벤트
  dropDowns.forEach((dropDown) => {
    const menuBtn = dropDown.querySelector('.menuBtn');
    const menuUl = dropDown.querySelector('ul');

    // `menuUl`에 클릭 이벤트를 연결해서 `li` 클릭 시 버튼의 텍스트를 변경
    menuUl.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const selectedText = e.target.textContent;
        menuBtn.textContent = selectedText; 
        e.stopPropagation();
      }
    });
  });


  // 모든 드롭다운 닫기 함수
  document.addEventListener('click', (e) => {
    if (!e.target.closest('ul')) { // ul 외부를 클릭했을 때만
      dropDowns.forEach((dropDown) => {
        const menuUl = dropDown.querySelector('ul');
        menuUl.classList.remove('show'); 
      });
    }
  });


  //키보드
  dropDowns.forEach(dropDown => {
    const menuButton = dropDown.querySelector('.menuBtn');
    const menuList = dropDown.querySelector('ul');
    const listItems = menuList.querySelectorAll('li'); 

    listItems.forEach(item => {
      item.tabIndex = -1; 
    });

    menuButton.addEventListener('keydown', (e) => {
      e.stopPropagation(); 
      // console.log('Key pressed:', e.key); 
  
      if (e.key === 'Enter' || e.key === ' ') {
          menuList.classList.toggle('show');
          e.preventDefault();
      }

      if (e.key === 'ArrowDown' && menuList.classList.contains('show')) {
        e.preventDefault(); 
        const currentIndex = Array.from(listItems).indexOf(document.activeElement); 
        const nextIndex = (currentIndex + 1) % listItems.length;
        listItems[nextIndex].focus(); 
      }
    });

    listItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          menuButton.textContent = item.textContent; 
          menuList.classList.remove('show'); 
          menuButton.focus(); 
      }
          if (e.key === 'ArrowDown') {
              e.preventDefault();
              const nextIndex = (index + 1) % listItems.length; 
              listItems[nextIndex].focus(); 
          }

          if (e.key === 'ArrowUp') {
              e.preventDefault();
              const prevIndex = (index - 1 + listItems.length) % listItems.length; 
              listItems[prevIndex].focus(); 
          }
      });
    });

  });

});



