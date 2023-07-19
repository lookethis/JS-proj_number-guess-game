// 해야할 일-------------------------------------------

// 기본 기능----------------------------
// 숫자가 랜덤으로 골라짐: 1-1 랜덤 숫자 저장하는 변수/1-2. 랜덤 뽑을 함수
// 유저가 숫자를 입력함, go버튼을 누름:2-1 입력값 받는 변수, 2-2go버튼 요소 가져와 선택할 변수, 2-3.누르면 플레이(판단 함수) 실행
// 결과를 알려준다(맞, 크게, 작게): 3-1 판단(play) 함수, 4-2 결과 알려주는 기능, 4-1 결과 알려주는 변수
//

// 추가 기능(게임성: 찬스, 반복 가능, 유저 편의)---------------------------

// 리셋을 누르면 입력 숫자값 없어지고, 기회 회복: 5-1 리셋 버튼 불러옴, 5-2 리셋 버튼 누르면 리셋 함수 발동, 5-3 리셋 함수
// 찬스 다 쓰면 게임 끝, 버튼 DISABLED: 6-1횟수 변수, 6-2 go누를 때 찬스 깎
// 6-3 다 쓰면 게임 끝 변수, 6-4게임 끝 함수, 6-5 버튼 disabled함수
// 찬스 쓸 때마다 표시: 7-1 남은 찬스 알려줌.알려주는 곳을 변수로, 7-2 남은 찬스 바꿔줘

// 입력값이 1~100범위가 맞는지 검사한다: 8-1 범위 판단, 8-2 범위 아니면 알려줌
// 범위가 아니면 횟수를 안 깎는다:8-3 범위 아니면 횟수 안 깎
// 같은 숫자를 입력하는지 확인한다:9-1 입력 히스토리 변수, 9-2입력 숫자와 히스토리 중복시 알려줌, 9-3입력값을 히스토리에 저장,

// 입력하려 클릭 시 전에 쓴 수 지워짐: 10-1 userInput변수에 클릭때마다 사건 생기게
// 맞췄을 때도 disabled: 11-1. play함수 실행에...맞췄->게임오버로 가게
// 반응형 웹
//------------------------------------------------------

// 1-1 랜덤 숫자 저장하는 변수
let computerNumber = 0;
// 2-1 입력값 받는 변수
let userInput = document.getElementById("user-input");
// 2-2 go버튼 요소 가져와 선택할 변수 생성
let playButton = document.getElementById("play-button");
// 4-1 결과 알려줄 곳
let resultArea = document.getElementById("result-area");
// 5-1 리셋 버튼 불러옴
let resetButton = document.getElementById("reset-button");
// 6-1 횟수 변수
let chances = 5;
// 6-3 다 쓰면 게임 끝 변수
let gameOver = false;
// 7-1 남은 찬스 알려줌. 알려주는 곳을 변수로
let chanceArea = document.getElementById("chance-area");
// 9-1 입력 히스토리 변수
let history = [];

// 2-3 go누르면 결과 판단 함수 작동
playButton.addEventListener("click", play);
// 5-2 리셋 버튼 누르면 리셋 함수 발동 기능
resetButton.addEventListener("click", reset);
// 10-1. userInput변수에 클릭때마다 사건 생기게(기능 단순,몇번만 쓰는디 함수로 만들면 메모리 차지함)
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

// 1-2. 랜덤 숫자 뽑는 함수
function pickRandomNum() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
}

// 3-1 결과 판단 함수: 유효성 판단-중복성 판단-횟수 깎-판단-게임 오버)
function play() {
  let userValue = Number(userInput.value);

  // 8-1 숫자 유효범위 검사
  if (userValue < 1 || userValue > 100) {
    // 8-2.범위 아니면 알려줌
    resultArea.textContent = "1부터 100까지의 수를 입력해주세요";
    // 8-3.범위 아니면 횟수 안 깎
    return;
  }

  // 9-2 입력 숫자와 히스토리 비교하는 기능
  if (history.includes(userValue)) {
    resultArea.textContent = "아까 입력하신 숫자입니다. 다른 숫자를 입력하세요";
    return;
  }

  //  8-3입력값을 히스토리에 저장
  history.push(userValue);

  // 6-2 시도하면 횟수 깎는 기능
  chances--;

  // 7-2. 남은 찬스 기회 알려줘
  chanceArea.textContent = `남은 찬스:${chances}번`;

  // 4-2 판단하고 결과 알려주는 기능
  if (userValue > computerNumber) {
    resultArea.textContent = "DOWN!";
  } else if (userValue < computerNumber) {
    resultArea.textContent = "UP!";
  } else {
    resultArea.textContent = "맞췄습니다!";
    // 11-1. play함수 실행에...맞췄->게임오버로 가게
    gameOver = true;
  }

  // 9-3 검사 후 히스토리 저장
  // history.push(userValue);

  // 6-4 게임 끝 함수
  if (chances < 1) {
    gameOver = true;
  }

  // 6-5 버튼 disable함수
  if (gameOver) {
    playButton.disabled = true;
  }
}

// 5-3 리셋 함수(입력값 초기화, 변수 재발동, 횟수 초기화, 멘트 초기화)
function reset() {
  userInput.value = "";
  pickRandomNum();

  playButton.disabled = false;
  history = [];

  chances = 5;
  chanceArea.textContent = `남은 찬스:${chances}번`;
  resultArea.textContent = "숫자가 나옵니다";
}

// 1-2. 변수 발동하는 함수
pickRandomNum();
