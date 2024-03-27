import { LitElement, css, html } from "lit";
import "./data-form.js";
import { ChallengeDataService } from "./ChallengeDataService.js";
import { Task } from "@lit/task";

import "./challenge-table.js";
import "./challenge-chart/dist/challenge-chart.js";

class App extends LitElement {
	static get styles() {
		return css`
			h1 {
				text-align: center;
			}
		`;
	}

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
		const { name, xColumn, yColumn } = data;

		const headers = [xColumn.name, yColumn.name];

		const tableData = xColumn.values.map((xVal, i) => {
			const yVal = yColumn.values[i];

			return {
				x: xVal,
				y: yVal,
			};
		});

		return html`
			<challenge-table
				.name=${name}
				.headers=${headers}
				.data=${tableData}
			></challenge-table>
			<challenge-chart .data=${tableData}></challenge-chart>
		`;
	}

	renderError(err) {
		console.error(err);

		return html`<p>Oops. An error occured... Please try again.</p>`;
	}

	render() {
		return html`
			<h1>Data Viewer</h1>
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
