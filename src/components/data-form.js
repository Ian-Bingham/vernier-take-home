import { LitElement, html } from "lit";

class DataForm extends LitElement {
	get select_value() {
		const sizeSelect = this.renderRoot?.querySelector("#size-select") ?? null;
		return sizeSelect?.value;
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.select_value) {
			console.log("Selected value", this.select_value);
		}
	}

	render() {
		return html`
			<form>
				<label for="size-select">Select a size for the data set:</label>
				<select id="size-select">
					<option value="sm">Small</option>
					<option value="md">Medium</option>
					<option value="lg">Large</option>
				</select>
				<button @click=${this.onSubmit}>Submit</button>
			</form>
		`;
	}
}

customElements.define("data-form", DataForm);
