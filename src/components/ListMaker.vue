<template>
    <div id="to-do-list-maker" >
        <modal id="listMaker">
            <h3 id="newlistNamePlace">New List Name:</h3>
            <input id="listName" placeholder="My to-do list#1"> <br>
            <input id="new item" type="text" placeholder="item#1">
            <button id="addListItemBTN" @click="addItem">+</button>
            <ul id="list">
            </ul>
            <button id="DoneBTN" @click="postInformation">Done</button>
        </modal>
    </div>
</template>

<script>
import axios from 'axios';


export default {
     name: "ListMakerComponent",
    components: {

    },
    props: ["isListMakerVisible"],
    data () {
        return {
            listName: String,
            listItems: [],
            ListFromServer: null
        }
    },
    


    methods: {
    
        addItem(){
            // var listMaker = document.getElementById("listMaker")
            var newItem = document.createElement("li")
            var text = document.createElement("p") 

            text.textContent = document.getElementById("new item").value
            this.listItems.push(text.textContent)
            var tempList = document.getElementById("list")
            this.listName = document.getElementById("listName").value

            newItem.appendChild(text)
            tempList.appendChild(newItem)

            document.getElementById("new item").value =''
            this.$emit('addItem')

        }
        ,
        hideListMaker(){

            this.$emit('getListFromAPI', this.ListFromServer)
        },


        postInformation(){
            
            var link = document.URL.split("/")
            link = "http://api/users/" + link[4] + "/homepage"

            var POSTREQ_DATA =  {
            "List Name": this.listName,
            "List Items": this.listItems
            }

        this.ListFromServer = {}
        axios.post(link, POSTREQ_DATA).then(response => {
            this.ListFromServer = response.data
        }).then(() => {
            this.hideListMaker()
            })
        },

        addRemoveBTN(element){
            var btn = document.createElement("button")
            btn.textContent = "DELETE"
            btn.setAttribute("@click", () => {
                
            })

            element.appendChild(btn)
        },

        removeElement(element){
            element.parentNode.removeChild(element)
        }
    },

}
</script>


<style>
#addListItemBTN {
    height: 30px;
    width: 60px;
    padding: 0px;
}

#to-do-list-maker {
    border: 10px solid black;}


</style>