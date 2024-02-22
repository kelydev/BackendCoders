
var socket = io();

socket.on("productos", function (product) {
  var html = product 
    .map(function (elem, index) {
      return `<tbody>
                  <tr>
                    <td>${elem.title}</td>
                    <td>s/. ${elem.price}</td>
                    <td><img src=${elem.thumbnails} alt="Product" width="100px"></td>
                    <td id="tdb"><button type="button" class="btn btn-danger" onclick="deleteProduct(${elem.id})"><img src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/trashcan_delete_remove-512.png" alt="Productos" width="20px"></button></td>
                  </tr>
              </tbody>`;
    }).join(" ");
  document.getElementById("product-list").innerHTML = html;
});

const createProductForm = document.getElementById('create-product-form');
createProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(createProductForm);
  const producto = {
    title: formData.get('title'),
    price: parseFloat(formData.get('price')),
    thumbnails:formData.get('thumbnails'),
  };
  socket.emit('crearProducto', producto);
  createProductForm.reset();
});

function deleteProduct(id) {
  var productoId = id
  socket.emit("eliminarProducto", productoId);
}