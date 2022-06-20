

export class Class {
  
    id:number = -1;
    name:string = "";
    description:string = "";
    color:string = "";

  constructor(name?:string){
    if(name !== undefined)
      this.name = name;
  }

}
