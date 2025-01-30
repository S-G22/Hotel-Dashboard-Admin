hotelMod.controller("ManageBooking", function ($scope, SiteService) {



  /*  $scope.getManageBookDetails = () => {
        SiteService.getManageBookList()
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.dataManageBooking = response.data.DATAlists;
                    *//*console.log("Bookinglist", $scope.dataManageBooking);*//*
                }
                else {
                    alert(response.data.Message);
                }

            },
                (err) => {
                    alert(err.data.Message);
                })
    };
    $scope.getManageBookDetails();*/

    $scope.PaymentModal = () => {
        $('#PaymentModal').modal('show');
      /*  window.location.href = '/NiceAdmin/Payment';*/
    }



    function getParam(payBookID) {
        const urlPayParams = new URLSearchParams(window.location.search);
        return urlPayParams.get(payBookID);
    }

    const hotelPayBookId = getParam('HotelPaymentBookID');

    $scope.GetPaymentList = () => {

        SiteService.getPaymentBookingList(hotelPayBookId)
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.AllPaymentLists = response.data.DATAlists
                }
                else {
                    toastr.error("Error");
                }
                (err) => {
                    toastr.error(err);
                }
            })

    };
    $scope.GetPaymentList();
});