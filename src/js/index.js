// Setup on change function for select to modify class for contacts list and switch between displaying phone and email information.
function initSelect() {
  const select = document.getElementById('attributeDisplay');

  if (select) {
    console.log(select);
    select.addEventListener('change', (e) => {
      const { value } = e.target;

      const list = document.querySelector('.contacts__list');

      list.classList.remove('contacts__list--show-email');
      list.classList.remove('contacts__list--show-phone');
      list.classList.add(`contacts__list--show-${value}`);
    });
  }
}

// Run after dom load.
document.addEventListener('DOMContentLoaded', () => {
  initSelect();
});
