<template>
    <div id="popup-success">
        <modal id="messageBox" >
            <h3>
                {{message}}
            </h3>
        </modal>
    </div>
    
</template>

<script>
export default {
    name: "MessageComponent",
    props: ["message"]
}
</script>

<style>

  .popup-success{
      background-color: rgb(36, 206, 36);
      padding: auto;
  }
  h3 {
      color: black;
  }

</style>

