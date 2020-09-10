const $searchForm = document.querySelector(".search-form");
const $errorMessage = document.querySelector(".error-message");

$searchForm.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const loginFormData = new FormData(event.target);
  const query = loginFormData.get("query").toUpperCase();

  dataList.hasOwnProperty(query)
    ? handleSearchResults(query)
    : displaySearchError(query);
}

function displaySearchError(query) {
  $errorMessage.innerText = `No symbol matches found for ${query}. Try another symbol such as MSFT or AAPL, or use the Lookup API.`;
  $errorMessage.classList.remove("hidden");
}

function handleSearchResults(query) {
  removeErrorMessage();
  displayName(query);
  displayLastPrice(query);
  displayChange(query);
  displayRange(query);
  displayOpen(query);
  displayVolume(query);
  displayMarketCap(query);
  displayTime(query);
}

function removeErrorMessage() {
  !$($errorMessage).hasClass("hidden")
    ? $errorMessage.classList.add("hidden")
    : null;
}

function displayName(query) {
  const $name = document.querySelector(".name");
  $name.innerText = dataList[query].Name.toUpperCase();
}

function displayLastPrice(query) {
  const $lastPrice = document.querySelector(".last-price");
  $lastPrice.innerText = roundDecimalTwo(dataList[query].LastPrice);
}

function roundDecimalTwo(number) {
  return Math.round(number * 100) / 100;
}

function displayChange(query) {
  const $changeInfo = document.querySelector(".change-info");
  const rawDecimal = dataList[query].Change;
  const rawChangePercent = dataList[query].ChangePercent;

  $changeInfo.innerText = `${roundDecimalTwo(
    rawDecimal
  )} (                               ${roundDecimalTwo(rawChangePercent)}%)`;
  handleColorChange(rawDecimal, $changeInfo);
}

function handleColorChange(number, element) {
  if (number < 0) {
    element.classList.add("red");
  } else {
    element.classList.remove("red");
  }
}

function displayRange(query) {
  const $range = document.querySelector(".range");
  const low = roundDecimalTwo(dataList[query].Low);
  const high = roundDecimalTwo(dataList[query].High);

  $range.innerText = `${low} - ${high}`;
}

function displayOpen(query) {
  const $open = document.querySelector(".open");
  const openNum = roundDecimalTwo(dataList[query].Open);
  $open.innerText = openNum;
}

function displayVolume(query) {
  const $volume = document.querySelector(".volume");
  const volNum = numeral(dataList[query].Volume).format("0.0a");
  $volume.innerText = volNum.toUpperCase();
}

function displayMarketCap(query) {
  const $marketCap = document.querySelector(".market-cap");
  const marketCapNum = numeral(dataList[query].MarketCap).format("0.0a");
  $marketCap.innerText = marketCapNum.toUpperCase();
}

function displayTime(query) {
  const $timestamp = document.querySelector(".timestamp");
  const timestamp = dataList[query].Timestamp;
  const parsedTime = moment(timestamp, "ddd MMM D HH:mm:ss +-HH YYYY").format(
    "LTS"
  );
  //Not sure what timezone you want it displayed in. Leaving it to the offset found     in dataset. Could use localtime for device as well.
  $timestamp.innerText = `As of ${parsedTime}`;
}