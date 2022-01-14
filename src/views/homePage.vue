<template>
    <div>
        <h1>Admin Home Page</h1>
        <div id="mainHomePage">
            <div id="success Message" v-show="showSection">
                <message-component style="background-color: rgb(71, 172, 71);" id="successfully_updated" :message="'successfully updated'"/>
            </div>
            <button id="addNewListBTN" @click="CreateList()" v-show="!this.isListMakerVisible">+</button>
            <ListMaker id="listMaker" @getListFromAPI="getList" v-show="this.isListMakerVisible" />
            <div id="lists">
            </div>
            
            <div id="OverLay">
                <modal id="popupLoading" >
                    <h3 style="margin-top: 50%;">Loading...</h3>
                </modal>
            </div>
        </div>
    </div>
</template>

<script>
import ListMaker from "../components/ListMaker.vue";
import MessageComponent from "../components/loginStatusMessage.vue"
import axios from 'axios';


export default {
    name: "adminHomePage",
    components: {
        ListMaker,
    MessageComponent,

  },
  created(){
      axios.get("/api/users/admin/homepage&Query=ALL_LISTS").then(response => {
          console.log("response on page load", response.data)
            if(response.data.isEmpty){
                alert("You have no lists. create one!")
            }else{
                this.getList(response.data)
            }
        })
  },
  data (){
      return{
        isListMakerVisible: false,
        addNewListButton: true,
        isCreatingAList: true,
        isloadingDivVisible: false,
        vShowSuccessMSG: false,
        listCounter: 0
      }
  },
  methods: {

      showSuccessfullUpdateMSG(){
        document.getElementById("OverLay").style.display = "none";
        document.getElementById("success Message").style.display= "block";
        this.vShowSuccessMSG = true
        setTimeout(function() {
            this.vShowSuccessMSG = false;
            document.getElementById("success Message").style.display= "none";
            }, 1500)
      },
      updateCheckBoxStatus(){

        document.getElementById("OverLay").style.display = "block";
        axios.post("**/api/users/admin/homepage&listCheckBoxChecked").then(response => {
          console.log("response on page load", response.data)
            if(response.data.isEmpty){
                return
            }else{
                this.getList(response.data)
                setTimeout(this.showSuccessfullUpdateMSG(), 2000)
                
            }
        })

      },

      CreateList(){
        
        this.addNewListButton = false
        this.isListMakerVisible = true
        var listDiv = document.createElement("div")

        listDiv.setAttribute("id", `div-list${this.listCounter}`)

        var newlyAddedListDiv = document.getElementById(`list${this.listCounter}`)
        var unOrderedNewList = document.createElement("ul")
        unOrderedNewList.setAttribute("id", `ul${this.listCounter}`)

        newlyAddedListDiv.appendChild(unOrderedNewList)
        this.listCounter += 1

      },
    
    updateListInfo(listDiv, newListObject){
        listDiv.firstChild.textContent = newListObject["List Name"]
        var listItems = listDiv.lastChild.children
        console.log("newListObject", newListObject)
        for(var item = 0; item < listItems.length; item++){
            listItems[item].lastChild.textContent = Object.keys(newListObject["List Items"])[item]
            Object.values(newListObject["List Items"])[item] == "No" ? listItems[item].firstChild.checked = false : listItems[item].firstChild.checked = true
        }
    }
    ,
    getList(value){
    
    console.log("value", value)

    var lists = document.getElementById("lists").children;

    for(var child = 0; child < lists.length; child++){
        if(lists[child].getAttribute("id") == value["id"]){
            this.updateListInfo(lists[child], value)
            return
        }
    }

    var keys = Object.keys(value['List Items'])
    this.isListMakerVisible=false
    var Ulist = document.createElement("ul")
    var UListID = value.id




    var ListDiv = document.createElement("div")
    ListDiv.setAttribute("id", UListID)
    ListDiv.setAttribute("class", "listBlock")

    console.log(`div-list${UListID}`)
    document.getElementById("lists").appendChild(ListDiv)
    
    var ListName = document.createElement("h3")
    ListName.setAttribute("id", "listName")
    ListName.textContent = value["List Name"]
    ListDiv.appendChild(ListName)


    Ulist.setAttribute('id', UListID)
    console.log("UListID",UListID)
    ListDiv.appendChild(Ulist)

    for(var i = 0; i < keys.length; i++){

        var item = document.createElement("li")
        var checkBox = document.createElement("input")
        var label = document.createElement("label") 
        label.textContent = keys[i]

        checkBox.setAttribute("type", "checkbox")
        checkBox.setAttribute("id", i)
        checkBox.setAttribute("class", "checkBoxes")
        checkBox.addEventListener("click", () => {
            this.updateCheckBoxStatus()
        })
        // if(Object.values(value['List Items'][i]) === "No"){
        //     print("I'm in the if clause")
        //     checkBox.setAttribute("checked", false)
        // }else{
        //     print("I'm in the else clause")

        //     checkBox.setAttribute("checked", true)
        // }

        label.setAttribute("for", i)
        
        
        item.appendChild(checkBox)
        item.appendChild(label)
        
        
        Ulist.appendChild(item)
        }

    console.log("reached end of getLIST")
    },

    checkIFListAlreadyIsDisplayed(){

    }

  },

    
}
</script>



<style>

#addNewListBTN{
    border-radius: 25px;
    padding: 0px;
    height: 50px;
    width: 50px;
}

div.listBlock{
    background-color: rgb(201, 212, 152);
    border-radius: 20px;
    border: 3px solid rgb(0, 0, 0);

    width: 25%;
    height: 10%;

    /* justify-content: left; */

}

div.listBlock > ul{
    /* padding-left:20px; */
    margin: 0px;
    padding:0px;
    text-align: left;
    list-style-type: none;
    padding-bottom: 5px;
}


div.listBlock > ul > li{
    width: 100%;
    height: 100%;
    margin: 0px;
    text-align: left;
    list-style-type: none;

    align-items: center;
}

.checkBoxes{
    display:inline-block;
    width: 16px;
    height:16px;
    margin: 10px;
    padding: 10px;

}

label{
    display:inline-block;
    width: auto;
    height:auto;
    margin: 0px;
    /* padding: 10px; */
}

#item-div{
    width: 100%;
    height: 100%;
}

#popupLoading[v-show="true"]{
    width: 100%;
    height: 100%;
    color: black;
    background-color: white;
    
}

#OverLay{
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}


</style>