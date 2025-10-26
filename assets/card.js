
var confirmElement = document.querySelector(".confirm");
  OnGenerujClick();

function closePage() {
  clearClassList();
}

function openPage(page) {
  clearClassList();
  var classList = confirmElement.classList;
  classList.add("page_open");
  classList.add("page_" + page + "_open");
}

function OnGenerujClick() {
  var steps = { message: "" };

  let res = GenerujNumer(4, 5, "M", steps);


  document.getElementById('serial_text').innerText = res.replace(/([A-Za-z]+)(\d+)/, "$1 $2");
}

function GenerujNumer(liczbaLiter, liczbaCyfr, literaPrefix, steps) {

  var letterValues = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var numermDowodu = literaPrefix !== undefined ? literaPrefix : "";
  var counter = literaPrefix !== undefined ? 1 : 0;

  for (counter; counter < liczbaLiter; counter += 1) {
    var signNumber = getRandomIntInclusive(10, 35);
    var letter = letterValues[signNumber];
    numermDowodu += letter;
  }
  for (var counter = 0; counter < liczbaCyfr; counter += 1) {
    var signNumber = getRandomIntInclusive(0, 9);
    numermDowodu += letterValues[signNumber];
  }

  var controlDigit = GetControlDigit(numermDowodu, steps);

  numermDowodu = numermDowodu.substring(0, liczbaLiter) + controlDigit + numermDowodu.substring(liczbaLiter + 1);

  return numermDowodu;
}

function GetControlDigit(docNumber, steps) {
  var numberToCheck = docNumber.replace(/\s+/g, "");

  numberToCheck = numberToCheck.toUpperCase();
  var letterValues = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var weights = [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1];

  function getLetterValue(letter) {
    return letterValues.indexOf(letter);
  }

  var seriaNumberRegex = /^([A-Z]{2,4})([0-9])([0-9]{4,6})$/;
  var matches = numberToCheck.match(seriaNumberRegex);

  if (matches === undefined || matches === null) {
    return null;
  }

  var withoutControlDigit = matches[1] + matches[3]; // pomijamy cyfrę kontrolną

  if (steps === undefined || steps === null) {
    steps = { message: "" };
  }

  var checkSum = 0;
  for (var counter = 0; counter < withoutControlDigit.length; counter += 1) {
    var letter = withoutControlDigit[counter];
    var letterValue = getLetterValue(letter);

    if (steps.message.length > 0) {
      steps.message += " + ";
    }

    steps.message += "(<b style='color:blue;'>" + letter + "</b>↣ " + letterValue + "*<b>" + weights[counter] + "</b>)";

    checkSum += letterValue * weights[counter];
  }

  steps.message += " = " + checkSum + " ↣ " + checkSum + " MOD 10 = <b style='color:blue;'>" + (checkSum % 10) + "</b>";

  return checkSum % 10;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function clearClassList() {
  var classList = confirmElement.classList;
  classList.remove("page_open");
  classList.remove("page_1_open");
  classList.remove("page_2_open");
  classList.remove("page_3_open");
}

var time = document.getElementById("time");
var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

if (localStorage.getItem("update") == null) {
  localStorage.setItem("update", "26.10.2025")
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener('click', () => {
  var newDate = date.toLocaleDateString("pl-PL", options);
  localStorage.setItem("update", newDate);
  updateText.innerHTML = newDate;

  scroll(0, 0)
});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock() {
  date = new Date()
  time.innerHTML = "Czas: " + date.toLocaleTimeString("pl-PL") + " " + date.toLocaleDateString("pl-PL", options);
  delay(1000).then(() => {
    setClock();
  })
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {

  if (unfold.classList.contains("unfolded")) {
    unfold.classList.remove("unfolded");
  } else {
    unfold.classList.add("unfolded");
  }

})

var data = {}

var params = new URLSearchParams(window.location.search);
for (var key of params.keys()) {
  data[key] = params.get(key);
}

document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

var birthday = data['birthday'];
var birthdaySplit = birthday.split(".");
var day = parseInt(birthdaySplit[0]);
var month = parseInt(birthdaySplit[1]);
var year = parseInt(birthdaySplit[2]);

var birthdayDate = new Date();
birthdayDate.setDate(day)
birthdayDate.setMonth(month - 1)
birthdayDate.setFullYear(year)

birthday = birthdayDate.toLocaleDateString("pl-PL", options);

var sex = data['sex'];

if (sex === "m") {
  sex = "Mężczyzna"
} else if (sex === "k") {
  sex = "Kobieta"
}

setData("name", data['name'].toUpperCase());
setData("surname", data['surname'].toUpperCase());
setData("nationality", data['nationality'].toUpperCase());
setData("birthday", birthday);
setData("familyName", data['familyName']);
setData("sex", sex);
setData("fathersFamilyName", data['fathersFamilyName']);
setData("mothersFamilyName", data['mothersFamilyName']);
setData("birthPlace", data['birthPlace']);
setData("countryOfBirth", data['countryOfBirth']);
setData("adress", "ul. " + data['adress1'] + "<br>" + data['adress2'] + " " + data['city']);

if (localStorage.getItem("homeDate") == null) {
  var homeDay = getRandom(1, 25);
  var homeMonth = getRandom(0, 12);
  var homeYear = getRandom(2012, 2019);

  var homeDate = new Date();
  homeDate.setDate(homeDay);
  homeDate.setMonth(homeMonth);
  homeDate.setFullYear(homeYear)

  localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options))
}

document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate")

if (parseInt(year) >= 2000) {
  month = 20 + month;
}

var later;

if (sex.toLowerCase() === "mężczyzna") {
  later = "0295"
} else {
  later = "0382"
}

if (day < 10) {
  day = "0" + day
}

if (month < 10) {
  month = "0" + month
}

var pesel = year.toString().substring(2) + month + day + later + "7";
setData("pesel", pesel)

function setData(id, value) {

  document.getElementById(id).innerHTML = value;

}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
