import { LitElement, html, css } from "lit";

export class ChallengeTable extends LitElement {
	static get styles() {
		return css`
			:host {
				color: red;
			}
			table {
				border: dashed purple;
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
		return html`${this.headers.map((name) => {
			return html` <th>${name}</th> `;
		})} `;
	}

	renderBody() {
		return html`${this.data.map((col) => {
			return html`
				<tr>
					<td>${col.x}</td>
					<td>${col.y}</td>
				</tr>
			`;
		})} `;
	}

	render() {
		return html`
			<h1>${this.name}</h1>
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
		`;
	}
}
window.customElements.define("challenge-table", ChallengeTable);
