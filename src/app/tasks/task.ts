export class Task {
  _id?: string;
  startDate: Date = new Date();
  finishDate: Date;
  description: string;

  constructor() {

  }

  public static parse(json: any) {
    const obj = new Task();
    obj._id = json._id;
    obj.description = json.description;
    obj.startDate = new Date(json.startDate);
    obj.finishDate = new Date(json.finishDate);
    return obj;
  }
}
