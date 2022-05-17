

export class Class {
  
    id:number = -1;
    name:string = "";
    definition:string = "";
    color:string = "";
    main_resource_id:number = -1;

  constructor(name?:string){
    if(name !== undefined)
      this.name = name;
  }

}
