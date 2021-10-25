
function insert_in_shoppingCart(itemId, desc, Price, Qty){
	$.ajax({
        url: baseurl,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data),
        dataType:'json',
	  data: { 
        itemid: itemId,
        price: Price, 
        description: desc,
        qty: Qty }
	}
    .done(function( msg ) {
        alert("added item "+itemId+" >>>"+Qty+" pieces,at price:"+Price);
    })
}

