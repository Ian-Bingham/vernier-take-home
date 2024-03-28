import { LitElement, html } from "lit";
import { ChallengeDataService } from "./ChallengeDataService";

import "./challenge-table.js";
import "./challenge-chart/dist/challenge-chart.js";

const DATA_POINTS_PER_SECOND = 5;
const CHART_REFRESH_SECONDS = 5;

class StreamingApp extends LitElement {
	static properties = {
		tableData: {},
		_timer: {},
		_timerId: {},
	};

	constructor() {
		super();
		this._data_service = new ChallengeDataService();
		this.initializeData();
		this._timer = null;
		this.timerId = null;
	}

	initializeData() {
		this.tableData = [];
		this._chartBuffer = [];
		this.chartData = [];
	}

	updateChartData() {
		this.chartData = [...this.chartData, ...this._chartBuffer];
		this._chartBuffer = [];
	}

	startTimer() {
		this._timer = null;

		this._timerId = setInterval(() => {
			if (!this._timer) {
				this._timer = CHART_REFRESH_SECONDS;
			}

			this._timer--;
		}, 1000);
	}

	clearTimer() {
		clearInterval(this._timerId);
	}

	handleStart() {
		this.initializeData();
		this.startTimer();

		this._data_service.startStreaming(DATA_POINTS_PER_SECOND, (x, y) => {
			this.tableData = [...this.tableData, { x, y }];
			this._chartBuffer = [...this._chartBuffer, { x, y }];

			if (
				this._chartBuffer.length >=
				DATA_POINTS_PER_SECOND * CHART_REFRESH_SECONDS
			) {
				this.updateChartData();
			}
		});
	}

	handleStop() {
		this._data_service.stopStreaming();
		this.updateChartData();
		this.requestUpdate();
		this.clearTimer();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._data_service.stopStreaming();
		this.clearTimer();
	}

	render() {
		return html`
			<div>
				<button @click=${this.handleStart}>Start Streaming</button>
				<button @click=${this.handleStop}>Stop Streaming</button>
			</div>
			<p>
				Note: The stream is programmed to get 5 data points per second, and the
				chart will update every 5 seconds.
			</p>
			${!!this.tableData.length
				? html`
						<p>Chart will display/update in: ${this._timer + 1} seconds</p>
						<challenge-table .data=${this.tableData}></challenge-table>
				  `
				: null}
			${!!this.chartData.length
				? html`<challenge-chart .data=${this.chartData}></challenge-chart>`
				: null}
		`;
	}
}

customElements.define("streaming-app", StreamingApp);
