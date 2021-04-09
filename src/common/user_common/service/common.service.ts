
export abstract class BaseService {
  model: any;

  constructor(model: any) {
    this.model = model;
  }
  
  // Create

  create = async (item: any) => {
    try {
      const newItem = new this.model(item);
      await newItem.save();
      return newItem;
    } catch (error) {
      console.log(error);
    }
  };


  // Update
  updateOne = async (item: any, plus:any) => {
    try {
      const updateone = await this.model.updateOne({_id: item},{$set: plus});
      return updateone;
    } catch (error) {
      console.log(error);
    }
  };
  

  // Delete

  deleteOne = async (item:any, plus:any) => {
    try {
      const deleteone = await this.model.findByIdAndUpdate({_id: item},{$set: { status:  plus },});
      return deleteone;
    } catch (error) {
      console.log(error);
    }
  };


  // Kiểm tra email

  findByEmail = async (item: any) => {
    try {
      const checkedEmail = await this.model.find({ email: item.email });
      return checkedEmail;
    } catch (error) {
      console.log(error);
    }
  };

}
