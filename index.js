import { LitElement, css, html } from "lit";
import "./non-streaming-form.js";

import "./non-streaming-app.js";
import "./streaming-app.js";

class App extends LitElement {
	static get styles() {
		return css`
			h1 {
				text-align: center;
			}

			.init-container {
				margin-bottom: 2rem;
			}
		`;
	}

	static properties = {
		shouldStream: {},
	};

	constructor() {
		super();

		this.shouldStream = false;
	}

	handleCheckbox() {
		this.shouldStream = !this.shouldStream;
	}

	render() {
		return html`
			<h1>Data Viewer</h1>
			<div class="init-container">
				<span>Would you like to stream the data?</span>
				<input
					type="checkbox"
					id="should-stream-checkbox"
					name="stream-checkbox"
					@change=${this.handleCheckbox}
				/>
				<label for="should-stream-checkbox">Yes</label>
			</div>

			${this.shouldStream
				? html`<streaming-app></streaming-app>`
				: html`<non-streaming-app></non-streaming-app>`}
		`;
	}
}

customElements.define("my-app", App);
