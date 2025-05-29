const {
  tambahBukuHandler,
  tampilkanSemuaBukuHandler,
  cariBukuByIdHandler,
  ubahBukuByIdHandler,
  hapusBukuByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: tambahBukuHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: tampilkanSemuaBukuHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: cariBukuByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: ubahBukuByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: hapusBukuByIdHandler,
  },
];

module.exports = routes;