import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'events' | 'response';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface RequestOptions {
    headers?: HttpHeaders;
    reportProgress?: boolean;
    params?: HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

export type HttpMethod = 'POST' | 'PUT' | 'PATCH';

@Injectable()
export class HttpApiService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string, params = null, httpOptions: HttpOptions = null, retry = 2): Observable<T> {
    const options: Options = (httpOptions as Options) || { withCredentials: true };
    options.params = params;

    return this.http.get<T>(url, options).retry(retry);
  }

  public post<T>(url: string, data: any, params = null, httpOptions: HttpOptions = null, retry = 2): Observable<T> {
    const options: Options = (httpOptions as Options) || { withCredentials: true };
    options.params = params;

    return this.http.post<T>(url, data, options).retry(retry);
  }

  public put<T>(url: string, data: any, params = null, httpOptions: HttpOptions = null, retry = 2): Observable<T> {
    const options: Options = (httpOptions as Options) || { withCredentials: true };
    options.params = params;

    return this.http.put<T>(url, data, options).retry(retry);
  }

  public delete<T>(url: string, params = null, httpOptions: HttpOptions = null, retry = 2): Observable<T> {
    const options: Options = (httpOptions as Options) || { withCredentials: true };
    options.params = params;

    return this.http.delete<T>(url, options).retry(retry);
  }

  public request<T>(method: HttpMethod, url: string, data: any, params = null,
                    httpOptions: RequestOptions = null): Observable<HttpEvent<T>> {

    httpOptions = httpOptions || { withCredentials: true };
    httpOptions.params = params;

    const req = new HttpRequest(method, url, data, httpOptions);
    return this.http.request(req);
  }

}
