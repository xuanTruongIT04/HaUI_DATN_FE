import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import Swal from 'sweetalert2';

Vue.use(Toast, {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButton: true,
    hideProgressBar: false,
    icon: true,
    rtl: false,
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
});

const swalOptions = {
  position: 'center',
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonText: 'Đồng ý',
  cancelButtonText: 'Không',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  reverseButtons: true, 
  focusCancel: false,
  focusConfirm: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  showCloseButton: false,
  timer: 10000,
  timerProgressBar: false,
  showLoaderOnConfirm: false,
};

Vue.prototype.$swal = Swal.mixin(swalOptions);