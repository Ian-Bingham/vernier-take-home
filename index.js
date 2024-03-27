import { LitElement, html } from "lit";
import "./src/components/data-form.js";

class App extends LitElement {
	render() {
		return html`<data-form></data-form>`;
	}
}

customElements.define("my-app", App);
