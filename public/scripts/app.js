//
// ----- JQuery Document Ready -----
$(() => {
  console.log(`app.js is working`);
  //
  // ----- User Log-In/Log-Out -----
  //

  // Initially hide the logout button on load
  $(`#log-out-button`).hide();


  $(`#login-button`).on('click', (event) => {
    event.preventDefault();
    $(`#overlay`).removeClass(`active`);
    $(`#get-started`).removeClass('active');

    const user_id = $(`#login-with-id input`).val()
    // console.log(`user_id from form is: `, user_id);
    $.get(`/login/${user_id}`).done(() => {
      $(`#log-out-button`).show();
    });
  })

  $(`#log-out-button`).on('click', (event) => {
    event.preventDefault();
    $.post(`/logout`).done(() => {
      $(`#log-out-button`).hide();
      $(`#collections-menu`).hide(200);
    })
  })
  //
  // ----- Closes Hardcoded Info Modal -----
  //
  $(`#card-info-modal-close-button`).on('click', (event) => {
    event.preventDefault();
    $(`#card-info-modal`).hide();
    $(`#overlay`).removeClass(`active`);
  });
  $(`#overlay`).on('click', (event) => {
    event.preventDefault();
    $(`#card-info-modal`).hide();
    $(`#overlay`).removeClass(`active`);
  });

  // ON CLICKING MY COLLECTIONS
  $(`#my-collections-button`).on('click', (event) => {
    event.preventDefault();
    // I want ALL collections names for this user
    $.get('/api/collections', (collectionsData) => {
      // if not logged in, the router just returned and exited
      console.log(collectionsData);


      // for all the collections names, loop thru and create a button for each
      collectionsData.forEach(collection => {
        // at the same time, filling the button text with the name of collection
        const $collectionButton = $(`<button class="button-for-collectionTab" type="button" id="collection-${collection.id}">Jquery</button>`).text(collection.name);
        // appends those buttons to our empty container that should be hidden
        $(`.container-for-collectionTabs`).append($collectionButton);
        // collections div.show() // trying to show the container now
        // Assigns unique id to those buttons, on submitting those buttons...
        $(`#collection-${collection.id}`).on('click', () => {
          // get back an array of card infos for the cards IN THIS collection
          $.get(`/api/collections/${collection.id}`, (cardsInThisCollection) => {
            console.log(`FROM APP.JS => cardsInThisCollection: `, cardsInThisCollection);
            // call renderCardTile which makes the tiles and fills infoModal on click
            $(`.container`).empty();
            renderCardTile(cardsInThisCollection);
          })
        })
      })
    }).done(() => {
      $(`#collections-menu`).show(200);
    })


  })




  // REGISTER USER ON SUBMIT BUTTON CLICK
  $('#get-started-register').on('submit', (event) => {
    event.preventDefault();
    const $email = $(`#email`).serialize();

    $.post(`/api/users/register/${$email}`, () => {
      $('#get-started').removeClass('active')
      $('#overlay').removeClass('active')
      $('#email').val('');

    })
      .done();
  });
  // -------------------------------------------



  //
  // ----- Everything about comments -----
  //
  const createCommentBox = (commentData) => {
    const username = commentData.name;
    const commentUserId = commentData.user_id;
    const commentCardId = commentData.card_id;
    const commentContent = commentData.content;

    // ----- ESCAPE FUNCTION FOR SAFEHTML -----
    const escape = (str) => {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $commentBox = $(`
      <section class="user-comment">
        <header class="comments-header">
          <div class="user-info">
            <img src=/>
            <div class="name">${escape(username)}</div>
          </div>
        </header>
        <p class="comments-content">${escape(commentContent)}</p>
        <div class="comments-footer">
        <div class="icons"><i class="fa-solid fa-arrow-up"></i>&nbsp;Like<br></div>
        </div>
      </section>
    `);

    return $commentBox;
  };

  const renderCommentboxes = (commentsArray) => {
    // Loops thru the res.rows array of commentData
    commentsArray.forEach((commentData) => {
      const comment_id = commentData.id

      // takes the data, turns it into HTML comment box element
      const $commentBox = createCommentBox(commentData);
      // prepending each comment box to the top of <section class="comments">
      $(`.comments`).append($commentBox);
    });
  };

  //
  // ----- Fills in correct data to the empty hidden InfoModal -----
  //

  // change to rendering the view modal from html already coded in
  const fillCardInfoModal = (cardInfo) => {
    const cardId = cardInfo.id;
    const title = cardInfo.title;
    const url = cardInfo.url;
    const date = cardInfo.created_at;
    const description = cardInfo.description;

    // ----- ESCAPE FUNCTION FOR SAFEHTML -----
    const escape = (str) => {
      let div = document.createElement("div");
      // Must use this function for <div, h1-6, p> tags which are non-editable but unsafeHTML
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // Fills in the correct values for the hidden info-modal
    $("#card-info-modal").find("div.modal-header > h3").text(`${escape(title)}`);
    $("#card-info-modal").find("div.card-date").text(`${date}`);
    $("#card-info-modal").find("div.card-description > h3").text(`${escape(description)}`);
    $("#card-info-modal").find("div.thumbnail").text(`${escape(url)}`);

    //
    // ----- Submitting Comments in the cardInfo Modal -----
    //

    // this id is actually a form, not a button - we had issues and had to move it
    $('#submit-comment-button').on('submit', (event) => {
      event.preventDefault();
      // console.log('I clicked this submit button');
      // console.log($(`textarea`).val());

      // sends post request to insert new comment in DB, serialized the form data
      $.post(`/api/comments/${cardId}`, $('#submit-comment-button').serialize())
        .done(() => {
          // afterwards, we immediately send a get request to render all comments
          $.get(`/api/comments/${cardId}`, (allCommentsData) => {
            $(`.create-comment-form textarea`).val('');
            // console.log('This happens 1st')
            $(`.comments`).empty();
            // console.log('This happens 2nd')
            renderCommentboxes(allCommentsData);
            // console.log('New comments rendered')
          })
        });


    });
  };

  //
  // ----- Create's the clickable card tiles on initial page request -----
  //
  const createCardTile = (cardData) => {
    // Pulling certain data from cardData obj
    const title = cardData.title;
    const url = cardData.url;
    const date = cardData.created_at;
    // const numOfLikes =

    // ----- ESCAPE FUNCTION FOR SAFEHTML -----
    const escape = (str) => {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // Plug them into the cardTile template that will be made client-side
    const $cardTile = $(`
      <button data-modal-target="#card-info-modal" class="card-tile">
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


  // cardTilesArray = res.json(cardData) aka our res.rows from db query
  const renderCardTile = (cardTilesArray) => {
    // Loops through res.rows from cardTiles query
    cardTilesArray.forEach((cardTile) => {
      // For each data object, we grab its id
      const card_Id = cardTile.id
      // calling createCardTile on the data object we make an HTML card ELEMENT
      const $cardTile = createCardTile(cardTile);
      // prepends the HTML element to the container class which holds all cards
      $(".container").prepend($cardTile);

      //
      // ----- AS tiles are created, assign a click event for: -----
      //
      $cardTile.on('click', (event) => {
        //console.log("does this click?");
        //event.preventDefault();
        console.log('event prevent default');

        // REQUEST 1: get ONE card data to fill in cardInfo modal
        $.get(`/api/cards/${card_Id}`, (thisCardInfo) => {
          console.log('this card info', thisCardInfo);
          // thisCardInfo = json OBJECT
          fillCardInfoModal(thisCardInfo);
          $(`#overlay`).addClass('active');
          // !! add 200ms for animation? !!
          $(`#card-info-modal`).show();
        });

        // REQUEST 2: get ALL comments FOR THIS card-tile
        $.get(`/api/comments/${card_Id}`, (commentsData) => {
          // commentsData = ARRAY of comment objects
          // empties the comments section/container that holds all comments
          $(".comments").empty();
          // create comment boxes, and prepends it to the container
          renderCommentboxes(commentsData);
        })
      })
    })
  };

  //
  // ----- INITIAL AJAX request for ALL cards to be displayed -----
  //
  const getCardTiles = () => {
    // cardData = res.json(cardTileInfo) aka res.rows from db query
    $.get('/api/cards', (cardsData) => {
      $(".container").empty();
      renderCardTile(cardsData);
    })
  };

  getCardTiles();

});
