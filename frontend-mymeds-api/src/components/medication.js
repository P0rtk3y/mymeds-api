class Medication {
    constructor(medObjJSON){
        this.id = medObjJSON.id 
        this.name = medObjJSON.name 
        this.className = medObjJSON.className
        this.photo = medObjJSON.photo
        this.info = medObjJSON.info
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    renderMedication(){

    }

    eventFunc(e){
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'logout-button': window.location.reload(true)
                    break;
                
            }
            e.stopPropagation()
        }  
    }
}