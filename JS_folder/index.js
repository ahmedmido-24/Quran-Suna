// the btn explore
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior :"smooth"
    })
})
// header section 
let fixedNav = document.querySelector('.header');
let scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 250 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');
})
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
//hadith changer
let hadithContainer =document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),////////////////////////////////////////////////////////////////fix here
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    let hadithIndex = 0;   // 5272 // the number of hadith
    HadithChanger();
function HadithChanger()
{
fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-abudawud.json")// Url////////////////////////////
    .then(response => response.json())
    .then(data =>{
            let AlHadiths = data.hadiths;// to enter the json file enter {data} then the name of section you want to {ex}
            changeHadith();
            next.addEventListener('click',()=>{
                hadithIndex == 5272 ? hadithIndex = 0 :hadithIndex++;
                changeHadith()
            })

            prev.addEventListener('click', ()=>{
                hadithIndex == 0 ? hadithIndex = 5272 :hadithIndex--;
                changeHadith()
            })
            function changeHadith()
            {
                hadithContainer.innerText = AlHadiths[hadithIndex].text; // here you change the innerText in the section
                number.innerText = `5272 / ${hadithIndex + 1}` // to make it count
            }
    })
}
/*  محاضرات Section*/
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll('.header ul li'); // mistake in this line you arent storage value // let
links.forEach(link => {
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section => {
            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior:"smooth"
                });
            }
        });
    });
});

/// Section Quran api 
let SurahsContainer = document.querySelector(".surahasContainer")
getSurahs();
function getSurahs()
{
    fetch("https://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data =>{
        let surahs = data.data.surahs.references;
        let numberofSurahs = data.data.surahs.count;//114
        SurahsContainer.innerHTML=""
        for (let i = 0; i < numberofSurahs; i++) {
            SurahsContainer.innerHTML +=
            `
            <div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName}</p>
            </div>
            `
        }
        let surahsTitle = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup');
        let AyatContainer = document.querySelector('.ayat');
        surahsTitle.forEach((title, index) => {
        title.addEventListener('click', () => {
            // fetch(`https://api.quran.gading.dev/surah/${index + 1}`) // i cant make it work i apologize
            fetch(`https://api.alquran.cloud/v1/surah/${index + 1}/ar.alafasy`)
            .then(response => response.json())
            .then(data => {
                AyatContainer.innerHTML = "";
                let Ayat = data.data.ayahs;
                Ayat.forEach(aya => {
                console.log(Ayat);
                popup.classList.add('active');
                AyatContainer.innerHTML += `
                    <p>
                    ${aya.text} 
                    {${aya.numberInSurah}}</p>
                `;
                });
            })
            .catch(error => {
                console.log('Error:', error);
            });
        });
        });
        
        let closepopup = document.querySelector('.close-popup');
        closepopup.addEventListener('click', () => {
        popup.classList.remove('active');
        });
        
    })
}
    //////////////////////////////////////////////////////////////////////////////*//////////////////////////////
    let cards = document.querySelector('.cards');
    let locationForm = document.querySelector('.location-form');
    
    // Check if the Geolocation API is available
    if ('geolocation' in navigator) {
    // Prompt the user for their location
    navigator.geolocation.getCurrentPosition(
        position => {
        const { latitude, longitude } = position.coords;
        getPrayTimesByCoordinates(latitude, longitude);
        },
        error => {
        console.error('Error getting location:', error);
        showLocationForm();
        }
    );
    } else {
    showLocationForm();
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const Bars = document.querySelector('.bars');/// bars is not working 
        const SideBar = document.querySelector('.header ul');
        Bars.addEventListener('click',() => {
        SideBar.classList.toggle('active');
        });
    }); 
    ///////////
/*
    locationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let city = document.querySelector('.city-input').value;
    let country = document.querySelector('.country-input').value;
    
    getPrayTimes(city, country);
    });
    
    function showLocationForm() {
    locationForm.style.display = 'block';
    }
    
    function getPrayTimesByCoordinates(latitude, longitude) {
    let date = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    let url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=8`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
        let times = data.data.timings;
        cards.innerHTML = "";
    */
        // Translate each time value to Arabic
        const translations = {
            Fajr: "الفجر",
            Dhuhr: "الظهر",
            Asr: "العصر",
            Maghrib: "المغرب",
            Isha: "العشاء",
            Sunrise: "شروق الشمس",
            Sunset: "غروب الشمس",
            Imsak: "الامساك",
            Midnight: "منتصف اليل",
        };
    
        for (let time in times) {
            let translatedTime = translations[time] || time; // Use the translated value if available, otherwise use the original time
    
            let timeValue = new Date(`2000-01-01T${times[time]}`); // Create a Date object with the time value
            let formattedTime = timeValue.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }); // Format the time to a 12-hour format
    
            cards.innerHTML +=
            `
            <div class="card">
                <div class="circle">
                <svg>
                    <circle cx="100" cy="100" r="100"></circle>
                </svg>
                <div class="praytime">${formattedTime}</div>
                </div>
                <p>${translatedTime}</p>
            </div>
            `;
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }
    
    function getPrayTimes(city, country) {
    let date = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    let url = `http://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=${country}&method=8`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
        let times = data.data.timings;
        cards.innerHTML = "";
    
        // Translate each time value to Arabic
        const translations = {
            Fajr: "الفجر",
            Dhuhr: "الظهر",
            Asr: "العصر",
            Maghrib: "المغرب",
            Isha: "العشاء",
            Sunrise: "شروق الشمس",
            Sunset: "غروب الشمس",
            Imsak: "الامساك",
            Midnight: "منتصف اليل",
        };
    
        for (let time in times) {
            let translatedTime = translations[time] || time; // Use the translated value if available, otherwise use the original time
    
            let timeValue = new Date(`2000-01-01T${times[time]}`); // Create a Date object with the time value
            let formattedTime = timeValue.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }); // Format the time to a 12-hour format
    
            cards.innerHTML +=
            `
            <div class="card">
                <div class="circle">
                <svg>
                    <circle cx="100" cy="100" r="100"></circle>
                </svg>
                <div class="praytime">${formattedTime}</div>
                </div>
                <p>${translatedTime}</p>
            </div>
            `;
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

