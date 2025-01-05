export class ItemToDraw {
  private width: number
  private height: number
  private position: [number, number]
  public color: string
  public state: string
  public isFinished: boolean = false
  private isClear:   boolean = false

  constructor(position:[number, number], width: number, height: number, color: string, isClear: boolean) {
    this.width    = width
    this.height   = height
    this.color    = color
    this.position = position
    this.state    = "Down"
    this.isClear  = isClear
  }

  getPositionX(){
    return this.position[0]
  }
  getPositionY(){
    return this.position[1]
  }
  getWidth(){
    return this.width
  }
  getHeight(){
    return this.height
  }
  setPositionX(newVal: number){
    this.position[0] = newVal
  }
  setPositionY(newVal: number){
    this.position[1] = newVal
  }
}