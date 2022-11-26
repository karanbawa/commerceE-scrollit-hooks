import toastr from "toastr";
const showToast = (message, title, toastType='success') => {
  toastr.options = {
    positionClass: "toast-top-right",
    newestOnTop: true,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    closeButton: true,
    debug: true,
    preventDuplicates: true,
    extendedTimeOut: 1000,
  }

  console.log('in toast!')

  if (toastType === "info") toastr.info(message, title);
    else if (toastType === "warning") toastr.warning(message, title);
    else if (toastType === "error") toastr.error(message, title);
    else toastr.success(message, title);

//   toastr.error(message, title)
}



export default showToast;
