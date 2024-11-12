let formData = document.querySelector('#formData')
let result_error = document.querySelector('.msg-error')
let msg_success = document.querySelector('.msg-success')
let list_group=document.querySelector('.list-group')
let mybtn=document.querySelector('#mybtn')

let userLists = [{
    "name": "a",
    "lastName": "b",
    "email": "c@mail.ru",
    "psw": "vdfzvdf",
    "address": "d",
    "address2": "e",
    "city": "f",
    "state": "Home",
    "index": "1158",
    "agree": "on",
    "uid": 1730794976504,
    update_at:" 2024-11-5 13:21:17",
    create_at:" 2024-10-05 13:21:17",
},{
    "name": "Astxik",
    "lastName": "Sargsyan",
    "email": "astx_93@mail.ru",
    "psw": "vdfzvdf",
    "address": "yerevan",
    "address2": "Qanaqer",
    "city": "yerevan",
    "state": "Home",
    "index": "0013",
    "agree": "on",
    "uid": 1730795041693,
    update_at:" 2024-01-5 13:15:17",
    create_at:" 2024-10-05 13:21:17",
}]
let storage=localStorage['usersList']
if(storage){
    userLists=JSON.parse(storage)
}else{
    localStorage['usersList']=JSON.stringify(userLists)
}

document.body.onload=function (){
    userLists.forEach(element=>{
        add(element)
    })
}
formData.onsubmit = function (e) {

    e.preventDefault();

    let userList = {}
    let values = e.target.elements
    let status=true
    for (let i = 0; i < values.length; i++) {
        if (values[i].name === 'uid') {
            userList[values[i].name] = Date.now()
        } else {
            let val=values[i].value
            if(val.length){
                userList[values[i].name] =val ;
                values[i].classList.remove('is-invalid')
            }else{
                values[i].classList.add('is-invalid')
                status=false
            }


        }

    }
    if(status){
        if(update){
            updateValue(update,userList)
        }else{
            let date=new Date()
            userList.create_at=`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

            userLists.push(userList)
            add(userList)
        }

        e.target.reset()
        msg_success.classList.remove('d-none')
        result_error.classList.add('d-none')

    }else {
        msg_success.classList.add('d-none')
        result_error.classList.remove('d-none')
    }

}
function add(element){


    let li=document.createElement('li');


        li.setAttribute('class','list-group-item list-group-item-action d-flex align-items-center justify-content-between')

        li.innerHTML=`<span class="item-text" id="uniq-${element.uid}">${element.name} ${element?.create_at} ${element?.update_at} </span>`
            // create Div
        let dv=document.createElement('div')
            // create edit button
            let btnEdit=document.createElement('button')
                btnEdit.setAttribute('class',"edit-me btn btn-secondary btn-sm mr-1")
                btnEdit.innerHTML="Edit"
            dv.appendChild(btnEdit)
            // create delete button
            let btnDelete=document.createElement('button')
                btnDelete.setAttribute('class',"delete-me btn btn-danger btn-sm")
                btnDelete.innerHTML='Delete'
            dv.appendChild(btnDelete)

        li.appendChild(dv)

    list_group.appendChild(li)

    // _____________Actions_________________

    // _________Delete______________


    btnDelete.onclick=function (){
        userLists=userLists.filter(res=>res.uid!==element.uid)
        li.remove()
        localStorage['usersList']=JSON.stringify(userLists)
    }
    // _________Edit______________
    btnEdit.onclick=function (){
       update=element
        mybtn.innerHTML='update'
        let value=formData.elements
        for(let i=0;i<value.length;i++){
           let valname=value[i].name
            value[i].value=element[valname]
        }
    }

}
function updateValue(oldValue,newValue){
    let date=new Date()

    let time=   `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    userLists= userLists.map(res=>{
       if(res.uid===oldValue.uid){
           return {

               ...newValue,
               uid:res.uid,
               update_at:time
           }
       }
       return res
   })
    let text=document.querySelector('#uniq-'+oldValue.uid)
    text.innerText=`${newValue.name} ${oldValue?.create_at} ${time}`
    update=null
    mybtn.innerHTML='Add new item'
    localStorage['usersList']=JSON.stringify(userLists)

}
