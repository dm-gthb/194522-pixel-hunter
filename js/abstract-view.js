export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`can't instantiate AbstractView`);
    }
  }

  get template() {
    throw new Error(`template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    const markup = this.template;
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = markup.trim();
    return wrapper;
  }

  bind() {}
}
