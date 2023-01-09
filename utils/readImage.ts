export class ReadFiles {
  constructor() {}
  async addImage(event:any) {
    const newArr = [];
    for (let i = 0; i < event.target.files.length; i++) {
      newArr.push(
        await this.getBase64(event.target.files[i])
      );
    }
    const o = {
      files: newArr
    };

    return o;
  }

  getBase64(file:any) {
    return new Promise(function(resolve) {
      var reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result)
      }
      reader.readAsDataURL(file);
    })
  }

}
