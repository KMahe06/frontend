import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(payload: {name: string, email: string, password: string}) {
    return this.http.post<any>(`${this.base}/register`, payload).pipe(tap(res => this.setToken(res.token)));
  }

  login(payload: {email: string, password: string}) {
    return this.http.post<any>(`${this.base}/login`, payload).pipe(tap(res => this.setToken(res.token)));
  }

  setToken(token: string) { localStorage.setItem('token', token); }
  get token() { return localStorage.getItem('token'); }
  logout() { localStorage.removeItem('token'); }

  oauth(provider: 'google'|'microsoft') {
    const map = { google: '/oauth2/authorization/google', microsoft: '/oauth2/authorization/azure' } as const;
    window.location.href = `http://localhost:8080${map[provider]}`;
  }
}
