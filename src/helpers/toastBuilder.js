import toastr from "toastr";
 
 export const showToastSuccess = (message, title) => {
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
    toastr.success(message, title)
  }
  
 export const showToastError = (message, title) => {
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
    toastr.error(message, title)
  }
  