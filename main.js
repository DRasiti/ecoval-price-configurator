import SearchDropdown from "./components/SearchDropdown.js";
import SwitchButton from "./components/SwitchButton.js";
import { cpus } from "./data/cpus.js";
import { rams } from "./data/rams.js";
import { storages } from "./data/storages.js";
import { desktopMonitors, laptopMonitors } from "./data/monitors.js";

const cpu = document.querySelector("#cpu");
const ram = document.querySelector("#ram");
const storage = document.querySelector("#storage");
const desktopMonitor = document.querySelector("#desktop-monitor");
const laptopMonitor = document.querySelector("#laptop-monitor");

const os = document.querySelector("#os");
const dvd = document.querySelector("#dvd");
const wifi = document.querySelector("#wifi");
const battery = document.querySelector("#battery");

const cpuPrice = document.querySelector("#cpu-price");
const ramPrice = document.querySelector("#ram-price");
const storagePrice = document.querySelector("#storage-price");
const desktopMonitorPrice = document.querySelector("#desktop-monitor-price");
const laptopMonitorPrice = document.querySelector("#laptop-monitor-price");
const osPrice = document.querySelector("#os-price");
const dvdPrice = document.querySelector("#dvd-price");
const wifiPrice = document.querySelector("#wifi-price");
const batteryPrice = document.querySelector("#battery-price");
const totalPrice = document.querySelector("#total");

const resetButton = document.querySelector("#reset-button");

let prices = {
  cpu: 0,
  ram: 0,
  storage: 0,
  desktopMonitor: 0,
  laptopMonitor: 0,
  os: 0,
  dvd: 0,
  wifi: 0,
  battery: 0
};

cpu.setAttribute("data", JSON.stringify(cpus));
ram.setAttribute("data", JSON.stringify(rams));
storage.setAttribute("data", JSON.stringify(storages));
desktopMonitor.setAttribute("data", JSON.stringify(desktopMonitors));
laptopMonitor.setAttribute("data", JSON.stringify(laptopMonitors));

cpu.addEventListener("select", (e) => {
  cpuPrice.textContent = `${cpu.value}.-`;
  prices.cpu = cpu.value;
  total(prices);
});
ram.addEventListener("select", (e) => {
  ramPrice.textContent = `${ram.value}.-`;
  prices.ram = ram.value;
  total(prices);
});
storage.addEventListener("select", (e) => {
  storagePrice.textContent = `${storage.value}.-`;
  prices.storage = storage.value;
  total(prices);
});
desktopMonitor.addEventListener("select", (e) => {
  desktopMonitorPrice.textContent = `${desktopMonitor.value}.-`;
  prices.desktopMonitor = desktopMonitor.value;
  total(prices);
});
laptopMonitor.addEventListener("select", (e) => {
  laptopMonitorPrice.textContent = `${laptopMonitor.value}.-`;
  prices.laptopMonitor = laptopMonitor.value;
  total(prices);
});
os.addEventListener("switch", (e) => {
  osPrice.textContent = `${os.checked ? os.value : 0}.-`;
  prices.os = os.checked ? os.value : 0;
  total(prices);
});
dvd.addEventListener("switch", (e) => {
  dvdPrice.textContent = `${dvd.checked ? dvd.value : 0}.-`;
  prices.dvd = dvd.checked ? dvd.value : 0;
  total(prices);
});
wifi.addEventListener("switch", (e) => {
  wifiPrice.textContent = `${wifi.checked ? wifi.value : 0}.-`;
  prices.wifi = wifi.checked ? wifi.value : 0;
  total(prices);
});
battery.addEventListener("switch", (e) => {
  batteryPrice.textContent = `${battery.checked ? battery.value : 0}.-`;
  prices.battery = battery.checked ? battery.value : 0;
  total(prices);
});

resetButton.addEventListener("click", (e) => {
  cpu.reset();
  ram.reset();
  storage.reset();
  desktopMonitor.reset();
  laptopMonitor.reset();
  os.reset();
  dvd.reset();
  wifi.reset();
  battery.reset();

  prices = {
    cpu: 0,
    ram: 0,
    storage: 0,
    desktopMonitor: 0,
    laptopMonitor: 0,
    os: 0,
    dvd: 0,
    wifi: 0,
    battery: 0
  };

  cpuPrice.textContent = "0.-";
  ramPrice.textContent = "0.-";
  storagePrice.textContent = "0.-";
  desktopMonitorPrice.textContent = "0.-";
  laptopMonitorPrice.textContent = "0.-";
  osPrice.textContent = "0.-";
  dvdPrice.textContent = "0.-";
  wifiPrice.textContent = "0.-";
  batteryPrice.textContent = "0.-";
  totalPrice.textContent = "CHF 0.-";
});

function total(prices) {
  let values = Object.values(prices);
  let sum = values.reduce((accumulator, value) => accumulator + value, 0);
  totalPrice.textContent = `${sum}.-`
}