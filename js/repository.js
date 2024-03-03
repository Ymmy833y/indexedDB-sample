
class User {
  #id;
  #name;
  #birthday;
  #hobby;

  constructor(row) {
    if (row !== undefined) this.setRow(row);
  }

  setRow(row) {
    this.#id = row.id;
    this.#name = row.name;
    this.#birthday = row.birthday;
    this.#hobby = row.hobby;
  }

  setId(id) { this.#id = id }
  setName(name) { this.#name = name }
  setBirthday(birthday) { this.#birthday = birthday }
  setHobby(hobby) { this.#hobby = hobby }

  getId() { return this.#id }
  getName() { return this.#name }
  getBirthday() { return this.#birthday }
  getHobby() { return this.#hobby }

  generateRow() {
    if (this.#id === undefined) {
      return { 
        name: this.#name, 
        birthday: this.#birthday,
        hobby: this.#hobby
      }
    }
    return { 
      id: this.#id, 
      name: this.#name, 
      birthday: this.#birthday,
      hobby: this.#hobby
    }
  }
}


class Item {
  constructor(row) {
    if (row !== undefined) {
      this.setRow(row);
    }
  }

  setRow(row) {
    if (row.id !== undefined) this.id = row.id;
    this.name = row.name;
  }
}