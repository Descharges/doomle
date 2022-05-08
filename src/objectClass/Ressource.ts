export class Ressource {
  
    name:string = "";
    id:number = -1;
    class_id:number = -1;
    path:string = "";
    file_id:number = -1;
    markdown_id:number = -1;
    test_id:number = -1;
  
    constructor(name?:string){
      if(name !== undefined)
        this.name = name;
    }
  
  }