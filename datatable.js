function initializeDataTable() {
    $(document).ready(function () {
      $('#product-table').DataTable({
        responsive: true,
        language: {
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ registros por página",
          info: "Mostrando página _PAGE_ de _PAGES_",
          paginate: {
            previous: "Anterior",
            next: "Siguiente",
          },
        },
      });
    });
  }
  