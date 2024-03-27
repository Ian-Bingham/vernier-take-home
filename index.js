import { LitElement, html } from "lit";
import "./data-form.js";
import { ChallengeDataService } from "./ChallengeDataService.js";
import { Task } from "@lit/task";

import "./challenge-table.js";

class App extends LitElement {
	constructor() {
		super();
		this._data_service = new ChallengeDataService();

		this._fetchDataTask = new Task(this, async (size) => {
			const data = await this._data_service.getDataSet(size);

			return data;
		});
	}

	async handleFormSubmission(e) {
		this._fetchDataTask.run(e.detail.size);
	}

	renderPending() {
		return html`<p>Fetching data...</p>`;
	}

	renderComplete(data) {
		return html`
			<challenge-table .challengeDataSet=${data}></challenge-table>
		`;
	}

	renderError(err) {
		console.error(err);

		return html`<p>Oops. An error occured... Please try again.</p>`;
	}

	render() {
		return html`
			<data-form @size-selected=${this.handleFormSubmission}></data-form>
			${this._fetchDataTask.render({
				pending: this.renderPending,
				complete: this.renderComplete,
				error: this.renderError,
			})}
		`;
	}
}

customElements.define("my-app", App);
