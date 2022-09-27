// Client facing scripts here

//
// ----- JQuery Document Ready -----
//
$(() => {
  console.log(`app.js is working`);
  //
  // ----- Makes the cardTile (doesn't render) -----
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
      <button data-modal-target="#card-info-${cardId}" class="card-tile">
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
    });
  };

  // Get request via AJAX
  const getCardTile = () => {
    $.get('/api/cards', (cardTiles) => {
      // Before rendering card tiles, empty the entire container of tiles
      $(".container").empty();
      renderCardTile(cardTiles);
    })
  };

  // Calling function to get card tiles to the screen
  getCardTile();
});

