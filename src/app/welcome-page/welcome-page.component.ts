/**
 * @fileOverview WelcomePageComponent Komponente, die die Willkommensseite der Anwendung darstellt.
 * @module WelcomePageComponent
 */

import { Component, OnInit } from "@angular/core";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";

/**
 *
 * @class
 * @name WelcomePageComponent
 * @implements {OnInit}
 * @example <app-welcome-page></app-welcome-page>
 * @see UserLoginFormComponent
 * @see UserRegistrationFormComponent
 */
@Component({
	selector: "app-welcome-page",
	templateUrl: "./welcome-page.component.html",
	styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
	/**
	 * Erstellt eine Instanz von WelcomePageComponent.
	 * @constructor
	 * @param {MatDialog} dialog
	 */
	constructor(public dialog: MatDialog) {}

	/**
	 * Wird beim Initialisieren der Komponente aufgerufen.
	 * @function
	 * @name ngOnInit
	 * @returns {void}
	 * @memberof WelcomePageComponent
	 */
	ngOnInit(): void {}

	/**
	 * Öffnet das Dialogfenster zum Registrieren eines neuen Benutzers, wenn der Anmeldebutton angeklickt wird.
	 * @function
	 * @name openUserRegistrationDialog
	 * @param {void}
	 * @returns {UserRegistrationFormComponent}
	 * @memberof WelcomePageComponent
	 * @see UserRegistrationFormComponent
	 * @example openUserRegistrationDialog()
	 */
	openUserRegistrationDialog(): void {
		this.dialog.open(UserRegistrationFormComponent, {
			width: "280px",
		});
	}

	/**
	 * Öffnet das Dialogfenster zum Einloggen eines Benutzers, wenn der Registrierungsbutton angeklickt wird.
	 * @function
	 * @name openUserLoginDialog
	 * @param {void}
	 * @returns {UserLoginFormComponent}
	 * @memberof WelcomePageComponent
	 * @see UserLoginFormComponent
	 * @example openUserLoginDialog()
	 */
	openUserLoginDialog(): void {
		this.dialog.open(UserLoginFormComponent, {
			width: "280px",
		});
	}
}
