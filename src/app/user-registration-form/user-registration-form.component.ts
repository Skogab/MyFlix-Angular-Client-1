/**
 * @fileOverview UserRegistrationFormComponent ist eineKomponente, die ein Registrierungsformular für Benutzer darstellt.
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 *
 * @class
 * @name UserRegistrationFormComponent
 * @implements {OnInit}
 * @example <app-user-registration-form></app-user-registration-form>
 * @see FetchApiDataService
 */
@Component({
	selector: "app-user-registration-form",
	templateUrl: "./user-registration-form.component.html",
	styleUrls: ["./user-registration-form.component.scss"],
})
export class UserRegistrationFormComponent implements OnInit {
	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

	/**
	 * Erstellt eine Instanz von UserRegistrationFormComponent.
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData
	 * @param {MatDialogRef} dialogRef
	 * @param {MatSnackBar} snackBar
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
		public snackBar: MatSnackBar
	) {}

	/**
	 * Wird beim Initialisieren der Komponente aufgerufen.
	 * @function
	 * @name ngOnInit
	 * @returns {void}
	 * @memberof UserRegistrationFormComponent
	 */
	ngOnInit(): void {}

	/**
	 * Sendet die Formulareingaben an den Backend-Server, um den Benutzer zu registrieren.
	 * @function
	 * @name registerUser
	 * @param {void}
	 * @returns {void}
	 * @memberof UserRegistrationFormComponent
	 * @see FetchApiDataService.registerUser()
	 * @example registerUser()
	 */
	registerUser(): void {
		this.fetchApiData.userRegistration(this.userData).subscribe(
			(result) => {
				this.dialogRef.close();
				this.snackBar.open("Benutzer erfolgreich registriert", "OK", {
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
