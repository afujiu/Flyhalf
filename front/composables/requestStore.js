/**
 * リクエスト
 */
import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const requestStore = defineStore("requestStore",
    ()=>{
    /********************************************************
     * ssh暗号を生成して、公開鍵を返す
     */
    const localSshKeys=ref({private:'',public:''})
    const crypt = ref(null)
    const createSshKey=()=>{
        crypt.value = new JSEncrypt({ default_key_size: 512 })
        localSshKeys.value.private = crypt.value.getPrivateKey()
        localSshKeys.value.public = crypt.value.getPublicKey()
    }
    /**
     * 暗号を復号
     * @param {*} data
     * return json 
     */
    const decode =(data)=>{
        crypt.setPrivateKey(localSshKeys.value.privateKey)
        let decypt = crypt.decrypt(data)
        return JSON.parse(decypt)
    }

    /********************************************************
     * サーバの公開鍵取得
     * 
     */
    const serverPublicKey=ref('')
    const getServerPublicKey = () => {
        return new Promise(resolve => {
            fetch('http://localhost:8080/publickey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(dataStr => {
              let data = JSON.parse(dataStr)
              serverPublicKey.value = data.result.serverPublicKey
              resolve()
            })
            .catch(error => {
                resolve({ status: false, data: null, err: error })
            })
        })
    }


    /********************************************************
     * 通常送信
     * 
     */
    /**
     * テナントキー
     */
    const tenantData=ref({db:null,key:null,token:null})
    const  createTenant= (db,key,name) => {


    }
    const  setTenantData= (db,key) => {


    }
    const fetchServer = (url,query) => {
      createSshKey()
      const body={
        url:url,
        tenantMode:'onpremiss',
        tenantKey:'',
        localPublic:localSshKeys.value.public,
        query:query
      }
      // 鍵をRSA暗号化
    const cryptKeyOrigin="hontoharansutoka"
    const rsa = new JSEncrypt({ default_key_size: 512 })
    rsa.setPublicKey(serverPublicKey.value.toString())
    let cryptKey = rsa.encrypt(cryptKeyOrigin,'base')
    console.log(cryptKey)
    const encrypte = CryptoJS.AES.encrypt(JSON.stringify(body), cryptKeyOrigin ).toString()
    return new Promise(resolve => {
        fetch(`http://localhost:8080/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                cryptKey:cryptKey
            },
            body:JSON.stringify({encrypte:encrypte})
        }).then(response => response.json())
        .then(data => {
          const rsa = new JSEncrypt({ default_key_size: 512 })
          rsa.setPrivateKey(localSshKeys.value.private)
          const cryptkeyOrigin = rsa.decrypt(data.cryptkey)
          const bytes = CryptoJS.AES.decrypt(data.result,cryptkeyOrigin)
          const result = bytes.toString(CryptoJS.enc.Utf8)
          resolve(result)
        })
        .catch(error => {
            resolve({ status: false, data: null, err: error })
        })
    })
    }
    /**
     * 初期化
     */
    const init =async()=>{
      // サーバー公開キー取得
      await getServerPublicKey()
    }
    return {
      init,
      fetchServer
    }
},
  {
    persist: {
      storage: sessionStorage,
      serializer: {
        deserialize: (str) => {
          const decrypted = CryptoJS.AES.decrypt(str, 'requestStore')
          const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
          return JSON.parse(decryptedData)
        },
        serialize: (state) => {
          return CryptoJS.AES.encrypt(JSON.stringify(state), 'requestStore').toString()
        },
      }
    },
  }
)
