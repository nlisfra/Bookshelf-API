const { nanoid } = require('nanoid');
const dataBuku = require('./books');

const tambahBukuHandler = (request, h) => {
  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const id = nanoid(16);
  const timestamp = new Date().toISOString();
  const isFinished = pageCount === readPage;

  const bukuBaru = {
    id, name, year, author, summary,
    publisher, pageCount, readPage,
    finished: isFinished, reading,
    insertedAt: timestamp, updatedAt: timestamp,
  };

  dataBuku.push(bukuBaru);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
  }).code(201);
};

const tampilkanSemuaBukuHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let hasilFilter = dataBuku;

  if (name) {
    hasilFilter = hasilFilter.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    hasilFilter = hasilFilter.filter((item) =>
      item.reading === !!Number(reading)
    );
  }

  if (finished !== undefined) {
    hasilFilter = hasilFilter.filter((item) =>
      item.finished === !!Number(finished)
    );
  }

  return h.response({
    status: 'success',
    data: {
      books: hasilFilter.map(({ id, name, publisher }) => ({ id, name, publisher })),
    },
  }).code(200);
};

const cariBukuByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const buku = dataBuku.find((item) => item.id === bookId);

  if (!buku) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: { book: buku },
  }).code(200);
};

const ubahBukuByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = dataBuku.findIndex((item) => item.id === bookId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  dataBuku[index] = {
    ...dataBuku[index],
    name, year, author, summary,
    publisher, pageCount, readPage,
    reading, finished, updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

const hapusBukuByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = dataBuku.findIndex((item) => item.id === bookId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  dataBuku.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  tambahBukuHandler,
  tampilkanSemuaBukuHandler,
  cariBukuByIdHandler,
  ubahBukuByIdHandler,
  hapusBukuByIdHandler,
};