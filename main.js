// jQuery functions are prefaced by $
$(document).ready( function() {
  // all h1's
  // $("h1")
  // select by id and access inner html
  // $("#title").text("This is the new text");
  // select by class
  // $(".para")

  // handles the dropdown select
  $("#plan").on("change", function() {
    var priceText;

    switch(this.value){
      case "monthly":
        priceText = "$10.00 / month"
        break;
      case "quarterly":
        priceText = "$9.00 / month"
        break;
      case "yearly":
        priceText = "$7.00 / month"
        break;
    }
    $("#price").text(priceText);
  })
  $("#add-to-cart").on("click", function() {
    // alert("connect");
    var plan = $("#plan");
    var installment = plan.val();
    var price = $("#price").text();
    var inCart  = $("#in-cart");
    var numeric = price.replace(/[[A-Za-z$\/\s]/g, '');
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    inCart.append('<li class="entry"' + data + '>' + installment + ' - ' + price + 
      '<button class="remove">X</button></li>');
    removeButton();
    updateTotal();
    $("#empty").removeClass("hide");
  })

  function updateTotal() {
    var total = 0;
    $(".entry").each( function(index, entry){
      var data = $(entry).data();
      var price = parseFloat(data.price);
      var installment = data.plan;
      switch(installment){
        case "monthly":
          total += price;
          break;
        case "quarterly":
          total += price * 4;
          break;
        case "yearly":
          total += price * 12;
          break;
      }
    })
    $('#total').text('$' + total);
  }

  function removeButton(){
    $(".remove").on("click", function() {
      $(this).parents("li").remove();
      updateTotal();
    })
  }
  $('#empty').on('click', function() {
    $('#in-cart').empty();
    updateTotal();
    $("#empty").addClass("hide")
  });

  $("#display-cart").on("click", function(){
    var cart = $("#cart")
    var button = $(this)

    if (button.text() === 'Hide Cart')
      button.text('Show Cart')
    else
      button.text('Hide Cart');

  cart.slideToggle();
  })

  $("#purchase").on("click", function(){
    $("#complete")
      .html("<h2>PURCHASE COMPLETE</h2>")
      .css({
        'background-color': '#bca',
        'width': '100%',
        'border': '1px solid green',
        'text-align': 'center',
        'margin-bottom': '25px'
      })
      .animate({
        width: "70%",
        opacity: 0.4,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "10px"
      }, 1500 );    
  })
  
})