let audio = document.querySelector(".quranplayer"),
surahsContainer = document.querySelector(".surahs"),
next = document.querySelector(".next"),
perv = document.querySelector(".perv"),
play = document.querySelector(".play"),
ayah = document.querySelector(".ayah");
//   function get surahs
getSurahs();
function getSurahs() {
// fetch to get surahs
fetch("https://api.quran.gading.dev/surah")
    .then((Response) => Response.json())
    .then((data) => {
    for (let surah in data.data) {
        surahsContainer.innerHTML += `<div>
        <p>${data.data[surah].name.long}</p>
        <p>${data.data[surah].name.transliteration.en}</p>
        </div>`;
    }
    //   select all surahs
    let allSurahs = document.querySelectorAll(".surahs div"),
        AyahsText,
        AyahsAudio;
    allSurahs.forEach((surah, index) => {
        surah.addEventListener("click", () => {
        fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
            .then((Response) => Response.json())
            .then((data) => {
            let verses = data.data.verses;
            AyahsAudio = [];
            AyahsText = [];
            verses.forEach((verses) => {
                AyahsAudio.push(verses.audio.primary);
                AyahsText.push(verses.text.arab);
            });
            let AyahsIndex = 0;
            changeAyah(AyahsIndex);
            audio.addEventListener("ended", () => {
                AyahsIndex++;
                if (AyahsIndex < AyahsAudio.length) {
                changeAyah(AyahsIndex);
                } else {
                AyahsIndex = 0;
                changeAyah(AyahsIndex);
                audio.pause;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Surah has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                isPlaying = true;
                togglePlay();
                }
            });

            // ================= next buttons
            next.addEventListener("click", () => {
                AyahsIndex < AyahsAudio.length - 1
                ? AyahsIndex++
                : (AyahsIndex = 0);
                changeAyah(AyahsIndex);
            });
            //   ==========
            // ==============prev buttons
            perv.addEventListener("click", () => {
                AyahsIndex == 0 ? AyahsAudio.length - 1 : AyahsIndex--;
                changeAyah(AyahsIndex);
            });
            //   ============
            //   pause buttons
            let isPlaying = false;
            togglePlay();
            function togglePlay() {
                if (isPlaying) {
                audio.pause();
                play.innerHTML = `<i class="fa-solid fa-play"></i>`;
                isPlaying = false;
                } else {
                audio.play();
                play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
                isPlaying = true;
                }
            }

            play.addEventListener("click", togglePlay);
            // ========
            function changeAyah(index) {
                audio.src = AyahsAudio[index];
                ayah.innerHTML = AyahsText[index];
            }
            });
        });
    });
    });
}
// click into surahsContainer (loop)