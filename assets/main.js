
const storageWeather= {
  country: '',
  city: '',
  saveItem(){
    localStorage.setItem("weatherDateGetCity", this.city);
    localStorage.setItem("weatherDateGetCountry", this.country);
  },
  getItem(){
    const city = localStorage.getItem("weatherDateGetCity");
    const country = localStorage.getItem("weatherDateGetCountry");
    return{
      city,country
    }
  }
}
const dateweather= {
    country: " ",
    city:" ",
    API_KEY:"599a32bc0856c271d7758c7dabdeba7b",
    async getWeather(){
          try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.API_KEY}`);
            const {name,main,weather} =await res.json();
          return{
              name,
              main,
              weather
            }
          }catch(er){
            console.log(er);
          }   
        
    }
}
const UI={
  loadSelection(){
   const countryEle= document.querySelector(".country");
   const cityEle= document.querySelector(".city");
   const submitEle= document.querySelector(".submitEle");
   const formEle= document.querySelector("form");
   const titleEle= document.querySelector("h4");
   const wTemparatureEle= document.querySelector(".wTemparature");
   const wPresureEle= document.querySelector(".wPresure");
   const wHumidityEle= document.querySelector(".wHumidity");
   const wIcon= document.querySelector(".w-icon");
   const wDesc= document.querySelector(".desc");
   return{
    countryEle,cityEle,submitEle,wTemparatureEle,wPresureEle,wHumidityEle,formEle
,titleEle,wIcon,wDesc }
  },
  showMsg(msg){
    const showMsgOption= document.querySelector(".showMsg")
    showMsgOption.textContent = msg;
    showMsgOption.className =" alert alert-danger";
    setTimeout(()=>{
        showMsgOption.remove();

    },2000);
  },
  resetValue(){
    const {countryEle,cityEle} = this.loadSelection();
    countryEle.value = "";
    cityEle.value = "";
    return{countryEle,cityEle}

  },
  validationEle(country,city){
    if(country === "" || city=== ""){
        this.showMsg("Please Provide Right Info");
        return true
    }else{
        return false
    }
  },
  getInputValue(){
    const {countryEle,cityEle} = this.loadSelection();
    const country= countryEle.value;
    const city= cityEle.value;
    const isValid=this.validationEle(country,city);
    if(isValid){
        return isValid
    }else{
        return {
            country,city
        }
    }
  },
  async handleRemoveDate(){
    const date= await dateweather.getWeather();
    return date;
  },
  getIcon(getCode){
    return `http://openweathermap.org/img/wn/${getCode}@2x.png`;
  },
  populateUi(date){
    const {wTemparatureEle,wPresureEle,wHumidityEle,titleEle,wDesc,wIcon} = this.loadSelection();
    const {name,main:{temp,pressure,humidity},weather} = date;
    wTemparatureEle.textContent = `Temparature: ${temp}°C`;
    wPresureEle.textContent = `Pressure: ${pressure}Kpa`;
    wHumidityEle.textContent = `Humadity: ${humidity }`;
    titleEle.textContent = `City: ${name}`;
    wDesc.textContent = weather[0].description;
    wIcon.setAttribute("src", this.getIcon(weather[0].icon));

  },
  setDateLocalStorage(country,city){
    storageWeather.country= country;
    storageWeather.city= city;
  },
  init(){
    const {formEle} = this.loadSelection();
    formEle.addEventListener("submit",async(evt)=>{
        evt.preventDefault();
        const {country,city} = this.getInputValue();
        this.resetValue();
        dateweather.city = city;
        dateweather.country = country;
        this.setDateLocalStorage(country,city);
        storageWeather.saveItem();
        const date = await this.handleRemoveDate();
        console.log(date);
        this.populateUi(date);
        
    })
    window.addEventListener("DOMContentLoaded",async()=>{
        let {city,country}=storageWeather.getItem();
        if(!city || !country){
          city = "chittagong";
          country = "BD";
        }
        dateweather.city = city;
        dateweather.country = country;


        const date = await this.handleRemoveDate();
        this.populateUi(date)

    });
  }, 
}

UI.init();



