const form = document.querySelector('form');
const input  = document.querySelector('input');
const  message= document.querySelector("#message-1")
const  message2= document.querySelector("#message-2")


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = input.value;
    message.textContent="";
    message2.textContent="";
    message.textContent="LOADING INFORMATION PLEASE WAIT....."

    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message.textContent=data.error
            }
            else{
                var yo = data.summary+". Present temp = "+data.temp+"^C with "+data.precip+"% chance of rain"
                message.textContent=data.address;
                message2.textContent=yo;
  
            }
        })
        input.value="";
    
    })
})