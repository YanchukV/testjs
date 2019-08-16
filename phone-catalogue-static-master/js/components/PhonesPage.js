
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
      phones: getAll(),
      selectedPhone: null,
      items: {},
    };

    this.render();

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

    const newItems = this.state.items;
    delete newItems[itemToRemove];

    this.setState({
      items: newItems
    });
  }

  selectedPhone(phoneId) {
    this.setState({
      selectedPhone: getById(phoneId),
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

      onPhoneSelected: (phoneId) => this.selectedPhone(phoneId),

      onAdd: (phoneId) => this.addItem(phoneId),
    });
    this.initComponent(PhoneViewer,{
      phone: this.state.selectedPhone,
      onBack: () => this.unselectedPhone(),

      onAdd: (phoneId) => this.addItem(phoneId),
    });

    this.initComponent(ShoppingCart,{
        items: this.state.items,
        onRemove: (itemToRemove) => this.removeItem(itemToRemove)
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
