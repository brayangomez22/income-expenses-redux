import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as incomeExpensesActions from '../income-expenses/income-expenses.actions';

import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription!: Subscription;
  private _user!: User;

  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubscription = this.firestore
          .doc(`${fuser.uid}/user`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = User.fromFirebase(
              firestoreUser.email,
              firestoreUser.uid,
              firestoreUser.name
            );
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        if (this.userSubscription) {
          this._user = new User('', '', '');
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(incomeExpensesActions.unSetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user?.uid, name, user?.email);
        return this.firestore.doc(`${user?.uid}/user`).set({ ...newUser });
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
