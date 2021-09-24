export class User {
  static fromFirebase(email: any, uid: any, name: any) {
    return new User(uid, name, email);
  }

  constructor(public uid: any, public name: string, public email: any) {}
}
