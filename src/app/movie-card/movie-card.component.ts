/**
 * @fileOverview
 * @module MovieCardComponent
 */

import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { MovieInfoComponent } from "../movie-info/movie-info.component";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 * MovieCardComponent zeigt und ermöglicht Aktionen bei Filmen
 * @class
 * @name MovieCardComponent
 */
@Component({
	selector: "app-movie-card",
	templateUrl: "./movie-card.component.html",
	styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent {
	movies: any[] = [];

	/**
	 * Erstellt eine Instanz von MovieCardComponent.
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData - Abrufen der API.
	 * @param {MatSnackBar} snackBar
	 * @param {MatDialog} dialog - Anzeigen von Filminformationen.
	 */
	constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar, public dialog: MatDialog) {}

	/**
	 * Ruft beim Initialisieren alle Filme der API ab.
	 * @function
	 * @name ngOnInit
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see MovieCardComponent.getMovies()
	 */
	ngOnInit(): void {
		this.getMovies();
	}

	/**
	 * Ruft alle Filme von der Datenbank über die API ab.
	 * @function
	 * @name getMovies
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see FetchApiDataService.getAllMovies()
	 */
	getMovies(): void {
		this.fetchApiData.getAllMovies().subscribe((resp: any) => {
			this.movies = resp;
			console.log(this.movies);
			return this.movies;
		});
	}

	/**
	 * Öffnet einen Dialog, der Informationen über ein bestimmtes Genre anzeigt.
	 * @function
	 * @name openGenre
	 * @param {string} name
	 * @param {string} description
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see MovieInfoComponent
	 * @example openGenre()
	 */
	openGenre(name: string, description: string): void {
		this.dialog.open(MovieInfoComponent, {
			data: {
				title: name,
				content: description,
			},
		});
	}

	/**
	 * Öffnet einen Dialog, der Informationen über einen bestimmten Regisseur anzeigt.
	 * @function
	 * @name openDirector
	 * @param {string} name
	 * @param {string} bio
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see MovieInfoComponent
	 * @example
	 */
	openDirector(name: string, bio: string): void {
		this.dialog.open(MovieInfoComponent, {
			data: {
				title: name,
				content: bio,
			},
			//width: '280px'
		});
	}

	/**
	 * Öffnet einen Dialog, der die Beschreibung eines Films anzeigt.
	 * @function
	 * @name openSynopsis
	 * @param {string} description
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see MovieInfoComponent
	 */
	openSynopsis(description: string): void {
		this.dialog.open(MovieInfoComponent, {
			data: {
				title: "Synopsis",
				content: description,
			},
		});
	}

	/**
	 * Fügt einen Film zu den Favoriten des Benutzers hinzu.
	 * @function
	 * @name addFavorite
	 * @param {string} id - Die ID des Films, der zu den Favoriten hinzugefügt werden soll.
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see FetchApiDataService.addFavoriteMovie()
	 */
	addFavorite(id: string): void {
		this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
			this.snackBar.open("Film wurde zu den Favoriten hinzugefügt.", "OK", {
				duration: 2000,
			});
		});
	}

	/**
	 * Prüft, ob ein Film zu den Favoriten des Benutzers gehört.
	 * @function
	 * @name isFavorite
	 * @param {string} id - Die ID des Films, der überprüft werden soll.
	 * @returns {boolean} - true, wenn der Film zu den Favoriten gehört, andernfalls false.
	 * @memberof MovieCardComponent
	 * @see FetchApiDataService.isFavoriteMovie()
	 * @example isFavorite()
	 */
	isFavorite(id: string): boolean {
		return this.fetchApiData.isFavoriteMovie(id);
	}

	/**
	 * Entfernt einen Film aus den Favoriten des Benutzers.
	 * @function
	 * @name removeFavorite
	 * @param {string} id - Die ID des Films, der aus den Favoriten entfernt werden soll.
	 * @returns {void}
	 * @memberof MovieCardComponent
	 * @see FetchApiDataService.deleteFavoriteMovie()
	 * @example removeFavorite()
	 */
	removeFavorite(id: string): void {
		this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
			this.snackBar.open("Film wurde aus den Favoriten entfernt.", "OK", {
				duration: 2000,
			});
		});
	}
}
