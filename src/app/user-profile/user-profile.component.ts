/**
 * @fileOverview UserProfileComponent stellt das Benutzerprofil.
 * @module UserProfileComponent
 */

import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

/**
 *
 * @class
 * @name UserProfileComponent
 * @implements {OnInit}
 * @example <app-user-profile></app-user-profile>
 * @see FetchApiDataService
 */
@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
	user: any = {};
	favoriteMovies: any[] = [];

	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

	/**
	 * Konstruiert eine Instanz von UserProfileComponent.
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData
	 * @param {MatSnackBar} snackBar
	 * @param {Router} router
	 */
	constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar, private router: Router) {}

	/**
	 * Wird beim Initialisieren der Komponente aufgerufen.
	 * @function
	 * @name ngOnInit
	 * @returns {void}
	 * @memberof UserProfileComponent
	 */
	ngOnInit(): void {
		this.getUser();
	}

	/**
	 * Ruft die Benutzerdaten von der API ab und aktualisiert das Benutzerprofil.
	 * @function
	 * @name getUser
	 * @param {void}
	 * @returns {void}
	 * @memberof UserProfileComponent
	 * @see FetchApiDataService.getOneUser()
	 * @example getUser()
	 */
	getUser(): void {
		this.user = this.fetchApiData.getOneUser();
		this.userData.Username = this.user.Username;
		this.userData.Email = this.user.Email;
		this.userData.Birthday = formatDate(this.user.Birthday, "yyyy-MM-dd", "en-US", "UTC+0");

		this.fetchApiData.getAllMovies().subscribe((resp: any) => {
			this.favoriteMovies = resp.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0);
		});
	}

	/**
	 * Sendet die Formulareingaben an den Backend-Server, um die Benutzerdaten zu aktualisieren.
	 * @function
	 * @name editUser
	 * @param {void}
	 * @returns {void}
	 * @memberof UserProfileComponent
	 * @see FetchApiDataService.editUser()
	 * @example editUser()
	 */
	editUser(): void {
		this.fetchApiData.editUser(this.userData).subscribe(
			(result) => {
				localStorage.setItem("user", JSON.stringify(result));

				this.snackBar.open("Benutzer erfolgreich aktualisiert", "OK", {
					duration: 2000,
				});
			},
			(result) => {
				this.snackBar.open(result, "OK", {
					duration: 2000,
				});
			}
		);
	}

	/**
	 * Sendet das Benutzerobjekt an den Backend-Server, um den Benutzer zu löschen.
	 * @function
	 * @name deleteUser
	 * @param {void}
	 * @returns {void}
	 * @memberof UserProfileComponent
	 * @see FetchApiDataService.deleteUser()
	 * @example deleteUser()
	 */
	deleteUser(): void {
		this.fetchApiData.deleteUser().subscribe(
			(result) => {
				localStorage.clear();
				this.router.navigate(["welcome"]);
				this.snackBar.open("Benutzer erfolgreich gelöscht", "OK", {
					duration: 2000,
				});
			},
			(result) => {
				this.snackBar.open(result, "OK", {
					duration: 2000,
				});
			}
		);
	}
}
