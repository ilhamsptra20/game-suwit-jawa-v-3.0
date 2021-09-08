// konstanta halaman
const halamanMulai = document.querySelector(".area-mulai");
const halamanMain = document.querySelector(".area-main");
const halamanSelesai = document.querySelector(".area-selesai");

// mengambil babak
const validasiAngka = /^[0-9]+$/;
const inputBabak = document.querySelector("#babak");
const tombolMulai = document.querySelector(".area-mulai button[type=button]");
tombolMulai.addEventListener("click", function () {
  if (inputBabak.value.match(validasiAngka)) {
    const babak = Number(inputBabak.value);
    inputBabak.value = "";
    main(babak);
    return;
  }
  alert("YANG ANDA MASUKAN BUKAN ANGKA!! MASUKAN ANGKA");
  inputBabak.value = "";
  inputBabak.focus();
  return;
});

// Pilihan Komputer
function getPilihanKomputer() {
  const comp = Math.random();
  if (comp < 0.34) return "gajah";
  if (comp >= 0.34 && comp < 0.67) return "orang";
  return "semut";
}

// Hasil permainan
function getHasil(comp, player) {
  if (player == comp) return "SERI";
  if (player == "gajah") return comp == "orang" ? "MENANG" : "KALAH";
  if (player == "orang") return comp == "semut" ? "MENANG" : "KALAH";
  if (player == "semut") return comp == "gajah" ? "MENANG" : "KALAH";
}

// animasi putar
function putar() {
  const imgKomputer = document.querySelector(".img-komputer");
  const gambar = ["gajah", "orang", "semut"];
  let i = 0;
  const waktuMulai = new Date().getTime();
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;

      return;
    }
    imgKomputer.setAttribute("src", "img/" + gambar[i++] + ".png");
    if (i == gambar.length) i = 0;
  }, 100);
}

// Redirect Ke halaman main
function main(babak) {
  const tampilRonde = document.querySelector("#ronde");
  const jumlahBabak = babak;
  let ronde = 0;
  halamanMain.classList.add("aktif");
  halamanMulai.classList.remove("aktif");

  //pilihan player
  const pilihanPlayer = document.querySelectorAll("li img");

  //get Score
  const scorePlayer = document.querySelector(".player");
  const scoreKomputer = document.querySelector(".komputer");
  let getScorePlayer = 0;
  let getScoreKomputer = 0;

  pilihanPlayer.forEach((pilihan) => {
    pilihan.addEventListener("click", function () {
      document.querySelector("#hasil").innerHTML = "";
      const pilihanKomputer = getPilihanKomputer();
      const pilihanPlayer = pilihan.className;
      const hasil = getHasil(pilihanKomputer, pilihanPlayer);

      putar();
      setTimeout(function () {
        const imgKomputer = document.querySelector(".img-komputer");
        imgKomputer.setAttribute("src", "img/" + pilihanKomputer + ".png");
        if (hasil == "MENANG") getScorePlayer++;
        if (hasil == "KALAH") getScoreKomputer++;
        scorePlayer.innerHTML = "Skor : " + getScorePlayer;
        scoreKomputer.innerHTML = "Skor : " + getScoreKomputer;
        document.querySelector("#hasil").innerHTML = hasil;
        ronde++;
        tampilRonde.innerHTML = "Babak : " + ronde;
      }, 1000);
      if (ronde == jumlahBabak) {
        alert("Selesai");
        selesai(getScorePlayer, getScoreKomputer);
        return;
      }
    });
  });
}

function selesai(player, komputer) {
  halamanMain.classList.remove("aktif");
  halamanSelesai.classList.add("aktif");
  const status = document.querySelector(".area-selesai h2");
  const scoreAkhir = document.querySelector(".area-selesai h3");
  const tombolMainLagi = document.querySelector(
    ".area-selesai button[type=button]"
  );
  tombolMainLagi.addEventListener("click", function () {
    setInterval(window.location.reload(), 10000 * 60);
  });

  if (player > komputer) status.innerHTML = "ANDA MENANG!!!";
  if (player < komputer) status.innerHTML = "ANDA KALAH!!!";
  if (player == komputer) status.innerHTML = "SERI!!!";

  scoreAkhir.innerHTML = "Skor " + player + " : " + komputer;
}
