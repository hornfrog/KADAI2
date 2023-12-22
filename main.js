const $watch = document.getElementById("time");
const $start = document.getElementById("start");
const $stop = document.getElementById("stop");
const $reset = document.getElementById("reset");

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

// 時間を表示する関数
function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours() - 9).padStart(1, "0"); // 日本時間に合わせる為、９時間引く
  const m = String(currentTime.getMinutes()).padStart(1, "0");
  const s = String(currentTime.getSeconds()).padStart(1, "0");
  const ms = String(currentTime.getMilliseconds()).padStart(1, "0");

  $watch.textContent = `${h}:${m}:${s}:${ms}`; //textContent HTMLを解釈せず、そのまま文字として出力
  timeoutID = setTimeout(displayTime, 1000); // 2つ目の引数にプログラム実行の時間を持たせる、ミリ秒で記載
}

// スタートボタンがクリックされたら時間を進める
$start.addEventListener("click", () => {
  $start.disabled = true;
  $stop.disabled = false;
  $reset.disabled = true;
  startTime = Date.now();
  displayTime();
});

// ストップボタンがクリックされたら時間を止める
$stop.addEventListener("click", function () {
  $start.disabled = false;
  $stop.disabled = true;
  $reset.disabled = false;
  clearTimeout(timeoutID); //clearTimeout関数でタイマーを停止
  stopTime += Date.now() - startTime;
});

// リセットボタンがクリックされたら時間を0に戻す
$reset.addEventListener("click", function () {
  $start.disabled = false;
  $stop.disabled = true;
  $reset.disabled = true;
  $watch.textContent = "0:0:0:0";
  stopTime = 0;
});