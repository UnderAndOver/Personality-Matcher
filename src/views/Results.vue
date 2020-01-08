<template>
  <v-card>
      <v-card-text>
          hello
      </v-card-text>
  </v-card>
</template>

<script>
const getResult = require('@alheimsins/b5-result-text')
export default {
    data: ()=>{
        return{};
    },
    methods:{
        showResults(){
            const results = getResult({scores:this.personalityScores,lang:'en'});
            console.log(JSON.stringify(results,null,2));
        }
    },
    mounted(){
        console.log(this.personalityScores);
        this.showResults();
    },
    computed:{
        personalityScores(){
            return this.$store.getters.personalityScores;
        }
    }
};
</script>

<style>

</style>