class PreferencesController {
  constructor(){
    this.dialog = document.querySelector(".preference-dialog")
    this.openButton = document.querySelector(".open-preference-dialog")
    this.closeButton = document.querySelector(".close-preference-dialog")
    this.form = document.querySelector(".preferences-form")
    this.nameInput = document.querySelector(".preference-name")
    this.maternalInput = document.querySelector(".preference-maternal")
    this.learningSelect = document.querySelector(".preference-learning")
    this.characterSelect = document.querySelector(".preference-character")

     }
    init(storage){ 
      this.storage = storage
      this.nameInput.value = this.storage.name
      this.maternalInput.value = this.storage.maternalLanguage
      this.learningSelect.value = this.storage.learningLanguage
      this.characterSelect.value = this.storage.character
    
      this.openButton.onclick = (e) => {
        this.dialog.show()
      }
    
      this.closeButton.onclick = (e) => {
        this.dialog.close()
      }
    
      this.form.onchange = (e) => {
        this.storage.name = this.nameInput.value
        this.storage.maternalLanguage = this.maternalInput.value
        this.storage.learningLanguage = this.learningSelect.value
        this.storage.character = this.characterSelect.value
      }  
    }
}