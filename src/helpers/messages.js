import Swal from 'sweetalert2';

export const toastMessage = (icon, title, text) => Swal.fire(({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    icon,
    title,
    text,
}));

export const deleteMessage = (callback) => Swal.fire({
    // ../assets/background-menu.jpg
    title: '¿Estas seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2196F3',
    cancelButtonColor: '#E53935',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
}).then((result) => {
    if (result.isConfirmed) {
        callback();
    }
});

export const alertMessage = (title = '') => {
    Swal.fire({
        title: "<h5 style='color:white'>" + title + "</h5>",
        width: 500,
        padding: '3em',
        background: '#fff url("/images/alert.gif")',
        confirmButtonColor: '#E53935',
        backdrop: `
          rgba(229, 57, 53,0.4)
          left top
          no-repeat
        `
    })
}