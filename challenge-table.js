import { LitElement, html, css } from "lit";

export class ChallengeTable extends LitElement {
	static get styles() {
		return css`
			.table-container {
				margin-bottom: 4rem;
				max-height: 300px;
				overflow: auto;

				border: 2px solid #838383;
			}

			table {
				width: 100%;
				position: relative;

				border-collapse: collapse;
				text-align: center;
			}

			thead {
				position: sticky;
				top: 0;
			}

			thead tr,
			tbody tr:not(:last-child) {
				border-bottom: 1px solid #8c8c8c;
			}

			thead tr {
				background: #b6b6b6;
			}

			th,
			td {
				padding: 8px 10px;
			}

			th:not(:last-child),
			td:not(:last-child) {
				border-right: 1px solid #8c8c8c;
			}
		`;
	}

	static get properties() {
		return {
			name: {},
			headers: {},
			data: {},
		};
	}

	constructor() {
		super();
		this.name = "Data  Table";
		this.headers = [];
		this.data = [];
	}

	renderHeader() {
		return html`<th>Point</th>
			${this.headers.map((name) => {
				return html` <th>${name}</th> `;
			})} `;
	}

	renderBody() {
		return html`${this.data.map((col, i) => {
			return html`
				<tr>
					<td>${i + 1}</td>
					<td>${col.x}</td>
					<td>${col.y}</td>
				</tr>
			`;
		})} `;
	}

	render() {
		return html`
			<h1>${this.name}</h1>
			<div class="table-container">
				<table>
					<thead>
						<tr>
							${this.renderHeader()}
						</tr>
					</thead>
					<tbody>
						${this.renderBody()}
					</tbody>
				</table>
			</div>
		`;
	}
}
window.customElements.define("challenge-table", ChallengeTable);
