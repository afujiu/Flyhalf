import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const accessStore = defineStore(
    "access",
    () => {
        function getAll(postData:object){
          const url = 'http://localhost:8080/kintone/getAll'
          return new Promise(async (resolve)=>{
            const data = await useFetch(url, {
              method: 'POST',
              body: postData,
            });
            resolve(data)
          })
        }
        return {getAll };
    },
);