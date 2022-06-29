const Form = document.getElementById('my_form');
const name = document.getElementById('name');
const btn = document.getElementById('btn');
const clear = document.getElementById('btn-clear');
const msg =document.querySelector('.msg');
const list =document.querySelector('.list-print');



clear.addEventListener('click',()=>{
  localStorage.removeItem("url")
  list.innerHTML=''
});

(function(){
  console.log('start')
  const currentURLS = localStorage.getItem('url')
  let parsed
  if(currentURLS){
    parsed = JSON.parse(currentURLS)
    parsed.forEach(({url , shorted})=>{

      generateUrl(url ,shorted)
    })
 }

})()

function generateUrl(url , shorted){
  const li=document.createElement("li");
  li.setAttribute('class','short-url-item');
  // span
  const span=document.createElement("span");
  span.setAttribute('class','url-txt');
  span.textContent=url;
  
  
  
  // short 
  const shortLink = document.createElement("span");
  shortLink.setAttribute('class','shorten');
  shortLink.textContent = shorted
  
  //button
  const button = document.createElement("button");
  button.setAttribute('class','copy-btn');
  button.setAttribute('onclick',`copyURL('${url}','${shorted}',this)`);
  button.textContent='copy';


  // wrapper 
  const wrapper = document.createElement("span");
  wrapper.setAttribute('class','wrap-shorten');

  wrapper.appendChild(shortLink)
  wrapper.appendChild(button)

  li.appendChild(span)
  li.appendChild(wrapper)
  list.appendChild(li)

}

function copyURL(url,shorted,selected){
 const buttons =  document.querySelectorAll('button')
 buttons.forEach(function(button) {
if(button.id!='btn'){
  button.textContent="Copy"
  button.style.backgroundColor='#2acfcf';
}  

});

  selected.style.backgroundColor='#3b3054e6';
  selected.textContent="Copied!"
  navigator.clipboard.writeText(shorted);
}



btn.addEventListener('click',onsubmit);
function onsubmit(e){
    e.preventDefault();
    
    if(name.value==='' ){
    
   msg.classList.add('error');
    msg.innerHTML="please add a link!!";
    name.style.border='red';



    }else{
      axios.post(`https://api.shrtco.de/v2/shorten?url=${name.value}`)
  .then(function (res) {
    // handle success
    generateUrl(name.value,res.data.result.short_link)

    const currentURLS = localStorage.getItem('url')
    let parsed =[]
    if(currentURLS){
       parsed = JSON.parse(currentURLS)
    }
    localStorage.setItem('url',JSON.stringify([...parsed , {url:name.value , shorted:res.data.result.short_link}]))
  })
  .catch(function (error) {
    // handle error
    alert(error.response.data.error);
  })



       
     }
}
