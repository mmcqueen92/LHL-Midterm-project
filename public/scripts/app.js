// Client facing scripts here

//
// ----- JQuery Document Ready -----
//
$(() => {
    console.log(`app.js is working`);
    // ----- Imports -----
    // Logging the render function from db query
    const createCardTile = (cardInfo) => {

    }

    // Get request via AJAX
    const getCardInfo = () => {
        $.get('/api/cards', (cardInfo) => {
            console.log(cardInfo);
            // createCardTile(cardInfo);
        })
    }
    getCardInfo();
















});

/* <button data-modal-target="#card-info-modal" class="card-tile">
  <article>
    <div class="card-title">
      <h3 class="card-tile-title">Title</h3>
    </div>
    <div class="card-date">
      Date
    </div>
    <div class="thumbnail">
      Thumbnail
    </div>
    <footer>
      <div class="icons"><i class="fa-solid fa-arrow-up"></i>&nbsp;Like<br></div>
      <div class="icons"><i class="fa-regular fa-comment"></i>&nbsp;Comments<br></div>
      <div class="icons"><i class="fa-regular fa-bookmark"></i>&nbsp;Collect<br></div>
    </footer>
 </article>
</button> */
