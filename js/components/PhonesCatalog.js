import Component from '../Component.js';

export default class PhonesCatalog extends Component {
  constructor(element, props) {
    super(element, props);

    this.render();

    this.on('click','PhoneLink', (event) => {
      const phoneId = event.delegateTarget.dataset.phoneId;
      this.props.onPhoneSelected(phoneId);
    });

    this.on('click','AddButton', (event) => {
      const phoneId = event.delegateTarget.dataset.phoneId;
      this.props.onAdd(phoneId);
    });

  }


  render() {
    this.element.innerHTML = `
        <div>
        <ul class="phones">
          
          ${ this.props.phones.map(phone => `
          
          <li class="thumbnail">
            <a 
            data-element="PhoneLink"
            data-phone-id="${ phone.id }"
            href="#!/phones/${ phone.id }"
            class="thumb">
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>

            <div class="phones__btn-buy-wrapper">
              <button class="btn btn-success" data-phone-id="${ phone.id }" data-element="AddButton">
                Add
              </button>
            </div>

            <a
             data-element="PhoneLink"
             data-phone-id="${ phone.id }"
             href="#!/phones/${ phone.id }">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
          
          `).join('')}
          
        </ul>
        </div>
    `;
  }
}