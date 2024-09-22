document.addEventListener("DOMContentLoaded", () => {
  //menuListData: 추후 백엔드 API 연동을 통해 교체
  const menuListData = {
    dropDown1: ['item A', 'item B', 'item C', 'item D'],
    dropDown2: ['item 1', 'item 2', 'item 3', 'item 4']  
  }
  
  // li 만들기: 메뉴 추가 및 삭제 시, 쉽게 적용할 수 있게 html 직접작성대신 스크립트로 작성
  const dropDowns = document.querySelectorAll('.dropDownWrapper');
  
  dropDowns.forEach((dropDown, index) => {
    const menuUl = dropDown.querySelector('ul')
    const menuItems = index === 0 ? menuListData.dropDown1 : menuListData.dropDown2; 

    menuItems.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item; 
      menuUl.appendChild(li);
    });

    //드롭다운 클릭이벤트
    const menuBtn = dropDown.querySelector('.menuBtn');
    menuBtn.addEventListener('click', (e) => {
        const menuUL = e.target.closest('.dropDownWrapper').querySelector('ul');
        menuUL.classList.toggle('show'); 
        e.stopPropagation();
      });
    
    //메뉴바꾸기 클릭 이벤트
    menuUl.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const selectedText = e.target.textContent;
        menuBtn.textContent = selectedText; 
        e.stopPropagation();
      }
    })
    
    //키보드 탭 작동
    const listItems = menuUl.querySelectorAll('li'); 
    listItems.forEach(item => {
      item.tabIndex = -1; 
    });

    menuBtn.addEventListener('keydown', (e) => {
      e.stopPropagation(); 
      // console.log('Key pressed:', e.key); 
  
      if (e.key === 'Enter' || e.key === ' ') {
        menuUl.classList.toggle('show');
          e.preventDefault();
      }

      if (e.key === 'ArrowDown' && menuUl.classList.contains('show')) {
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
          menuBtn.textContent = item.textContent; 
          menuUl.classList.remove('show'); 
          menuBtn.focus(); 
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

  // 모든 드롭다운 닫기 함수
  document.addEventListener('click', (e) => {
    if (!e.target.closest('ul')) { // ul 외부를 클릭했을 때만
      dropDowns.forEach((dropDown) => {
        const menuUl = dropDown.querySelector('ul');
        menuUl.classList.remove('show'); 
      });
    }
  });
});



