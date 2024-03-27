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
			challengeDataSet: {},
		};
	}

	constructor() {
		super();
		this.challengeDataSet = {};
	}

	renderBody() {
		const { xColumn, yColumn } = this.challengeDataSet;

		return html`${xColumn.values.map((xVal, i) => {
			const yVal = yColumn.values[i];

			return html`
				<tr>
					<td>${xVal}</td>
					<td>${yVal}</td>
				</tr>
			`;
		})} `;
	}

	render() {
		return html`
			<h1>${this.challengeDataSet.name}</h1>
			<table>
				<thead>
					<tr>
						<th>${this.challengeDataSet.xColumn.name}</th>
						<th>${this.challengeDataSet.yColumn.name}</th>
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
