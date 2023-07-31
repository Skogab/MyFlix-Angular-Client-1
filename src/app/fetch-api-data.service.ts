import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

//Hier kommt die API hin, auf die zugegriffen werden soll
const apiUrl = "https://movieappskogaby.herokuapp.com/";
@Injectable({
	providedIn: "root",
})
export class FetchApiDataService {
	// Der hhtpclient wird in den Konstruktor eingefügt und somit als Klasse verfügbar
	constructor(private http: HttpClient) {}

	// API Aufruf für die Registrierung
	public userRegistration(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "users", userDetails).pipe(catchError(this.handleError));
	}

	// API Aufruf für den Login
	public userLogin(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "login", userDetails).pipe(catchError(this.handleError));
	}

	// API Aufruf für Endpunkt "Movies"
	getAllMovies(): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies", {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// API Aufruf für einen Film
	getOneMovie(title: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies/" + title, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// MAPI Aufruf für einen Director
	getOneDirector(directorName: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies/director/" + directorName, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// API Aufruf für das Genre
	getOneGenre(genreName: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies/genre/" + genreName, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// API Aufruf für Endpunkt User
	getOneUser(): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		return user;
	}

	// API Aufruf für Favorite Movies
	getFavoriteMovies(): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "users/" + user.Username, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(
				map(this.extractResponseData),
				map((data) => data.FavoriteMovies),
				catchError(this.handleError)
			);
	}

	// API Aufruf für Add favorite Movie
	addFavoriteMovie(movieId: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		user.FavoriteMovies.push(movieId);
		localStorage.setItem("user", JSON.stringify(user));
		return this.http
			.post(
				apiUrl + "users/" + user.Username + "/movies/" + movieId,
				{},
				{
					headers: new HttpHeaders({
						Authorization: "Bearer " + token,
					}),
					responseType: "text",
				}
			)
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	isFavoriteMovie(movieId: string): boolean {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		return user.FavoriteMovies.indexOf(movieId) >= 0;
	}

	// API Aufruf für editing des Users
	editUser(updatedUser: any): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http
			.put(apiUrl + "users/" + user.Username, updatedUser, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// API Abruf um einen User zu löschen
	deleteUser(): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http
			.delete(apiUrl + "users/" + user._id, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(catchError(this.handleError));
	}

	// API Abruf um einen Film aus den favorite movies zu löschen
	deleteFavoriteMovie(movieId: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");

		const index = user.FavoriteMovies.indexOf(movieId);
		console.log(index);
		if (index > -1) {
			user.FavoriteMovies.splice(index, 1);
		}
		localStorage.setItem("user", JSON.stringify(user));
		return this.http
			.delete(apiUrl + "users/" + user.Username + "/movies/" + movieId, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
				responseType: "text",
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	private extractResponseData(res: any): any {
		const body = res;
		return body || {};
	}

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error("Some error occurred:", error.error.message);
		} else if (error.error.errors) {
			return throwError(() => new Error(error.error.errors[0].msg));
		} else {
			console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
		}
		return throwError(() => new Error("Something bad happened; please try again later."));
	}
}
