/**
 * @fileOverview UserLoginFormComponent stellt eine Anmeldeformular für dar.
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 *
 * @class
 * @name UserLoginFormComponent
 * @implements {OnInit}
 * @example <app-user-login-form></app-user-login-form>
 * @see FetchApiDataService
 */
@Component({
	selector: "app-user-login-form",
	templateUrl: "./user-login-form.component.html",
	styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
	@Input() loginData = { Username: "", Password: "" };

	/**
	 * Konstruiert eine Instanz von UserLoginFormComponent.
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData .
	 * @param {MatDialogRef} dialogRef
	 * @param {MatSnackBar} snackBar
	 * @param {Router} router
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserLoginFormComponent>,
		public snackBar: MatSnackBar,
		private router: Router
	) {}

	/**
	 * Wird beim Initialisieren der Komponente aufgerufen.
	 * @function
	 * @name ngOnInit
	 * @returns {void}
	 * @memberof UserLoginFormComponent
	 */
	ngOnInit(): void {}

	/**
	 * Sendet die Formulareingaben an den Backend-Server zur Benutzeranmeldung.
	 * @function
	 * @name loginUser
	 * @param {void}
	 * @returns {void}
	 * @memberof UserLoginFormComponent
	 * @see FetchApiDataService.userLogin()
	 * @example loginUser()
	 */
	loginUser(): void {
		this.fetchApiData.userLogin(this.loginData).subscribe(
			(result) => {
				localStorage.setItem("user", JSON.stringify(result.user));
				localStorage.setItem("token", result.token);
				this.dialogRef.close();
				this.router.navigate(["movies"]);
				this.snackBar.open("Eingeloggt", "OK", {
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
