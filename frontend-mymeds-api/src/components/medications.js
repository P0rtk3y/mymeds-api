class Medications {
    constructor(){
        this.medications = []
        this.adapter = new MedicationsAdapter()
        this.initBindingAndEventListeners()
        this.fetchAndLoadMedications()
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
        let htmlBlock = '<form autocomplete="off">' + 
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
        let selectedMed = ""
        med_input.addEventListener("keyup", function(e){autocomp(e)})

        function autocomp(e){
            let input = e.target 
            let min_char = 0

            if(input.value.length < min_char){
                return;
            }else{
                meds_list.innerHTML = ""
                medNames.forEach(function(med){
                    selectedMed = document.createElement('option')
                    selectedMed.value = med
                    meds_list.appendChild(selectedMed)
                })
            }
            med_input.addEventListener("keypress", function(e){
                if(e.key === 'Enter'){
                    loadMed(e)
                }
            }, true)
            submit_med.addEventListener("submit", function(e){
                    loadMed(e)
            }, false)

            function loadMed(e){
                e.preventDefault()
                let medCard = med_input.value
            }
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