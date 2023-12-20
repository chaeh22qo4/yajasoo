function onSubmit(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    var name = document.getElementById('name').value;
    var id = document.getElementById('id').value;
    var attendance = document.getElementById('attendance').checked ? '출석' : '결석';
    var currentTime = new Date(); // 현재 시간을 얻어옴
    var memo = document.getElementById('memo').value;

    var user = {
        name: name,
        id: id,
        attendance: attendance,
        time: currentTime.toLocaleTimeString(), // 현재 시간을 문자열로 저장
        memo: memo
    };

    var users = JSON.parse(localStorage.getItem('user_info')) || [];
    users.push(user);
    localStorage.setItem('user_info', JSON.stringify(users)); // 정보 배열을 로컬 스토리지에 저장

    window.location.href = 'output.html'; // 출력 페이지로 이동
}

// 이벤트 리스너 등록
var userForm = document.getElementById('userForm');
if (userForm) {
    userForm.addEventListener('submit', onSubmit);
}

// 출력 페이지에서 사용자 정보 출력
var outputDiv = document.getElementById('output');
if (outputDiv) {
    var users = JSON.parse(localStorage.getItem('user_info')) || [];
    users.forEach(function(user) {
        var paragraph = document.createElement('p');
        paragraph.innerText = user.time + " | " + user.id + " " + user.name + " | " + user.attendance + " | " + user.memo
        outputDiv.appendChild(paragraph);
    });
}

//초기화버튼
var clearStorageButton = document.getElementById('clearStorageButton');
if (clearStorageButton) {
    clearStorageButton.addEventListener('click', function() {
        var password = prompt('비밀번호를 입력하세요:'); // 비밀번호 입력 받기
        if (password === 'kumbul2023@') {
            localStorage.clear();
            alert('Local storage cleared!');
            location.reload(); // 페이지 새로고침
        } else {
            alert('틀린 비밀번호입니다. 접근이 제한되었습니다.');
        }
    });
}
