<template>
  <div class="home">
    <h1>BSP06 Login Page</h1>
    <div class="container">
      <label>User Name</label>
      <input type="text" id="UserName"> <br>
       <label>Password</label>
      <input type="password" id="password"> <br>
      <button id="submissionBTN" @click="login">submit</button>
      <MessageComponent v-if="response === true" style="background-color: rgb(71, 172, 71);" :message="this.Message"/>
      <MessageComponent v-if="response === false" style="background-color: rgb(172, 71, 71);" :message="this.Message"/>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import MessageComponent from "../components/loginStatusMessage.vue"
export default {
  name: "LoginPage",
  components: {
    MessageComponent,
  },

  data (){

    return{
      Message: "",
      response: Boolean}
  }
  ,
  methods:
  {
    login(){
      let writtenUserName = document.getElementById("UserName");
      let writtenPass = document.getElementById("password");
      axios.get('api/users', {
        "body": {
          "ID": writtenUserName,
          "PWD": writtenPass
          }
      })
      .then((response) => {
        this.response = response.data.isAuthenticated
        if (response.data.isAuthenticated){
          this.Message = response.data.msg
          console.log(this.Message)
        }else{
          this.Message = response.data.msg
          console.log(this.Message)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then( () => {
        // always executed
        if (this.response){
          setTimeout(() => {  this.$router.push({ name: "adminHomePage"}); }, 2500);
        }
      }); 

    }
  }
};
</script>


<style>

*{
  font-family: "Times New Roman", Times, serif;
}

/* input{
  padding: 10px 30px;
  border: 4px rgb(109, 154, 228) solid;
  border-radius: 10px ;
  margin-left: auto;
  margin-right: auto;
  vertical-align: middle;
  width: 50%;
  /* position: absolute; 
} 
*/
body {
  background-color: #e0e0e0;
}

#submissionBTN{
    border-radius: 20px;
}

button{
  padding: 12.5px 50px;
  margin: 50px 10px 50px 10px;
  font-size: 1ex;
  background-color: #536644;
  font-size: 2ex;
  font-weight: bold;
  font-size: 2.5ex;
  color: #b7beb2 ;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

button:hover{
  background-color: #b7beb2;
 
}

.container{
  padding: 20px;
  position: relative;
  background-color: #b7beb2;
  border-radius: 10px ;
  margin: 10% 30%;
  color: #536644;
  font-size: 2.5ex;
  font-style: bold;
  font-weight:bolder;
  text-align: center;
  width: 300px;
  display: inline-block;
  justify-items: auto;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

label {
  width: 200px;
  display:inline-block
}

</style>