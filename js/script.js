import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase,ref, push ,onValue,remove ,set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const appSettings ={
    databaseURL: "https://js-crud-de722-default-rtdb.firebaseio.com/",
}

const app =initializeApp(appSettings);
const database=getDatabase(app)
const usersListInDB = ref(database,"users")

const idEl =document.querySelector("#id")
const nameEl =document.querySelector("#name")
const ageEl =document.querySelector("#age")
const cityEl =document.querySelector("#city")
const frm =document.querySelector("#frm")
const tblBodyEl =document.querySelector("#tblBody")

frm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    if(idEl.value){
        //update
        return;
    }
    if(!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim()){
        alert("please fill all details");
        return;
    }
    // insert
    const newUser={
        name:nameEl.value.trim(),
        age:ageEl.value.trim(),
        city:cityEl.value.trim(),

    }
    push(usersListInDB,newUser)
    clearElement();
})
function clearElement(){
nameEl.value="";
ageEl.value="";
cityEl.value="";
}
onValue(usersListInDB,function(snapshot){
    if(snapshot.exists()){
      let userArray=Object.entries(snapshot.val())
      console.log(userArray);
      tblBodyEl.innerHTML=""
      for(let i=0;i<userArray.length;i++){
        let currentUser = userArray[i];
        console.log(currentUser);
        let currentUserID = currentUser[0];
        let currentUserValue = currentUser[1];
        
        tblBodyEl.innerHTML += ` <tr>
            <td>${i+1}</td>
            <td>${currentUserValue.name}</td>
            <td>${currentUserValue.age}</td>
            <td>${currentUserValue.city}</td>
            <td><button data-id="${currentUserID}">edit</button></td>
            <td><button data-id="${currentUserID}">Del</button></td>
        </tr>`
        
      }
    }else{
        tblBodyEl.innerHTML='<tr><td colspan="6">no record</td></tr>'
    }
})