import { LitElement, html } from "lit";
import { ChallengeDataService } from "./ChallengeDataService";

import "./challenge-table.js";
import "./challenge-chart/dist/challenge-chart.js";

const STREAM_RATE = 5;

class StreamingApp extends LitElement {
	static properties = {
		tableData: {},
	};

	constructor() {
		super();
		this._data_service = new ChallengeDataService();
		this.tableData = [];
	}

	handleStart() {
		this.tableData = [];

		this._data_service.startStreaming(STREAM_RATE, (x, y) => {
			this.tableData = [...this.tableData, { x, y }];
		});
	}

	handleStop() {
		this._data_service.stopStreaming();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.handleStop();
	}

	render() {
		return html`
			<div>
				<button @click=${this.handleStart}>Start Streaming</button>
				<button @click=${this.handleStop}>Stop Streaming</button>
			</div>
			<challenge-table .data=${this.tableData}></challenge-table>
			<challenge-chart .data=${this.tableData}></challenge-chart>
		`;
	}
}

customElements.define("streaming-app", StreamingApp);
