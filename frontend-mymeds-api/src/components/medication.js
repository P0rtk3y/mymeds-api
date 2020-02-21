class Medication {
    constructor(medObjJSON){
        this.id = medObjJSON.id 
        this.name = medObjJSON.name 
        this.class = medObjJSON.class
        this.photo = medObjJSON.photo
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.welcome = document.querySelector('header')
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    getMedications(){
        
    }
}