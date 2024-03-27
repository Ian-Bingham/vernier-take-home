import { LitElement, html } from "lit";

class DataForm extends LitElement {
	get select_value() {
		const sizeSelect = this.renderRoot?.querySelector("#size-select") ?? null;
		return sizeSelect?.value;
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.select_value) {
			const eventOptions = {
				detail: { size: this.select_value },
				bubbles: true,
				composed: true,
			};

			this.dispatchEvent(new CustomEvent("size-selected", eventOptions));
		}
	}

	render() {
		return html`
			<form>
				<label for="size-select">Select a size for the data set:</label>
				<select id="size-select">
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
				<button @click=${this.onSubmit}>Submit</button>
			</form>
		`;
	}
}

customElements.define("data-form", DataForm);