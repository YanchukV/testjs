
import Component from '../Component.js';
import PhonesCatalog from '../components/PhonesCatalog.js';
import PhoneViewer from '../components/PhoneViewer.js';
import ShoppingCart from '../components/ShoppingCart.js';
import Filter from '../components/Filter.js';

import { getAll, getById } from '../api/phones.js';

export default class PhonesPage extends Component {
  constructor(element) {
    super(element);

    this.state = {
      phones: [],
      selectedPhone: null,
      items: {},
    };

    this.onPhoneSelected = (phoneId) => this.selectedPhone(phoneId);
    this.onAdd = (phoneId) => this.addItem(phoneId);
    this.onBack = () => this.unselectedPhone();
    this.onRemove = (itemToRemove) => this.removeItem(itemToRemove);

    this.render();

    this.loadPhones();

  }

  async loadPhones() {

    const phones = await getAll();

    this.setState({ phones: phones });

  }

  addItem(item){

    const oldItems = this.state.items;

    const items = {
      ...oldItems,
      [item]: oldItems[item] ? oldItems[item] + 1 : 1,
    };

    this.setState({ items: items });
  }

  removeItem(itemToRemove) {

    const newItems = { ...this.state.items };
    delete newItems[itemToRemove];

    this.setState({
      items: newItems
    });
  }

  selectedPhone(phoneId) {
    getById(phoneId)
      .then(phone => {
        this.setState({ selectedPhone: phone });
      });
  }

  unselectedPhone() {
    this.setState({
      selectedPhone: null,
    });
  }


  init() {

    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,

      onPhoneSelected: this.onPhoneSelected,

      onAdd: this.onAdd,
    });
    this.initComponent(PhoneViewer,{
      phone: this.state.selectedPhone,
      onBack: this.onBack,

      onAdd: this.onAdd,
    });

    this.initComponent(ShoppingCart,{
        items: this.state.items,
        onRemove: this.onRemove,
    });
    this.initComponent(Filter);
  }



  render() {

    this.element.innerHTML = `
     <div class="row">
      <div class="col-md-2">
        <section>
           <div data-component="Filter"></div>
        </section>
        <section>
          <div data-component="ShoppingCart"></div>
        </section>
      </div>
      <div class="col-md-10">
      
      ${ this.state.selectedPhone ? `
      <div data-component="PhoneViewer"></div>
      ` :`
      <div data-component="PhonesCatalog"></div>
      `}
      
      </div>
    </div>
    `;
    this.init();
  }


}
