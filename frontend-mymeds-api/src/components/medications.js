class Medications {
    constructor(){
        this.medications = []
        this.adapter = new MedicationsAdapter()
        this.initBindingAndEventListeners()
        this.fetchAndLoadMedications()
        // this.renderMedCard = this.renderMedCard.bind(this)
    }

    initBindingAndEventListeners(){
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    fetchAndLoadMedications(){
        this.adapter
            .getMedications()
            .then(medications => {
                medications.forEach(medication => this.medications.push(new Medication(medication)))
                }
            )
            .then(() => this.enableSearch())
    }

    enableSearch(){
        this.div.innerHTML = ""
        let medNames = []
        this.medications.forEach(medication => medNames.push(medication.name))
        let htmlBlock = '<form autocomplete="off" action="" method="POST">' + 
                        '<div id="searchContainer">' + 
                        '<input id="searchBar" type="text" placeholder="Search Medications" list="meds_list">' +
                        '<datalist id="meds_list">' + 
                        '</datalist>' + 
                        '<button id="submit_med" type="submit">submit' + '</button>' +
                        '</div>' + 
                        '</form>'
        this.div.innerHTML = htmlBlock
        let med_input = document.querySelector('#searchBar')
        let meds_list = document.querySelector('#meds_list')
        const submit_med = document.querySelector("#submit_med")
        let medOption = ""
        let myMed = ""
        med_input.addEventListener("keyup", e => autocomp(e))

        function autocomp(e){
            if(e.keyCode !== 13){
                e.preventDefault()
                let input = e.target 
                let min_char = 0
                if(input.value.length < min_char){
                    return;
                }else{
                    meds_list.innerHTML = ""
                    medNames.forEach(function(med){
                        medOption = document.createElement('option')
                        medOption.value = med
                        meds_list.appendChild(medOption)
                    })
                }
            }else{
            myMed = med_input.value
            this.renderMedCard(myMed)
            }
        }

        submit_med.addEventListener("click", e => {
            e.preventDefault()
            e.stopPropagation()
            this.renderMedCard(med_input.value)
        }, false)

    }

    renderMedCard(myMed){
        alert(myMed)
        const medCard = this.medications.find(medication => medication.name === myMed)
        if(!!medCard){
            const medId = medCard.id 
            this.adapter.getMedication(medId)
                .then(medication => {
                    this.medication = new Medication(medication)
                })
                .then(() => {
                    this.medication.renderMedication()
                })
        }
    }

    eventFunc(e){
        e.preventDefault()
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'med-button': alert("why?!")
                    break;
                case 'logout-button': window.location.reload(true)
                    break;
            }
        } 
        e.stopPropagation() 
    }
}