import { defineStore } from "pinia"

export const teamColor = defineStore('team', {
  state: () => ({ 
    bgColor : "white",
    textColor:"#242424", 
    menuColor:"#00aa9f",//,
    menuShadowColor:"#00aa9fb3",
    menuSelectedColor:"#b8c2cc",
  }),
  actions: {
    setInfo(Team){
      this.bgColor = info.bgColor
      this.textColor = info.textColor
    }
  }
})

export default teamColor;