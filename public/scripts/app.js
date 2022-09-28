//
// ----- JQuery Document Ready -----
//
$(() => {
  console.log(`app.js is working`);

  //
  // ----- Open & Close Modal Funcs -----
  //
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

  //
  // ----- Creating Card TILES -----
  //
  const createCardTile = (cardInfo) => {
    // Pulling certain data from cardInfo obj
    const cardId = cardInfo.id;
    const title = cardInfo.title;
    const url = cardInfo.url;
    const date = cardInfo.created_at;

    //
    // ----- ESCAPE FUNCTION FOR SAFEHTML -----
    //
    const escape = (str) => {
      let div = document.createElement("div");
      // Must use this function for <div, h1-6, p> tags which are non-editable but unsafeHTML
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // Plug them into the cardTile template that will be made client-side
    const $cardTile = $(`
      <button data-modal-target="#card-info-modal-${cardId}" class="card-tile">
        <article>
          <div class="card-title">
            <h3 class="card-tile-title">${escape(title)}</h3>
          </div>
          <div class="card-date">
            ${date}
          </div>
          <div class="thumbnail">
            ${escape(url)}
          </div>
          <footer>
            <div class="icons"><i class="fa-solid fa-arrow-up"></i>&nbsp;Like<br></div>
            <div class="icons"><i class="fa-regular fa-comment"></i>&nbsp;Comments<br></div>
            <div class="icons"><i class="fa-regular fa-bookmark"></i>&nbsp;Collect<br></div>
          </footer>
      </article>
      </button>
    `);
    return $cardTile;
  };


  const renderCardTile = (cardTilesArray) => {

    cardTilesArray.forEach((cardTile) => {
      const $cardTile = createCardTile(cardTile);
      $(".container").prepend($cardTile);
    })

    const $openModalButtons = document.querySelectorAll('.container [data-modal-target]');


    $openModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal);
      })
    });


    console.log('open modal buttons array :', $openModalButtons)
  };

  //
  // ----- Creating Card-INFO-PopUps -----
  //
  const createCardInfoModal = (cardInfo) => {
    const cardId = cardInfo.id;
    const title = cardInfo.title;
    const url = cardInfo.url;
    const date = cardInfo.created_at;
    const description = cardInfo.description;

    //
    // ----- ESCAPE FUNCTION FOR SAFEHTML -----
    //
    const escape = (str) => {
      let div = document.createElement("div");
      // Must use this function for <div, h1-6, p> tags which are non-editable but unsafeHTML
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $cardInfoModal = $(`
      <div class="card-info modal" id="card-info-modal-${cardId}">
        <div class="modal-header">
          <h3>${escape(title)}</h3>
          <button data-close-button class="close-button">&times;</button>
        </div>
        <div class="card-date">
          ${date}
        </div>
        <div class="card-description">
          <h3> ${escape(description)}</h3>
        </div>
        <div class="thumbnail">
          ${escape(url)}
        </div>
        <footer>
          <i class="fa-regular fa-thumbs-up">Like</i>
          <i class="fa-regular fa-comment">Comments</i>
          <i class="fa-regular fa-comment">Collect</i>
        </footer>

        <section class="comment-box">
          <form class="form">
            <textarea name="text" placeholder="Add a comment..."></textarea>
            <div>
              <button type="submit" class="submit-button">Submit</button>
            </div>
          </form>
        </section>

        <section class="comments">
          <header class="comments-header">
            <div class="user-info">
            <img src=/>
            <div class="name">Username</div>
            </div>
          </header>
          <p class="comments-content">Comment</p>
          <div class="comments-footer">
            <i class="fa-regular fa-thumbs-up">Like</i>
          </div>
        </section>
      </div>
    `);
    return $cardInfoModal;
  };

  const renderCardInfo = (cardDataArray) => {
    cardDataArray.forEach((cardData) => {
      const $cardInfoModal = createCardInfoModal(cardData);
      $('.container').prepend($cardInfoModal)
    })
    const $closeModalButtons = document.querySelectorAll('.container [data-close-button]');
    $closeModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
      })
    });
  };

  //
  // ----- Calling the Card Tiles and Info Modals via AJAX -----
  //
  const getCardTilesAndInfoModals = () => {
    $.get('/api/cards', (cardData) => {
      $(".container").empty();
      renderCardTile(cardData);
      renderCardInfo(cardData);
      // Need to add a function that targets the [data-modal-target] on load BUT only those inside the container class so as not to affect the menu

    })
  };
  getCardTilesAndInfoModals();
});
