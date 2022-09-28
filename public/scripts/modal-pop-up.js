// THIS SCRIPT IS ONLY FOR THE MENU POP-UPS

//
// ----- JQuery Doc Ready -----
//
$(() => {
  console.log(`modal-pop-up.js is working`);
    // ----- Function Definitions -----
  const openModal = (modal) => {
    if (modal === null) return;
    $(modal).addClass('active');
    $('#overlay').addClass('active');
  };
  const closeModal = (modal) => {
    if (modal === null) return;
    $(modal).removeClass('active');
    $('#overlay').removeClass('active');
  };

  // There will be multiple ways to open and close modals so we need to access their entire data attribute
  const $openModalButtons = document.querySelectorAll('.dropdown-content [data-modal-target]');
  const $closeModalButtons = document.querySelectorAll('[data-close-button]');
  const $overlay = $('#overlay');

  $openModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal);
    })
  });
  $closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    })
  });
  $overlay.click(() => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach((modal) => {
      closeModal(modal);
    })
  });

});
