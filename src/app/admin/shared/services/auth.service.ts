import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {FBAuthResponse, User} from '../../../shared/interfaces'
import {Observable, Subject, throwError} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {catchError, tap} from 'rxjs/operators'


@Injectable({providedIn: 'root'})
export class AuthService {
  error$: Subject<string> = new Subject<string>()

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND' : this.error$.next('Email not found')
        break
      case 'INVALID_PASSWORD' : this.error$.next('Incorrect password')
        break
      case 'INVALID_EMAIL' : this.error$.next('Incorrect email')
        break
    }

    return throwError(error)
  }

  private setToken(response: FBAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
