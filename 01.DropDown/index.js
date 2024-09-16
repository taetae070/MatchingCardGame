document.addEventListener("DOMContentLoaded", () => {
  const menuListData = {
    dropDown1: ['item A', 'item B', 'item C', 'item D'],
    dropDown2: ['item 1', 'item 2', 'item 3', 'item 4']  
  }
  const dropDowns = document.querySelectorAll('.dropDownWrapper');
   
  // li 만들기
    dropDowns.forEach((dropDown, index) => {
      const menuUl = dropDown.querySelector('ul')
      const menuItems = index === 0 ? menuListData.dropDown1 : menuListData.dropDown2; //두 ul중 선택

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
      menuUL.classList.toggle('show'); // ul에 show 클래스를 토글하여 열고 닫기
      e.stopPropagation();
    }
  });
    

  //버튼 이름바꾸기 클릭 이벤트
  dropDowns.forEach((dropDown) => {
    const menuBtn = dropDown.querySelector('.menuBtn'); 
    const menuItems = dropDown.querySelectorAll('li'); 

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', (e) => {
        const selectedText = e.target.textContent; 
        menuBtn.textContent = selectedText; 
        e.stopPropagation();
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




  //키킼키키키보드
  dropDowns.forEach(dropDown => {
    const menuButton = dropDown.querySelector('.menuBtn'); // 드롭다운 버튼
    const menuList = dropDown.querySelector('ul'); // 드롭다운 리스트
    const listItems = menuList.querySelectorAll('li'); // 드롭다운 항목들

      // 드롭다운 열기/닫기 이벤트
      menuButton.addEventListener('click', () => {
        toggleMenu(menuList);
      });

      // 키보드로 드롭다운 열기 (Enter로 열기/닫기)
      menuButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleMenu(menuList); // Enter나 Space 키로 열기/닫기
        }
      });

      // 드롭다운 항목에서 키보드로 선택
      listItems.forEach((item) => {
          item.tabIndex = 0; // li 요소에 tabIndex 추가하여 탭 이동 가능하게 설정

          // 마우스로 항목 클릭 시 선택
          item.addEventListener('click', () => {
            selectItem(menuButton, item);
          });
    
          // Enter 키로 항목 선택
          item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              selectItem(menuButton, item); // Enter로 항목 선택
            }
    
            // 탭을 눌러 다음 항목으로 이동
            if (e.key === 'Tab' && !e.shiftKey) { // Shift + Tab이 아닐 때
              e.preventDefault(); // 기본 탭 동작 방지
              const nextItem = listItems[index + 1] || listItems[0]; // 마지막 항목이면 첫 번째로
              nextItem.focus(); // 다음 항목에 포커스
            }
    
            // Shift + Tab을 눌러 이전 항목으로 이동
            if (e.key === 'Tab' && e.shiftKey) {
              e.preventDefault(); // 기본 탭 동작 방지
              const prevItem = listItems[index - 1] || listItems[listItems.length - 1]; // 첫 번째 항목이면 마지막으로
              prevItem.focus(); // 이전 항목에 포커스
            }
          });
      });
  });



});
